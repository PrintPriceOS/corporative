---
description: to-stitch: Convert current output into a Stitch-ready UI specification.
---

# to-stitch

Convert current output into a Stitch-ready UI specification.

## Instructions

1. Take the latest Antigravity output
2. Pass it to the stitch-ui-adapter agent
3. Return ONLY:
   - STITCH PROMPT (SHORT)
   - STITCH PROMPT (DETAILED)

## Rules

- Do not include explanations
- Do not include markdown formatting outside sections
- Ensure output is clean and ready to paste into Stitch
- If multiple pages exist, separate clearly

## Execute

/stitch-ui-adapter
