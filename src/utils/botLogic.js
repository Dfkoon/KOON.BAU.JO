import { courseData, serviceKeys, faqs, greetings, majorKeywords } from '../data/botData';

export const getSmartResponse = (text, t, language) => {
    const lowerText = text.toLowerCase();

    // 0. Greetings & Small Talk
    const greetingMatch = greetings.find(g => g.keywords.some(k => lowerText.includes(k)));
    if (greetingMatch) {
        return { text: language === 'ar' ? greetingMatch.responseAr : greetingMatch.responseEn };
    }

    // 0.5. Specific Major Plans (e.g. "Investagtions Plan")
    const majorMatch = majorKeywords.find(m => m.keywords.some(k => lowerText.includes(k)));
    if (majorMatch && (lowerText.includes('plan') || lowerText.includes('خطه') || lowerText.includes('خطة'))) {
        const majorName = language === 'ar' ? majorMatch.titleAr : majorMatch.titleEn;
        return {
            text: language === 'ar'
                ? `يبدو أنك تبحث عن خطة تخصص **${majorName}**. هل تريد الذهاب لصفحة الخطط؟`
                : `It seems you are looking for the **${majorName}** plan. Do you want to go to the Plans page?`,
            action: { path: '/plans' }
        };
    }

    // 1. Search Courses
    // We search through the KEYS of courseData.
    const courseMatch = Object.keys(courseData).find(course =>
        course.toLowerCase().includes(lowerText) || lowerText.includes(course.toLowerCase())
    );

    if (courseMatch) {
        const data = courseData[courseMatch];
        const isAr = language === 'ar';

        let responseText = isAr
            ? `معلومات عن مادة: ${courseMatch}\n`
            : `Information about course: ${courseMatch}\n`;

        if (data.prerequisite && data.prerequisite !== "لا يوجد") {
            responseText += isAr
                ? `📝 المتطلب السابق: ${data.prerequisite}\n`
                : `📝 Prerequisite: ${data.prerequisite}\n`;
        } else {
            responseText += isAr ? `✅ لا يوجد متطلب سابق.\n` : `✅ No prerequisite.\n`;
        }

        if (data.opens && data.opens.length > 0) {
            responseText += isAr
                ? `🔓 تفتح المواد التالية: ${data.opens.join('، ')}`
                : `🔓 Unlocks: ${data.opens.join(', ')}`;
        } else {
            responseText += isAr ? `⛔ لا تفتح مواد أخرى.` : `⛔ Doesn't unlock other courses.`;
        }

        return { text: responseText };
    }

    // 2. Search Services
    const serviceMatch = serviceKeys.find(s =>
        t(s.title).toLowerCase().includes(lowerText) ||
        t(s.desc).toLowerCase().includes(lowerText)
    );

    if (serviceMatch) {
        const title = t(serviceMatch.title);
        const desc = t(serviceMatch.desc);
        const isAr = language === 'ar';

        return {
            text: isAr
                ? `خدمة "${title}" تتيح لك ${desc}. هل ترغب بزيارتها؟`
                : `The "${title}" service allows you to ${desc}. Would you like to visit?`,
            action: { path: serviceMatch.link.startsWith('http') ? null : serviceMatch.link, external: serviceMatch.link }
        };
    }

    // 3. Search FAQs
    const faqMatch = faqs.find(f => f.keywords.some(k => lowerText.includes(k.toLowerCase())));
    if (faqMatch) {
        return {
            text: language === 'ar' ? faqMatch.answerAr : faqMatch.answerEn
        };
    }

    // 4. General Navigation (Fallback)
    if (lowerText.includes('plan') || lowerText.includes('خطط')) return { text: t('botSearching'), action: { path: '/plans' } };
    if (lowerText.includes('exam') || lowerText.includes('امتحان')) return { text: t('botSearching'), action: { path: '/exams' } };

    return null; // No match found
};
