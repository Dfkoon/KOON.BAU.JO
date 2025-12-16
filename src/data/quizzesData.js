export const quizzesData = {
    "c5": { // Matches "تفاضل وتكامل 1" id from coursesData if possible, or just use a unique key
        title: "تفاضل وتكامل 1",
        quizzes: [
            {
                id: "q_calc1_1",
                title: "اختبار قصير: النهايات والاتصال",
                questions: [
                    {
                        question: "ما هي نهاية الدالة f(x) = x^2 عندما تقترب x من 3؟",
                        options: ["6", "9", "3", "0"],
                        answer: 1 // Index of the correct answer (9)
                    },
                    {
                        question: "إذا كانت f(x) = 1/x، هل الدالة متصلة عند x = 0؟",
                        options: ["نعم", "لا", "غير معرفة", "ربما"],
                        answer: 1
                    },
                    {
                        question: "قيمة lim (x->0) sin(x)/x هي:",
                        options: ["0", "1", "undefined", "infinity"],
                        answer: 1
                    }
                ]
            },
            {
                id: "q_calc1_2",
                title: "اختبار قصير: قواعد الاشتقاق",
                questions: [
                    {
                        question: "ما هي مشتقة sin(x)؟",
                        options: ["cos(x)", "-cos(x)", "tan(x)", "-sin(x)"],
                        answer: 0
                    },
                    {
                        question: "مشتقة الثابت تساوي:",
                        options: ["1", "الثابت نفسه", "0", "x"],
                        answer: 2
                    }
                ]
            }
        ]
    },
    "c1": {
        title: "مهارات حاسوب 2",
        quizzes: [
            {
                id: "q_cs2_1",
                title: "C++ Basics",
                questions: [
                    {
                        question: "Any Valid C++ program must contain which function?",
                        options: ["start()", "main()", "program()", "run()"],
                        answer: 1
                    },
                    {
                        question: "Which of the following is a correct comment in C++?",
                        options: ["*/ Comment */", "// Comment", "# Comment", "<!-- Comment -->"],
                        answer: 1
                    }
                ]
            }
        ]
    }
};
