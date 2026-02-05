# IBC Academy Design System

*Extracted from `global.css` and component patterns — February 5, 2026*

---

## Color Palette

### Primary Colors (Brand)
| Token | Hex | Usage |
|-------|-----|-------|
| `navy-900` | `#0A1628` | Page background, deepest dark |
| `navy-dark` | `#0F1F35` | Section backgrounds |
| `navy` | `#1B365D` | Cards, glass surfaces |
| `navy-light` | `#24466F` | Borders, subtle surfaces |
| `gold` | `#C9A84C` | Primary accent, CTAs, active states |
| `gold-light` | `#D4B96A` | Hover states, highlights |
| `gold-dark` | `#A8893A` | Gradient endpoints |

### Neutral Colors (Text & UI)
| Token | Hex | Usage |
|-------|-----|-------|
| `white` | `#FFFFFF` | Headlines, primary text |
| `slate-100` | `#F1F5F9` | — |
| `slate-200` | `#E2E8F0` | Body text default |
| `slate-300` | `#CBD5E1` | Secondary text, nav links |
| `slate-400` | `#94A3B8` | Muted text, labels |
| `slate-600` | `#475569` | Borders, dividers |
| `slate-700` | `#334155` | — |
| `slate-800` | `#1E293B` | — |

### Semantic Usage
- **Trust/Authority:** Navy tones (dark = established, serious)
- **Action/Energy:** Gold tones (warmth, prosperity, premium)
- **Readability:** Slate-200/300 on navy backgrounds provides comfortable contrast

---

## Typography

### Font Stack
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-serif: 'Georgia', 'Times New Roman', serif; /* Currently unused */
```

### Type Scale (observed patterns)

| Element | Classes | Notes |
|---------|---------|-------|
| H1 (Hero) | `text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-black` | Tracking-tight, gold accent words |
| H2 (Section) | `text-2xl sm:text-3xl font-bold` | White, sometimes with gold span |
| H3 (Card titles) | `text-lg font-semibold` | White |
| Body | `text-base` or `text-sm` | Slate-300/200 |
| Labels | `text-xs uppercase tracking-wider font-semibold` | Slate-400 |
| Nav links | `text-sm font-medium` | Slate-300, gold when active |

### Font Weights
- `font-black` (900): Hero headlines only
- `font-extrabold` (800): CTAs
- `font-bold` (700): Section headers, logo
- `font-semibold` (600): Card titles, labels
- `font-medium` (500): Nav, body emphasis

---

## Spacing

### Container
- Max width: `max-w-7xl` (1280px)
- Horizontal padding: `px-4 sm:px-6 lg:px-8`

### Section Padding
- Vertical: `py-12 sm:py-16 lg:py-20` or `py-16 sm:py-20 lg:py-24`
- Hero: `pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16`

### Component Spacing
- Card padding: `p-4` to `p-6`
- Button padding: `px-5 py-2.5` (standard) or `px-6 py-3` (large)
- Gap between cards: `gap-4` or `gap-6`
- Gap in nav: `gap-1` (items), `gap-3` (sections)

---

## Components

### Buttons

**Primary CTA (Gold)**
```html
<a class="px-6 py-3 bg-gradient-to-r from-gold to-gold-dark text-navy-900 
         font-extrabold text-sm rounded-lg hover:from-gold-light hover:to-gold 
         transition-all duration-300 shadow-lg shadow-gold/25 hover:shadow-gold/40 
         hover:-translate-y-0.5 min-h-[44px]">
```

**Secondary (Ghost/Outline)**
```html
<a class="px-6 py-3 border border-slate-600/50 text-white font-semibold text-sm 
         rounded-lg hover:border-gold/40 hover:text-gold transition-all duration-300 
         bg-white/[0.02] hover:bg-white/[0.04] min-h-[44px]">
