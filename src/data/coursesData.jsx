import { Share, School, Verified, Engineering, Science, Computer, Groups, Language, HealthAndSafety, Agriculture, Gavel, BugReport, Lock, Security, Storage, Dataset, Cloud, Terminal, Calculate, Biotech, Book, Public, Code } from '@mui/icons-material';

export const treeData = {
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
    opens: ["هياكل البيانات"],
    prerequisite: "مهارات حاسوب 2 لطلبة الكليات العلمية"
  },
  "هياكل بيانات": {
    opens: ["تحليل وتصميم خوارزميات", "تصميم وادارة قواعد بيانات 1", "نظم تشغيل لتحقيقات جنائية"],
    prerequisite: "برمجة موجهة للكائنات"
  },
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
  "مقدمة الى الذكاء الاصطناعي": {
    opens: ["برمجة الذكاء الاصطناعي", "التعلم الآلة", "مختبر تعلم الآلة"],
    prerequisite: "تفاضل وتكامل 2",
    concurrent: "لا يوجد"
  },
  "التصميم المنطق الرقمي": {
    opens: [],
    prerequisite: "مهارات حاسوب 2 لطلبة الكليات العلمية",
    concurrent: "لا يوجد"
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
  "مقدمة إلى اليونكس": {
    opens: [],
    prerequisite: "لا يوجد",
    concurrent: "لا يوجد"
  },
  "اللغة العربية التطبيقية": {
    opens: [],
    prerequisite: "عربي استدراكي 99",
    concurrent: "لا يوجد"
  },
  "اللغة الإنجليزية التطبيقية 1": {
    opens: ["اللغة الإنجليزية التطبيقية 2"],
    prerequisite: "إنجليزي استدراكي 99",
    concurrent: "لا يوجد"
  },
  "اللغة الإنجليزية التطبيقية 2": {
    opens: [],
    prerequisite: "اللغة الإنجليزية التطبيقية 1",
    concurrent: "لا يوجد"
  }
};

export const universityRequirements = [
  {
    id: 'u1',
    title: { ar: 'الابتكار والريادة والإبداع', en: 'Innovation, Entrepreneurship & Creativity' },
    icon: <School />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/file/d/1c5yiDmcYFNWrhHt_-hCJNC_GXQmYcs-U/view?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1tay9wVgtdDkFkuVjaoKiabo9MRAMfzFK?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1MLPnMXTB589eDelgFLVCoI_fqjyL94mj?usp=drive_link', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 'u2',
    title: { ar: 'التربية الوطنية والسلوك الجامعي', en: 'National Education & University Ethics' },
    icon: <Verified />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/12U471fs1r9d8r-C_lLox7AZ_AMWDRq57?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1AyHTgVwyui_546G1xy4--mkBpPY-zgqG?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Exam', url: '#', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 'u3',
    title: { ar: 'لغة إنجليزية تطبيقية (1)', en: 'Applied English (1)' },
    icon: <Language />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1me50m6v1R01quC6vHFflOdQWldIYXhGd?usp=sharing', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1CnlR53DX1panlX8m4p4mQRHvZobxmtZF?usp=share_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1Ic5cNae3_JUBsXwZWGRoxOobB2h4i4OW', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } },
      { type: 'Solution', url: 'https://drive.google.com/drive/u/0/folders/1XgPO5RZbvFCh0HSIhJ_D04ahYZtq4Qfe', label: { ar: 'حلول المادة', en: 'Course Solutions' } }
    ]
  },
  {
    id: 'u4',
    title: { ar: 'لغة إنجليزية تطبيقية (2)', en: 'Applied English (2)' },
    icon: <Language />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1xWxsHkxAuxMwp0jg7EHvxXD5JoUWK-BH?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Solution', url: 'https://drive.google.com/drive/folders/1K_igesLh5NcKhs5aCct-7vIUTRXAkTof?usp=drive_link', label: { ar: 'حلول المادة', en: 'Course Solutions' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/114b9PiZfrigQ7UnodgpxyLKeWhJkrYon?usp=share_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Exam', url: 'https://drive.google.com/file/d/1RpuyIFWBmupHHaG_r0qSZf-V33Wqizj5/view', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 'u5',
    title: { ar: 'لغة عربية تطبيقية', en: 'Applied Arabic' },
    icon: <Book />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1HI0K4oEc_uhteBQSPrESX2xuvkUswQ53?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1_5bdEx5_HVtvMaVm1X1KNCyqlw1RTIpM?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1WakezCvdBmP06FbgeerecA3o3jcYyyGa?usp=drive_link', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 'u6',
    title: { ar: 'مهارات الحاسوب والتعليم الإلكتروني', en: 'Computer Skills & E-Learning' },
    icon: <Computer />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1-2MUB09BHoSSeyK3byqQXg9ScKO3loTz?usp=share_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/127wL1ASl_7nMZGOolbEwsdticE1zyh7f?usp=sharing', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1GXcGNJxOXsgrYaVjAgqDi6R6EXr0Lmt5', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } },
      { type: 'Exam', url: 'https://docs.google.com/document/d/1ql6u5pfgUOhgSSgeIMGg44TTQ0ogKHK9xc2GlGDx36o/edit?usp=drive_link', label: { ar: 'أسئلة كويزات', en: 'Quiz Questions' } }
    ]
  },
  {
    id: 'u7',
    title: { ar: 'العلوم العسكرية', en: 'Military Sciences' },
    icon: <Security />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1thCuaN6eyfQivmSwsxiiITypJb1aK7o2?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/file/d/1QVPBcYpK2BIhJMQNOhh1WCKR13MSFqM8/view', label: { ar: 'ملخص المادة 1', en: 'Course Summary 1' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1fZLHy-jKdWhMfK0pielIJwEatr1HFVTb', label: { ar: 'ملخص المادة 2', en: 'Course Summary 2' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1I767QVOBMnMplx97tr1iVsRd1MshL_45', label: { ar: 'أسئلة السنوات السابقة 1', en: 'Past Exams 1' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1oaUSRPu-ksggLarwz6TvssR-75elFBhY?usp=drive_link', label: { ar: 'أسئلة السنوات السابقة 2', en: 'Past Exams 2' } }
    ]
  }
];

