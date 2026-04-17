import type { Metadata } from 'next';
import { QuizSessionPage } from '@/components/quizzes/quiz-session-page';

export const metadata: Metadata = {
  title: 'Quiz | CostWise',
  description: 'Test your financial literacy knowledge.',
};

export default async function QuizModulePage({ params }: { params: Promise<{ moduleSlug: string }> }) {
  const { moduleSlug } = await params;
  return <QuizSessionPage moduleSlug={moduleSlug} />;
}
