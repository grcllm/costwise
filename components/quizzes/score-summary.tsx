'use client';
import { Trophy, RotateCcw, ArrowLeft, TrendingUp, Award, Star } from 'lucide-react';

interface ScoreSummaryProps {
  score: number;
  total: number;
  quizTitle: string;
  onRetake: () => void;
  onBackToQuizzes: () => void;
}

export function ScoreSummary({
  score,
  total,
  quizTitle,
  onRetake,
  onBackToQuizzes,
}: ScoreSummaryProps) {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;

  return (
    <div className="space-y-4">
      {/* Main Score Card */}
      <div className={`relative overflow-hidden rounded-3xl p-6 text-center ${
        passed 
          ? 'bg-gradient-to-br from-[#1C3FA8] to-[#0D2B6B]' 
          : 'bg-gradient-to-br from-[#E53935] to-[#C62828]'
      }`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-3 right-3">
            <Trophy className="h-16 w-16" strokeWidth={1} />
          </div>
        </div>

        <div className="relative z-10 space-y-3">
          {/* Icon */}
          <div className="flex justify-center">
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
              passed ? 'bg-[#FDD835]' : 'bg-white/20'
            }`}>
              {passed ? (
                <Trophy className="h-7 w-7 text-[#4A3B00]" />
              ) : (
                <TrendingUp className="h-7 w-7 text-white" />
              )}
            </div>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white mb-1">
              {passed ? 'Congratulations!' : 'Keep Learning!'}
            </h1>
            <p className="text-white/90 text-sm">
              {quizTitle}
            </p>
          </div>

          {/* Score Display */}
          <div className="py-3">
            <div className="text-5xl md:text-6xl font-black text-white mb-1">
              {percentage}%
            </div>
            <div className="text-base text-white/90 font-semibold">
              {score} out of {total} correct
            </div>
          </div>

          {/* Message */}
          <div className="max-w-md mx-auto">
            <p className="text-xs text-white/90">
              {passed 
                ? "Great work! You've mastered this topic." 
                : "Review the material and try again!"}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border-2 border-[#C5D3FF] rounded-2xl p-4 text-center">
          <div className="w-8 h-8 rounded-lg bg-[#1C3FA8] flex items-center justify-center mx-auto mb-2">
            <Trophy className="h-4 w-4 text-white" />
          </div>
          <div className="text-xl font-black text-[#1C3FA8]">{score}</div>
          <div className="text-[10px] text-[#1A237E]/70 font-semibold">Correct</div>
        </div>

        <div className="bg-white border-2 border-[#C5D3FF] rounded-2xl p-4 text-center">
          <div className="w-8 h-8 rounded-lg bg-[#FDD835] flex items-center justify-center mx-auto mb-2">
            <Award className="h-4 w-4 text-[#4A3B00]" />
          </div>
          <div className="text-xl font-black text-[#1C3FA8]">{percentage}%</div>
          <div className="text-[10px] text-[#1A237E]/70 font-semibold">Accuracy</div>
        </div>

        <div className="bg-white border-2 border-[#C5D3FF] rounded-2xl p-4 text-center">
          <div className="w-8 h-8 rounded-lg bg-[#E53935] flex items-center justify-center mx-auto mb-2">
            <Star className="h-4 w-4 text-white" />
          </div>
          <div className="text-xl font-black text-[#1C3FA8]">+{score * 10}</div>
          <div className="text-[10px] text-[#1A237E]/70 font-semibold">Points</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onBackToQuizzes}
          className="flex items-center justify-center gap-2 px-5 py-2.5 border-2 border-[#1C3FA8] text-[#1C3FA8] font-bold text-sm rounded-xl hover:bg-[#1C3FA8] hover:text-white transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Quizzes
        </button>
        <button
          onClick={onRetake}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#E53935] text-white font-bold text-sm rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
        >
          <RotateCcw className="h-4 w-4" />
          Retake Quiz
        </button>
      </div>
    </div>
  );
}
