import { Session } from './types';
import { STORAGE_KEYS } from './constants';

const SESSION_KEY = STORAGE_KEYS.AUTH_TOKEN;

export const sessionManager = {
  save(session: Session): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },
  load(): Session | null {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },
  clear(): void {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  },
};