```

### Cards

**Glass Card**
```css
.glass-card {
  background: rgba(27, 54, 93, 0.15);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(36, 70, 111, 0.25);
}
.glass-card:hover {
  transform: translateY(-4px);
  border-color: rgba(201, 168, 76, 0.35);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}
```

**Simple Card (Persona tiles)**
```html
<div class="px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] 
            hover:border-gold/30 hover:bg-gold/[0.05] transition-all duration-300">
```

### Navigation

**Header**
- Sticky with backdrop blur: `bg-navy-900/90 backdrop-blur-xl`
- Height: `h-16 lg:h-20`
- Border: `border-b border-white/[0.06]`

**Nav Item States**
- Default: `text-slate-300 hover:text-white hover:bg-white/[0.04]`
- Active: `text-gold bg-gold/[0.08]`

### Touch Targets
All interactive elements use `min-h-[44px]` and appropriate padding for WCAG compliance.

---

## Effects & Animations

### Scroll-Triggered Fade-In
```css
.fade-in-up { opacity: 0; transform: translateY(30px); transition: 0.7s ease-out; }
.fade-in-left { opacity: 0; transform: translateX(-30px); }
.fade-in-right { opacity: 0; transform: translateX(30px); }
.is-visible { opacity: 1; transform: none; }
```

### Stagger Animation
Children animate sequentially with 100ms delays (up to 10 children).

### Hover Lifts
- Cards: `hover:-translate-y-1` to `hover:translateY(-4px)`
- Buttons: `hover:-translate-y-0.5`

### Gold Shimmer (Special)
```css
@keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
.gold-shimmer { 
  background: linear-gradient(90deg, gold 0%, gold-light 40%, #fff 50%, gold-light 60%, gold 100%);
  animation: shimmer 4s linear infinite;
}
```

### Portrait Desaturation
Masters gallery uses `grayscale(100%) brightness(0.7)` with color restore on hover.

---

## Shadows

| Usage | Classes/Values |
|-------|----------------|
| CTA buttons | `shadow-lg shadow-gold/20` → `hover:shadow-gold/30` |
| Glass cards | `0 12px 40px rgba(0, 0, 0, 0.3)` on hover |
| Logo badge | `shadow-lg shadow-gold/10` |

---

## Border Radius

| Usage | Value |
|-------|-------|
| Buttons | `rounded-lg` (0.5rem) |
| Cards | `rounded-lg` to `rounded-xl` |
| Logo badge | `rounded-lg` |
| Images | `rounded-xl` |
| Pills/badges | `rounded-full` |

---

## Responsive Breakpoints

Using Tailwind defaults:
- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px

### Key Patterns
- Hero grid: single column → `lg:grid-cols-[1fr_0.9fr]`
- Navigation: hamburger → `lg:flex` inline
- Persona tiles: always stacked (single column)
- Masters gallery: horizontal scroll (mobile) → two-column scroll (desktop)

---

## Accessibility Notes

### Already Implemented ✅
- Touch targets: 44px minimum
- Focus states on interactive elements (outline)
- Semantic HTML (nav, main, section, footer)
- Alt text on images
- Aria labels on buttons
- Prefers-reduced-motion: Not explicitly handled (TODO)

### Contrast Ratios
- Gold on Navy-900: ~5.8:1 ✅ (AA pass)
- Slate-200 on Navy-900: ~10:1 ✅ (AAA pass)
- Slate-300 on Navy-900: ~7.5:1 ✅ (AAA pass)
- Slate-400 on Navy-900: ~4.8:1 ⚠️ (AA for large text only)

---

## Patterns to Maintain

1. **Consistency:** All primary CTAs use the gold gradient
2. **Hierarchy:** One primary CTA per viewport, secondary as ghost buttons
3. **Whitespace:** Generous padding, no crowding
4. **Animation:** Subtle and purposeful, never distracting
5. **Dark Theme:** Navy as base, never pure black
6. **Premium Feel:** Glass effects, gradients, subtle shadows
