'use client';
import { GlobalHeader } from '@/components/nav/global-header';
import { PageFooter } from '@/components/common/page-footer';
import { QuizCard } from './quiz-card';
import quizData from '@/lib/api/mock-data/quiz-questions.json';

export function QuizzesListPage() {
  const quizzes = quizData.quizzes;

  return (
    <>
      <GlobalHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Inflation Awareness Quizzes</h1>
          <p className="text-muted-foreground text-lg">
            Test your knowledge and master inflation concepts with our interactive quizzes.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.slug} quiz={quiz} />
          ))}
        </div>
      </main>
      <PageFooter />
    </>
  );
}
