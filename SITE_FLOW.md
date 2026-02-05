# IBC Academy Site Flow

*User journeys and page structure — February 5, 2026*

---

## Site Map (29 pages)

```
/                          Home (Hero + Masters + Content Browser + Social Proof)
├── /learn                 Learning Hub (index)
│   ├── /start-here        Start Here (orientation)
│   ├── /compared-to-what  Comparison Tool
│   ├── /case-studies      Case Studies
│   ├── /glossary          IBC Glossary
│   └── /articles          Articles Index
│       └── /[...slug]     Dynamic Article Pages (80+ articles)
├── /watch                 Video Content Hub
├── /listen                Podcast/Audio Hub
├── /book                  BYOB Book Section
│   ├── /free-chapter      Free Chapter Download
│   ├── /purchase          Purchase Links
│   └── /reading-guide     Reading Guide
├── /community             Skool Community CTA
├── /paths                 Persona-Based Journeys
│   ├── /parent            "Build a Legacy"
│   ├── /freedom-seeker    "Find Freedom"
│   ├── /real-estate       "Fund Deals"
│   ├── /business-owner    "Own a Business"
│   ├── /skeptic           "Prove It"
│   ├── /just-curious      "Just Curious"
│   ├── /deeper-understanding "Go Deeper"
│   └── /professional      "Beyond 401(k)"
├── /about                 About Page
├── /contact               Contact Page
├── /faq                   FAQ Page
├── /resources             Resources Hub
├── /privacy               Privacy Policy
├── /terms                 Terms of Service
└── /404                   Custom 404 Page
```

---

## Primary User Journeys

### Journey 1: Cold Visitor → Engaged Learner
```
Google/Social → Home → "Start Here" CTA → /learn/start-here → Articles → Skool
                   ↓
              Persona Tile → /paths/[type] → Curated Articles → Skool
```

### Journey 2: Book-Curious Visitor
```
Home → "Book" Nav → /book → Free Chapter → Email Capture → Purchase
```

### Journey 3: Skeptical Researcher
```
Home → "Prove It" Persona → /paths/skeptic → Compared-to-What → Case Studies → Skool
```

### Journey 4: Ready-to-Engage
```
Home/Any Page → "Start Free" CTA → /learn/start-here → Orientation → Community
```

### Journey 5: Content Binge
```
/learn → Browse Categories → Article → Related Article (via navigation) → Loop
```

---

## CTAs by Page

### Global (All Pages)
| Location | CTA | Target |
|----------|-----|--------|
| Header | "Start Free" button | /learn/start-here |
| Footer | Email capture | TBD (Formspree/ConvertKit) |

### Home Page
| Section | CTA | Target |
|---------|-----|--------|
| Hero | "Start Here — It's Free" | /learn/start-here |
| Hero | "Watch the Intro" | /watch |
| Persona Tiles (8) | Individual paths | /paths/[type] |
| Content Browser | Category tabs | Inline content |
| Email Capture | Newsletter signup | TBD |

### Learn Section
| Page | Primary CTA | Target |
|------|-------------|--------|
| /learn | "Start Here" | /learn/start-here |
| /learn/start-here | "Join the Academy" | /community |
| /learn/articles | Article links | Individual articles |
| Article pages | Footer CTA | /community or /book |

### Book Section
| Page | Primary CTA | Target |
|------|-------------|--------|
| /book | "Get Free Chapter" | /book/free-chapter |
| /book | "Purchase" | /book/purchase |
| /book/free-chapter | Email capture | Download |
| /book/purchase | Amazon link | External |

### Path Pages (8 personas)
| All Paths | Primary CTA | Target |
|-----------|-------------|--------|
| After curated content | "Join the Community" | /community |
| Contextual | Related articles | /learn/articles/... |

---

## Navigation Structure

### Header (Desktop)
```
[Logo] -------- [Search] -------- [Learn] [Watch] [Listen] [Book] [Community] [Start Free]
```

### Header (Mobile)
```
[Logo] -------------------- [Search] [☰ Menu]
                                      ↓
                              [Learn]
                              [Watch]
                              [Listen]
                              [Book]
                              [Community]
                              [Start Free]
```

### Footer
```
[Logo + Tagline]
[Learn] [Watch] [Listen] [Book] [Community]
[About] [Contact] [FAQ] [Resources]
[Privacy] [Terms]
[Social Links]
[Copyright]
```

---

## Conversion Funnels

### Primary: Free Education → Skool Community
1. Awareness: Home page, social, search
2. Interest: Persona path or article browsing
3. Engagement: Start Here orientation
4. Conversion: Join Skool community
5. Activation: Consume curriculum

### Secondary: Free Education → Book Purchase
1. Awareness: Home or /book
2. Interest: Free chapter download
3. Evaluation: Reading guide
4. Conversion: Purchase BYOB

### Tertiary: Education → Consultation (Future)
1. Education consumption
2. Skool engagement
3. Brad consultation (booking link TBD)

---

## Content Categories (for ContentBrowser)

| Category | Description | Article Count |
|----------|-------------|---------------|
| Foundations | Core IBC concepts | ~15 |
| Case Studies | Real-world examples | ~10 |
| Mechanics | How policies work | ~12 |
| Philosophy | Austrian economics, mindset | ~10 |
| Comparisons | IBC vs alternatives | ~8 |
| Advanced | Deep dives, edge cases | ~15 |
| Objections | Common questions answered | ~10 |

---

## Page Components Mapping

| Component | Used On |
|-----------|---------|
| Layout.astro | All pages |
| Header.astro | All pages (via Layout) |
| Footer.astro | All pages (via Layout) |
| Hero.astro | Home only |
| TrustBar.astro | Home only |
| MastersGallery.astro | Home only |
| ContentBrowser.astro | Home, /learn |
| SocialProof.astro | Home only |
| EmailCapture.astro | Home, /book/free-chapter |
| PersonaHero.astro | /paths/* pages |
| ArticleNavigation.astro | Article pages |
| ArticleFooterCTA.astro | Article pages |
| SearchModal.astro | All pages (via Layout) |

---

## Key Metrics to Track (Future)

| Metric | Measures | Goal |
|--------|----------|------|
| Hero CTA click rate | Headline effectiveness | >5% |
| Persona tile clicks | Journey preference distribution | Track split |
| Start Here → Skool | Primary conversion | >3% |
| Time on article pages | Content quality | >3 min avg |
| Search usage | Content findability | Baseline TBD |
| Mobile vs Desktop | Audience device mix | Monitor |

---

## Notes for Audit

### Things to Verify
- [ ] All 8 persona paths have consistent structure
- [ ] Every page has a clear primary CTA
- [ ] No dead ends (every page leads somewhere)
- [ ] Mobile navigation accessible and usable
- [ ] Search actually returns relevant results
- [ ] Email capture forms are wired up (currently not)
- [ ] External links open in new tab

### Known Gaps
- Email capture not connected (Formspree/ConvertKit TBD)
- No contact form visible on /contact
- Booking link for consultations not added
- Some article footer CTAs may be inconsistent
