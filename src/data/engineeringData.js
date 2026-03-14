export const projects = [
    {
        id: 'memory-controller',
        channel: 'CH1',
        title: 'Hardware-Based Memory Controller with DBI',
        tech: ['Verilog HDL', 'Digital Design'],
        year: '2025',
        bullets: [
            'Designed a memory controller implementing Data Bus Inversion (DBI) to reduce switching activity and lower power consumption during data transmission.',
            'Developed and simulated the architecture using System Verilog to analyze performance and bit transition reduction.',
        ],
        metrics: {
            bitTransitionReduction: 35,
            powerReduction: 28,
        },
    },
    {
        id: 'portfolio-website',
        channel: 'CH2',
        title: 'Dual-Mode Personal Portfolio Website',
        tech: ['React', 'Vite', 'GSAP', 'Framer Motion'],
        year: '2026',
        bullets: [
            'Designed and developed a responsive dual-sided portfolio showcasing both technical projects and creative artwork.',
            'Implemented 3D card-flip toggle with interactive electronics elements and editorial scrapbook design.',
        ],
        metrics: null,
    },
];

export const skills = {
    'Hardware & Embedded': ['Arduino', 'Verilog HDL', 'Digital System Design', 'Embedded Basics'],
    'Programming Languages': ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
    'Databases': ['MySQL'],
    'Web Development': ['HTML', 'CSS', 'React.js', 'Node.js', 'Bootstrap'],
    'Tools & Platforms': ['Git', 'GitHub', 'VS Code', 'MS Excel', 'LaTeX', 'Figma'],
};

export const education = [
    {
        id: 'rvce',
        institution: 'RV College of Engineering',
        degree: 'B.E. Electronics and Communication (CGPA: 8.5/10)',
        period: '2024 – 2028',
        location: 'Bengaluru, India',
    },
    {
        id: 'narayana',
        institution: 'Narayana PU College',
        degree: 'Class XII — 90%',
        period: '2023 – 2024',
        location: 'Bengaluru, India',
    },
    {
        id: 'nhv',
        institution: 'National Hill View Public School',
        degree: 'Class X — 90%',
        period: '2021 – 2022',
        location: 'Bengaluru, India',
    },
];

export const activities = [
    {
        id: 'chimera',
        channel: 'A',
        org: 'Chimera Formula E Student Team',
        role: 'Management Division Member',
        period: '2024 – Present',
        location: 'RVCE',
        bullets: [
            'Contributed to team coordination, communications, and project organisation for a student-led electric vehicle initiative.',
            'Collaborated across technical and management teams to support execution of large-scale engineering projects.',
        ],
    },
    {
        id: 'sattva',
        channel: 'B',
        org: 'Sattva Art Club',
        role: 'Social Media Head',
        period: '2025 – Present',
        location: 'RVCE',
        bullets: [
            'Led creative strategy and content design to enhance digital presence and student engagement.',
            'Designed promotional materials and managed social media campaigns to increase visibility.',
        ],
    },
];

export const contact = {
    email: 'shreya.yagain@gmail.com',
    linkedin: 'https://linkedin.com/in/shreya-yagain-75a787384',
    github: 'https://github.com/ShreyaYagain',
    instagram: null,
};
