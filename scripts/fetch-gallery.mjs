#!/usr/bin/env node
/**
 * fetch-gallery.mjs
 * Fetches images from a Google Drive folder and generates src/data/gallery-items.ts.
 * Supports subfolder grouping: images in subfolders are grouped under the folder's description.
 * Images in the root folder use their own description as a caption.
 * Run: npm run fetch-gallery
 * Requires: GOOGLE_API_KEY in .env
 */

import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

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

const galleryDir = join(ROOT, 'public', 'gallery');
mkdirSync(galleryDir, { recursive: true });

/** Download an image file (if not already cached) and return a gallery item. */
async function processImageFile(file) {
  const ext      = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const filename = `${file.id}.${ext}`;
  const dest     = join(galleryDir, filename);

  if (existsSync(dest)) {
    console.log(`   –  ${file.name} (already downloaded)`);
  } else {
    const dlUrl = `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${API_KEY}`;
    const dlRes = await fetch(dlUrl);

    if (!dlRes.ok) {
      console.warn(`   ⚠  Skipping "${file.name}" (${dlRes.status})`);
      return null;
    }

    const buffer = await dlRes.arrayBuffer();
    writeFileSync(dest, Buffer.from(buffer));
    console.log(`   ✓  ${file.name} (downloaded)`);
  }

  const imgH = file.imageMediaMetadata?.height ?? 800;
  const imgW = file.imageMediaMetadata?.width  ?? 600;
  const displayHeight = Math.round((imgH / imgW) * 600);

  return {
    id:          file.id,
    img:         `/gallery/${filename}`,
    url:         `https://drive.google.com/file/d/${file.id}/view`,
    height:      displayHeight,
    description: file.description ?? '',
  };
}

/** List all files in a given Drive folder. */
async function listFiles(folderId) {
  const listUrl = new URL('https://www.googleapis.com/drive/v3/files');
  listUrl.searchParams.set('q', `'${folderId}' in parents and trashed = false`);
  listUrl.searchParams.set('key', API_KEY);
  listUrl.searchParams.set('fields', 'files(id,name,description,mimeType,imageMediaMetadata)');
  listUrl.searchParams.set('orderBy', 'createdTime desc');
  listUrl.searchParams.set('pageSize', '100');

  const res = await fetch(listUrl.toString());
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Drive API list error ${res.status}: ${msg}`);
  }
  const { files = [] } = await res.json();
  return files;
}

async function main() {
  console.log('📁  Fetching Google Drive gallery…\n');

  // ── 1. List everything in the root folder ────────────────────────────────
  const rootFiles = await listFiles(FOLDER_ID);

  const rootImages   = rootFiles.filter(f => f.mimeType?.startsWith('image/'));
  const subfolders   = rootFiles.filter(f => f.mimeType === 'application/vnd.google-apps.folder');

  console.log(`   Found ${rootImages.length} root image(s) and ${subfolders.length} subfolder(s)\n`);

  // ── 2. Process root images (no folder group) ─────────────────────────────
  const groups = [];

  if (rootImages.length > 0) {
    console.log('📷  Root images:');
    const items = [];
    for (const file of rootImages) {
      const item = await processImageFile(file);
      if (item) items.push(item);
    }
    // Root images have no folder label — section is null
    if (items.length > 0) groups.push({ folder: null, items });
  }

  // ── 3. Process each subfolder ─────────────────────────────────────────────
  for (const folder of subfolders) {
    console.log(`\n📂  Subfolder: "${folder.name}" (description: "${folder.description ?? ''}")`);
    const folderFiles  = await listFiles(folder.id);
    const folderImages = folderFiles.filter(f => f.mimeType?.startsWith('image/'));
    console.log(`   Found ${folderImages.length} image(s)`);

    const items = [];
    for (const file of folderImages) {
      const item = await processImageFile(file);
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
