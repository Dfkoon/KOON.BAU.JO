
// --- TREE PLANS DATA (Multi-Major) ---

const commonCoursesAr = {
    "تفاضل وتكامل 1": {
        opens: ["تفاضل وتكامل 2", "احتمالات واحصاء", "الهياكل", "الرياضيات المنفصلة"],
        prerequisite: "لا يوجد",
        concurrent: "لا يوجد"
    },
    "تفاضل وتكامل 2": {
        opens: ["مقدمة الى الذكاء الاصطناعي"],
        prerequisite: "تفاضل وتكامل 1",
        concurrent: "لا يوجد"
    },
    "اللغة العربية التطبيقية": { opens: [], prerequisite: "عربي استدراكي 99", concurrent: "لا يوجد" },
    "اللغة الإنجليزية التطبيقية 1": { opens: ["اللغة الإنجليزية التطبيقية 2"], prerequisite: "إنجليزي استدراكي 99", concurrent: "لا يوجد" },
    "اللغة الإنجليزية التطبيقية 2": { opens: [], prerequisite: "اللغة الإنجليزية التطبيقية 1", concurrent: "لا يوجد" }
};

const commonCoursesEn = {
    "Calculus 1": {
        opens: ["Calculus 2", "Probability & Statistics", "Structures", "Discrete Mathematics"],
        prerequisite: "None",
        concurrent: "None"
    },
    "Calculus 2": { opens: ["Intro to AI"], prerequisite: "Calculus 1", concurrent: "None" },
    "Applied Arabic": { opens: [], prerequisite: "Remedial Arabic 99", concurrent: "None" },
    "Applied English 1": { opens: ["Applied English 2"], prerequisite: "Remedial English 99", concurrent: "None" },
    "Applied English 2": { opens: [], prerequisite: "Applied English 1", concurrent: "None" }
};

