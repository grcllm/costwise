# Component Refactoring Guide

This guide shows how to refactor existing code to use the new reusable UI components.

## Overview

We've identified and created reusable components for common UI patterns in your app:

### New Components Created:
1. **StatCard** - Statistics with icons
2. **ContentCard** - Generic card container
3. **SectionHeader** - Page/section headers
4. **InfoBox** - Tips, warnings, alerts
5. **Tag** - Labels and badges
6. **IconCard** - Feature/category cards
7. **EmptyState** - No data states
8. **LoadingSpinner** - Loading indicators

---

## Refactoring Examples

### Example 1: Quiz Performance Cards

**Before** (`app/quizzes/page.tsx`):
```tsx
<div className="bg-white rounded-2xl p-5 border border-[#C5D3FF] flex items-center gap-4">
  <div className="w-14 h-14 rounded-xl bg-[#FFFDE7] flex items-center justify-center">
    <Coins className="text-[#4A3B00] w-7 h-7" strokeWidth={2.5} />
  </div>
  <div className="flex-1">
    <h4 className="font-bold text-[#1C3FA8]">Tax Efficiency</h4>
    <p className="text-xs text-[#1A237E] opacity-60">Completed 2 days ago</p>
  </div>
  <div className="text-right">
    <span className="text-xl font-black text-[#1C3FA8]">850</span>
    <p className="text-[10px] font-bold text-[#E53935]">pts</p>
  </div>
</div>
```

**After**:
```tsx
import { StatCard } from '@/components/ui'
import { Coins } from 'lucide-react'

<StatCard
  icon={Coins}
  title="Tax Efficiency"
  subtitle="Completed 2 days ago"
  value={850}
  badge="pts"
/>
```

**Benefits:**
- ✅ 15 lines → 7 lines (53% reduction)
- ✅ Consistent styling
- ✅ Easier to maintain
- ✅ Type-safe props

---

### Example 2: Page Headers

**Before** (`app/learn/page.tsx`):
```tsx
<header className="mb-10">
  <h1 className="text-4xl md:text-5xl font-black text-[#1C3FA8] tracking-tight mb-4">
    Educational Hub
  </h1>
  <p className="text-lg text-[#1A237E] max-w-2xl opacity-80">
    Master the mechanics of inflation and protect your financial future.
  </p>
</header>
```

**After**:
```tsx
import { SectionHeader } from '@/components/ui'

<SectionHeader
  title="Educational Hub"
  subtitle="Master the mechanics of inflation and protect your financial future."
/>
```

**Benefits:**
- ✅ Consistent header styling across pages
- ✅ Easy to add badges or actions
- ✅ Responsive by default

---

### Example 3: Info Boxes

**Before** (`app/simulator/page.tsx`):
```tsx
<div className="mt-10 p-4 bg-[#FFFDE7] rounded-2xl border border-[#FDD835]/30">
  <div className="flex gap-3">
    <Info className="text-[#705d00] w-5 h-5 flex-shrink-0 mt-0.5" />
    <p className="text-sm text-[#4A3B00] leading-relaxed">
      <span className="font-bold">Did you know?</span> Inflation in the Philippines 
      averaged around 4-6% in recent years.
    </p>
  </div>
</div>
```

**After**:
```tsx
import { InfoBox } from '@/components/ui'

<InfoBox variant="info" title="Did you know?">
  Inflation in the Philippines averaged around 4-6% in recent years.
</InfoBox>
```

**Benefits:**
- ✅ Multiple variants (info, success, warning, error)
- ✅ Automatic icon selection
- ✅ Consistent styling

---

### Example 4: Loading States

**Before** (`app/home/page.tsx`):
```tsx
if (isLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1C3FA8] mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
  )
}
```

**After**:
```tsx
import { LoadingPage } from '@/components/ui'

if (isLoading) {
  return <LoadingPage text="Loading your dashboard..." />
}
```

**Benefits:**
- ✅ Consistent loading UI
- ✅ Multiple sizes available
- ✅ Customizable text

---

### Example 5: Empty States

**Before** (`app/tips/page.tsx`):
```tsx
{!shouldShowPalengke && !shouldShowEnergy && (
  <div className="text-center py-16">
    <p className="text-[#1A237E]/60 text-lg">
      No tips available for this category yet.
    </p>
  </div>
)}
```

**After**:
```tsx
import { EmptyState } from '@/components/ui'
import { Lightbulb } from 'lucide-react'
import Link from 'next/link'

{!shouldShowPalengke && !shouldShowEnergy && (
  <EmptyState
    icon={Lightbulb}
    title="No tips available"
    description="Be the first to submit a tip for this category"
    action={
      <Link href="/submit-tip" className="btn-primary">
        Submit a Tip
      </Link>
    }
  />
)}
```

**Benefits:**
- ✅ More engaging UI
- ✅ Clear call-to-action
- ✅ Consistent empty states

---

### Example 6: Tags/Badges

**Before** (`app/quizzes/page.tsx`):
```tsx
<span className="bg-[#FFFDE7] text-[#4A3B00] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
  Level 4
</span>
```

**After**:
```tsx
import { Tag } from '@/components/ui'

<Tag variant="secondary">Level 4</Tag>
```

**Benefits:**
- ✅ Predefined variants
- ✅ Multiple sizes
- ✅ Consistent styling

---

## Step-by-Step Refactoring Process

### 1. Identify Repeated Patterns
Look for similar JSX structures across files:
```bash
# Search for card patterns
grep -r "bg-white.*rounded.*border" app/
```

### 2. Choose the Right Component
Match the pattern to a component:
- Stats with icons → `StatCard`
- Generic cards → `ContentCard`
- Headers → `SectionHeader`
- Tips/warnings → `InfoBox`
- Labels → `Tag`

