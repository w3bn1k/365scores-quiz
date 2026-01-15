import type { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
    {
        id: 'q1',
        text: 'Which team won the 2022 FIFA World Cup?',
        options: [
            { id: 'a', label: 'Argentina' },
            { id: 'b', label: 'France' },
            { id: 'c', label: 'Croatia' },
            { id: 'd', label: 'Brazil' },
        ],
        correctOptionId: 'a',
    },
    {
        id: 'q2',
        text: 'In basketball, how many points is a standard field goal worth (not a 3-pointer)?',
        options: [
            { id: 'a', label: '1' },
            { id: 'b', label: '2' },
            { id: 'c', label: '3' },
            { id: 'd', label: '4' },
        ],
        correctOptionId: 'b',
    },
    {
        id: 'q3',
        text: 'In tennis, what is the term for a score of 40–40?',
        options: [
            { id: 'a', label: 'Tie' },
            { id: 'b', label: 'Deuce' },
            { id: 'c', label: 'Advantage' },
            { id: 'd', label: 'Break point' },
        ],
        correctOptionId: 'b',
    },
    {
        id: 'q4',
        text: 'How many players are on the field for one team in a standard football (soccer) match?',
        options: [
            { id: 'a', label: '9' },
            { id: 'b', label: '10' },
            { id: 'c', label: '11' },
            { id: 'd', label: '12' },
        ],
        correctOptionId: 'c',
    },
    {
        id: 'q5',
        text: 'In the NBA, how long is a regulation quarter?',
        options: [
            { id: 'a', label: '10 minutes' },
            { id: 'b', label: '12 minutes' },
            { id: 'c', label: '15 minutes' },
            { id: 'd', label: '20 minutes' },
        ],
        correctOptionId: 'b',
    },
];


