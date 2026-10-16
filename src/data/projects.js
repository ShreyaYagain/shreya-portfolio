export const projects = [
    {
        id: 'memory-controller',
        channel: 'CH1',
        year: '2025',
        title: 'Hardware-Based Memory Controller with DBI',
        tags: ['Verilog HDL', 'Digital Design'],
        bullets: [
            'Designed a memory controller implementing Data Bus Inversion (DBI) to reduce switching activity and lower power consumption during data transmission.',
            'Developed and simulated the architecture using System Verilog to analyze performance and bit transition reduction.',
        ],
        stats: [
            { label: 'BIT TRANSITION ↓', value: '35%' },
            { label: 'POWER ↓', value: '28%' },
        ],
        metrics: {
            bitTransitionReduction: 35,
            powerReduction: 28,
        },
        github: 'https://github.com/ShreyaYagain/DBI-memory-controller',
    },
    {
        id: 'hyperkalemia-monitor',
        channel: 'CH2',
        year: '2026',
        status: 'ongoing',
        title: 'Wearable Hyperkalemia Monitor',
        tags: ['ESP32', 'AD8232', 'Python', 'Machine Learning', 'C++'],
        bullets: [
            'Built a wearable ECG device (AD8232 + ESP32) streaming live signals over Wi-Fi to a Python classifier.',
            'Flags hyperkalemia risk from ECG features on a live dashboard; extending it to detect hypokalemia.',
        ],
    },
    {
        id: 'portfolio-website',
        channel: 'CH3',
        year: '2026',
        title: 'Dual-Mode Personal Portfolio Website',
        tags: ['React', 'Vite', 'GSAP', 'Framer Motion'],
        bullets: [
            'Designed and developed a responsive dual-sided portfolio showcasing both technical projects and creative artwork.',
            'Implemented 3D card-flip toggle with interactive electronics elements and editorial scrapbook design.',
        ],
        github: 'https://github.com/ShreyaYagain/shreya-portfolio',
    },
    {
        id: 'interview-os',
        channel: 'CH4',
        year: '2026',
        title: 'Interview OS',
        tags: ['React.js', 'Node.js', 'SQL', 'AI'],
        bullets: [
            'Built an AI-powered interview preparation platform featuring DSA, SQL, Low-Level Design (LLD), High-Level Design (HLD), HR interview preparation, and resume review modules.',
            'Designed an end-to-end learning platform to provide structured placement preparation for students without access to dedicated campus training resources.',
        ],
        github: 'https://github.com/ShreyaYagain/InterviewOS',
        website: 'https://interview-os-sooty.vercel.app',
    },
    {
        id: 'assistive-glove',
        channel: 'CH5',
        year: '2025',
        title: 'Gesture Controlled Assistive Communication Glove',
        tags: ['Arduino Uno', 'ESP32', 'C++'],
        bullets: [
            'Built a low-cost gesture-recognition glove using copper contact plates instead of flex sensors, preserving hand mobility at a fraction of the cost.',
            'Integrated Arduino and ESP32 for real-time audio and LCD feedback, with Wi-Fi data logging capabilities.',
        ],
        github: 'https://github.com/ShreyaYagain/assistive-communicative-glove/tree/main',
    },
];

export default projects;
