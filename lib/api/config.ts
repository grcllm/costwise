export const API_CONFIG = {
  USE_MOCK_DATA: process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true',
  USE_MOCK_AUTH: process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true',
  BASE_URL:      process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  TIMEOUT:       30_000,
  MOCK_DELAY:    300,
  VERSION:       'v1',
  ENDPOINTS: {
    AUTH: {
      REGISTER:        '/auth/register',
      LOGIN:           '/auth/login',
      LOGOUT:          '/auth/logout',
      FORGOT_PASSWORD: '/auth/forgot-password',
      RESET_PASSWORD:  '/auth/reset-password',
      ME:              '/auth/me',
    },
    PROFILE: {
      UPDATE: '/profile',
    },
    QUIZZES: {
      LIST:       '/quizzes',
      GET:        (slug: string) => `/quizzes/${slug}`,
      SYNC_SCORE: '/quizzes/scores',
    },
    TIPS: {
      LIST:           '/tips',
      SYNC_BOOKMARKS: '/tips/bookmarks',
    },
    SIMULATOR: {
      CALCULATE:      '/simulator/calculate',
      INFLATION_DATA: '/simulator/inflation-data',
    },
  },
} as const;

export interface ApiResponse<T> {
  success:  boolean;
  data:     T;
  message?: string;
  errors?:  Record<string, string[]>;
  meta?:    { page?: number; limit?: number; total?: number; totalPages?: number };
}

export function getEndpointUrl(endpoint: string): string {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}
