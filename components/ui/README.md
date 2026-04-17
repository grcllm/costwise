# UI Components Library

Reusable UI components for the CostWise application following a consistent design system.

## Design Tokens

### Colors
- **Primary**: `#1C3FA8` (Blue)
- **Accent**: `#FDD835` (Yellow)
- **Error**: `#E53935` (Red)
- **Success**: `#4CAF50` (Green)
- **Background**: `#F5F7FF` (Light Blue)
- **Border**: `#C5D3FF` (Light Blue)

### Typography
- **Font Family**: System fonts (sans-serif)
- **Headings**: `font-black` (900 weight)
- **Body**: `font-medium` (500 weight)
- **Labels**: `font-bold` (700 weight)

### Spacing
- **Card Padding**: `p-6` (medium), `p-8` (large)
- **Border Radius**: `rounded-2xl`, `rounded-3xl`
- **Gaps**: `gap-4`, `gap-6`, `gap-8`

---

## Components

### StatCard
Display statistics with icon, title, value, and optional badge.

**Usage:**
```tsx
import { StatCard } from '@/components/ui'
import { Trophy } from 'lucide-react'

<StatCard
  icon={Trophy}
  title="Quizzes Completed"
  value={24}
  subtitle="2 hours ago"
  badge="pts"
/>
```

**Props:**
- `icon` - Lucide icon component
- `title` - Card title
- `value` - Main value (string or number)
- `subtitle` - Optional subtitle text
- `badge` - Optional badge text
- `iconBgColor` - Background color for icon (default: `bg-[#FFFDE7]`)
- `iconColor` - Icon color (default: `text-[#4A3B00]`)
- `onClick` - Optional click handler (makes it interactive)

**Used in:** `/home`, `/quizzes`, `/profile`

---

### ContentCard
Generic card container with consistent styling.

**Usage:**
```tsx
import { ContentCard } from '@/components/ui'

<ContentCard padding="lg" variant="elevated">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</ContentCard>
```

**Props:**
- `padding` - Size: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `variant` - Style: `'default' | 'bordered' | 'elevated'` (default: `'default'`)
- `className` - Additional CSS classes

**Used in:** All pages with card layouts

---

### SectionHeader
Consistent section headers with title, subtitle, and optional action.

**Usage:**
```tsx
import { SectionHeader } from '@/components/ui'
import Link from 'next/link'

<SectionHeader
  title="Educational Hub"
  subtitle="Master the mechanics of inflation"
  badge="New"
  action={
    <Link href="/learn" className="text-[#E53935] font-bold">
      View all modules
    </Link>
  }
/>
```

**Props:**
- `title` - Main heading
- `subtitle` - Optional description
- `badge` - Optional badge text
- `action` - Optional action element (button, link, etc.)

**Used in:** `/learn`, `/quizzes`, `/tips`, `/home`

---

### InfoBox
Informational boxes with different variants for tips, warnings, etc.

**Usage:**
```tsx
import { InfoBox } from '@/components/ui'

<InfoBox variant="info" title="Did you know?">
  Inflation in the Philippines averaged around 4-6% in recent years.
</InfoBox>

<InfoBox variant="warning">
  Please verify your email address to continue.
</InfoBox>

<InfoBox variant="success" title="Success!">
  Your profile has been updated.
</InfoBox>
```

**Props:**
- `variant` - Type: `'info' | 'success' | 'warning' | 'error'` (default: `'info'`)
- `title` - Optional title
- `children` - Content

**Used in:** `/simulator`, `/profile`, forms

---

### Tag
Small labels for categories, status, levels, etc.

**Usage:**
```tsx
import { Tag } from '@/components/ui'

<Tag variant="accent">Level 4</Tag>
<Tag variant="primary" size="sm">Beginner</Tag>
<Tag variant="success">Completed</Tag>
```

**Props:**
- `variant` - Style: `'primary' | 'secondary' | 'accent' | 'success' | 'warning'`
- `size` - Size: `'sm' | 'md' | 'lg'` (default: `'md'`)

**Used in:** `/quizzes`, `/learn`, `/tips`

---

### IconCard
Card with icon, title, and description for features or categories.

**Usage:**
```tsx
import { IconCard } from '@/components/ui'
import { Calculator } from 'lucide-react'

<IconCard
  icon={Calculator}
  title="Simulator"
  description="Practice trading with virtual money"
  onClick={() => router.push('/simulator')}
/>
```

**Props:**
- `icon` - Lucide icon component
- `title` - Card title
- `description` - Card description
- `iconBgColor` - Background color (default: `bg-[#F5F7FF]`)
- `iconColor` - Icon color (default: `text-[#1C3FA8]`)
- `onClick` - Optional click handler

