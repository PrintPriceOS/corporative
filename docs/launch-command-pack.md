# Launch Command Pack (v1.4)

This protocol governs the final activation of the PrintPrice Pro Monolith. 

## 1. Pre-Flight Verification (T-60)
- [ ] Run `npm run build` to ensure no hydration or CSS-in-JS mismatches.
- [ ] Verify `lib/telemetry.ts` logs events to console in development.
- [ ] Check `docs/launch-checklist.md` for 100% compliance.

## 2. Production Deployment Sequence (T-0)
1. **Navigate**: `cd /var/www/vhosts/printprice.pro/httpdocs`
2. **Pull**: `git pull origin master`
3. **Clean**: `rm -rf .next`
4. **Install**: `npm ci`
5. **Build**: `npm run build`
6. **Activate**: `pm2 restart printprice-web`
7. **Persist**: `pm2 save`
8. **Heat-Check**: Immediately open `/` and perform one "Start Production Audit" click.
9. **Log-Watch**: Verify `[MONOLITH_TELEMETRY]` appears in the logs.

## 3. Real-Time Observability (Day 1)
Monitor the following metrics in your analytics/console:
- **Hero_Primary_CTR**: Success if > 8%.
- **Workflow_Interaction_Rate**: Success if > 15%.
- **Developer_Activation_Rate**: Success if > 5% of /developers visitors click "Start Integration".

## 4. Operational Contingency
If **CTR < 4%** on the main hero:
- **Action**: Soften the `primaryAction.sublabel` in `app/page.tsx`.
- **Constraint**: Do NOT change the button color or font.

If **Bounce Rate > 60%** on /developers:
- **Action**: Move the Quickstart section higher in `app/developers/page.tsx`.

## 5. First 24-Hour Goals
- [ ] Identify the most clicked "Command Node" (Budget vs Preflight).
- [ ] Verify if users are clicking "Explore Infrastructure" vs "Start Audit".
- [ ] Confirm no "No-Line" rule violations found by user feedback.

---
**Protocol by**: PrintPrice OS Orchestrator
**Status**: ACTIVE / READY FOR LAUNCH