export const universityElectives = [
  {
    id: 'ue1',
    title: { ar: 'البيئة والمجتمع', en: 'Environment & Society' },
    icon: <Public />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/file/d/1iWO_vYrEqPGeBfLqoh8zRWkCki9m4Du8/view?usp=drivesdk', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1DcfQ72gQD16zWmB_EJhk28NPVkMuSjcu', label: { ar: 'أسئلة السنوات السابقة 1', en: 'Past Exams 1' } },
      { type: 'Exam', url: 'https://photos.google.com/share/AF1QipNLQHN5BDysmLzaV9_1u6SSwgVVFGbt81PDHu90pEoK4pb_utF8xPjM-BcAxYVB2Q?key=U0FZWTBSMU9RV0luaklHVTVkSzA0cmR3bS1jamJB', label: { ar: 'أسئلة السنوات السابقة 2', en: 'Past Exams 2' } }
    ]
  },
  {
    id: 'ue2',
    title: { ar: 'الثقافة الإسلامية', en: 'Islamic Culture' },
    icon: <Groups />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/file/d/1yFn-DZU7G2eg5lk3FccmvFG-p2_OrrbM/view?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1vukKUx6cUgTCwxhbCHaeg4l3hoMu-J86?usp=drive_link', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1p9Iz7t2Bmt53-UA9o4eNKmVSAN9bt-NH?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } }
    ]
  },
  {
    id: 'ue3',
    title: { ar: 'الزراعة في الأردن', en: 'Agriculture in Jordan' },
    icon: <Agriculture />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/file/d/15faus4U__AKu_XRjOlbHKK13Oxthyxaf/view?usp=sharing', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1AfsE5seHE0DSoRgGJTMaHoquLZesogbH', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } },
      { type: 'Summary', url: 'https://drive.google.com/file/d/1OOFokmXVMXq3ukwcfrlelZ0TmS9JJYJm/view', label: { ar: 'ملخص المادة', en: 'Course Summary' } }
    ]
  },
  {
    id: 'ue4',
    title: { ar: 'الرياضة والصحة للجميع', en: 'Sports & Health for All' },
    icon: <HealthAndSafety />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1OodQfsi3mKFEYNvssfXtTflIUSDdk5A-?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Exam', url: 'https://drive.google.com/file/d/1J0fa9qVWiknlCeCwZGWvBvopc3NFN8kO/view', label: { ar: 'أسئلة السنوات السابقة 1', en: 'Past Exams 1' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1x8XKBwYvYC_J-a-K0fdOyzB3cNKMEMeJ?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } }
    ]
  },
  {
    id: 'ue5',
    title: { ar: 'السلامة المرورية', en: 'Traffic Safety' },
    icon: <HealthAndSafety />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1ckh06tglbdR86NjNqtsIe1jeELm9lxel?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } }
    ]
  },
  {
    id: 'ue6',
    title: { ar: 'مجتمع رقمي', en: 'Digital Society' },
    icon: <Share />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/19ud5czjp_xMMXDJJ8NYv3SZTJOp8-yow?usp=sharing', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1jBJQPvJdezYGMUgBtcOxgf249lsIAlRz?usp=drive_link', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/14b-qE1b6zZkXuoD8cEBZ2LFgLVnWOe8G?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } }
    ]
  },
  {
    id: 'ue7',
    title: { ar: 'مهارات الاتصال', en: 'Communication Skills' },
    icon: <Language />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/file/d/1ZhZuC9Fg419b7KxzraEZ83h_zG3Ru_73/view?usp=sharing', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } }
    ]
  },
  {
    id: 'ue8',
    title: { ar: 'القانون والاعلام والمجتمع', en: 'Law, Media & Society' },
    icon: <Gavel />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1EpKAjhBe-t-ne0mgiCwuwg1dSrg1pmQg?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } }
    ]
  }
];

