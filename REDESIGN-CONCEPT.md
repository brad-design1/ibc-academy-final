# IBC Academy Website Redesign Concept
## "Masterclass Meets Austrian Economics"

*Draft v1 — Brainstorm with Brad, Jan 27 2026*

---

## The Problem

Current site is structurally sound but visually flat:
- Gold-on-gold button contrast is broken (unreadable CTAs)
- Hover states lose contrast
- No photography, no faces, no visual warmth
- Feels like a template, not a premium education brand
- Missing the "I want to learn from THIS person" hook

## The Vision

**Masterclass's premium dark aesthetic** + **RetirementResearcher's content routing** + **IBC Academy's education-first brand**

Think: "What if Nelson Nash had a Masterclass?"

---

## SECTION-BY-SECTION CONCEPT

### 1. HERO — "The Invitation"

**Layout:** Split — left text, right scrolling headshot collage

**Left side:**
- Small gold badge: "EDUCATION FIRST"
- Headline: **"Learn the Banking Function from the Masters"**
  - Alt: "The Knowledge Wall Street Hopes You Never Find"
  - Alt: "Your Money. Your Bank. Your Education."
- Subhead: "Free courses on Nelson Nash's Infinite Banking Concept. No products. No sales pitch. Just the truth about how money works."
- **"What brings you here?"** selector (Masterclass-inspired):
  - ○ I want to understand how banking really works
  - ○ I own a business and want to keep more of my money
  - ○ I'm looking for an alternative to Wall Street
  - ○ I want to build generational wealth
  - ○ I've heard of IBC and want to go deeper
  - Each selection routes to a curated learning path page
- Primary CTA: **"Start Here — It's Free"** (white text on gold, high contrast)
- Secondary CTA: "Watch the Intro" (ghost button, gold border)

**Right side:**
- Cinematic headshot collage (slightly overlapping, with subtle parallax)
- Nelson Nash (largest, center — the anchor)
- Robert Murphy, Carlos Lara, Leonard Read, Ludwig von Mises, Murray Rothbard
- Subtle gold glow behind Nash's photo
- On hover: name + title tooltip (e.g., "Nelson Nash — Creator of the Infinite Banking Concept")

**Mood:** Dark, premium, inviting. Like walking into a private library.

---

### 2. TRUST BAR — "The Credentials"

Horizontal strip, slightly lighter background

- "Based on Nelson Nash's teachings"
- "50+ free lessons"  
- "No products sold — ever"
- Nelson Nash Institute authorized practitioner seal
- NNI logo (if Brad has permission to use it)

---

