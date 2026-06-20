#!/usr/bin/env node
/**
 * fetch-gallery.mjs
 * Generates src/data/gallery-items.ts from a Google Drive folder.
 * Supports subfolder grouping; folder names become section headers.
 *
 * Media strategy (so the production build never depends on Drive — see the
 * 403 download-quota incident that wiped the gallery):
 *   · Images  → served straight from Google's CDN (lh3.googleusercontent.com),
 *               nothing is downloaded or committed.
 *   · Videos  → downloaded once, compressed with ffmpeg to a small looping mp4
 *               in public/clips/ (committed to the repo).
 *
 * This is a LOCAL/manual refresh step — it is intentionally NOT part of the
 * build. Run it when Drive contents change, then commit the results.
 * Run: npm run fetch-gallery   ·   Requires: GOOGLE_API_KEY in .env
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Load .env manually (no dotenv dependency needed)
try {
  const env = readFileSync(join(ROOT, '.env'), 'utf8');
  for (const line of env.split('\n')) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  }
} catch {
  // .env not found, rely on system env
}

const API_KEY   = process.env.GOOGLE_API_KEY;
const FOLDER_ID = '1iVhRUiXZuK3FbZCwGxMLzaIQwa-z1A89';

if (!API_KEY) {
  console.error('❌  GOOGLE_API_KEY is not set. Add it to your .env file.');
  process.exit(1);
}

// Working cache for video originals (gitignored). Images are never downloaded.
const cacheDir = join(ROOT, 'public', 'gallery');
// Compressed looping clips that actually ship (committed).
const clipsDir = join(ROOT, 'public', 'clips');
mkdirSync(cacheDir, { recursive: true });
mkdirSync(clipsDir, { recursive: true });

const isImage = f => f.mimeType?.startsWith('image/');
const isVideo = f => f.mimeType?.startsWith('video/');
const isMedia = f => isImage(f) || isVideo(f);

const driveDownloadUrl = id =>
  `https://www.googleapis.com/drive/v3/files/${id}?alt=media&key=${API_KEY}`;

/** Download a Drive video original (cached), then compress it to a small mp4. */
async function processVideoFile(file) {
  const ext      = file.name.split('.').pop()?.toLowerCase() ?? 'mp4';
  const srcPath  = join(cacheDir, `${file.id}.${ext}`);
  const outPath  = join(clipsDir, `${file.id}.mp4`);

  if (!existsSync(srcPath)) {
    const dlRes = await fetch(driveDownloadUrl(file.id));
    if (!dlRes.ok) {
      console.warn(`   ⚠  Skipping "${file.name}" — download failed (${dlRes.status})`);
      return null;
    }
    writeFileSync(srcPath, Buffer.from(await dlRes.arrayBuffer()));
    console.log(`   ✓  ${file.name} (downloaded original)`);
  }

  if (!existsSync(outPath)) {
    // Cap width at 800px, strip audio, web-optimized H.264 — loops are tiny.
    const res = spawnSync(ffmpegPath, [
      '-y', '-loglevel', 'error', '-i', srcPath,
      '-an', '-vf', "scale='min(800,iw)':-2",
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '30',
      '-pix_fmt', 'yuv420p', '-movflags', '+faststart', outPath,
    ]);
    if (res.status !== 0) {
      console.warn(`   ⚠  Skipping "${file.name}" — ffmpeg failed`);
      return null;
    }
    console.log(`   ✓  ${file.name} (compressed → clips/${file.id}.mp4)`);
  } else {
    console.log(`   –  ${file.name} (clip already built)`);
  }

  const meta = file.videoMediaMetadata ?? {};
  const displayHeight = Math.round(((meta.height ?? 800) / (meta.width ?? 600)) * 600);

  return {
    id:          file.id,
    type:        'video',
    img:         `/clips/${file.id}.mp4`,
    url:         `https://drive.google.com/file/d/${file.id}/view`,
    height:      displayHeight,
    description: file.description ?? '',
  };
}

