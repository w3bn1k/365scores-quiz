'use client';

import { useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../data/questions';
import { getQuestionStats } from '../data/stats';
import { useQuizSelectorShallow, useQuizStore } from '../store/quizStore';
import { OptionButton } from './OptionButton';
import { QuizSummary } from './QuizSummary';
import styles from './question.module.scss';

export function QuestionCard() {
    const start = useQuizStore((s) => s.start);
    const confirmSelection = useQuizStore((s) => s.confirmSelection);
    const next = useQuizStore((s) => s.next);

    const { status, question, index, total, selectedOptionId } = useQuizSelectorShallow((s) => ({
        status: s.status,
        question: s.questions[s.currentIndex],
        index: s.currentIndex,
        total: s.questions.length,
        selectedOptionId: s.selectedOptionId,
    }));

    useEffect(() => {
        if (status === 'idle') start(QUIZ_QUESTIONS);
    }, [start, status]);

    if (status === 'finished') {
        return <QuizSummary />;
    }

    if (!question) {
        return (
            <div className={styles.card} aria-busy="true">
                <div className={styles.header}>
                    <div className={styles.title}>Loading question…</div>
                </div>
            </div>
        );
    }

    const isAnswered = status === 'answered';
    const canConfirm = status === 'in_progress' && !!selectedOptionId;
    const canGoNext = isAnswered;

    return (
        <section className={styles.card} aria-label="Quiz question">
            <header className={styles.header}>
                <div className={styles.kicker}>
                    Question {index + 1} / {total || 1}
                </div>
                <h1 className={styles.title}>{question.text}</h1>
            </header>

            <div className={styles.options} role="group" aria-label="Answer options">
                {question.options.map((o) => {
                    const stats = getQuestionStats(question.id);
                    const optionStats = stats?.options.find((s) => s.optionId === o.id);
                    return (
                        <OptionButton
                            key={o.id}
                            optionId={o.id}
                            label={o.label}
                            percentage={optionStats?.percentage}
                            votes={optionStats?.votes}
                        />
                    );
                })}
            </div>

            <footer className={styles.footer}>
                <button
                    type="button"
                    className={styles.next}
                    onClick={isAnswered ? next : confirmSelection}
                    disabled={isAnswered ? !canGoNext : !canConfirm}
                >
                    {isAnswered ? 'Next' : 'Confirm'}
                </button>
                <div className={styles.hint}>
                    {isAnswered ? 'Answer locked, go next.' : 'Pick an option, then confirm.'}
                </div>
            </footer>
        </section>
    );
}