### 3. "WHAT BRINGS YOU HERE?" — Content Router
*(RetirementResearcher's RISA assessment concept, adapted)*

**Headline:** "Everyone comes to IBC differently. Where are you?"

**5 visual cards** (hover to expand, click to enter learning path):

| Card | Title | Description | Routes To |
|------|-------|-------------|-----------|
| 🏦 | **The Curious** | "I keep hearing about 'being your own banker' and want to understand what it actually means" | Fundamentals track |
| 💼 | **The Business Owner** | "I run a business and I'm tired of giving away my capital to banks" | Business IBC track |
| 📊 | **The Skeptic** | "Whole life insurance? Really? Convince me this isn't a scam" | Compared to What track |
| 👨‍👩‍👧‍👦 | **The Legacy Builder** | "I want my kids and grandkids to inherit a system, not just money" | Family Banking track |
| 📚 | **The Student** | "I've read BYOB and I want to go deeper into the mechanics" | Advanced mechanics track |

Each card has a muted cinematic background image (relevant to the archetype).

---

### 4. "LEARN FROM THE MASTERS" — Headshot Gallery
*(Masterclass's "Meet the world's best" section)*

**Headline:** "The Giants of Sound Money"
**Subhead:** "IBC didn't come from nowhere. It stands on centuries of economic truth."

**Scrolling portrait cards:**

- **Nelson Nash** — "Creator of the Infinite Banking Concept"  
  *Overlay: "Becoming Your Own Banker changed everything"*
  
- **Robert Murphy, PhD** — "Austrian Economist & LMR Co-Editor"  
  *Overlay: "The economics behind the process"*
  
- **Carlos Lara** — "Business Consultant & LMR Co-Editor"  
  *Overlay: "Real-world case studies and implementation"*
  
- **Leonard Read** — "Founder, Foundation for Economic Education"  
  *Overlay: "The philosophy of freedom and free markets"*
  
- **Ludwig von Mises** — "The Dean of the Austrian School"  
  *Overlay: "The theory of money and credit"*
  
- **Murray Rothbard** — "Mr. Libertarian"  
  *Overlay: "What has government done to our money?"*

**Design notes:**
- Dark cards with desaturated/sepia headshots that colorize on hover
- Gold name text, white title
- Horizontal scroll on mobile, 3-wide grid on desktop
- Subtle play button on Nash (links to intro video)

---

### 5. "A DOSE OF TRUTH" — Content Browser
*(Masterclass's category tabs + content grid)*

**Headline:** "A dose of truth, whenever you need it."

**Category tabs (horizontal scroll):**
- 🔥 Trending
- 📖 Fundamentals
- ⚙️ How It Works
- 🆚 Compared to What?
- 💼 Business Cases
- 👨‍👩‍👧‍👦 Family Banking
- 📉 Austrian Economics
- ❓ Common Questions

**Content cards below (3-wide grid):**
Each card shows:
- Category badge (colored)
- Title
- Brief description
- Read time or video duration
- Arrow → 

**Design:** Cards have subtle glass-morphism effect, gold accent on hover

---

### 6. SOCIAL PROOF — "What Our Members Say"

**Carousel of testimonial cards:**
- Real quotes (or realistic placeholder until Brad gets them)
- Name, title, location
- Star rating (if applicable for Skool reviews)
- Dark card with gold quote marks

---

### 7. EMAIL CAPTURE — "Start Your Education"

**Design:** Full-width section with subtle gradient
- Headline: "Get the free IBC Starter Guide"
- Subhead: "Weekly insights delivered to your inbox. No spam, no sales pitches — just education."
- Email input + "Get Free Guide" button
- Privacy note: "We respect your privacy. Unsubscribe at any time."

---

### 8. FOOTER

Clean, dark, organized:
- IBC Academy logo + tagline
- Column links: Learn, Resources, About, Connect
- Disclaimer (required)
- Social icons
- NNI acknowledgment

---

## COLOR SYSTEM FIXES

### Current Problems:
- `bg-gold text-gold` combinations (unreadable)
- Hover states that reduce contrast instead of increasing it

### Proposed Color System:

```
PRIMARY BACKGROUNDS:
- bg-[#050A12]     — deepest black (body)
- bg-[#0A1628]     — dark navy (sections)
- bg-[#0F1F35]     — medium navy (cards)
- bg-[#1B365D]     — navy (accents)

TEXT:
- text-white        — headings, primary text
- text-[#94A3B8]    — body text (slate-400)
- text-[#CBD5E1]    — secondary text (slate-300)

ACCENT:
- bg-[#C9A84C]      — gold (buttons, badges)
- text-[#0A1628]    — dark text ON gold buttons (high contrast)
- hover:bg-[#D4B96A] — lighter gold on hover (KEEP dark text)

BUTTON STYLES:
- Primary: bg-gold text-navy-900 → hover:bg-gold-light text-navy-900
  (Gold bg, dark text — ALWAYS readable)
- Secondary: border-gold text-gold → hover:bg-gold/10 text-gold
  (Ghost button — gold border and text)
- Tertiary: border-slate-600 text-white → hover:border-gold text-gold
  (Subtle ghost — white to gold transition)
```

### Button Contrast Fix (WCAG AA):
- Gold (#C9A84C) on Navy-900 (#0A1628) = **ratio 7.2:1** ✅
- Navy-900 (#0A1628) on Gold (#C9A84C) = **ratio 7.2:1** ✅  
- White (#FFFFFF) on Gold (#C9A84C) = **ratio 2.1:1** ❌ (FAIL)
- **NEVER use white text on gold background**
- **ALWAYS use dark navy text on gold buttons**

---

## TYPOGRAPHY UPGRADE

Current: Inter (clean but generic)

Proposed:
- **Headings:** "PP Neue Montreal" or "Satoshi" (modern geometric, premium feel)
  - Fallback: Inter with tighter letter-spacing and heavier weight
- **Body:** Inter stays (excellent readability)
- **Accents/Quotes:** Georgia or serif for pull quotes (warmth + authority)

If we can't use premium fonts, tweak Inter:
- Headings: font-black (900), letter-spacing: -0.02em, leading-tight
- This alone adds significant visual weight

---

## PHOTOGRAPHY / IMAGERY

### Needed:
1. **Nelson Nash headshot** — highest quality available (for hero)
2. **Robert Murphy, Carlos Lara** — headshots for "Masters" section
3. **Historical figures** — public domain photos of Mises, Rothbard, Leonard Read
4. **Brad's headshot** — for About section (professional, warm, approachable)

### Treatment:
- All headshots desaturated by 30%, with subtle gold/warm overlay
- On hover: full color reveal
- Consistent crop: head + shoulders, slight vignette
- Background: removed or replaced with dark gradient

### Placeholder Approach:
If we don't have photos yet, use:
- Silhouette placeholder with name
- Or AI-generated "inspired by" portraits (careful with historical figures — use real photos where available, which is everywhere for these figures)

---

## INTERACTION & MOTION

Subtle, purposeful animations:
- **Scroll-triggered fade-ins** — sections appear as you scroll (stagger children)
- **Headshot parallax** — hero headshots move slightly on scroll
- **Card hover lift** — cards rise 4px with soft shadow on hover
- **Tab underline slide** — content category tabs have sliding underline
- **Counter animations** — "50+ articles" counts up when visible
- **Smooth scroll** — anchor links glide

**DO NOT:**
- Auto-play video
- Use loading spinners as decoration
- Add particle effects
- Animate everything at once

Keep it Masterclass-level: elegant restraint.

---

## MOBILE CONSIDERATIONS

- Hero: Stack layout (text on top, headshots scroll horizontally below)
- "What brings you here?" cards: Vertical stack, full-width
- Masters section: Horizontal scroll cards
- Content tabs: Horizontal scroll with fade edges
- All touch targets: minimum 44px

---

## IMPLEMENTATION APPROACH

1. **Phase 1: Color & Button Fix** (30 min)
   - Fix all contrast issues immediately
   - Update button styles system-wide

2. **Phase 2: Hero Redesign** (2-3 hours)
   - New layout with headshot collage
   - "What brings you here?" router
   - Responsive behavior

3. **Phase 3: Masters Section** (1-2 hours)
   - Headshot cards with hover effects
   - Horizontal scroll/grid hybrid

4. **Phase 4: Content Browser** (2 hours)
   - Category tabs
   - Card redesign
   - Glass-morphism effects

5. **Phase 5: Polish** (1-2 hours)
   - Animations
   - Typography refinement
   - Mobile testing
   - Social proof section

---

## QUESTIONS FOR BRAD

1. **Headshots:** Do you have high-quality photos of Nash, Murphy, Lara? What about historical figures — should I source public domain photos?
2. **"What brings you here?"** Do these 5 archetypes feel right, or would you change any?
3. **Font preference:** Stay with Inter (safe) or try something more premium like Satoshi?
4. **How much of Masterclass do you want?** The full dark cinema feel, or more of a hybrid with some lighter sections?
5. **Video:** Do you have an intro video ready, or should I skip the "Watch Intro" CTA for now?
6. **Austrian heroes:** Anyone I'm missing? (Hayek? Hazlitt? Bastiat?)

---

*This is v1 brainstorm. Let's riff on it.*