/** Build a gallery item for an image — served directly from Google's CDN. */
function processImageFile(file) {
  const meta = file.imageMediaMetadata ?? {};
  const displayHeight = Math.round(((meta.height ?? 800) / (meta.width ?? 600)) * 600);
  console.log(`   –  ${file.name} (CDN)`);

  return {
    id:          file.id,
    type:        'image',
    // lh3 resizes static images and serves animated GIFs untouched.
    img:         `https://lh3.googleusercontent.com/d/${file.id}=w1600`,
    url:         `https://drive.google.com/file/d/${file.id}/view`,
    height:      displayHeight,
    description: file.description ?? '',
  };
}

/** Route a media file to the right processor. */
async function processMediaFile(file) {
  return isVideo(file) ? processVideoFile(file) : processImageFile(file);
}

/** List all files in a given Drive folder. */
async function listFiles(folderId) {
  const listUrl = new URL('https://www.googleapis.com/drive/v3/files');
  listUrl.searchParams.set('q', `'${folderId}' in parents and trashed = false`);
  listUrl.searchParams.set('key', API_KEY);
  listUrl.searchParams.set('fields', 'nextPageToken,files(id,name,description,mimeType,imageMediaMetadata,videoMediaMetadata)');
  listUrl.searchParams.set('orderBy', 'createdTime desc');
  listUrl.searchParams.set('pageSize', '1000');

  const files = [];
  let pageToken;
  do {
    if (pageToken) listUrl.searchParams.set('pageToken', pageToken);
    const res = await fetch(listUrl.toString());
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Drive API list error ${res.status}: ${msg}`);
    }
    const data = await res.json();
    files.push(...(data.files ?? []));
    pageToken = data.nextPageToken;
  } while (pageToken);

  return files;
}

async function main() {
  console.log('📁  Fetching Google Drive gallery…\n');

  // ── 1. List everything in the root folder ────────────────────────────────
  const rootFiles = await listFiles(FOLDER_ID);

  const rootMedia    = rootFiles.filter(isMedia);
  const subfolders   = rootFiles.filter(f => f.mimeType === 'application/vnd.google-apps.folder');

  console.log(`   Found ${rootMedia.length} root media file(s) and ${subfolders.length} subfolder(s)\n`);

  // ── 2. Process root media (no folder group) ──────────────────────────────
  const groups = [];

  if (rootMedia.length > 0) {
    console.log('📷  Root media:');
    const items = [];
    for (const file of rootMedia) {
      const item = await processMediaFile(file);
      if (item) items.push(item);
    }
    // Root media have no folder label — section is null
    if (items.length > 0) groups.push({ folder: null, items });
  }

  // ── 3. Process each subfolder ─────────────────────────────────────────────
  for (const folder of subfolders) {
    console.log(`\n📂  Subfolder: "${folder.name}" (description: "${folder.description ?? ''}")`);
    const folderFiles  = await listFiles(folder.id);
    const folderMedia  = folderFiles.filter(isMedia);
    console.log(`   Found ${folderMedia.length} media file(s)`);

    const items = [];
    for (const file of folderMedia) {
      const item = await processMediaFile(file);
      if (item) items.push(item);
    }

    if (items.length > 0) {
      groups.push({
        folder: {
          id:          folder.id,
          name:        folder.name,
          description: folder.description ?? '',
        },
        items,
      });
    }
  }

  // ── 4. Write gallery-items.ts ─────────────────────────────────────────────
  const totalItems = groups.reduce((n, g) => n + g.items.length, 0);

  const output = `// Auto-generated by scripts/fetch-gallery.mjs — do not edit manually
// Run \`npm run fetch-gallery\` to refresh from Google Drive.

export interface GalleryItem {
  id:          string;
  type:        'image' | 'video';
  img:         string;
  url:         string;
  height:      number;
  description: string;
}

export interface GalleryFolder {
  id:          string;
  name:        string;
  description: string;
}

export interface GalleryGroup {
  /** null = root-level images (no section header) */
  folder: GalleryFolder | null;
  items:  GalleryItem[];
}

export const galleryGroups: GalleryGroup[] = ${JSON.stringify(groups, null, 2)};

/** Flat list of all items (for backwards compatibility). */
export const galleryItems: GalleryItem[] = galleryGroups.flatMap(g => g.items);
`;

  writeFileSync(join(ROOT, 'src', 'data', 'gallery-items.ts'), output);
  console.log(`\n✅  gallery-items.ts written with ${groups.length} group(s) / ${totalItems} item(s)`);
}

main().catch(err => {
  console.error('❌ ', err.message);
  process.exit(1);
});
