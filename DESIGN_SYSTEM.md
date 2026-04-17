# CostWise Design System — "Modern Local"

**Version**: 2.0.0  
**Last Updated**: 2026-04-15

---

## Overview

The CostWise design system draws inspiration from the Philippine flag colors, combining national pride with modern inflation awareness education. The palette embodies trust (Flag Blue), courage (Flag Red), and optimism (Sun Yellow), making it ideal for encouraging inflation awareness and practical budgeting among Filipino users.

---

## Color Palette

### Brand Colors (Philippine Flag Inspired)

| Role | Token | Hex | RGB | HSL | Usage |
|---|---|---|---|---|---|
| Primary (Flag Blue) | `bg-primary` | `#1C3FA8` | `28, 63, 168` | `223 83% 39%` | Header, primary buttons, active nav links, trust elements |
| Primary Foreground | `text-primary-foreground` | `#ffffff` | `255, 255, 255` | `0 0% 100%` | Text on primary background |
| Secondary (Flag Red) | `bg-secondary` | `#E53935` | `229, 57, 53` | `4 82% 57%` | Call-to-action buttons, alerts, important highlights |
| Secondary Foreground | `text-secondary-foreground` | `#ffffff` | `255, 255, 255` | `0 0% 100%` | Text on secondary background |
| Accent (Sun Yellow) | `bg-accent` | `#FDD835` | `253, 216, 53` | `48 98% 60%` | Success states, achievements, positive highlights |
| Accent Foreground | `text-accent-foreground` | `#1a1a1a` | `26, 26, 26` | `0 0% 10%` | Text on accent background |

### Semantic Colors

| Role | Token | Hex | Usage |
|---|---|---|---|
| Success | `bg-success` | `#16a34a` | Success messages, completed states |
| Warning | `bg-warning` | `#f59e0b` | Warning messages, caution states |
| Destructive | `bg-destructive` | `#dc2626` | Incorrect answer indicator, error states, delete actions |
| Info | `bg-info` | `#0369a1` | Informational messages, tips |

### Neutrals

| Role | Token | Hex | Usage |
|---|---|---|---|
| Background | `bg-background` | `#F8F9FA` | Page background |
| Foreground | `text-foreground` | `#111827` | Primary text color |
| Card | `bg-card` | `#ffffff` | Card backgrounds |
| Card Foreground | `text-card-foreground` | `#111827` | Text on cards |
| Muted | `bg-muted` | `#f3f4f6` | Muted backgrounds |
| Muted Foreground | `text-muted-foreground` | `#6b7280` | Secondary text, labels |
| Border | `border-border` | `#d1d5db` | Borders, dividers |
| Input | `border-input` | `#d1d5db` | Input borders |
| Ring | `ring-ring` | `#005691` | Focus rings |

---

## Typography

### Font Families

**System Font Stack** (Native OS Fonts)

- **Sans Serif**: System UI font stack
  - macOS/iOS: San Francisco
  - Windows: Segoe UI
  - Android: Roboto
  - Linux: System default
  - Fallback: Arial, sans-serif
  
- **Monospace**: System monospace stack
  - macOS: SF Mono, Menlo
  - Windows: Consolas
  - Linux: Liberation Mono
  - Fallback: Courier New, monospace

**Why System Fonts?**
- Zero network requests (instant loading)
- Native OS appearance and feel
- Optimal rendering and hinting per platform
- Excellent readability and accessibility
- Consistent with OS design language

**Implementation:**
```css
/* Sans Serif (default) */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 
             'Segoe UI Emoji', 'Segoe UI Symbol';

/* Monospace (code, technical content) */
font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, 
             Consolas, 'Liberation Mono', 'Courier New', monospace;
```

### Font Scale

| Level | Class | Size | Weight | Line Height | Usage |
|---|---|---|---|---|---|
| Display | `text-4xl` | 36px | 700 | 1.2 | Hero headings |
| H1 | `text-3xl` | 30px | 700 | 1.3 | Page titles |
| H2 | `text-2xl` | 24px | 600 | 1.4 | Section headings |
| H3 | `text-xl` | 20px | 600 | 1.4 | Subsection headings |
| Body | `text-base` | 16px | 400 | 1.5 | Body text |
| Small | `text-sm` | 14px | 400 | 1.5 | Labels, captions |
| Tiny | `text-xs` | 12px | 400 | 1.5 | Metadata, timestamps |

---

