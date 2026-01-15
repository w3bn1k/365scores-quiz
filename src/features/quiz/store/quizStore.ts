import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import type { QuizQuestion, QuizStatus } from '../types';

type QuizState = {
    status: QuizStatus;
    questions: QuizQuestion[];
    currentIndex: number;
    selectedOptionId: string | null;
    isCorrect: boolean | null;
    answeredCount: number;
    correctCount: number;
};

type QuizActions = {
    start: (questions: QuizQuestion[]) => void;
    selectOption: (optionId: string) => void;
    confirmSelection: () => void;
    next: () => void;
    reset: () => void;
};

export type QuizStore = QuizState & QuizActions;

const initialState: QuizState = {
    status: 'idle',
    questions: [],
    currentIndex: 0,
    selectedOptionId: null,
    isCorrect: null,
    answeredCount: 0,
    correctCount: 0,
};

export const useQuizStore = create<QuizStore>((set, get) => ({
    ...initialState,
    start: (questions) => {
        set({
            status: 'in_progress',
            questions,
            currentIndex: 0,
            selectedOptionId: null,
            isCorrect: null,
            answeredCount: 0,
            correctCount: 0,
        });
    },
    selectOption: (optionId) => {
        const { status } = get();
        if (status !== 'in_progress') return;
        set({
            selectedOptionId: optionId,
            isCorrect: null,
        });
    },
    confirmSelection: () => {
        const { questions, currentIndex, selectedOptionId, status, answeredCount, correctCount } = get();
        if (status !== 'in_progress' || !selectedOptionId) return;
        const current = questions[currentIndex];
        if (!current) return;
        const isCorrect = selectedOptionId === current.correctOptionId;
        set({
            status: 'answered',
            isCorrect,
            answeredCount: answeredCount + 1,
            correctCount: correctCount + (isCorrect ? 1 : 0),
        });
    },
    next: () => {
        const { questions, currentIndex } = get();
        const nextIndex = currentIndex + 1;
        if (nextIndex >= questions.length) {
            set({
                status: 'finished',
                selectedOptionId: null,
                isCorrect: null,
            });
            return;
        }
        set({
            status: 'in_progress',
            currentIndex: nextIndex,
            selectedOptionId: null,
            isCorrect: null,
        });
    },
    reset: () => set({ ...initialState }),
}));

export function useQuizSelector<T>(selector: (s: QuizStore) => T): T {
    return useQuizStore(selector);
}

export function useQuizSelectorShallow<T>(selector: (s: QuizStore) => T): T {
    return useQuizStore(useShallow(selector));
}

