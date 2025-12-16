import { universityRequirements, universityElectives, collegeRequirements, majorRequirements, supportRequirements, labs, remedial } from '../data/coursesData';
import { updatesData } from '../data/updatesData';
// We might import other data files if available, e.g. plansData, quizData

const searchablePages = [
    { title: 'صفحة الرئيسية', path: '/', keywords: ['home', 'main', 'start'] },
    { title: 'المواد الدراسية', path: '/materials', keywords: ['materials', 'courses', 'subjects', 'study'] },
    { title: 'الخطط الدراسية', path: '/plans', keywords: ['plans', 'study plan', 'curriculum'] },
    { title: 'حساب المعدل', path: '/gpa-calculator', keywords: ['gpa', 'calculator', 'grades', 'average'] },
    { title: 'التقويم الجامعي', path: '/calendar', keywords: ['calendar', 'dates', 'schedule'] },
    { title: 'نظام العلامات', path: '/grading-system', keywords: ['grades', 'grading', 'marks'] },
    { title: 'الامتحانات', path: '/exams', keywords: ['exams', 'tests', 'finals', 'midterm'] },
    { title: 'أخبار وتحديثات', path: '/updates', keywords: ['news', 'updates', 'announcements'] },
];

export const searchContent = (query) => {
    if (!query || query.trim() === '') return [];

    const lowerQuery = query.toLowerCase();
    const results = [];

    // 1. Search Pages
    searchablePages.forEach(page => {
        if (page.title.toLowerCase().includes(lowerQuery) || page.keywords.some(k => k.includes(lowerQuery))) {
            results.push({
                type: 'Page',
                title: page.title,
                link: page.path,
                description: 'صفحة عامة'
            });
        }
    });

    // 2. Search Courses (Materials)
    const allCourses = [
        ...universityRequirements || [],
        ...universityElectives || [],
        ...collegeRequirements || [],
        ...majorRequirements || [],
        ...supportRequirements || [],
        ...labs || [],
        ...remedial || []
    ];

    allCourses.forEach(course => {
        const arTitle = course.title?.ar?.toLowerCase() || '';
        const enTitle = course.title?.en?.toLowerCase() || '';

        if (arTitle.includes(lowerQuery) || enTitle.includes(lowerQuery)) {
            results.push({
                type: 'Course',
                title: course.title.ar + ' / ' + course.title.en,
                link: '/materials', // Ideally deep link if possible, but materials page is list-based
                description: 'مادة دراسية',
                icon: course.icon,
                id: course.id // To potentially scroll to it
            });
        }
    });

    // 3. Search Updates
    updatesData.forEach(update => {
        if (update.title.toLowerCase().includes(lowerQuery) || update.content.toLowerCase().includes(lowerQuery)) {
            results.push({
                type: 'Update',
                title: update.title,
                link: `/updates`, // Or a specific id link if updates have routes
                description: update.badge || 'خبر',
                date: update.date
            });
        }
    });

    return results;
};
