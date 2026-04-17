'use client';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface QuestionBlockProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  showCorrectAnswer?: boolean;
}

export function QuestionBlock({
  question,
  selectedAnswer,
  onSelectAnswer,
  showCorrectAnswer = false,
}: QuestionBlockProps) {
  return (
    <Card className="p-6 space-y-6">
      <h2 className="text-xl font-semibold text-foreground">
        {question.text}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctIndex;
          const showAsCorrect = showCorrectAnswer && isCorrect;
          const showAsIncorrect = showCorrectAnswer && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => onSelectAnswer(index)}
              disabled={showCorrectAnswer}
              className={cn(
                'w-full text-left p-4 rounded-lg border-2 transition-all',
                'hover:border-primary hover:bg-primary/5',
                isSelected && !showCorrectAnswer && 'border-primary bg-primary/10',
                showAsCorrect && 'border-success bg-success/10',
                showAsIncorrect && 'border-destructive bg-destructive/10',
                !isSelected && !showCorrectAnswer && 'border-border'
              )}
            >
              <div className="flex items-start gap-3">
                <span className={cn(
                  'flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium',
                  isSelected && !showCorrectAnswer && 'border-primary bg-primary text-primary-foreground',
                  showAsCorrect && 'border-success bg-success text-success-foreground',
                  showAsIncorrect && 'border-destructive bg-destructive text-destructive-foreground',
                  !isSelected && !showCorrectAnswer && 'border-muted-foreground'
                )}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {showCorrectAnswer && (
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">Explanation:</p>
          <p className="text-sm text-muted-foreground">{question.explanation}</p>
        </div>
      )}
    </Card>
  );
}
