# Custom React Hooks

This folder contains reusable custom React hooks for the CostWise application.

## Available Hooks

### `useAuth()`
**Location:** `contexts/auth-context.tsx` (re-exported here)

Authentication hook that provides user session data.

```tsx
import { useAuth } from '@/hooks'

function MyComponent() {
  const { user, isAuthenticated, isLoading, refreshAuth } = useAuth()
  
  if (isLoading) return <div>Loading...</div>
  if (!isAuthenticated) return <div>Please log in</div>
  
  return <div>Welcome, {user?.displayName}</div>
}
```

**Returns:**
- `user` - Current user object or null
- `isAuthenticated` - Boolean indicating if user is logged in
- `isLoading` - Boolean indicating if auth state is loading
- `refreshAuth` - Function to refresh the session

---

### `useLocalStorage(key, initialValue)`
**Location:** `hooks/use-local-storage.ts`

Manages localStorage with SSR safety and cross-tab synchronization.

```tsx
import { useLocalStorage } from '@/hooks'

function MyComponent() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme: {theme}
    </button>
  )
}
```

**Features:**
- ✅ SSR safe (no window errors)
- ✅ Syncs across tabs/windows
- ✅ TypeScript support
- ✅ JSON serialization

---

### `useMediaQuery(query)`
**Location:** `hooks/use-media-query.ts`

Responsive design hook for media queries.

```tsx
import { useMediaQuery, useIsMobile } from '@/hooks'

function MyComponent() {
  const isMobile = useIsMobile()
  const isLargeScreen = useMediaQuery('(min-width: 1200px)')
  
  return (
    <div>
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </div>
  )
}
```

**Convenience Hooks:**
- `useIsMobile()` - max-width: 768px
- `useIsTablet()` - 769px to 1024px
- `useIsDesktop()` - min-width: 1025px

---

### `useDebounce(value, delay)`
**Location:** `hooks/use-debounce.ts`

Debounces a value to prevent excessive updates.

```tsx
import { useDebounce } from '@/hooks'
import { useState } from 'react'

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 500)
  
  // This effect only runs when user stops typing for 500ms
  useEffect(() => {
    if (debouncedSearch) {
      // Make API call
      fetchResults(debouncedSearch)
    }
  }, [debouncedSearch])
  
  return (
    <input 
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  )
}
```

**Use Cases:**
- Search inputs
- API calls
- Form validation
- Scroll handlers

---

## Usage Patterns

### Import from index
```tsx
// ✅ Good - Import from index
import { useAuth, useLocalStorage, useIsMobile } from '@/hooks'

// ❌ Avoid - Direct imports (unless needed)
import { useAuth } from '@/contexts/auth-context'
import { useLocalStorage } from '@/hooks/use-local-storage'
```

### Combining Hooks
```tsx
function ProfilePage() {
  const { user, isAuthenticated } = useAuth()
  const [profileImage, setProfileImage] = useLocalStorage('profileImage', null)
  const isMobile = useIsMobile()
  
  // Your component logic
}
```

---

## Creating New Hooks

### Guidelines

1. **Name with `use` prefix** - React convention
2. **One hook per file** - Easy to maintain
3. **Add TypeScript types** - Better DX
4. **Include JSDoc comments** - Self-documenting
5. **Export from index.ts** - Centralized imports

### Template

```tsx
import { useState, useEffect } from 'react'

/**
 * Description of what the hook does
 * @param param1 - Description
 * @param param2 - Description
 * @returns Description of return value
 */
export function useMyHook(param1: string, param2: number) {
  const [state, setState] = useState<string>('')
  
  useEffect(() => {
    // Hook logic
  }, [param1, param2])
  
  return state
}
```

---

## Common Patterns

### SSR Safety
Always check for `window` before accessing browser APIs:

```tsx
if (typeof window === 'undefined') return

// Safe to use window here
window.localStorage.getItem('key')
```

### Cleanup
Always clean up side effects:

```tsx
useEffect(() => {
  const handler = () => { /* ... */ }
  window.addEventListener('event', handler)
  
  return () => {
    window.removeEventListener('event', handler)
  }
}, [])
```

### TypeScript Generics
Use generics for flexible types:

```tsx
export function useMyHook<T>(initialValue: T): T {
  const [value, setValue] = useState<T>(initialValue)
  return value
}
```

---

## Testing Hooks

Use `@testing-library/react-hooks` for testing:

```tsx
import { renderHook, act } from '@testing-library/react-hooks'
import { useLocalStorage } from './use-local-storage'

test('should store value in localStorage', () => {
  const { result } = renderHook(() => useLocalStorage('test', 'initial'))
  
  act(() => {
    result.current[1]('updated')
  })
  
  expect(result.current[0]).toBe('updated')
})
```

---

## Future Hooks Ideas

Consider adding these hooks as your app grows:

- `useAsync` - Handle async operations
- `useIntersectionObserver` - Lazy loading
- `useClickOutside` - Close dropdowns
- `useKeyPress` - Keyboard shortcuts
- `useWindowSize` - Responsive layouts
- `usePrevious` - Track previous values
- `useToggle` - Boolean state management
- `useForm` - Form handling (if not using react-hook-form)

---

## Resources

- [React Hooks Documentation](https://react.dev/reference/react)
- [usehooks.com](https://usehooks.com/) - Hook recipes
- [react-use](https://github.com/streamich/react-use) - Hook library
