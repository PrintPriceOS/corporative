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

## 6. Controlled Deployment Runbook (Scripted & Verifiable)

For governed, zero-downtime production deployment with verified state rollback and external doubles:

### Script
- **Path**: `scripts/deploy_production_controlled.sh`
- **Guarantees**:
  1. **Strict Candidate SHA Validation**: Verifies candidate git commit SHA (canonical 40-char hex format) before any filesystem writes. Uses an isolated temporary directory and `git fetch --depth 1` against the remote repository to ensure the commit exists; rejects invalid formats and remote errors immediately with non-zero exit.
  2. **Supervisor Process & Boot-Loaded Identity**: Verifies subscription user (`printprice.pro_a2w0fsu9yw9`), PM2 process (`printprice-web`), online status, working directory (`pm_cwd` matching `APP_ROOT`), and the actual release version loaded in memory via HTTP (`/api/health`, boot-captured, no secrets). Compares expected identity post-deploy and during recovery; declares explicit verification boundary limits for legacy releases returning 404.
  3. **Zero Alternative Validation Paths in SIMULATION_MODE**: The deployment script runs 100% production validation logic in both testing and production; test environments substitute only external boundary operations (`curl`, `git`, `pm2`).
  4. **Dynamic Cache Classification & Public Access Safety**: Eliminates fixed historical ETags. `PENDING_CACHE_INVALIDATION` is only classified when there is confirmed evidence of old content/ETag alongside a verified, healthy origin (HTTP 200). Public HTTP 500/502 or timeouts are classified as `PUBLIC_FAILED` (triggers rollback, never success). Handles non-zero returns from `classify_release_state` explicitly under `set -e`.
  5. **State Machine Rollback**: Idempotent rollback across `INITIAL`, `LIVE_MOVED`, `STAGING_MOVED`, `VERIFYING`, `ORIGIN_FAILED`, `PUBLIC_FAILED`.

### Simulation Test Suite
- **Path**: `scripts/tests/test_runbook_simulation.sh`
- **Coverage**: 24 end-to-end tests exercising real production script functions in an isolated sandbox with controllable test doubles (happy path ACTIVE, stale cache PENDING_CACHE_INVALIDATION, origin 500 failure rollback, public 500 failure rollback, wrong served identity rollback, PM2 reload failure rollback, early SHA format/remote failure validation, legacy 404 verification boundary, real signal traps SIGINT/SIGTERM, pipefail SIGPIPE prevention).
- **Execution**:
  ```bash
  bash scripts/tests/test_runbook_simulation.sh
  ```

---
**Protocol by**: PrintPrice OS Orchestrator
**Status**: ACTIVE / READY FOR LAUNCH

