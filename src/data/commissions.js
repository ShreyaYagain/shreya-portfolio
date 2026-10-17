import { contact } from './engineeringData';
import { instagram } from './artData';

export const commissionsData = {
    availability: 'open',
    whatIMake: 'digital lyric videos, hand-drawn frame by frame.',
    delivery: 'MP4, 4:3 aspect ratio',
    steps: [
        'message me by email or on instagram',
        'i give you a quote based on your requirements',
        'you pay an advance',
        'i send a draft preview and make the changes you ask for',
        'final delivery, exactly how you want it',
    ],
    pricingNote:
        'pricing is custom for every commission. it depends on how difficult the song is and how long a video you want.',
    needFromYou: [
        'name of the song',
        'spotify or youtube link to the song',
        'exact timestamps of the part you want the video for',
        'mood of the song',
        'who the video is for, or the occasion if it is for one',
        'where it will be used',
        'any other requirements',
    ],
    email: contact?.email || 'shreya.yagain@gmail.com',
    instagramUrl: instagram?.url || 'https://instagram.com/shreyeahfied',
};

export default commissionsData;