export const treePlansData = {
    ar: {
        digitalForensics: {
            ...commonCoursesAr,
            "مهارات حاسوب 2 لطلبة الكليات العلمية": {
                opens: ["مبادئ أمن معلومات والفضاء الإلكتروني", "برمجة موجهة للكائنات"],
                prerequisite: "حاسوب استدراكي 99",
                concurrent: ["مهارات حاسوب وتعليم الالكتروني", "مختبر مهارات حاسوب 2 لطلبة الكليات العلمية"]
            },
            "مبادئ أمن معلومات والفضاء الإلكتروني": {
                opens: ["شبكات حاسوب 1", "اساسيات التشفير"],
                prerequisite: "مهارات حاسوب 2 لطلبة الكليات العلمية"
            },
            "برمجة موجهة للكائنات": {
                opens: ["هياكل بيانات"],
                prerequisite: "مهارات حاسوب 2 لطلبة الكليات العلمية"
            },
            "هياكل بيانات": {
                opens: ["تحليل وتصميم خوارزميات", "تصميم وادارة قواعد بيانات 1", "نظم تشغيل لتحقيقات جنائية"],
                prerequisite: "برمجة موجهة للكائنات"
            },
            "شبكات حاسوب 1": {
                opens: ["خصوصية وحماية بيانات", "امن شبكات", "تحقيقات جنائية في الشبكات"],
                prerequisite: "مبادئ أمن معلومات والفضاء الإلكتروني",
                concurrent: "لا يوجد"
            },
            "تحقيقات جنائية في الشبكات": {
                opens: ["تحقيقات الجنائية الرقمية", "العدالة الجنائية", "تحقيق الاحتيال الرقمي", "التحقيقات الاجهزه النقالة"],
                prerequisite: "شبكات حاسوب 1",
                concurrent: "لا يوجد"
            },
            "خصوصية وحماية بيانات": {
                opens: ["قانون العقوبات قسم العام", "مدخل الى علم القانون", "جرائم تكنولوجيا المعلومات", "تحليل مخاطر السياسات الامنية", "التهديدات الامنية ومكافحتها"],
                prerequisite: "شبكات حاسوب 1",
                concurrent: "لا يوجد"
            },
            "تصميم وادارة قواعد بيانات 1": {
                opens: ["تحقيقات جنائية قواعد بيانات", "استعادة بيانات"],
                prerequisite: "هياكل بيانات",
                concurrent: "لا يوجد"
            },
            "مقدمة إلى اليونكس": { opens: [], prerequisite: "لا يوجد", concurrent: "لا يوجد" },
            "التصميم المنطق الرقمي": { opens: [], prerequisite: "مهارات حاسوب 2 لطلبة الكليات العلمية", concurrent: "لا يوجد" },
            "مقدمة الى الذكاء الاصطناعي": { opens: ["برمجة الذكاء الاصطناعي", "التعلم الآلة", "مختبر تعلم الآلة"], prerequisite: "تفاضل وتكامل 2", concurrent: "لا يوجد" },
        },
        cyberSecurity: {
            ...commonCoursesAr,
            "مهارات حاسوب 2 لطلبة الكليات العلمية": {
                opens: ["مقدمة إلى اليونكس", "مبادئ أمن معلومات والفضاء الإلكتروني", "برمجة موجهة للكائنات", "تصميم المنطق الرقمي"],
                prerequisite: "حاسوب استدراكي 99"
            },
            "مقدمة إلى اليونكس": { opens: ["شبكات حاسوب 1"], prerequisite: "مهارات حاسوب 2 لطلبة الكليات العلمية" },
            "شبكات حاسوب 1": { opens: ["أمن شبكات"], prerequisite: "مقدمة إلى اليونكس" },
            "أمن شبكات": { opens: ["قانون واخلاقيات الفضاء الالكتروني"], prerequisite: "شبكات حاسوب 1" },
            "مبادئ أمن معلومات والفضاء الإلكتروني": { opens: ["ادارة مخاطر", "سياسات امنية"], prerequisite: "مهارات حاسوب 2 لطلبة الكليات العلمية" },
            "برمجة موجهة للكائنات": { opens: ["هياكل البيانات"], prerequisite: "مهارات حاسوب 2 لطلبة الكليات العلمية" },
            "هياكل البيانات": { opens: ["تصميم وادارة قواعد بيانات 1", "تطوير تطبيقات الهاتف المحمول", "التشفير المتقدم"], prerequisite: "برمجة موجهة للكائنات" },
            "تصميم المنطق الرقمي": { opens: [], prerequisite: "مهارات حاسوب 2 لطلبة الكليات العلمية" },
            "أساسيات التشفير": { opens: ["التشفير المتقدم", "مقدمة في نظرية الاعداد"], prerequisite: "لا يوجد" },
            "مقدمة الى الذكاء الاصطناعي": { opens: ["تعلم الآلة"], prerequisite: "تفاضل وتكامل 2" },
            "تصميم وادارة قواعد بيانات 1": { opens: ["تصميم وتحليل الخوارزميات"], prerequisite: "هياكل البيانات" },
            "تحليل وتصميم النظم": { opens: ["هندسة البرمجيات الامنة"], prerequisite: "تصميم وادارة قواعد بيانات 1" }
        },
        dataScience: {
            ...commonCoursesAr,
            "مهارات حاسوب 2 لطلبة الكليات العلمية": {
                opens: ["مقدمة إلى اليونكس", "أمن الحاسوب والشبكات", "برمجة موجهة للكائنات", "أساسيات علم البيانات"],
                prerequisite: "حاسوب استدراكي 99"
            },
            "أساسيات علم البيانات": { opens: ["تحليل البيانات", "الحوسبة السحابية", "انترنت الاشياء"], prerequisite: "مهارات حاسوب 2 لطلبة الكليات العلمية" },
            "تحليل البيانات": { opens: ["تنقيب البيانات", "تحليل الشبكات الاجتماعية"], prerequisite: "أساسيات علم البيانات" },
            "برمجة موجهة للكائنات": { opens: ["هياكل بيانات"], prerequisite: "مهارات حاسوب 2 لطلبة الكليات العلمية" },
            "هياكل بيانات": { opens: ["تصميم وتحليل الخوارزميات", "هيائل بيانات متقدمة"], prerequisite: "برمجة موجهة للكائنات" },
            "أمن الحاسوب والشبكات": { opens: [], prerequisite: "مهارات حاسوب 2 لطلبة الكليات العلمية" },
            "مقدمة إلى اليونكس": { opens: [], prerequisite: "مهارات حاسوب 2 لطلبة الكليات العلمية" },
            "تصميم وادارة قواعد بيانات 1": { opens: ["مخازن البيانات", "تصميم وادارة قواعد بيانات 2"], prerequisite: "هياكل بيانات" },
            "الحوسبة المتوازية": { opens: ["التعرف على الانماط"], prerequisite: "لا يوجد" },
            "مقدمة الى الذكاء الاصطناعي": { opens: ["تعلم الالة", "مبادئ التحليل الوسطي"], prerequisite: "تفاضل وتكامل 2" },
            "برمجة تطبيقات الانترنت": { opens: ["برمجة تطبيقات الموبايل", "معالجة اللغة الطبيعية"], prerequisite: "تحليل الشبكات الاجتماعية" }
        },
        aiRobotics: { ...commonCoursesAr, "ملاحظة": { opens: [], prerequisite: "سيتم إضافة الخطة قريباً" } }, // Placeholder
        vr: { ...commonCoursesAr, "ملاحظة": { opens: [], prerequisite: "سيتم إضافة الخطة قريباً" } } // Placeholder
    },
    en: {
        digitalForensics: {
            ...commonCoursesEn,
            "Computer Skills 2 (Scientific)": {
                opens: ["Principles of Info Security & Cyberspace", "Object Oriented Programming"],
                prerequisite: "Remedial Computer 99",
                concurrent: ["Computer Skills & E-Learning", "Computer Skills Lab 2"]
            },
            "Principles of Info Security & Cyberspace": {
                opens: ["Computer Networks 1", "Cryptography Fundamentals"],
                prerequisite: "Computer Skills 2 (Scientific)"
            },
            "Object Oriented Programming": {
                opens: ["Data Structures"],
                prerequisite: "Computer Skills 2 (Scientific)"
            },
            "Data Structures": {
                opens: ["Algorithms Analysis & Design", "Database Design & Management 1", "OS for Digital Forensics"],
                prerequisite: "Object Oriented Programming"
            },
            "Computer Networks 1": {
                opens: ["Data Privacy & Protection", "Network Security", "Network Forensics"],
                prerequisite: "Principles of Info Security & Cyberspace",
                concurrent: "None"
            },
            "Network Forensics": {
                opens: ["Digital Forensics", "Criminal Justice", "Digital Fraud Investigation", "Mobile Forensics"],
                prerequisite: "Computer Networks 1",
                concurrent: "None"
            },
            "Data Privacy & Protection": {
                opens: ["Penal Code (General)", "Intro to Law Science", "IT Crimes", "Security Policy Risk Analysis", "Security Threats & Countermeasures"],
                prerequisite: "Computer Networks 1",
                concurrent: "None"
            },
            "Database Design & Management 1": {
                opens: ["Database Forensics", "Data Recovery"],
                prerequisite: "Data Structures",
                concurrent: "None"
            },
            "Intro to Unix": { opens: [], prerequisite: "None" },
            "Digital Logic Design": { opens: [], prerequisite: "Computer Skills 2 (Scientific)" },
            "Intro to AI": { opens: ["AI Programming", "Machine Learning", "ML Lab"], prerequisite: "Calculus 2" },
        },
        cyberSecurity: {
            ...commonCoursesEn,
            "Computer Skills 2 (Scientific)": {
                opens: ["Intro to Unix", "Principles of Info Security & Cyberspace", "Object Oriented Programming", "Digital Logic Design"],
                prerequisite: "Remedial Computer 99"
            },
            "Intro to Unix": { opens: ["Computer Networks 1"], prerequisite: "Computer Skills 2 (Scientific)" },
            "Computer Networks 1": { opens: ["Network Security"], prerequisite: "Intro to Unix" },
            "Network Security": { opens: ["Cyber Space Law & Ethics"], prerequisite: "Computer Networks 1" },
            "Principles of Info Security & Cyberspace": { opens: ["Risk Management", "Security Policies"], prerequisite: "Computer Skills 2 (Scientific)" },
            "Object Oriented Programming": { opens: ["Data Structures"], prerequisite: "Computer Skills 2 (Scientific)" },
            "Data Structures": { opens: ["Database Design & Management 1", "Mobile App Development", "Advanced Encryption"], prerequisite: "Object Oriented Programming" },
            "Digital Logic Design": { opens: [], prerequisite: "Computer Skills 2 (Scientific)" },
            "Cryptography Fundamentals": { opens: ["Advanced Encryption", "Intro to Number Theory"], prerequisite: "None" },
            "Intro to AI": { opens: ["Machine Learning"], prerequisite: "Calculus 2" },
            "Database Design & Management 1": { opens: ["Algorithms Analysis & Design"], prerequisite: "Data Structures" }
        },
        dataScience: {
            ...commonCoursesEn,
            "Computer Skills 2 (Scientific)": {
                opens: ["Intro to Unix", "Computer & Network Security", "Object Oriented Programming", "Data Science Fundamentals"],
                prerequisite: "Remedial Computer 99"
            },
            "Data Science Fundamentals": { opens: ["Data Analysis", "Cloud Computing", "IoT"], prerequisite: "Computer Skills 2 (Scientific)" },
            "Data Analysis": { opens: ["Data Mining", "Social Network Analysis"], prerequisite: "Data Science Fundamentals" },
            "Object Oriented Programming": { opens: ["Data Structures"], prerequisite: "Computer Skills 2 (Scientific)" },
            "Data Structures": { opens: ["Algorithms Analysis & Design", "Advanced Data Structures"], prerequisite: "Object Oriented Programming" },
            "Computer & Network Security": { opens: [], prerequisite: "Computer Skills 2 (Scientific)" },
            "Intro to Unix": { opens: [], prerequisite: "Computer Skills 2 (Scientific)" },
            "Database Design & Management 1": { opens: ["Data Warehousing", "Database Design & Management 2"], prerequisite: "Data Structures" },
            "Parallel Computing": { opens: ["Pattern Recognition"], prerequisite: "None" },
            "Intro to AI": { opens: ["Machine Learning"], prerequisite: "Calculus 2" },
            "Internet App Programming": { opens: ["Mobile App Programming", "Natural Language Processing"], prerequisite: "Social Network Analysis" }
        },
        aiRobotics: { ...commonCoursesEn }, // Placeholder
        vr: { ...commonCoursesEn } // Placeholder
    }
};