## Spacing

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Tight spacing |
| `space-2` | 8px | Small gaps |
| `space-3` | 12px | Default gaps |
| `space-4` | 16px | Medium gaps |
| `space-6` | 24px | Large gaps |
| `space-8` | 32px | Section spacing |
| `space-12` | 48px | Page spacing |

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `rounded-sm` | 6px | Small elements (badges, tags) |
| `rounded-md` | 8px | Buttons, inputs |
| `rounded-lg` | 10px | Cards, modals |
| `rounded-xl` | 14px | Large containers |
| `rounded-full` | 9999px | Circular elements (avatars, icons) |

Base radius: `--radius: 0.625rem` (10px)

---

## Component Patterns

### Quiz Answer States

| State | Background | Text | Border | Icon |
|---|---|---|---|---|
| Unanswered | `bg-card` | `text-foreground` | `border-border` | — |
| Correct | `bg-accent` | `text-accent-foreground` | `border-accent` | `CheckCircle2` |
| Incorrect | `bg-destructive` | `text-destructive-foreground` | `border-destructive` | `XCircle` |

### Tip Categories

| Category | Badge Color | Icon |
|---|---|---|
| All Tips | `bg-muted` | — |
| Palengke Tips | `bg-secondary` | `ShoppingBasket` |
| Energy Saving | `bg-success` | `Zap` |
| Commuter Hacks | `bg-info` | `Bus` |
| Budgeting | `bg-muted` | `PiggyBank` |

### Button Variants

| Variant | Background | Text | Border | Usage |
|---|---|---|---|---|
| Primary | `bg-primary` | `text-primary-foreground` | — | Main CTAs |
| Secondary | `bg-secondary` | `text-secondary-foreground` | — | Sign Up, highlights |
| Outline | `bg-transparent` | `text-foreground` | `border-border` | Secondary actions |
| Ghost | `bg-transparent` | `text-foreground` | — | Tertiary actions |
| Destructive | `bg-destructive` | `text-destructive-foreground` | — | Delete, cancel |

---

## Accessibility

### Color Contrast

All color combinations meet WCAG 2.1 AA standards:
- Primary text on background: 4.5:1 minimum
- Large text (18px+): 3:1 minimum
- UI components: 3:1 minimum

### Focus States

All interactive elements must have visible focus indicators:
- Focus ring: `ring-2 ring-ring ring-offset-2`
- Never remove focus outlines without providing an alternative

### Color Independence

Never use color as the sole indicator of state:
- Quiz answers: color + text label ("Correct!" / "Incorrect!")
- Form validation: color + icon + error message text
- Status indicators: color + icon + label

---

## Icons

All icons from `lucide-react`:
- Default size: 20px (`h-5 w-5`)
- Large: 24px (`h-6 w-6`)
- Small: 16px (`h-4 w-4`)

Common icons:
- Navigation: `Menu`, `X`, `ChevronRight`
- Actions: `Bookmark`, `Share2`, `Copy`, `Check`, `AlertCircle`
- Content: `TrendingUp`, `Calculator`, `BookOpen`, `Lightbulb`

---

## Layout

### Container

```tsx
<div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
  {/* content */}
</div>
```

### Responsive Breakpoints

| Breakpoint | Min Width | Usage |
|---|---|---|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small desktops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

### Header Height

Fixed header height: `64px` (`h-16`)

---

## Rules

1. **Never use raw Tailwind color classes** (e.g., `bg-blue-700`). Always use design tokens.
2. **All icons must be from `lucide-react`**. No custom SVGs without approval.
3. **Fonts are system-native**. No custom font loading required. Use `font-mono` class for monospace content.
4. **Null/empty values show `—`** (em dash) in read-only views.
5. **One `<h1>` per page**. Use semantic heading hierarchy.
6. **All icon-only buttons must have `aria-label`**.
7. **All form inputs must have associated `<Label>` and `id`**.
8. **Error messages must use `role="alert"`**.

---

## Examples

### Card Component

```tsx
<div className="bg-card border border-border rounded-lg p-6 space-y-4">
  <h3 className="text-xl font-semibold text-card-foreground">Card Title</h3>
  <p className="text-muted-foreground">Card description text.</p>
</div>
```

### Primary Button

```tsx
<button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-2 font-semibold">
  Click Me
</button>
```

### Code/Technical Text

```tsx
<code className="font-mono text-sm bg-muted px-2 py-1 rounded">
  npm install costwise
</code>
```

### Quiz Answer (Correct)

```tsx
<div className="bg-accent text-accent-foreground border border-accent rounded-md p-4 flex items-center gap-2">
  <Check className="h-5 w-5" />
  <span>Correct!</span>
</div>
```

---

**End of Design System**
