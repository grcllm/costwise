import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:            5 * 60 * 1000,
      gcTime:               10 * 60 * 1000,
      retry:                1,
      refetchOnWindowFocus: false,
      refetchOnReconnect:   true,
    },
  },
});

export const queryKeys = {
  tips:           ['tips'] as const,
  tipsList:       (category?: string) => ['tips', 'list', category] as const,
  quizzes:        ['quizzes'] as const,
  quizzesList:    () => ['quizzes', 'list'] as const,
  quiz:           (slug: string) => ['quizzes', 'detail', slug] as const,
  inflationData:  ['simulator', 'inflation-data'] as const,
  currentUser:    ['auth', 'me'] as const,
};