export const serviceKeys = [
    { title: 'regSystem', desc: 'regSystemDesc', link: 'https://live.bau.edu.jo/Reg.aspx' },
    { title: 'gradesSystem', desc: 'gradesSystemDesc', link: '#' },
    { title: 'studentGuide', desc: 'studentGuideDesc', link: 'https://www.bau.edu.jo/media/dalel2/mobile/index.html' },
    { title: 'eLearning', desc: 'eLearningDesc', link: 'https://www.bau.edu.jo/elearning.aspx' },
    { title: 'gpaCalc', desc: 'gpaCalcDesc', link: 'https://app2.bau.edu.jo:7799/courses/index.jsp?param=1' },
    { title: 'evalSystem', desc: 'evalSystemDesc', link: 'https://app2.bau.edu.jo:7799/eval/Login.jsp' }
];

export const faqs = [
    {
        keywords: ['تسجيل', 'موعد', 'متى', 'register', 'when'],
        answerAr: "يبدأ التسجيل عادة قبل بداية الفصل الدراسي بأسبوعين. يمكنك متابعة الإعلانات في قسم 'الأحداث القادمة'.",
        answerEn: "Registration usually starts two weeks before the semester begins. Check 'Upcoming Events' for updates."
    },
    {
        keywords: ['معدل', 'تراكمي', 'حساب', 'gpa', 'calculate'],
        answerAr: "يمكنك حساب معدلك التراكمي والفصلي بدقة عبر خدمة 'حساب المعدل' المتوفرة في قسم الخدمات.",
        answerEn: "You can accurately calculate your GPA using the 'GPA Calculator' service in the Services section."
    },
    {
        keywords: ['نجاح', 'رسوب', 'علامة', 'pass', 'grade'],
        answerAr: "علامة النجاح للمواد الجامعية هي 50%، ولمواد التخصص قد تختلف حسب الكلية.",
        answerEn: "The passing grade for university courses is 50%. Major courses may vary."
    }
];

