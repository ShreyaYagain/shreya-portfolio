// src/data/artworks.js
// Centralized artwork portfolio for the artist mode gallery

const OPTIMIZED_FILES = new Set([
    'sketch-05.jpg',
    'sketch-07.jpg',
    'sketch-11.jpg',
    'sketch-12.jpg',
    'sketch-14.jpeg',
    'sketch-15.jpeg',
    'sketch-16.jpeg',
    'sketch-17.jpeg',
    'sketch-18.jpeg',
    'sketch-20.jpeg',
    'sketch-21.jpeg',
    'sketch-22.jpeg',
]);

export const rawArtworks = [
    { id: 1, file: 'sketch-01.jpg', title: 'Peek', medium: 'Charcoal' },
    { id: 2, file: 'sketch-02.jpg', title: 'Emotion Through Eyes', medium: 'Charcoal' },
    { id: 3, file: 'sketch-03.jpg', title: 'Surprise', medium: 'Charcoal' },
    { id: 4, file: 'sketch-04.jpg', title: 'Let Down', medium: 'Charcoal' },
    { id: 5, file: 'sketch-05.jpg', title: 'Fallen Grace', medium: 'Charcoal' },
    { id: 6, file: 'sketch-06.jpg', title: 'Crush in Spirit', medium: 'Charcoal' },
    { id: 7, file: 'sketch-07.jpg', title: 'Capture the Moment', medium: 'Charcoal' },
    { id: 8, file: 'sketch-08.jpg', title: 'Vantage Point', medium: 'Charcoal' },
    { id: 9, file: 'sketch-09.jpg', title: 'Jisoo', medium: 'Charcoal' },
    { id: 10, file: 'sketch-10.jpg', title: 'Nezuko Kamado', medium: 'Charcoal' },
    { id: 11, file: 'sketch-11.jpg', title: 'The Tears of Āryāvarta', medium: 'Charcoal' },
    { id: 12, file: 'sketch-12.jpg', title: 'Confidence', medium: 'Charcoal' },
    { id: 13, file: 'sketch-13.jpg', title: 'Lily', medium: 'Fineliner pen' },
    { id: 14, file: 'sketch-14.jpeg', title: 'Party of One', medium: 'Alcohol marker & pencil sketching' },
    { id: 15, file: 'sketch-15.jpeg', title: 'V', medium: 'Pencil sketching' },
    { id: 16, file: 'sketch-16.jpeg', title: 'Mina', medium: 'Charcoal' },
    { id: 17, file: 'sketch-17.jpeg', title: 'Who Am I', medium: 'Fineliner pen' },
    { id: 18, file: 'sketch-18.jpeg', title: 'Miffy', medium: 'Fineliner pen' },
    { id: 19, file: 'sketch-19.jpeg', title: 'Turnaround', medium: 'Fineliner pen' },
    { id: 20, file: 'sketch-20.jpeg', title: 'Heartbreak', medium: 'Pencil sketching' },
    { id: 21, file: 'sketch-21.jpeg', title: 'On My Mind', medium: 'Pencil sketching' },
    { id: 22, file: 'sketch-22.jpeg', title: 'Extraterrestrial', medium: 'Pencil sketching' },
];

export const artworks = rawArtworks.map(item => ({
    ...item,
    src: OPTIMIZED_FILES.has(item.file) ? `/sketches/optimized/${item.file}` : `/sketches/${item.file}`,
    originalSrc: `/sketches/${item.file}`,
    alt: `${item.medium} drawing titled ${item.title}`,
}));
