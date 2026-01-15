import Link from 'next/link';
import styles from './home.module.scss';

export default function HomePage() {
    return (
        <main className={`${styles.root} page-fade-in`}>
            <h1 className={styles.title}>365Scores Quiz</h1>
            <p className={styles.subtitle}>
                Proof-of-concept focused on the <strong>Question page</strong> architecture and data flow.
            </p>
            <Link href="/quiz/question" className={styles.cta}>
                Go to Question page →
            </Link>
        </main>
    );
}


