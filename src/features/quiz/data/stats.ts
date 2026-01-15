export type OptionStats = {
    optionId: string;
    percentage: number;
    votes: number;
};

export type QuestionStats = {
    questionId: string;
    options: OptionStats[];
    totalVotes: number;
};

export const MOCK_QUESTION_STATS: Record<string, QuestionStats> = {
    q1: {
        questionId: 'q1',
        totalVotes: 518,
        options: [
            { optionId: 'a', percentage: 68, votes: 352 },
            { optionId: 'b', percentage: 22, votes: 114 },
            { optionId: 'c', percentage: 6, votes: 31 },
            { optionId: 'd', percentage: 4, votes: 21 },
        ],
    },
    q2: {
        questionId: 'q2',
        totalVotes: 423,
        options: [
            { optionId: 'a', percentage: 8, votes: 34 },
            { optionId: 'b', percentage: 72, votes: 304 },
            { optionId: 'c', percentage: 15, votes: 63 },
            { optionId: 'd', percentage: 5, votes: 22 },
        ],
    },
    q3: {
        questionId: 'q3',
        totalVotes: 387,
        options: [
            { optionId: 'a', percentage: 12, votes: 46 },
            { optionId: 'b', percentage: 65, votes: 252 },
            { optionId: 'c', percentage: 18, votes: 70 },
            { optionId: 'd', percentage: 5, votes: 19 },
        ],
    },
    q4: {
        questionId: 'q4',
        totalVotes: 445,
        options: [
            { optionId: 'a', percentage: 3, votes: 13 },
            { optionId: 'b', percentage: 7, votes: 31 },
            { optionId: 'c', percentage: 85, votes: 378 },
            { optionId: 'd', percentage: 5, votes: 23 },
        ],
    },
    q5: {
        questionId: 'q5',
        totalVotes: 401,
        options: [
            { optionId: 'a', percentage: 15, votes: 60 },
            { optionId: 'b', percentage: 71, votes: 285 },
            { optionId: 'c', percentage: 10, votes: 40 },
            { optionId: 'd', percentage: 4, votes: 16 },
        ],
    },
};

export function getQuestionStats(questionId: string): QuestionStats | null {
    return MOCK_QUESTION_STATS[questionId] || null;
}