export const collegeRequirements = [
  {
    id: 'c1',
    title: { ar: 'مهارات حاسوب 2 لطلبة الكليات العلمية', en: 'Computer Skills 2 (Scientific Faculties)' },
    icon: <Computer />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1Opy4WC6SUWdfA9qEf4h9Xzgs3YCQvJe4', label: { ar: 'كتاب المادة', en: 'Course Book' } },
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1voqW_AtC5KPm1zjpwO47JkFA9wqlKkL1', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/file/d/1StnIAxAymIOfKH17LR-6lG6YT-tZf2iN/view?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Video', url: 'https://t.me/c/1555428522/712', label: { ar: 'شرح المادة / د سوسن ابو طالب', en: 'Course Explanation / Dr. Sawsan Abu Taleb' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/u/0/folders/1jKNPQS83cJxEUDB-Vizbod_tWoR-4wIW', label: { ar: 'أسئلة السنوات فاينل - 2025', en: 'Past Exams (Final) - 2025' } }
    ]
  },
  {
    id: 'c2',
    title: { ar: 'برمجة موجهة للكائنات', en: 'Object Oriented Programming' },
    icon: <Terminal />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1Uay2WmDQwHihcVCMV7rEahvRmG8DBIuJ', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/16Bwnetoq6FZUC2ZiAV74EnTW3w156L1S?usp=share_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Video', url: 'https://youtu.be/FaaM6uVbuJM?si=2h7p-Z0Yc3QpmB3n', label: { ar: 'شرح المادة / م عادل نسيم', en: 'Course Explanation / Eng. Adel Naseem' } },
      { type: 'Video', url: 'https://youtu.be/8MJN0Zb71FI?si=F3fsmFDwbIyeu0ad', label: { ar: 'شرح المادة / د محمد الريالات', en: 'Course Explanation / Dr. Mohammad Al-Ryalat' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1892HdMgDbgL-GTasNrI-vcopEipc4cXP', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 'c3',
    title: { ar: 'مقدمة الذكاء الاصطناعي', en: 'Introduction to AI' },
    icon: <Biotech />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1o1Me0_tw2nVdfa43aTila1flq_MM4wIA?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1U1ONkBEwXDDhtHMNVlbrbdxeqbFk4TDE?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Video', url: 'https://t.me/introtoai1', label: { ar: 'شرح المادة / د هديل عزام', en: 'Course Explanation / Dr. Hadeel Azzam' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/mobile/folders/10oXYICv1k7BGIg3Rnj5R1mzFY6AVPvhz?usp=share_link&fbclid=PAAaZFPYrpIQeUwntwRtkf60SbIjxNAdpW0eMEZXE1w7HzFHlRYdkMJFnqY3E', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 'c4',
    title: { ar: 'مقدمة إلى اليونكس', en: 'Introduction to Unix' },
    icon: <Terminal />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1S2WBx5WAI5B99w2-kUtp70cP5cfMEATk', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1eJGsRoab6E8ywsxviStf1XAhaevsy6_4?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Video', url: 'https://drive.google.com/drive/folders/1VC2GngiLpvc52IqDdDdf601_NCT5qRdT?usp=share_link', label: { ar: 'شرح المادة', en: 'Course Explanation' } },
      { type: 'Exam', url: 'https://forms.gle/T1Zz1oSt1QsjLKaD8', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 'c5',
    title: { ar: 'تفاضل وتكامل (1)', en: 'Calculus (1)' },
    icon: <Calculate />,
    links: [
      { type: 'Video', url: 'https://youtu.be/kLsRm_ZaKXQ?si=IVA-cRVuVcUbC9nM', label: { ar: 'شرح المادة / م عبادة الهباهبة', en: 'Course Explanation / Eng. Obaida Al-Habahbeh' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1yfO-6OExZmLYrdKKDwHn8yTpxuLQm_Gf?usp=sharing', label: { ar: 'أسئلة سنوات', en: 'Past Exams' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1hP9FsupfPD0JIMm9fRYWQE8Sbqjk1mcu?usp=sharing', label: { ar: 'ملخص المادة', en: 'Course Summary' } }
    ]
  },
  {
    id: 'c6',
    title: { ar: 'تفاضل وتكامل (2)', en: 'Calculus (2)' },
    icon: <Calculate />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1_Oi0Po1JtHMQkC2F1cFpBJ7_vedOcMZ9?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1vy6kH2G-DfVwJlRpqM3pQgVkHB0IyzEL?usp=sharing', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Video', url: 'https://t.me/c/1555428522/2804', label: { ar: 'شرح المادة / د عروبة الزعبي', en: 'Course Explanation / Dr. Orouba Al-Zoubi' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1VfOFUKXbNMTuPV-6it0vQm6iID7B7yHE?usp=sharing', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  }
];

export const majorRequirements = [
  {
    id: 'm1',
    title: { ar: 'تصميم المنطق الرقمي', en: 'Digital Logic Design' },
    icon: <Computer />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/15CGqPxKxJpYf4KmPZDTMu3KPA8TzYpV9?usp=share_link', label: { ar: 'سلايدات د مي (PDF)', en: 'Slides (Dr. Mai) PDF' } },
      { type: 'Video', url: 'https://youtu.be/uqTY4v_JTj8?si=Nx3uwrMlg8BE2o8b', label: { ar: 'شرح المادة / م مي ابو بقر', en: 'Course Explanation / Eng. Mai Abu Baqar' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/15BUplwUrszcFKUDIr2gjUpRJeX1cIS_0?usp=share_link', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 'm2',
    title: { ar: 'شبكات حاسوب (1)', en: 'Computer Networks (1)' },
    icon: <Cloud />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/14t6DR0kauhB1oAc0jhydahoQDitV13wC', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/17KBjrPv2N-rD7bEaAfGml3CI82xcHXN5?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Video', url: 'https://youtu.be/dp5ytKCTjH8?si=znsQF7mZTWjjJz57', label: { ar: 'شرح المادة', en: 'Course Explanation' } },
      { type: 'Exam', url: 'https://forms.gle/fcDsr16BW1cLccdK6', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 'm3',
    title: { ar: 'أمن شبكات', en: 'Network Security' },
    icon: <Lock />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1SDCi6mlWuCy4xf4uGxaiY1twzz8P1Oup', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1WBnjJ0u8Q3TpR4XatOmJu7P4AEdp4wfX', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Video', url: 'https://t.me/introtoai1/33', label: { ar: 'شرح المادة', en: 'Course Explanation' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1Ds-bFXGUUQI_3cKtSckj3rnACUStACUe?usp=drive_link', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 'm4',
    title: { ar: 'هياكل بيانات', en: 'Data Structures' },
    icon: <Storage />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1OCPGdIguKltQWZIx7Q20W3BuIb4KFA1T?usp=drive_link', label: { ar: 'سلايدات المادة / د ارياف', en: 'Slides / Dr. Aryaf' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1u3_RKDKm5YmQhTU85lREOR3Hg7snWxE4?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Video', url: 'https://docs.google.com/document/d/1KDZsMxHjXJKD_9XXXHzC1bw68x9VmeJkP6vscXfTOHI/edit?tab=t.0', label: { ar: 'شرح المادة', en: 'Course Explanation' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/11x3oLn2BE9xYpug4VArNmoSm0X9uqUA9', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 'm5',
    title: { ar: 'قواعد بيانات', en: 'Database Systems' },
    icon: <Dataset />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1QMxRhCCF-ova4Q0MBLRxOF8uxwRCowxk?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/18Jo0u6hIOfJpe-5UCIFSKbFvddU2Bu6V?usp=share_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Video', url: 'https://drive.google.com/drive/folders/1t7BNfbPUoJAcvf1HXAYKzZ4CJDuDOX_J?usp=drive_link', label: { ar: 'شرح المادة 2024', en: 'Course Explanation 2024' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1u2eCUUY4JaFpw1BE_BzgXskRPdrnDna_?usp=share_link', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 'm6',
    title: { ar: 'استعادة بيانات', en: 'Information Retrieval' },
    icon: <Dataset />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1h5w5oRVMI_8gsQ7aLxOibJKB-5Re2TiL?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1rWg2FACMTiLpu8tRPR8RkM5bgpAwETfu?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } }
    ]
  },
  {
    id: 'm7',
    title: { ar: 'نظم تشغيل للتحقيقات الجنائية', en: 'OS for Forensics' },
    icon: <Gavel />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/14u8_FOxuJH7EgyKZs5ticMsUCUnBtjHW?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/14A-n1nsunkNhpKO-pO4l1kogJXqujKSf?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Video', url: 'https://www.youtube.com/watch?v=NzyuxPtrRRM&list=PLxIvc-MGOs6ib0oK1z9C46DeKd9rRcSMY', label: { ar: 'شرح المادة - يوتيوب', en: 'Course Explanation - YouTube' } }
    ]
  },
  {
    id: 'm8',
    title: { ar: 'القوانين الوطنية للجرائم الالكترونية', en: 'National Cybercrime Laws' },
    icon: <Gavel />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1eUh6rKKLra73HGADehqfk9paDTRJ7tW_?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/u/0/folders/1t376W4TYNz0EguY9yxL2A02vw7IaDzzV', label: { ar: 'ملخص المادة', en: 'Course Summary' } }
    ]
  }
];

export const supportRequirements = [
  {
    id: 's1',
    title: { ar: 'هياكل الرياضيات المنفصلة', en: 'Discrete Mathematics Structures' },
    icon: <Calculate />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1VaUqvsZSSNHcFe6Ddw-jj_VGSPg8KXxk?usp=sharing', label: { ar: 'كتاب المادة', en: 'Course Book' } },
      { type: 'Video', url: 'https://youtu.be/67TUqtB6JBU?si=7Cd4_R8-9e0WHWgW', label: { ar: 'شرح المادة', en: 'Course Explanation' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/19Bz416a_U1jLhSDNi3up8XPZG6dc6TXi?usp=sharing', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1wBVvHzNl-lS4dex5hChehaKl-_mObXGu?usp=sharing', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 's2',
    title: { ar: 'الاحتمالات والاحصاء', en: 'Probability & Statistics' },
    icon: <Calculate />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/file/d/1Anl7NdamDhgjwcSqOYNXWqXYnL3Kzulw/view?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1EqMSIYnnMq03m9ORImQGgL2wKTD6MeZA?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/10YEFFUXYX92op79Ej4pqQqEaagKTf0lM?usp=drive_link', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 's3',
    title: { ar: 'مقدمة في نظرية الأعداد', en: 'Introduction to Number Theory' },
    icon: <Calculate />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1vi8UINqGb_hK0Bf4ta1qPSbrKo5PAVVh?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Video', url: 'https://docs.google.com/document/d/1B0zzW1gXq1lrZlr6aidKcz0RHaDJ24n9rBgsrCmPrxI/edit?tab=t.0', label: { ar: 'شرح المادة', en: 'Course Explanation' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/15nJGLMuErBA99GpwcwE1yn6klnudbhQt?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1BATlRZyPMpB07So7ylj_zCQ1s2Yb5MDQ?usp=drive_link', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 's4',
    title: { ar: 'مبادئ تحليل عددي', en: 'Principles of Numerical Analysis' },
    icon: <Calculate />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1REa44WPeQ27sD185Xwj5O_O5r0u-Plm-?usp=drive_link', label: { ar: 'كتاب المادة', en: 'Course Book' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1CGYblLSbL3-f-fjIkIG_X3jPELPjWYXo', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Video', url: 'https://t.me/finalrevision_numerical', label: { ar: 'شرح المادة', en: 'Course Explanation' } }
    ]
  }
];

export const labs = [
  {
    id: 'l1',
    title: { ar: 'مختبر شبكات حاسوب (1)', en: 'Computer Networks Lab (1)' },
    icon: <Computer />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1k_4bRIL5yHKPVcpi98uKdT-kwOJ6BOh-?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1OcBTgp691XU0yNiY9w7d9NAjDWaERSCg?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Video', url: 'https://t.me/introtoai1/72', label: { ar: 'شرح المادة', en: 'Course Explanation' } }
    ]
  },
  {
    id: 'l2',
    title: { ar: 'مختبر قواعد بيانات', en: 'Database Lab' },
    icon: <Storage />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/18bbPwWQgMfVg8zZ6axob-HuXUuTXSdxU', label: { ar: 'كتاب المادة', en: 'Course Book' } },
      { type: 'Summary', url: 'https://drive.google.com/drive/folders/1GtVZTtX3ry5ibgBBU4uC8nu_eij1KV2r?usp=drive_link', label: { ar: 'ملخص المادة', en: 'Course Summary' } },
      { type: 'Video', url: 'https://t.me/ITLecturesBAU/3150', label: { ar: 'شرح المادة', en: 'Course Explanation' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1pkiJEQKNeHHNS6w9VThTaP32kYqZ9WDP?usp=sharing', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 'l3',
    title: { ar: 'مختبر هياكل بيانات', en: 'Data Structures Lab' },
    icon: <Code />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1C6D_XlMleF8WYNXeWGR35QLb0El8PVwu?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Video', url: 'https://drive.google.com/drive/folders/105ZUR0rpaE7bkI9fP9NWPXc6H2C_OAvL?usp=drive_link', label: { ar: 'شرح المادة', en: 'Course Explanation' } }
    ]
  }
];

export const remedial = [
  {
    id: 'r1',
    title: { ar: 'عربي استدراكي', en: 'Remedial Arabic' },
    icon: <Language />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/my-drive?hl=ar', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1-45xO3bDxy28cuQk63uzvYvSfiEP4M2J?usp=share_link', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 'r2',
    title: { ar: 'إنجليزي استدراكي', en: 'Remedial English' },
    icon: <Language />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/drive/folders/1RpOKiNi5E-LqNr1hkom4339KiVhqKBzU?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1LlB8IKi9nYqMMqM3oDIisSeUrD1i41K1?usp=drive_link', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  },
  {
    id: 'r3',
    title: { ar: 'حاسوب استدراكي', en: 'Remedial Computer Skills' },
    icon: <Computer />,
    links: [
      { type: 'PDF', url: 'https://drive.google.com/file/d/1bfsu3-LIiSfRdGS5RG9xOAAHMhHPIZGy/view?usp=drive_link', label: { ar: 'ملف المادة (PDF)', en: 'Course File (PDF)' } },
      { type: 'Exam', url: 'https://drive.google.com/drive/folders/1eabN3Gl45jnVLFDJog6fZcQvjL5WFcZ-?usp=drive_link', label: { ar: 'أسئلة السنوات السابقة', en: 'Past Exams' } }
    ]
  }
];