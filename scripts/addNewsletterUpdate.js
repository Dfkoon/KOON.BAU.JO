// Script to add University Newsletter announcement to Firebase
// Run this with: node scripts/addNewsletterUpdate.js

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Firebase configuration (same as in your project)
const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Newsletter announcement data
const newsletterUpdate = {
    title: {
        ar: "النشرة الإخبارية للربع الرابع للعام 2025",
        en: "Newsletter for Q4 2025"
    },
    content: {
        ar: `<p><strong>يسر دائرة الإعلام وبالتعاون مع مركز اللغات الإعلان عن صدور النشرة الإخبارية باللغتين العربية والإنجليزية للربع الرابع لشهور أيلول، تشرين الأول، تشرين الثاني، كانون الأول</strong></p>
<p>لمتابعة النشرة الإخبارية، يُرجى زيارة الرابط التالي:</p>
<p><a href="https://www.bau.edu.jo/News/NewsDetail.aspx?news_id=16905" target="_blank" rel="noopener noreferrer">https://www.bau.edu.jo/News/NewsDetail.aspx?news_id=16905</a></p>
<p style="margin-top: 20px;"><strong>#جامعة_البلقاء_التطبيقية</strong></p>
<p><strong>#دائرة_الإعلام</strong></p>`,
        en: `<p><strong>The Media Department, in cooperation with the Languages Center, is pleased to announce the release of the newsletter in both Arabic and English for the fourth quarter covering September, October, November, and December</strong></p>
<p>To view the newsletter, please visit the following link:</p>
<p><a href="https://www.bau.edu.jo/News/NewsDetail.aspx?news_id=16905" target="_blank" rel="noopener noreferrer">https://www.bau.edu.jo/News/NewsDetail.aspx?news_id=16905</a></p>
<p style="margin-top: 20px;"><strong>#Al_Balqa_Applied_University</strong></p>
<p><strong>#Media_Department</strong></p>`
    },
    badge: {
        ar: "جديد",
        en: "New"
    },
    badgeColor: "#1976d2", // Blue color for official news
    icon: "info",
    category: "general",
    date: "2026-01-02",
    createdAt: serverTimestamp()
};

// Add the update to Firebase
async function addNewsletter() {
    try {
        const docRef = await addDoc(collection(db, 'updates'), newsletterUpdate);
        console.log('✅ Newsletter announcement added successfully with ID:', docRef.id);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error adding newsletter announcement:', error);
        process.exit(1);
    }
}

addNewsletter();
