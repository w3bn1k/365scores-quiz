'use client';

import { useQuizSelectorShallow, useQuizStore } from '../store/quizStore';
import styles from './question.module.scss';

export function QuizSummary() {
  const { correctCount, total } = useQuizSelectorShallow((s) => ({
    correctCount: s.correctCount,
    total: s.questions.length,
  }));

  const reset = useQuizStore((s) => s.reset);

  const percent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  return (
    <section className={styles.card} aria-label="Quiz summary">
      <header className={styles.header}>
        <div className={styles.kicker}>Quiz finished</div>
        <h1 className={styles.title}>Your results</h1>
      </header>
      <div className={styles.summaryBody}>
        <p className={styles.summaryMain}>
          You answered <strong>{correctCount}</strong> out of <strong>{total}</strong> questions correctly.
        </p>
        <p className={styles.summaryMeta}>
          Accuracy: <strong>{percent}%</strong>
        </p>
      </div>
      <footer className={styles.footer}>
        <button type="button" className={styles.next} onClick={reset}>
          Restart quiz
        </button>
        <div className={styles.hint}>Restart to try again with the same questions.</div>
      </footer>
    </section>
  );
}


