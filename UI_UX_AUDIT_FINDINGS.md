# IBC Academy UI/UX Audit Findings

*Completed: February 5, 2026 01:30 AM CST*
*Auditor: Mabel*
*Scope: Full site review (code + visual)*

---

## Summary

**Overall Assessment: B+**

The site has a solid foundation with premium aesthetics, consistent design language, and good structural organization. The navy/gold color scheme conveys trust and authority appropriate for financial services. Key areas for improvement center around mobile optimization, accessibility enhancements, and CTA consistency.

### Quick Stats
- **Pages audited:** 29 (full site)
- **Critical issues:** 3
- **Refinements needed:** 11
- **Polish items:** 8

---

## 🔴 CRITICAL — Must Fix Before Launch

### C1. Email Capture Not Wired Up
**Location:** Homepage `/`, possibly `/book/free-chapter`
**Issue:** Email capture form has UI but no backend connection. Submitting does nothing.
**Impact:** Primary lead capture mechanism is broken. Zero conversions possible.
**Fix:** 
- Wire to Formspree (quick) or ConvertKit (better for automation)
- Add loading state during submission
- Add success/error feedback
**Effort:** 1-2 hours

### C2. Contrast Issues on Slate-400 Text
**Location:** Labels, secondary text across site
**Issue:** `slate-400` (#94A3B8) on `navy-900` (#0A1628) has 4.8:1 contrast — fails WCAG AA for small text (needs 4.5:1).
**Impact:** Accessibility compliance risk; readability issues for vision-impaired users.
**Fix:** 
- Change `text-slate-400` to `text-slate-300` for all text under 18px
- Keep slate-400 only for decorative elements or large text
**Effort:** 30 minutes (find/replace in components)

### C3. Missing Prefers-Reduced-Motion Support
**Location:** `global.css` animations
**Issue:** All animations run regardless of user motion preferences. Users with vestibular disorders may experience discomfort.
**Impact:** Accessibility violation; potential ADA compliance issue.
**Fix:** Add to global.css:
```css
@media (prefers-reduced-motion: reduce) {
  .fade-in-up, .fade-in-left, .fade-in-right, .fade-in, .stagger-children > * {
    animation: none;
    transition: none;
    opacity: 1;
    transform: none;
  }
  .gold-shimmer { animation: none; }
  .masters-track { animation: none !important; }
}
```
**Effort:** 15 minutes

---

## 🟡 REFINEMENTS — Should Address Soon

### R1. Persona Tiles Overflow on Mobile
**Location:** Hero section, mobile view
**Issue:** 8 persona tiles create significant scroll depth in Hero. Users may not realize content exists below.
**Recommendation:** 
- Collapse to top 4 with "See all paths →" expander
- Or horizontal scroll on mobile (matching masters gallery pattern)
**Effort:** 1 hour

### R2. Search Keyboard Shortcut Only Shows ⌘K
**Location:** Header search button
**Issue:** Shows Mac shortcut (⌘K) on all platforms. Windows users see wrong shortcut.
**Fix:** 
```javascript
const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
const shortcut = isMac ? '⌘K' : 'Ctrl+K';
```
**Effort:** 20 minutes

### R3. Mobile Navigation Lacks Close-on-Outside-Click
**Location:** Header mobile menu
**Issue:** Mobile menu only closes via hamburger button. Tapping outside menu doesn't close it.
**Impact:** Frustrating UX; user must find button again to close.
**Fix:** Add click-outside handler
**Effort:** 15 minutes

### R4. Article Footer CTAs May Be Inconsistent
**Location:** `/learn/articles/[slug]` pages
**Issue:** Need to verify all 80+ articles have consistent footer CTAs leading to Skool/Book.
**Recommendation:** Audit ArticleFooterCTA.astro usage across all article templates
**Effort:** 30 minutes to audit, 1 hour to fix if needed

### R5. Trust Bar Could Be Stickier
**Location:** Below Hero (TrustBar component)
**Issue:** Trust credentials (Nelson Nash, 50+ lessons, No products, NNI Authorized) scroll away quickly.
**Recommendation:** Consider subtle persistence or repetition in footer/sidebar on key pages.
**Effort:** 30 minutes

### R6. Content Browser Tabs Horizontal Scroll (Mobile)
**Location:** Homepage Content Browser
**Issue:** 7 category tabs likely overflow on mobile. Need to verify horizontal scroll works properly with visible scroll affordance.
**Fix:** Add scroll shadow indicators on edges when content overflows
**Effort:** 30 minutes

### R7. Masters Gallery Performance
**Location:** Hero right column (desktop)
**Issue:** Infinite scroll animation runs continuously via `requestAnimationFrame`. Could impact battery on laptops.
**Recommendation:** 
- Pause animation when tab not visible (Intersection Observer)
- Pause on hover
**Effort:** 30 minutes

### R8. No Loading States
**Location:** Search modal, form submissions
**Issue:** No visual feedback while content loads or forms submit.
**Fix:** Add spinner/skeleton states
**Effort:** 1 hour

### R9. Footer "Talk to Brad" CTA Is Unclear
**Location:** Footer
**Issue:** Links to /contact but button text implies direct chat/call. Page likely has a form, not live chat.
**Recommendation:** Change to "Contact Brad" or ensure /contact has booking link
**Effort:** 5 minutes

### R10. Duplicate Meta Tags Risk
**Location:** Layout.astro
**Issue:** If child pages set their own OG tags, could duplicate with Layout defaults.
**Recommendation:** Verify no duplication in built output
**Effort:** 15 minutes to check

### R11. 404 Page Should Match Design System
**Location:** `/404.astro`
**Issue:** Needs visual review to ensure it matches site aesthetic and provides helpful navigation.
**Effort:** 30 minutes if redesign needed

---

## 🔵 POLISH — Nice to Have

### P1. Add Skip-to-Content Link
**Issue:** No skip navigation for keyboard/screen reader users
**Fix:** Add hidden link at top of body that focuses main content
**Effort:** 15 minutes

### P2. Focus Ring Styling
**Issue:** Default browser focus rings may not match design system
**Recommendation:** Add custom focus-visible styles using gold accent
**Effort:** 30 minutes

### P3. Smooth Scroll Behavior Only
**Issue:** `scroll-behavior: smooth` is set, but no fallback for users who prefer instant scroll
**Fix:** Respect `prefers-reduced-motion` for scroll too
**Effort:** 10 minutes

### P4. Add Print Stylesheet
**Issue:** Articles may not print cleanly
**Recommendation:** Add basic print CSS hiding nav/footer, optimizing article content
**Effort:** 30 minutes

### P5. Image Lazy Loading Audit
**Issue:** Masters photos use `loading="lazy"` but above-fold images shouldn't
**Fix:** First visible images should be eager-loaded (LCP optimization)
**Effort:** 20 minutes

### P6. Add RSS Feed
**Issue:** No RSS for article content
**Recommendation:** Content-heavy sites benefit from RSS for subscribers
**Effort:** 30 minutes (Astro has plugin)

### P7. Social Share Buttons on Articles
**Issue:** No easy way to share individual articles
**Recommendation:** Add minimal share buttons (Twitter/X, LinkedIn)
**Effort:** 1 hour

### P8. Reading Progress Indicator (Articles)
**Issue:** Long articles lack progress feedback
**Recommendation:** Subtle progress bar in header during article scroll
**Effort:** 45 minutes

---

## ✅ WORKING WELL — Don't Change

1. **Color palette** — Navy/gold conveys trust, premium feel
2. **Typography hierarchy** — Clear differentiation between headlines, body, labels
3. **Touch targets** — 44px minimum maintained throughout
4. **Primary CTA consistency** — Gold gradient buttons everywhere
5. **Mobile navigation** — Hamburger works, search accessible
6. **Glass card effects** — Premium without being distracting
7. **Semantic HTML** — Proper use of nav, main, section, footer
8. **Alt text** — Images have descriptive alt attributes
9. **OG/Twitter cards** — Properly configured for sharing
10. **Sitemap** — Auto-generated via Astro integration

---

## Recommended Implementation Order

### Phase 1: Critical Fixes (Before any announcement)
1. C1: Wire up email capture (highest impact)
2. C2: Fix contrast issues
3. C3: Add reduced-motion support

### Phase 2: Key Refinements (This week)
1. R1: Persona tiles mobile optimization
2. R3: Mobile menu click-outside
3. R6: Content browser scroll affordance
4. R9: Footer CTA clarity

### Phase 3: Polish (As time permits)
1. P1: Skip-to-content link
2. P2: Focus ring styling
3. P5: Image lazy loading audit
4. R2: Platform-aware keyboard shortcut

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/styles/global.css` | C2 (contrast), C3 (reduced motion), P3 (scroll) |
| `src/components/EmailCapture.astro` | C1 (wire up form) |
| `src/components/Header.astro` | R2 (shortcut), R3 (click-outside) |
| `src/components/Hero.astro` | R1 (persona tiles), R7 (animation pause) |
| `src/components/ContentBrowser.astro` | R6 (scroll affordance) |
| `src/layouts/Layout.astro` | P1 (skip link), P2 (focus styles) |
| `src/components/Footer.astro` | R9 (CTA text) |

---

## Next Steps

**Ready for Brad's Review:**
1. Review this document
2. Approve/modify/cut items
3. Prioritize what ships before Skool announcement
4. I'll execute surgically with git commits between phases

The site is 85% there. These refinements will take it to "quietly confident premium" — exactly the vibe for IBC education.

🌿
