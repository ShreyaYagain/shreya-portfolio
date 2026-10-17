export const toolsData = {
    digital: {
        id: 'digital',
        title: 'digital',
        tagline: 'mobility to sketch freely and iterate rapidly',
        tools: [
            { id: 'ipad', name: 'iPad', icon: 'tablet', tilt: -1 },
            { id: 'ibispaintx', name: 'IbisPaintX', icon: 'stylus', tilt: 1.5 },
        ],
    },
    traditional: {
        id: 'traditional',
        title: 'traditional',
        tagline: 'detailed anatomical studies, rough drafts, realism',
        tools: [
            { id: 'graphite', name: 'Graphite', icon: 'pencil', tilt: 1 },
            { id: 'pencil-sketching', name: 'Pencil sketching', icon: 'sketch', tilt: -1.2 },
            { id: 'fineliner', name: 'Fineliner', icon: 'fineliner', tilt: 1.2 },
            { id: 'charcoal', name: 'Charcoal', icon: 'charcoal', tilt: -0.8 },
            { id: 'alcohol-markers', name: 'Alcohol markers', icon: 'marker', tilt: 1 },
        ],
    },
};

export const tools = toolsData;
export default toolsData;
