import type { DraggableItem, FeaturedProject, InternshipPost } from '../types/index';
import { XometryHero } from '../components/case-hero/XometryHero';
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
    { id: 'intro-text', name: 'memo', type: 'widget', widget: <MemoWidget content={`Hi, I'm Krystal — a Product Designer building\n*efficient, impactful *experiences\nwith *intention.*\n\nPreviously @Xometry`} />, pos: { left: '3%', top: '9%' } },
    { id: 'crystal-iceland', name: 'crystal_in_iceland.jpg', type: 'widget', widget: <ImageWidget src={crystalIcelandImg} alt="Krystal in Iceland" />, showLabel: true, pos: { left: '35%', top: '28%' } },
    { id: 'clock-widget', name: 'clock', type: 'widget', widget: <ClockWidget />, pos: { right: '2%', top: '9%' } },
    { id: 'experience-widget', name: 'experience', type: 'widget', widget: <ExperienceWidget />, showLabel: true, pos: { right: '5%', bottom: '12%' } },

    {
        id: 'applications-folder', name: 'applications', type: 'folder', pos: { left: '11%', top: '50%' },
        items: [
            <img src="https://ik.imagekit.io/cch0/applications/Figma-logo.svg?updatedAt=1772659997879" alt="Figma" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 6 }} />,
            <img src="https://ik.imagekit.io/cch0/applications/Adobe_Creative_Cloud_rainbow_icon.svg.png?updatedAt=1772660005522" alt="Adobe Creative Cloud" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 6 }} />,
            <img src="https://ik.imagekit.io/cch0/applications/notion.png?updatedAt=1772660125350" alt="Notion" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 6 }} />,
            <img src="/gcal-logo.png" alt="Google Calendar" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 6 }} />,
            <img src="/discord-logo.webp" alt="Discord" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 6 }} />,
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

export const internshipPosts: InternshipPost[] = [
    {
        id: 'vt-it',
        title: 'VT Division of IT',
        slug: 'vt-division-it',
        period: 'Sep 2025 – Present',
        subtitle: 'learning how small changes scale',
        body: [
            'When I first started working with Virginia Tech\'s Division of IT, I thought design impact came from big changes—new layouts, new systems, full redesigns. But most of the work didn\'t look like that.',
            'I was working on internal tools used by students and staff, where even small updates had to fit into larger, existing systems. Through user research and feedback, I started noticing patterns—confusing navigation, unclear labels, friction in everyday tasks.',
            'Instead of redesigning everything, I focused on identifying the smallest changes that could make the biggest difference. Restructuring information, clarifying language, and improving flows that users interacted with daily.',
            'What changed wasn\'t just the interface, but how people moved through it. Tasks became quicker, decisions clearer, and support requests decreased because things simply made more sense.',
            'This experience shifted how I think about impact. It\'s not always about reinventing systems—it\'s about understanding them deeply enough to improve them in meaningful, realistic ways.',
        ],
    },
    {
        id: 'xometry',
        title: 'Xometry',
        slug: 'xometry-experience',
        period: 'Jun 2025 – Mar 2026',
        subtitle: 'designing for people who don\'t have time to think about design',
        body: [
            'At Xometry, I worked on the WorkCenter mobile app, used by manufacturers to manage jobs from quote to payment. These weren\'t typical "app users"—they were people working on shop floors, managing multiple jobs, and making decisions quickly.',
            'Through user interviews, I saw how much pressure these workflows carried. Users didn\'t have time to navigate complex interfaces or figure things out—they needed clarity immediately.',
            'As the sole designer on my team, I focused on simplifying these workflows. Restructuring how job information was presented, making actions more obvious, and reducing the number of steps needed to complete key tasks.',
            'I worked closely with engineers to bring these designs into production, making sure what we built actually held up in real use. I also led stakeholder discussions to align on what mattered most to improve.',
            'The result was a mobile experience that supported faster decisions and reduced friction in day-to-day operations.',
            'This project reinforced something important: good design isn\'t about adding more—it\'s about removing what gets in the way.',
        ],
    },
    {
        id: 'perpetual',
        title: 'Perpetual',
        slug: 'perpetual-experience',
        period: 'May 2024 – Dec 2024',
        subtitle: 'designing when speed matters more than perfection',
        body: [
            'At Perpetual, everything moved fast. Timelines were tight, expectations were high, and there wasn\'t always time to explore every possible direction.',
            'I worked on launching an AI startup website, where design decisions had to be made quickly and communicated clearly to developers. At the same time, I was conducting UX audits—identifying issues in existing products and figuring out what actually mattered to fix.',
            'One of the biggest shifts for me was learning how to prioritize. Not everything needs to be perfect—what matters is what moves the product forward. I started focusing on clarity, making sure users understood what to do, where to go, and why it mattered.',
            'By simplifying flows and aligning closely with developers, we were able to move from ideas to implementation quickly, without losing intent.',
            'This experience made me more decisive. It taught me how to design with urgency, while still being thoughtful about the details that actually impact users.',
        ],
    },
];

export const featuredProjects: FeaturedProject[] = [
    {
        id: 'project-1',
        title: 'Xometry WorkCenter',
        hmw: 'How might we help manufacturers manage jobs without being tied to their desks?',
        tags: ['Case Study'],
        tools: [
            { src: 'https://ik.imagekit.io/cch0/applications/Figma-logo.svg?updatedAt=1772659997879', alt: 'Figma' },
        ],
        image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
        hero: <XometryHero />,
        link: '/projects/xometry-workcenter',
    },
    {
        id: 'project-3',
        title: 'Dime',
        hmw: 'How might we help users always choose the right card at checkout?',
        tags: ['Case Study'],
        tools: [
            { src: 'https://ik.imagekit.io/cch0/applications/Figma-logo.svg?updatedAt=1772659997879', alt: 'Figma' },
        ],
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        link: '/projects/dime',
    },
];
