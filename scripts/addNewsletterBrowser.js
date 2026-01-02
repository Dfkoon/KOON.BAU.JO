/**
 * Simple utility to add newsletter update directly to Firebase
 * Usage: Open browser console on http://localhost:3000
 * Copy and paste this entire code and run it
 */

// Newsletter data
const newsletterData = {
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
    badgeColor: "#1976d2",
    icon: "info",
    category: "general",
    date: "2026-01-02"
};

// Add to Firebase using the updatesService
import { updatesService } from './src/services/updatesService.js';

async function addNewsletter() {
    try {
        const success = await updatesService.addUpdate(newsletterData);
        if (success) {
            console.log('✅ Newsletter added successfully!');
            console.log('Refresh the page to see the new announcement.');
        } else {
            console.log('❌ Failed to add newsletter');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run the function
addNewsletter();