### 3. Import the Component
```tsx
import { StatCard, ContentCard, Tag } from '@/components/ui'
```

### 4. Replace the Code
Replace the repeated JSX with the component.

### 5. Test
- Check visual appearance
- Test interactions (clicks, hovers)
- Verify responsive behavior

---

## Priority Refactoring List

### High Priority (Most Repeated)
1. **Quiz performance cards** → `StatCard`
   - Files: `app/quizzes/page.tsx`, `app/home/page.tsx`
   - Instances: ~15

2. **Page headers** → `SectionHeader`
   - Files: All main pages
   - Instances: ~10

3. **Loading states** → `LoadingPage`/`LoadingSpinner`
   - Files: `app/home/page.tsx`, `app/profile/page.tsx`
   - Instances: ~5

### Medium Priority
4. **Info boxes** → `InfoBox`
   - Files: `app/simulator/page.tsx`, forms
   - Instances: ~8

5. **Tags/badges** → `Tag`
   - Files: `app/quizzes/page.tsx`, `app/learn/page.tsx`
   - Instances: ~12

### Low Priority (Less Repeated)
6. **Empty states** → `EmptyState`
   - Files: `app/tips/page.tsx`
   - Instances: ~3

7. **Icon cards** → `IconCard`
   - Files: `app/home/page.tsx`, `app/learn/page.tsx`
   - Instances: ~6

---

## Refactoring Checklist

For each file you refactor:

- [ ] Import new components from `@/components/ui`
- [ ] Replace repeated JSX with components
- [ ] Pass correct props (check TypeScript errors)
- [ ] Remove unused imports
- [ ] Test visual appearance
- [ ] Test interactions
- [ ] Check responsive behavior
- [ ] Verify no console errors
- [ ] Run TypeScript check: `npm run type-check`
- [ ] Commit changes with clear message

---

## Example: Complete File Refactoring

### Before: `app/quizzes/page.tsx` (excerpt)
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="bg-white rounded-2xl p-5 border border-[#C5D3FF] flex items-center gap-4">
    <div className="w-14 h-14 rounded-xl bg-[#FFFDE7] flex items-center justify-center">
      <Coins className="text-[#4A3B00] w-7 h-7" strokeWidth={2.5} />
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-[#1C3FA8]">Tax Efficiency</h4>
      <p className="text-xs text-[#1A237E] opacity-60">Completed 2 days ago</p>
    </div>
    <div className="text-right">
      <span className="text-xl font-black text-[#1C3FA8]">850</span>
      <p className="text-[10px] font-bold text-[#E53935]">pts</p>
    </div>
  </div>
  
  {/* Repeated 2 more times with different data */}
</div>
```

### After: `app/quizzes/page.tsx` (excerpt)
```tsx
import { StatCard } from '@/components/ui'
import { Coins, Building2, PiggyBank } from 'lucide-react'

const performances = [
  { icon: Coins, title: 'Tax Efficiency', subtitle: 'Completed 2 days ago', value: 850 },
  { icon: Building2, title: 'Estate Planning', subtitle: 'Completed 5 days ago', value: 920 },
  { icon: PiggyBank, title: 'Emergency Funds', subtitle: 'Completed 1 week ago', value: 740 },
]

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {performances.map((perf, index) => (
    <StatCard
      key={index}
      icon={perf.icon}
      title={perf.title}
      subtitle={perf.subtitle}
      value={perf.value}
      badge="pts"
    />
  ))}
</div>
```

**Improvements:**
- ✅ 45 lines → 15 lines (67% reduction)
- ✅ Data-driven approach
- ✅ Easy to add/remove items
- ✅ Consistent styling
- ✅ Type-safe

---

## Testing After Refactoring

### Visual Testing
1. Open each refactored page
2. Compare with original design
3. Check all breakpoints (mobile, tablet, desktop)
4. Verify colors, spacing, typography

### Functional Testing
1. Test all interactions (clicks, hovers)
2. Verify loading states
3. Check empty states
4. Test responsive behavior

### Code Quality
```bash
# TypeScript check
npm run type-check

# Linting
npm run lint

# Build check
npm run build
```

---

## Estimated Time Savings

### Development Time
- **Before**: 10-15 minutes to create a stat card
- **After**: 1-2 minutes using `StatCard`
- **Savings**: 80-90% faster

### Maintenance Time
- **Before**: Update 15 instances individually
- **After**: Update 1 component
- **Savings**: 93% less maintenance

### Code Size
- **Before**: ~1,500 lines of repeated UI code
- **After**: ~500 lines using components
- **Savings**: 67% reduction

---

## Next Steps

1. **Start with high-priority refactoring**
   - Quiz performance cards
   - Page headers
   - Loading states

2. **Create a refactoring branch**
   ```bash
   git checkout -b refactor/ui-components
   ```

3. **Refactor one file at a time**
   - Test after each file
   - Commit frequently

4. **Review and merge**
   - Get team review
   - Merge to main

5. **Document patterns**
   - Update team wiki
   - Share learnings

---

## Common Pitfalls

### ❌ Don't Over-Abstract
```tsx
// Too generic - hard to use
<GenericCard type="stat" variant="primary" data={...} />
```

### ✅ Keep It Simple
```tsx
// Clear purpose - easy to use
<StatCard icon={Trophy} title="Quizzes" value={24} />
```

### ❌ Don't Break Existing Functionality
- Test thoroughly before committing
- Check all interactive elements
- Verify responsive behavior

### ✅ Maintain Backward Compatibility
- Keep old code working during transition
- Refactor incrementally
- Test each change

---

## Resources

- [Component Documentation](./components/ui/README.md)
- [Design System](./DESIGN_SYSTEM.md)
- [Refactoring Summary](./REFACTORING_SUMMARY.md)