export const tips = [
    {
        titleAr: "نصيحة دراسية 💡",
        textAr: "هل قمت بحساب معدلك الفصلي؟ استخدم حاسبة المعدل لتخطيط أفضل!",
        titleEn: "Study Tip 💡",
        textEn: "Did you calculate your GPA? Use the GPA calculator for better planning!"
    },
    {
        titleAr: "معلومة ℹ️",
        textAr: "يمكنك معرفة المواد التي تفتحها كل مادة من خلال الشجرة التفاعلية.",
        titleEn: "Info ℹ️",
        textEn: "You can see which courses are unlocked by each subject using the Interactive Tree."
    },
    {
        titleAr: "أذكار 🤲",
        textAr: "ابدأ يومك بأذكار الصباح ليكون يوماً مباركاً.",
        titleEn: "Dhikr 🤲",
        textEn: "Start your day with Morning Dhikr for a blessed day."
    },
    {
        titleAr: "حدث قادم 📅",
        textAr: "لا تنسَ التحقق من مواعيد الامتحانات القادمة في قسم الأحداث.",
        titleEn: "Upcoming Event 📅",
        textEn: "Don't forget to check upcoming exam dates in the Events section."
    }
];

export const greetings = [
    { keywords: ['hi', 'hello', 'hey', 'مرحبا', 'هلا', 'اهلين', 'سلام', 'السلام'], responseAr: "أهلاً بك! أنا بوت عون، كيف يمكنني مساعدتك اليوم؟ 🤖", responseEn: "Hello! I'm Koon Bot, how can I help you today? 🤖" },
    { keywords: ['how arc you', 'how are you', 'news', 'كيفك', 'شخبارك', 'علومك'], responseAr: "أنا بخير، شكراً لسؤالك! جاهز لخدمتك 🦾", responseEn: "I'm doing great, thanks for asking! Ready to help you 🦾" },
    { keywords: ['bye', 'goodbye', 'see you', 'سلام', 'باي', 'مع السلامة'], responseAr: "مع السلامة! نتمنى لك يوماً سعيداً 👋", responseEn: "Goodbye! Have a great day 👋" },
];

export const majorKeywords = [
    { keywords: ['تحقيقات', 'جنائية', 'investigations', 'forensics'], titleAr: "التحقيقات الجنائية الرقمية", titleEn: "Digital Forensics" },
    { keywords: ['امن', 'سيبراني', 'security', 'cyber'], titleAr: "أمن المعلومات والفضاء الإلكتروني", titleEn: "Cyber Security" },
    { keywords: ['ذكاء', 'روبوتات', 'ai', 'artificial'], titleAr: "الذكاء الاصطناعي والروبوتات", titleEn: "AI & Robotics" },
    { keywords: ['بيانات', 'داتا', 'data', 'science'], titleAr: "علم البيانات", titleEn: "Data Science" },
    { keywords: ['واقع', 'افتراضي', 'vr', 'virtual'], titleAr: "الواقع الافتراضي", titleEn: "Virtual Reality" }
];
