'use client';

import { memo, useCallback } from 'react';
import { useQuizSelectorShallow, useQuizStore } from '../store/quizStore';
import styles from './question.module.scss';

type Props = {
    optionId: string;
    label: string;
    percentage?: number;
    votes?: number;
};

function OptionButtonImpl({ optionId, label, percentage, votes }: Props) {
    const { status, selectedOptionId, isCorrect } = useQuizSelectorShallow((s) => ({
        status: s.status,
        selectedOptionId: s.selectedOptionId,
        isCorrect: s.isCorrect,
    }));

    const selectOption = useQuizStore((s) => s.selectOption);

    const isAnswered = status === 'answered';
    const isSelected = selectedOptionId === optionId;

    const onClick = useCallback(() => {
        selectOption(optionId);
    }, [optionId, selectOption]);

    const variantClass =
        isAnswered && isSelected ? (isCorrect ? styles.optionCorrect : styles.optionWrong) : '';
    const showStats = isAnswered && percentage !== undefined && votes !== undefined;

    return (
        <button
            type="button"
            className={`${styles.option} ${isSelected ? styles.optionSelected : ''} ${variantClass} ${isAnswered && isSelected && !isCorrect ? styles.optionWrongSelected : ''
                }`}
            onClick={onClick}
            disabled={isAnswered}
            aria-pressed={isSelected}
        >
            <span className={styles.optionLabel}>{label}</span>
            {showStats && (
                <span className={styles.optionStats}>
                    <span className={styles.optionPercentage}>{percentage}%</span>
                    <span className={styles.optionVotes}>{votes}</span>
                    {isAnswered && (
                        <span className={styles.optionIcon} aria-hidden="true">
                            {isSelected && (isCorrect ? '✓' : '✗')}
                        </span>
                    )}
                </span>
            )}
        </button>
    );
}

export const OptionButton = memo(OptionButtonImpl);


