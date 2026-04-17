'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Lightbulb, TrendingUp, Award, CheckCircle2, XCircle, Lock, X } from 'lucide-react';
import { ScoreSummary } from './score-summary';
import quizData from '@/lib/api/mock-data/quiz-questions.json';
import { useRouter } from 'next/navigation';
import { NavigationWrapper } from '@/components/nav/navigation-wrapper';
import { useAuth } from '@/contexts/auth-context';

interface QuizSessionPageProps {
  moduleSlug: string;
}

export function QuizSessionPage({ moduleSlug }: QuizSessionPageProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const quiz = quizData.quizzes.find(q => q.slug === moduleSlug);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(quiz?.questions.length || 0).fill(null)
  );
  const [isCompleted, setIsCompleted] = useState(false);

  // Check authentication when component mounts
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowAuthModal(true);
    }
  }, [isAuthenticated, isLoading]);

  const handleSignIn = () => {
    router.push(`/auth?redirect=/quizzes/${moduleSlug}`);
  };

  const handleGoBack = () => {
    router.push('/quizzes');
  };

  if (!quiz) {
    return (
      <div className="min-h-screen bg-[#F5F7FF]">
        <NavigationWrapper activeLink="quizzes" />
        <main className="pt-24 pb-20 px-4 max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-2xl font-bold text-[#1C3FA8]">Quiz not found</h1>
          <button
            onClick={() => router.push('/quizzes')}
            className="bg-[#E53935] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all"
          >
            Back to Quizzes
          </button>
        </main>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsCompleted(true);
  };

  const calculateScore = () => {
    return answers.reduce((score: number, answer, index) => {
      if (answer === quiz.questions[index].correctIndex) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  const getQuestionText = (q: any) => q.question || q.text;

  // Show auth modal if not authenticated
  if (showAuthModal) {
    return (
      <div className="min-h-screen bg-[#F5F7FF]">
        <NavigationWrapper activeLink="quizzes" />
        <main className="pt-24 pb-20 px-4 flex items-center justify-center min-h-[calc(100vh-6rem)]">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#FFF9C4] rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-[#FDD835]" />
              </div>
              
              <h3 className="text-2xl font-black text-[#1C3FA8] mb-2">
                Sign In Required
              </h3>
              
              <p className="text-[#1A237E]/70 mb-6">
                Create an account or sign in to track your quiz progress, earn badges, and compete on the leaderboard!
              </p>

              <div className="flex flex-col gap-3 w-full">
                <button
                  onClick={handleSignIn}
                  className="w-full bg-[#1C3FA8] text-white font-bold py-3 px-6 rounded-xl hover:bg-[#0D2B6B] transition-all"
                >
                  Sign In to Continue
                </button>
                
                <button
                  onClick={handleGoBack}
                  className="w-full border-2 border-gray-300 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all"
                >
                  Back to Quizzes
                </button>
              </div>

              <p className="text-xs text-[#1A237E]/60 mt-4">
                Don't have an account? Sign up takes less than a minute!
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#F5F7FF]">
        <NavigationWrapper activeLink="quizzes" />
        <main className="pt-24 pb-20 px-4 flex items-center justify-center min-h-[calc(100vh-6rem)]">
          <div className="w-full max-w-2xl">
            <ScoreSummary
              score={calculateScore()}
              total={quiz.questions.length}
              quizTitle={quiz.title}
              onRetake={() => {
                setAnswers(new Array(quiz.questions.length).fill(null));
                setCurrentQuestionIndex(0);
                setIsCompleted(false);
              }}
              onBackToQuizzes={() => router.push('/quizzes')}
            />
          </div>
        </main>
      </div>
    );
  }

  const allAnswered = answers.every(a => a !== null);
  const selectedAnswer = answers[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctIndex;

  return (
    <div className="min-h-screen bg-[#F5F7FF] text-[#1A237E]">
      {/* Header */}
      <NavigationWrapper activeLink="quizzes" />

      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/quizzes"
          className="inline-flex items-center gap-2 text-[#1C3FA8] font-semibold mb-6 hover:text-[#E53935] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Quizzes
        </Link>

        {/* Quiz Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-6">
            <div>
              <span className="bg-[#FDD835] text-[#4A3B00] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider inline-block mb-3">
                Level 4 • Inflation Awareness
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-[#1C3FA8]">{quiz.title}</h1>
            </div>
            <div className="text-left md:text-right">
              <span className="text-[#1A237E]/70 font-bold text-sm block mb-2">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
              <div className="w-full md:w-40 h-3 bg-[#C5D3FF] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E53935] rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Question Card */}
            <div className="bg-white border-2 border-[#C5D3FF] rounded-3xl p-8 shadow-sm">
              <div className="flex items-start gap-4 mb-8">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#1C3FA8] text-white flex items-center justify-center font-black text-xl">
                  {currentQuestionIndex + 1}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-[#1C3FA8] leading-tight pt-2">
                  {getQuestionText(currentQuestion)}
                </h2>
              </div>
              
              <div className="space-y-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectOption = index === currentQuestion.correctIndex;
                  const showCorrect = isSelected && isCorrect;
                  const showIncorrect = isSelected && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`group relative flex items-center w-full p-5 border-2 rounded-2xl transition-all ${
                        showCorrect
                          ? 'border-[#4CAF50] bg-[#E8F5E9]'
                          : showIncorrect
                          ? 'border-[#E53935] bg-[#FFEBEE] opacity-70'
                          : isSelected
                          ? 'border-[#1C3FA8] bg-[#E3F2FD]'
                          : 'border-[#C5D3FF] bg-white hover:border-[#1C3FA8] hover:bg-[#F5F7FF]'
                      } ${selectedAnswer !== null ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg mr-4 ${
                          showCorrect
                            ? 'bg-[#4CAF50] text-white shadow-md'
                            : showIncorrect
                            ? 'bg-[#E53935] text-white'
                            : isSelected
                            ? 'bg-[#1C3FA8] text-white'
                            : 'border-2 border-[#C5D3FF] text-[#1A237E] group-hover:border-[#1C3FA8]'
                        }`}
                      >
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className={`font-medium text-left ${showCorrect || isSelected ? 'font-bold' : ''}`}>
                        {option}
                      </span>
                      {showCorrect && (
                        <div className="ml-auto flex items-center gap-2 px-4 py-2 bg-[#4CAF50] rounded-xl">
                          <CheckCircle2 className="h-5 w-5 text-white" />
                          <span className="text-sm font-black text-white uppercase tracking-wider">
                            Correct!
                          </span>
                        </div>
                      )}
                      {showIncorrect && (
                        <div className="ml-auto">
                          <XCircle className="h-6 w-6 text-[#E53935]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Knowledge Nugget */}
            {selectedAnswer !== null && currentQuestion.explanation && (
              <div className="bg-[#FFFDE7] border-2 border-[#FDD835] rounded-3xl p-6 flex gap-4 items-start">
                <div className="flex-shrink-0 bg-[#FDD835] p-3 rounded-xl text-[#4A3B00]">
                  <Lightbulb className="h-6 w-6 fill-current" />
                </div>
                <div>
                  <h4 className="font-black text-[#4A3B00] mb-2 text-lg">Knowledge Nugget</h4>
                  <p className="text-sm text-[#4A3B00]/90 leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center py-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2 text-[#1C3FA8] font-bold px-6 py-3 hover:bg-[#1C3FA8]/5 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-5 w-5" />
                Previous
              </button>
              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="flex items-center gap-2 bg-[#E53935] text-white font-black px-8 py-4 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Quiz
                  <ArrowRight className="h-5 w-5" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className="flex items-center gap-2 bg-[#E53935] text-white font-black px-8 py-4 rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Question
                  <ArrowRight className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="lg:col-span-4 space-y-6">
            {/* Progress Card */}
            <div className="bg-[#1C3FA8] p-6 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingUp className="h-24 w-24" strokeWidth={1.5} />
              </div>
              <div className="relative z-10">
                <h3 className="text-lg font-black mb-3">Your Progress</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-semibold">Answered</span>
                      <span className="font-black">{answers.filter(a => a !== null).length}/{quiz.questions.length}</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#FDD835] rounded-full transition-all"
                        style={{ width: `${(answers.filter(a => a !== null).length / quiz.questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm leading-snug pt-2">
                    Keep going! You're building strong inflation awareness skills.
                  </p>
                </div>
              </div>
            </div>

            {/* Achievement Card */}
            <div className="bg-white border-2 border-[#C5D3FF] rounded-3xl p-6 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <Award className="h-8 w-8 text-[#FDD835]" />
                <span className="bg-[#FFFDE7] text-[#4A3B00] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                  Level 4
                </span>
              </div>
              <h3 className="text-xl font-black text-[#1C3FA8] mb-2">Econ Scholar</h3>
              <p className="text-sm text-[#1A237E]/70 mb-4">
                150 points until your next rank. Keep the streak alive!
              </p>
              <div className="w-full h-2.5 bg-[#C5D3FF] rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-[#E53935] rounded-full"></div>
              </div>
            </div>

            {/* Community Card */}
            <div className="bg-[#FFFDE7] border-2 border-[#FDD835] rounded-3xl p-6">
              <h3 className="text-lg font-black text-[#4A3B00] mb-3">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4A3B00]/80">Average Score</span>
                  <span className="font-black text-[#4A3B00]">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#4A3B00]/80">Participants</span>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full border-2 border-[#FFFDE7] overflow-hidden bg-slate-200 relative">
                      <Image 
                        alt="User" 
                        className="object-cover"
                        src="https://i.pravatar.cc/150?img=1"
                        fill
                        sizes="24px"
                      />
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-[#FFFDE7] overflow-hidden bg-slate-200 relative">
                      <Image 
                        alt="User" 
                        className="object-cover"
                        src="https://i.pravatar.cc/150?img=2"
                        fill
                        sizes="24px"
                      />
                    </div>
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-[#FFFDE7] bg-[#FDD835] text-[9px] font-black text-[#4A3B00]">
                      +12k
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