**Used in:** `/home` (quick actions), `/learn` (categories)

---

### EmptyState
Display when there's no data to show.

**Usage:**
```tsx
import { EmptyState } from '@/components/ui'
import { Inbox } from 'lucide-react'
import Link from 'next/link'

<EmptyState
  icon={Inbox}
  title="No tips available"
  description="Be the first to submit a tip for this category"
  action={
    <Link href="/submit-tip" className="btn-primary">
      Submit a Tip
    </Link>
  }
/>
```

**Props:**
- `icon` - Optional Lucide icon
- `title` - Main message
- `description` - Optional description
- `action` - Optional action element

**Used in:** `/tips`, `/quizzes`, search results

---

### LoadingSpinner
Loading indicators for async operations.

**Usage:**
```tsx
import { LoadingSpinner, LoadingPage } from '@/components/ui'

// Inline spinner
<LoadingSpinner size="md" text="Loading..." />

// Full page loading
<LoadingPage text="Loading your dashboard..." />
```

**Props:**
- `size` - Size: `'sm' | 'md' | 'lg'` (default: `'md'`)
- `text` - Optional loading text

**Used in:** All pages with loading states

---

## Usage Patterns

### Import from index
```tsx
// ✅ Good - Import from index
import { StatCard, ContentCard, Tag } from '@/components/ui'

// ❌ Avoid - Direct imports
import { StatCard } from '@/components/ui/stat-card'
```

### Combining Components
```tsx
import { ContentCard, SectionHeader, StatCard } from '@/components/ui'
import { Trophy } from 'lucide-react'

function DashboardSection() {
  return (
    <ContentCard padding="lg">
      <SectionHeader
        title="Your Stats"
        subtitle="Track your progress"
      />
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon={Trophy}
          title="Quizzes"
          value={24}
        />
        {/* More stats */}
      </div>
    </ContentCard>
  )
}
```

### Responsive Design
```tsx
import { useIsMobile } from '@/hooks'
import { StatCard } from '@/components/ui'

function ResponsiveStats() {
  const isMobile = useIsMobile()
  
  return (
    <div className={isMobile ? 'space-y-4' : 'grid grid-cols-3 gap-4'}>
      <StatCard {...props} />
    </div>
  )
}
```

---

## Refactoring Opportunities

### Before (Repeated Code)
```tsx
// ❌ Repeated in multiple files
<div className="bg-white rounded-2xl p-5 border border-[#C5D3FF] flex items-center gap-4">
  <div className="w-14 h-14 rounded-xl bg-[#FFFDE7] flex items-center justify-center">
    <Trophy className="text-[#4A3B00] w-7 h-7" />
  </div>
  <div className="flex-1">
    <h4 className="font-bold text-[#1C3FA8]">Quizzes</h4>
    <p className="text-xs text-[#1A237E] opacity-60">Completed</p>
  </div>
  <div className="text-right">
    <span className="text-xl font-black text-[#1C3FA8]">24</span>
  </div>
</div>
```

### After (Using Component)
```tsx
// ✅ Clean and reusable
<StatCard
  icon={Trophy}
  title="Quizzes"
  subtitle="Completed"
  value={24}
/>
```

---

## Component Checklist

When creating new components:

- [ ] Follow naming convention (PascalCase)
- [ ] Add TypeScript types for all props
- [ ] Include JSDoc comments
- [ ] Use design tokens (colors, spacing)
- [ ] Make it responsive
- [ ] Add to index.ts export
- [ ] Document in README
- [ ] Test with different props
- [ ] Check accessibility (ARIA labels)

---

## Accessibility

All components follow accessibility best practices:

- ✅ Semantic HTML elements
- ✅ Proper ARIA labels
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Color contrast ratios (WCAG AA)

---

## Future Components

Consider adding these as needs arise:

- **Modal/Dialog** - For confirmations and forms
- **Dropdown Menu** - For navigation and actions
- **Tabs** - For content organization
- **Accordion** - For collapsible content
- **Tooltip** - For additional information
- **Skeleton** - For loading states
- **Avatar** - For user profiles
- **Breadcrumbs** - For navigation
- **Pagination** - For lists
- **Table** - For data display

---

## Resources

- [Lucide Icons](https://lucide.dev/) - Icon library
- [Tailwind CSS](https://tailwindcss.com/) - Utility classes
- [CVA](https://cva.style/) - Class variance authority
- [Radix UI](https://www.radix-ui.com/) - Headless components
