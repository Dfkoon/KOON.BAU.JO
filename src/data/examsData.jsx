import React from 'react';
import { Calculate, Functions } from '@mui/icons-material';

// Categories of exams (can be expanded later like courses)
export const examsList = [
    {
        id: 'numerical-analysis',
        title: {
            ar: 'مبادئ التحليل العددي',
            en: 'Numerical Analysis Principles'
        },
        icon: <Calculate fontSize="large" />,
        quizzes: [
            {
                id: 'qm-1',
                title: { ar: 'كويز تفاعلي 1 (مصفوفات)', en: 'Interactive Quiz 1 (Matrices)' },
                questions: [
                    {
                        id: 'q1',
                        text: 'Find the Cofactor entry C34 for the matrix A:\n\n    [-3  0  2  5]\nA = [-2  1  0 -1]\n    [ 4  2  6  3]\n    [ 3 -1 -4 -5]',
                        options: ['32', '-55', '55', '-10', '10'],
                        correctAnswer: '-10'
                    },
                    {
                        id: 'q2',
                        text: 'The value of x1 using Cramer\'s Rule for the System:\n\nx1 - 3x2 + x3 = 4\n2x1 - x2 = -2\n4x1 - 3x3 = 0',
                        options: ['2/11', '-1/11', '-30/11', '3/11', '-38/11'],
                        correctAnswer: '-30/11'
                    },
                    {
                        id: 'q3',
                        text: 'Find the Inverse of the matrix A:\n\n    [2 6 6]\nA = [2 7 6]\n    [2 7 7]',
                        options: [
                            '[ [3/2, -11/10, -6/5], [-1, 1, 1], ... ]',
                            '[ [1, 3, 1], [0, 1, -1], [-2, 2, 0] ]',
                            '[ [7/2, 0, -3], [-1, 1, 0], [0, -1, 1] ]',
                            '[ [1/3, 0, 1], [1/4, -3/4, 5], ... ]'
                        ],
                        correctAnswer: '[ [7/2, 0, -3], [-1, 1, 0], [0, -1, 1] ]'
                    },
                    {
                        id: 'q4',
                        text: 'The easiest choice to evaluate the determinant of matrix A:\n\n    [-6  0  9  1]\nA = [-2  0  0 -1]\n    [ 4  2  0  3]\n    [ 3 -1  0 10]',
                        options: [
                            'Row 4 Expansion',
                            'Col 2 Expansion',
                            'Row 2 Expansion',
                            'Col 3 Expansion'
                        ],
                        correctAnswer: 'Col 3 Expansion'
                    }
                ]
            }
        ],
        links: [
            {
                label: { ar: 'امتحان أول 2024', en: 'First Exam 2024' },
                url: '#',
                type: 'PDF'
            },
            {
                label: { ar: 'امتحان ثاني 2023', en: 'Second Exam 2023' },
                url: '#',
                type: 'PDF'
            },
            {
                label: { ar: 'كويزات سنوات سابقة', en: 'Past Quizzes' },
                url: '#', // Placeholder
                type: 'PDF'
            },
            {
                label: { ar: 'أسئلة سنوات نهائي', en: 'Final Years Questions' },
                url: '#', // Placeholder
                type: 'PDF'
            }
        ]
    }
];
