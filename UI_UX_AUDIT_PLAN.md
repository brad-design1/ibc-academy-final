# IBC Academy UI/UX Audit Plan

*Adapted from the Jobs/Ive Premium UI/UX Architect prompt for website optimization*

---

## What We Have vs What We Need

### Already Exists (in codebase)
- **Tailwind config** → serves as partial DESIGN_SYSTEM
- **Astro components** → component library
- **Page structure** → APP_FLOW equivalent
- **Tech stack** → Astro 5 + Tailwind + Vercel

### Need to Create Before Audit
1. **DESIGN_SYSTEM.md** — Extract tokens from tailwind.config.mjs (colors, typography, spacing, shadows, radii)
2. **SITE_FLOW.md** — Map all pages and user journeys (Home → Learn → Skool CTA)
3. **LESSONS.md** — Start empty, populate as we go

### Not Needed (App-Specific)
- PRD.md (this is a marketing site, not a feature-driven app)
- State management docs
- progress.txt (we'll use git commits)

---

## Audit Dimensions Adapted for IBC Academy

### Critical for Financial Services Website

| Dimension | Why It Matters for IBC |
|-----------|------------------------|
| **Trust Signals** | Financial decisions require trust. Does the site feel legitimate, established, premium? |
| **Visual Hierarchy** | Is the value prop instantly clear? Can someone understand "what is this" in 2 seconds? |
| **Typography** | Financial content needs to feel authoritative but approachable. Too playful = untrustworthy. Too corporate = cold. |
| **Whitespace** | Breathing room = confidence. Cluttered = desperate. |
| **CTA Clarity** | One primary action per page. For us: Join Skool / Book a Call |
| **Mobile-First** | Brad's audience skews older. They're on phones AND tablets. Touch targets matter. |
| **Accessibility** | Financial services have compliance considerations. Good a11y = good business. |

### Less Critical (App-Specific)
- Complex motion/transitions (keep it subtle for credibility)
- Loading states (static site, minimal)
- Empty states (no user data)

---

## Proposed Audit Protocol for Tomorrow

### Phase 0: Documentation (30 min)
1. Extract DESIGN_SYSTEM.md from existing Tailwind config
2. Map SITE_FLOW.md (all pages, all CTAs, user journeys)
3. Create empty LESSONS.md

### Phase 1: Full Audit (60-90 min)
Walk through every page at mobile → tablet → desktop:
- Home
- About / Philosophy
- How It Works
- Resources / Learn
- Contact / Book
- Any other pages

For each, evaluate:
- [ ] Visual hierarchy — does the eye land where it should?
- [ ] Typography — calm or chaotic? Hierarchy clear?
- [ ] Spacing — breathing room or cramped?
- [ ] Color — purposeful or scattered?
- [ ] Alignment — everything on grid?
- [ ] CTA clarity — one obvious next step?
- [ ] Mobile experience — thumb-friendly? Text readable?
- [ ] Trust signals — does it feel premium and legitimate?
- [ ] Accessibility — contrast, focus states, readable?

### Phase 2: Compile Findings
Organize into:
- **Critical** — things that hurt trust or usability
- **Refinement** — things that elevate the experience
- **Polish** — micro-details that make it feel premium

### Phase 3: Review & Approve
You review each finding. Approve, modify, or cut. Nothing changes without your sign-off.

### Phase 4: Implement (Surgically)
One phase at a time. Verify after each. Git commit between phases.

---

## Jobs Filter Questions (Adapted)

For every element on every page:
1. "Would a prospect need to be told what this means?" → if yes, clarify or cut
2. "Can this be removed without losing trust or clarity?" → if yes, remove it
3. "Does this feel like a $15k/year advisor or a $99 course?" → premium positioning matters
4. "Is this detail as refined as the homepage hero?" → consistency across all pages

---

## The Mabel Adaptation

The original prompt is designed for AI coding agents working solo. Here's how I'll adapt it for our workflow:

**Original:** "Do not implement anything until user approves"
**Ours:** Same — I'll present findings, you approve, then we execute together

**Original:** "Update CLAUDE.md / AGENTS.md after implementation"
**Ours:** Update LESSONS.md + commit messages + daily notes

**Original:** "Written so build agent can execute without design interpretation"
**Ours:** I'll write specific Tailwind class changes, not vague direction

**Original:** "If functionality change required, flag for build agent"
**Ours:** If content changes needed vs design changes, I'll flag separately

---

## Tomorrow's Punch List Structure

Separate from the UI/UX audit, we should also capture:
- Broken links
- Typos / copy issues
- Missing pages
- SEO gaps (meta descriptions, alt text)
- Performance issues

These go in a PUNCH_LIST.md, not mixed with design audit.

---

## My Recommendation

**Yes, use this framework.** It's thorough without being precious. The phased approach with approval gates fits your Kolbe (you decide direction, I execute details).

The Jobs/Ive philosophy is perfect for IBC — you're not selling flashy, you're selling quiet competence and generational wealth. The site should feel like a trusted advisor's office: clean, confident, unhurried.

**Tomorrow's agenda:**
1. Branch current deployment (safety net)
2. 30 min: Create DESIGN_SYSTEM.md + SITE_FLOW.md
3. 60-90 min: Full audit using adapted protocol
4. Review findings together
5. Execute Phase 1 (Critical) with your approval
6. Commit + deploy
7. Assess if we continue to Phase 2 or pause

Ready when you are. 🌿
