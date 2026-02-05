# Lessons Learned — IBC Academy Site

*Started: February 5, 2026*

Document insights, patterns, and decisions as we iterate on the site.

---

## Design Decisions

### Color Palette
- **Navy-900 as base** — Darker than typical navy gives more premium feel. Pure black would feel harsh.
- **Gold for action** — Financial services need warmth. Gold says "prosperity" without saying "cheap sale"
- **Slate for text** — Slate-200/300 provides comfortable reading on dark backgrounds. Avoid pure white for body text (too stark)

### Typography
- **Inter font family** — Clean, modern, highly legible. Avoids generic system fonts while staying approachable
- **Font-black (900) for heroes only** — Creates hierarchy without shouting
- **Tracking-tight on headlines** — Professional, polished feel

### Component Patterns
- **Glass cards** — The `glass-card` effect with backdrop blur adds depth without overwhelming content
- **44px touch targets** — Non-negotiable for mobile usability

---

## Technical Learnings

### Astro + Tailwind via Vite
- Using `@tailwindcss/vite` plugin instead of separate tailwind.config
- `@theme` directive in global.css for custom properties
- Hot reload works but content sync takes time with 80+ articles

### Content Collections
- Astro content collections handle article frontmatter validation
- Slug generation is automatic from file paths

---

## What We'd Do Differently

*(To be populated as we iterate)*

---

## Pattern Library Notes

### Buttons
- Primary: Gold gradient with navy text
- Secondary: Ghost with slate border, gold on hover
- Always include min-h-[44px] for touch

### Cards
- Use glass-card for featured content
- Use subtle bg-white/[0.03] for lists and tiles
- Hover states: lift (-translate-y) + border color shift

### Section Spacing
- Consistent py-16 sm:py-20 lg:py-24 between major sections
- Generous but not wasteful

---

## Accessibility Checklist (for future reference)

- [ ] Color contrast (4.5:1 for text, 3:1 for large text)
- [ ] Focus states visible and styled
- [ ] Touch targets 44px minimum
- [ ] Alt text on all meaningful images
- [ ] Semantic HTML structure
- [ ] Skip-to-content link
- [ ] Reduced motion support
- [ ] Keyboard navigation works
- [ ] Screen reader tested

---

*Add to this file after each implementation phase*
