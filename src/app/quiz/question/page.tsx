import { QuestionCard } from '@/features/quiz/question/QuestionCard';
import layoutStyles from '../../home.module.scss';

export const dynamic = 'force-static';

export default function QuizQuestionPage() {
    return (
        <main className={`${layoutStyles.root} page-fade-in`}>
            <QuestionCard />
        </main>
    );
}

