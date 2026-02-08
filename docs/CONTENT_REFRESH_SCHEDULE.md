# Content Refresh Schedule

## Overview
Search engines reward fresh content. This document outlines the quarterly process for updating our top-performing articles to maintain content freshness signals.

## Quarterly Process (Every 3 Months)

### 1. Identify Top 10 Articles
Use analytics to determine the top 10 articles by:
- Organic search traffic
- Time on page
- Social shares
- Conversion rate

### 2. Content Review & Updates
For each top article:

1. **Review accuracy** - Ensure all facts, examples, and references are current
2. **Update examples** - Replace dated examples with fresh ones
3. **Add new insights** - Incorporate recent industry developments
4. **Improve clarity** - Refine explanations based on reader feedback
5. **Update references** - Add recent relevant studies or articles

### 3. Update Article Metadata
After content updates, update the frontmatter:

```yaml
---
title: "Article Title"
description: "Updated description if needed"
pubDate: 2025-02-01  # Original publication date - DO NOT CHANGE
updatedDate: 2025-05-01  # TODAY'S DATE
category: fundamentals
tags: ["updated", "tags", "if", "needed"]
---
```

### 4. Implementation Checklist

- [ ] Content review completed
- [ ] New examples/insights added
- [ ] `updatedDate` field updated in frontmatter
- [ ] Changes committed to git
- [ ] Site rebuild triggered
- [ ] "Last Updated" date appears on live article

## Target Articles for Next Refresh (Q2 2026)

Based on current site structure, prioritize these articles:
1. `banking-vs-investing.md` (featured article)
2. `business-01-greatest-asset.md` 
3. `business-02-cash-flow-problem.md`
4. _(Add 7 more based on analytics data)_

## Automation Notes

The article template automatically displays:
- **Author byline**: "By Brad Raschke" on all articles
- **Last Updated**: Only shown when `updatedDate` is present in frontmatter
- **Published date**: Always shown from `pubDate`

## Tracking

Log each quarterly refresh in project documentation:
- Date of refresh cycle
- Articles updated
- Key changes made
- Impact on search rankings (track 30 days post-update)

## Next Review: May 1, 2026