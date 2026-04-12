import { API_CONFIG } from '../config';
import { STORAGE_KEYS } from '@/lib/constants';

export abstract class BaseRepository {
  protected useMockData: boolean;

  constructor() {
    this.useMockData = API_CONFIG.USE_MOCK_DATA;
  }

  protected buildUrl(endpoint: string): string {
    return `${API_CONFIG.BASE_URL}${endpoint}`;
  }

  protected async simulateDelay(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, API_CONFIG.MOCK_DELAY));
  }

  protected async fetchApi<T>(url: string, options: RequestInit = {}): Promise<T> {
    const token   = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, { ...options, headers });

    if (response.status === 401 || response.status === 403) {
      window.dispatchEvent(new Event('costwise_unauthorized_intercept'));
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error ${response.status}`);
    }

    return response.json();
  }
}
