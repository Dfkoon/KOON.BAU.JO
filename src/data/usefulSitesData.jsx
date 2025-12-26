import React from 'react';
import {
    Slideshow,
    Description,
    School,
    Brush,
    TextFields,
    AutoStories,
    VideoLibrary,
    ImageSearch,

} from '@mui/icons-material';

export const usefulSites = [
    {
        category: 'presentationsCategory',
        items: [
            {
                name: 'Canva',
                description: 'canvaDesc',
                url: 'https://www.canva.com',
                icon: <Brush fontSize="large" />
            },
            {
                name: 'Slidesgo',
                description: 'slidesgoDesc',
                url: 'https://slidesgo.com',
                icon: <Slideshow fontSize="large" />
            },
            {
                name: 'PowerPoint Online',
                description: 'pptDesc',
                url: 'https://www.microsoft.com/en-us/microsoft-365/powerpoint',
                icon: <Description fontSize="large" />
            }
        ]
    },
    {
        category: 'summariesCategory',
        items: [
            {
                name: 'Quillbot',
                description: 'quillbotDesc',
                url: 'https://quillbot.com',
                icon: <TextFields fontSize="large" />
            },
            {
                name: 'ChatPDF',
                description: 'chatpdfDesc',
                url: 'https://www.chatpdf.com',
                icon: <AutoStories fontSize="large" />
            },
            {
                name: 'SmallPDF',
                description: 'smallpdfDesc',
                url: 'https://smallpdf.com',
                icon: <Description fontSize="large" />
            }
        ]
    },
    {
        category: 'coursesCategory',
        items: [
            {
                name: 'Coursera',
                description: 'courseraDesc',
                url: 'https://www.coursera.org',
                icon: <School fontSize="large" />
            },
            {
                name: 'Edraak',
                description: 'edraakDesc',
                url: 'https://www.edraak.org',
                icon: <VideoLibrary fontSize="large" />
            },
            {
                name: 'Udemy',
                description: 'udemyDesc',
                url: 'https://www.udemy.com',
                icon: <School fontSize="large" />
            }
        ]
    },
    {
        category: 'designCategory',
        items: [
            {
                name: 'Freepik',
                description: 'freepikDesc',
                url: 'https://www.freepik.com',
                icon: <ImageSearch fontSize="large" />
            },
            {
                name: 'Unsplash',
                description: 'unsplashDesc',
                url: 'https://unsplash.com',
                icon: <ImageSearch fontSize="large" />
            },
            {
                name: 'Flaticon',
                description: 'flaticonDesc',
                url: 'https://www.flaticon.com',
                icon: <Brush fontSize="large" />
            }
        ]
    },

];
