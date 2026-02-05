# 🚨 WORKING CONTEXT — READ BEFORE EVERY EDIT

## Active Branch
**uiux-audit-fixes**

## Project Path
```
C:\Users\bradl\clawd\projects\ibc-academy-site-79537c276a088fcf484ea1af72bb1e459d34c287\ibc-academy-site-79537c276a088fcf484ea1af72bb1e459d34c287
```

## Safety Branches
| Branch | Purpose | Safe to Modify? |
|--------|---------|-----------------|
| `main` | Production | ❌ NO |
| `pre-uiux-audit-backup` | Safety snapshot | ❌ NO |
| `uiux-audit-fixes` | Current work | ✅ YES |

## Rollback Procedure
If Brad doesn't like the direction:
```bash
git checkout main
git branch -D uiux-audit-fixes
git checkout -b uiux-audit-fixes
```
This resets the working branch to match main.

Or to go back to pre-audit state:
```bash
git checkout pre-uiux-audit-backup
```

## Before EVERY Edit
1. Verify branch: `git branch --show-current` → must say `uiux-audit-fixes`
2. Verify path contains: `ibc-academy-site-79537c276a088fcf484ea1af72bb1e459d34c287`
3. If unsure, STOP and ask Brad

## Commit Strategy
- Commit after each logical change (not after every file)
- Use descriptive commit messages: `fix: [what was fixed]`
- Push to origin regularly for backup

## Files Being Modified (Update as we go)
- [ ] TBD based on audit findings

---
*Created: 2026-02-05 by Mabel for UI/UX audit session*
