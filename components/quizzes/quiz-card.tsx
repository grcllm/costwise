'use client';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

interface QuizCardProps {
  quiz: {
    slug: string;
    title: string;
    linkedLearnSlug: string;
    questions: Array<{ id: string }>;
  };
}

export function QuizCard({ quiz }: QuizCardProps) {
  // TODO: Get completion status from browser storage
  const isCompleted = false;
  const score = null;

  return (
    <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold text-foreground">{quiz.title}</h3>
          {isCompleted && (
            <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
          )}
        </div>
        
        <p className="text-sm text-muted-foreground">
          {quiz.questions.length} questions
        </p>

        {score !== null && (
          <Badge variant="secondary">
            Score: {score}/{quiz.questions.length}
          </Badge>
        )}
      </div>

      <div className="flex gap-2">
        <Link 
          href={`/quizzes/${quiz.slug}`}
          className="flex-1 inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 px-4 py-2 text-sm font-medium transition-colors"
        >
          {isCompleted ? 'Retake Quiz' : 'Start Quiz'}
        </Link>
        
        <Link 
          href={`/learn/${quiz.linkedLearnSlug}`}
          className="inline-flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground px-4 py-2 text-sm font-medium transition-colors"
        >
          Review Material
        </Link>
      </div>
    </Card>
  );
}
