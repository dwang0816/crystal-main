import type { DraggableItem, FeaturedProject } from '../types/index';
import { ClockWidget } from '../components/widgets/ClockWidget';
import { MemoWidget } from '../components/widgets/MemoWidget';
import { ImageWidget } from '../components/widgets/ImageWidget';
import { ExperienceWidget } from '../components/widgets/ExperienceWidget';
import crystalIcelandImg from '../assets/crystal_in_iceland.jpg';

export const SECTIONS = [
    { id: 'crystal-cho', name: 'Home' },
    { id: 'featured', name: 'Featured' },
    { id: 'about-me', name: 'About Me' },
] as const;

export const homeFiles: DraggableItem[] = [
    { id: 'intro-text', name: 'memo', type: 'widget', widget: <MemoWidget content={`Hi, I'm Crystal — a Product Designer building\n*efficient, impactful *experiences\nwith *intention.*\n\nPreviously @Xometry`} />, pos: { left: '3%', top: '9%' } },
    { id: 'crystal-iceland', name: 'crystal_in_iceland.jpg', type: 'widget', widget: <ImageWidget src={crystalIcelandImg} alt="Crystal in Iceland" />, showLabel: true, pos: { left: '35%', top: '28%' } },
    { id: 'clock-widget', name: 'clock', type: 'widget', widget: <ClockWidget />, pos: { right: '2%', top: '9%' } },
    { id: 'experience-widget', name: 'experience', type: 'widget', widget: <ExperienceWidget />, showLabel: true, pos: { right: '5%', bottom: '12%' } },

    {
        id: 'applications-folder', name: 'applications', type: 'folder', pos: { left: '11%', top: '50%' },
        items: [
            <img src="https://ik.imagekit.io/cch0/applications/Figma-logo.svg?updatedAt=1772659997879" alt="Figma" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 6 }} />,
            <img src="https://ik.imagekit.io/cch0/applications/Adobe_Creative_Cloud_rainbow_icon.svg.png?updatedAt=1772660005522" alt="Adobe Creative Cloud" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 6 }} />,
            <img src="https://ik.imagekit.io/cch0/applications/notion.png?updatedAt=1772660125350" alt="Notion" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 6 }} />,
        ]
    },
    {
        id: 'gadgets-folder', name: 'gadgets', type: 'folder', pos: { left: '61%', top: '30%' },
        items: [
            <img src="https://ik.imagekit.io/cch0/images/headphones.png" alt="headphones" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }} />,
            <img src="https://ik.imagekit.io/cch0/images/keyboard.png" alt="keyboard" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }} />,
            <img src="https://ik.imagekit.io/cch0/images/kindle.png" alt="kindle" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }} />,
        ]
    },
];

export const featuredProjects: FeaturedProject[] = [
    {
        id: 'project-1',
        title: 'Xometry WorkCenter',
        description: 'Mobile operations platform for manufacturers — from quote to payment.',
        images: [
            'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        color: '#FFF0E8',
        titleColor: '#C2522B',
        link: '/projects/xometry-workcenter',
    },
    {
        id: 'project-2',
        title: 'Project Two',
        description: 'A short description of what this project was about and the impact it had.',
        images: [
            'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        color: '#E8EFFF',
        titleColor: '#3451B2',
    },
    {
        id: 'project-3',
        title: 'Project Three',
        description: 'A short description of what this project was about and the impact it had.',
        images: [
            'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        color: '#F3E8FF',
        titleColor: '#6D28D9',
    },
    {
        id: 'project-4',
        title: 'Project Four',
        description: 'A short description of what this project was about and the impact it had.',
        images: [
            'https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
        color: '#FEF9C3',
        titleColor: '#92400E',
    },
];
