export const chatResponses = [
    // --- GREETINGS (AR) ---
    {
        keywords: ['مرحبا', 'هلا', 'اهلين', 'سلام', 'السلام عليكم'],
        response: 'أهلاً بك في KOON.BAU! 💙 كيف بقدر أساعدك اليوم؟😊<br>اختر من القائمة بالأسفل أو اسألني مباشرة.'
    },
    {
        keywords: ['كيفك', 'كيف الحال', 'اخبارك'],
        response: 'أنا بخير، شكراً لسؤالك! 🤖 جاهز لمساعدتك.'
    },
    // --- GREETINGS (EN) ---
    {
        keywords: ['hi', 'hello', 'hey', 'greetings', 'welcome'],
        response: 'Welcome to KOON.BAU! 💙 How can I help you today? 😊<br>Choose from the quick actions or ask me directly.'
    },
    {
        keywords: ['how are you', 'how r u', 'doing?'],
        response: 'I\'m doing great, thanks for asking! 🤖 Ready to assist you.'
    },

    // --- EXCHANGE (High Priority) ---
    {
        keywords: ['تبادل', 'كتب', 'تبادل مواد', 'استعارة', 'حملة', 'جمع'],
        response: '📚 <b>قسم تبادل المواد والكتب:</b><br>تكون حملة التبادل <b>كل بداية فصل</b> وتحديداً في <b>فترة السحب والإضافة</b>.<br>📢 <b>هام:</b> الأسبوع الذي <u>يسبق</u> السحب والإضافة هو المخصص <b>لجمع المواد</b> من الطلاب. ♻️'
    },
    {
        keywords: ['exchange', 'books', 'borrow', 'swap', 'campaign'],
        response: '📚 <b>Book & Material Exchange:</b><br>The campaign is held <b>every semester</b> specifically during the <b>Add/Drop period</b>.<br>📢 <b>Important:</b> The week <u>before</u> Add/Drop is dedicated to <b>collecting materials</b>. ♻️'
    },

    // --- GOALS (AR) ---
    {
        keywords: ['هدف', 'اهداف', 'رؤية', 'رسالة', 'ليش الموقع', 'فائدة'],
        response: '🎯 <b>أهداف KOON.BAU:</b><br>1. تسهيل وصول طلاب البلقاء للمعلومات الأكاديمية.<br>2. توفير منصة موحدة للخطط، الامتحانات، وحساب المعدل.<br>3. تحسين التجربة الجامعية بتصميم عصري وأدوات ذكية.<br>باختصار: <b>حنكون معك خطوة بخطوة!</b> 🚀'
    },
    // --- GOALS (EN) ---
    {
        keywords: ['goal', 'vision', 'mission', 'why', 'purpose', 'about'],
        response: '🎯 <b>KOON.BAU Goals:</b><br>1. Simplify access to academic info for BAU students.<br>2. Provide a unified platform for Plans, Exams, and GPA calculation.<br>3. Enhance the university experience with modern tools.<br>In short: <b>We are with you every step of the way!</b> 🚀'
    },

    // --- ACADEMIC (AR) ---
    {
        keywords: ['خطة', 'خطط', 'شجرة', 'شجري', 'تخصص'],
        response: 'يمكنك الوصول إلى <b>الخطط الدراسية</b> في قسم الخطط. ستجد هناك خطة كل تخصص (علم بيانات، أمن سيبراني، وغيرها). 🌲<br><a href="/plans" style="color:#007bff;text-decoration:underline;">اضغط هنا للذهاب للخطط</a>'
    },
    {
        keywords: ['دوسية', 'دوسيات', 'شرح', 'ملخص', 'مكتبة', 'كتب', 'مواد', 'مادة'],
        response: 'الدوسيات والشروحات متوفرة في <b>مكتبة المواد</b>. 📚<br><a href="/materials" style="color:#007bff;text-decoration:underline;">الذهاب للمواد</a>'
    },
    // --- ACADEMIC (EN) ---
    {
        keywords: ['plan', 'tree', 'syllabus', 'courses'],
        response: 'You can access <b>Study Plans</b> in the Plans section. You\'ll find plans for Data Science, Cyber Security, and more. 🌲<br><a href="/plans" style="color:#007bff;text-decoration:underline;">Go to Plans</a>'
    },
    {
        keywords: ['material', 'notes', 'slides', 'book', 'summary', 'study'],
        response: 'Notes and summaries are available in the <b>Materials Library</b>. 📚<br><a href="/materials" style="color:#007bff;text-decoration:underline;">Go to Materials</a>'
    },

    // --- CALENDAR (AR) ---
    {
        keywords: ['بداية الفصل', 'دوام', 'متى يبدأ', 'اول يوم'],
        response: `📅 <b>مواعيد بدء الدراسة للعام 2025/2026:</b><br>
        - <b>الفصل الأول:</b> الأحد <span style="color:#28a745">2025/10/05</span>.<br>
        - <b>الفصل الثاني:</b> الأحد <span style="color:#28a745">2026/02/22</span>.<br>
        - <b>الفصل الصيفي:</b> الأحد <span style="color:#28a745">2026/07/12</span>.<br>
        رمضان كريم ببلش تقريباً 19/2/2026 🌙.`
    },
    {
        keywords: ['سحب', 'اضافة', 'إضافة', 'تسجيل مواد'],
        response: `🗓️ <b>فترات السحب والإضافة:</b><br>
        - <b>الفصل الأول:</b> 28/9 - 2/10/2025.<br>
        - <b>الفصل الثاني:</b> 15/2 - 19/2/2026.<br>
        - <b>الفصل الصيفي:</b> 5/7 - 7/7/2026.<br>
        التسجيل للصيفي ببلش من 17/5/2026. 📝`
    },
    {
        keywords: ['امتحان', 'امتحانات', 'ميد', 'نهائي'],
        response: `📝 <b>مواعيد الامتحانات (2025/2026):</b><br>
        🔴 <b>الفصل الأول:</b> Mid (22/11 - 2/12) | Final (10/1 - 22/1)<br>
        🔵 <b>الفصل الثاني:</b> Mid (11/4 - 21/4) | Final (30/5 - 11/6)<br>
        🟠 <b>الفصل الصيفي:</b> Mid (1/8 - 6/8) | Final (26/8 - 3/9)<br>
        شد حيلك! 💪`
    },
    // --- CALENDAR (EN) ---
    {
        keywords: ['start', 'begin', 'semester start', 'calendar'],
        response: `📅 <b>Academic Calendar 2025/2026:</b><br>
        - <b>First Sem:</b> Starts Sun <span style="color:#28a745">05/10/2025</span>.<br>
        - <b>Second Sem:</b> Starts Sun <span style="color:#28a745">22/02/2026</span>.<br>
        - <b>Summer Sem:</b> Starts Sun <span style="color:#28a745">12/07/2026</span>.<br>
        Ramadan starts approx 19/02/2026 🌙.`
    },
    {
        keywords: ['add', 'drop', 'registration', 'register'],
        response: `🗓️ <b>Add/Drop Periods:</b><br>
        - <b>First Sem:</b> 28/9 - 2/10/2025.<br>
        - <b>Second Sem:</b> 15/2 - 19/2/2026.<br>
        - <b>Summer Sem:</b> 5/7 - 7/7/2026.<br>
        Summer Registration starts 17/5/2026. 📝`
    },
    {
        keywords: ['exam', 'midterm', 'final', 'test'],
        response: `📝 <b>Exam Schedule (2025/2026):</b><br>
        🔴 <b>1st Sem:</b> Mid (22/11-2/12) | Final (10/1-22/1)<br>
        🔵 <b>2nd Sem:</b> Mid (11/4-21/4) | Final (30/5-11/6)<br>
        🟠 <b>Summer:</b> Mid (1/8-6/8) | Final (26/8-3/9)<br>
        Good luck! 💪`
    },

    // --- SERVICES (AR) ---
    {
        keywords: ['خدمات', 'الكترونية', 'تسجيل', 'بوابة'],
        response: '🛠️ <b>خدماتنا وخدمات الجامعة:</b><br>1. <b>بوابة الطالب:</b> التسجيل والعلامات.<br>2. <b>نظام التعلم الإلكتروني:</b> المحاضرات والواجبات.<br>3. <b>KOON Tools:</b> حساب المعدل، الخطط الشجرية، والامتحانات السابقة.<br><a href="https://bau.edu.jo" target="_blank" style="color:#007bff;text-decoration:underline;">زيارة موقع الجامعة</a>'
    },
    {
        keywords: ['حساب معدل', 'معدلي', 'علامات', 'نظام'],
        response: '⚡ <b>حساب المعدل:</b><br>قريباً سنطلق أداة "احسب معدلك" المتطورة! حالياً تقدر تشوف نظام العلامات في دليل الطالب. 🧮'
    },
    {
        keywords: ['دعم', 'فني', 'مشكلة', 'تواصل'],
        response: '🤝 <b>الدعم والمساعدة:</b><br>لأي مشكلة تقنية أو اقتراح، تواصل مع المطور <b>حسين</b> مباشرة:<br>📞 0782934685<br>💌 أو عبر صفحة "تواصل معنا".'
    },
    // --- SERVICES (EN) ---
    {
        keywords: ['service', 'portal', 'elearning', 'lms'],
        response: '🛠️ <b>Services:</b><br>1. <b>Student Portal:</b> Registration & Grades.<br>2. <b>E-Learning:</b> Lectures & Assignments.<br>3. <b>KOON Tools:</b> GPA Calculator, Tree Plans, Past Papers.<br><a href="https://bau.edu.jo" target="_blank" style="color:#007bff;text-decoration:underline;">Visit BAU Website</a>'
    },
    {
        keywords: ['gpa', 'grade', 'calculate', 'average'],
        response: '⚡ <b>GPA Calculator:</b><br>Coming Soon! An advanced tool to calculate your semester and cumulative GPA. Stay tuned! 📈'
    },
    {
        keywords: ['support', 'contact', 'help', 'developer'],
        response: '🤝 <b>Support:</b><br>For technical issues or suggestions, contact the developer <b>Hussien</b>:<br>📞 0782934685<br>💌 Or via the "Contact Us" page.'
    },

    // --- LEISURE/META ---
    {
        keywords: ['ليش كون', 'سبب التسمية', 'معنى كون', 'شو يعني كون', 'لقب'],
        response: '🧐 <b>سر الاسم "KOON":</b><br>هو لقب (Mood) خاص بالمطور <b>حسين</b>.<br>مستوحى من "المحقق كونان" (Detective Conan) 🕵️‍♂️، كونه يدرس تحقيقات جنائية رقمية.<br>"كون" هو اختصار يمثل هويته الرقمية وشغفه بالتحقيق والبرمجة! 🔍💻'
    },
    // --- DHIKR (AR/EN) ---
    {
        keywords: ['أذكار', 'اذكار', 'حصن المسلم', 'صباح', 'مساء', 'dhikr', 'athkar'],
        response: '📿 <b>أذكار الصباح والمساء:</b><br>يحتوي هذا القسم على الأذكار اليومية من حصن المسلم. يمكنك قراءتها واستخدام العداد الإلكتروني لمتابعة تسبيحك.<br>ابدأ يومك بذكر الله! ✨<br><br><a href="#morning-evening-dhikr" style="display:inline-block; margin-top:5px; color:#2196F3; text-decoration:underline;">الذهاب إلى قسم الأذكار ⬅️</a>'
    },
    {
        keywords: ['why koon', 'meaning of koon', 'name origin'],
        response: '🧐 <b>The Secret of "KOON":</b><br>It\'s an alias/nickname for the developer <b>Hussien</b>.<br>Inspired by "Detective Conan" 🕵️‍♂️, reflecting his major in Digital Forensics.<br>"Koon" is the digital identity representing his passion for investigation & coding! 🔍💻'
    },
    {
        keywords: ['من انت', 'مين انت', 'من نحن'],
        response: 'أنا <b>"كون" (Koon Bot)</b> 🤖. مساعد ذكي لطلاب البلقاء، بساعدك تلاقي الخطط، الامتحانات، وتعرف مواعيد الجامعة بسرعة!'
    },
    {
        keywords: ['who are you', 'who r u'],
        response: 'I am <b>Koon Bot</b> 🤖. Your smart assistant @ BAU. I help you find Plans, Exams, and Calendar dates instantly!'
    },
    {
        keywords: ['مين المطور', 'مين عملك', 'حسين'],
        response: 'المطور هو <b>حسين الديات (Hussien Aldayyat)</b> 💻.<br>طالب تخصص تحقيقات جنائية رقمية، ولديه شغف وفضول كبير في تعلم البرمجة وتطوير الويب.',
    },
    {
        keywords: ['developer', 'creator', 'made by'],
        response: 'Developed with ❤️ by <b>Hussien Aldayyat</b> 💻.<br>Digital Forensics Student with a passion for Web Development & Programming.',
    },
    {
        keywords: ['شكرا', 'يسلمو'],
        response: 'ولو! أنا بالخدمة دائماً. بالتوفيق! 🎓💙'
    },
    {
        keywords: ['thx', 'thanks', 'thank you'],
        response: 'You\'re welcome! Happy to help. Good luck! 🎓💙'
    }
];

export const defaultResponseAr = "عفواً، ما فهمت عليك بالضبط. 🤔<br>جرب تسأل عن: <b>الخطط</b>، <b>الامتحانات</b>، <b>مواعيد السحب</b>، أو اختر من الأزرار بالأسفل.";
export const defaultResponseEn = "Sorry, I didn't get that. 🤔<br>Try asking about: <b>Plans</b>, <b>Exams</b>, <b>Add/Drop</b>, or choose from the buttons below.";
