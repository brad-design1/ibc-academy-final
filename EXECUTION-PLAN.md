# IBC Academy Website — Execution Plan
Generated: 2026-01-28 00:02 CST

## Current State
- Astro site at `projects/ibc-academy-site/` — 17 pages, 14 components, 3 articles
- Both domains (ibcacademy.org, theibcacademy.com) = Squarespace "Coming Soon"
- 48 Skool scripts exist in `scripts/ibc-academy/`
- IBC knowledge base at `notebook-lm/` (160+ files)

## Agent Swarm — 12 Agents

### WAVE 1: Core Missing Pages (5 agents, parallel)
| Agent | Task | Output Files |
|-------|------|-------------|
| page-about | About page — IBC Academy mission, education-first philosophy, Nelson Nash lineage | `pages/about.astro` |
| page-contact | Contact page — inquiry form, booking link, email | `pages/contact.astro` |
| page-faq | FAQ page — 15-20 common IBC questions w/ answers | `pages/faq.astro` |
| page-legal | Privacy Policy + Terms of Use | `pages/privacy.astro`, `pages/terms.astro` |
| page-404 | Custom 404 error page | `pages/404.astro` |

### WAVE 2: Missing Path Pages (2 agents, parallel)
| Agent | Task | Output Files |
|-------|------|-------------|
| path-business | Business Owner persona path (matches existing pattern) | `pages/paths/business-owner.astro` |
| path-professional | Professional persona path (matches existing pattern) | `pages/paths/professional.astro` |

### WAVE 3: Blog Articles (3 agents, parallel, 4 articles each)
| Agent | Task | Output Files |
|-------|------|-------------|
| articles-foundations | 4 foundational articles: Nelson Nash & BYOB, Banking Function Explained, How Policy Loans Work, Who Should Consider IBC | `content/articles/*.md` |
| articles-mechanics | 4 mechanics articles: Whole Life vs Term, Dividends Simply Explained, Paid-Up Additions, Cash Value Growth | `content/articles/*.md` |
| articles-comparisons | 4 comparison/SEO articles: IBC vs 401k, Dave Ramsey BTID Myth, Common IBC Myths Debunked, How Much Does IBC Cost | `content/articles/*.md` |

### WAVE 4: Technical/SEO (1 agent)
| Agent | Task | Output Files |
|-------|------|-------------|
| seo-setup | robots.txt, sitemap integration, OG defaults | `public/robots.txt`, astro config updates |

### WAVE 5: Missing Scripts (1 agent)
| Agent | Task | Output Files |
|-------|------|-------------|
| scripts-module3 | Write missing scripts 13 (Direct vs Non-Direct) and 14 (Evaluating Riders) | `scripts/ibc-academy/13-*.md`, `scripts/ibc-academy/14-*.md` |

## Definition of Done Per Agent
Each agent must:
1. Read at least 3 files from the IBC knowledge base for research
2. Follow the existing Astro page patterns exactly
3. Use brand colors: Navy #1B365D, Gold #C9A84C, White #FFFFFF
4. Include proper Layout import and component structure
5. Write educational content only — no product sales language
6. Include the disclaimer: "IBC Academy does not sell financial products or provide financial advice."
7. Match the voice: warm, educational, confident, Nash-aligned

## File Context
- Layout: `src/layouts/Layout.astro` — imports Header, Footer, SearchModal
- Article schema: title, description, pubDate, category (fundamentals|mechanics|principles|case-study|compared-to-what|austrian-economics), tags[], draft, featured
- CSS: `src/styles/global.css` — Tailwind + custom theme vars
- Knowledge base: `C:\Users\bradl\clawd\notebook-lm\` (core-ibc, client-education, policy-illustrations, sales-objections, case-studies, compliance)
