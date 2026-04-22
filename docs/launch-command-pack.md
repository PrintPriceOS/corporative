# Launch Command Pack (v1.4)

This protocol governs the final activation of the PrintPrice Pro Monolith. 

## 1. Pre-Flight Verification (T-60)
- [ ] Run `npm run build` to ensure no hydration or CSS-in-JS mismatches.
- [ ] Verify `lib/telemetry.ts` logs events to console in development.
- [ ] Check `docs/launch-checklist.md` for 100% compliance.

## 2. Production Deployment Sequence (T-0)

> [!CAUTION]
> **GOLDEN RULE**: Never run `npm run build` as `root`. This breaks static chunk routing and permissions.

### Step A: System Reset (As Root)
```bash
cd /var/www/vhosts/printprice.pro/httpdocs
rm -rf .next
chown -R printprice.pro_a2w0fsu9yw9:psacln /var/www/vhosts/printprice.pro/httpdocs
su - printprice.pro_a2w0fsu9yw9
```

### Step B: Application Build (As Domain User)
```bash
cd /var/www/vhosts/printprice.pro/httpdocs
git pull origin master
npm ci
npm run build
PORT=3010 pm2 restart printprice-web || PORT=3010 pm2 start server.js --name printprice-web
pm2 save
exit
```

### Step C: Network Reload (As Root)
```bash
nginx -t && systemctl reload nginx
```

## 3. Post-Deployment Verification
Run these commands to verify the state of the monolith:
1. **Ownership**: `stat -c '%U:%G %n' .next` (Must be `printprice.pro_a2w0fsu9yw9:psacln`)
2. **Process**: `pm2 list` (Must show `printprice-web` as online)
3. **Connectivity**: `curl -I https://printprice.pro/contact/partner` (Must return HTTP 200)

## 4. Real-Time Observability (Day 1)
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
