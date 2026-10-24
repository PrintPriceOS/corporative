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
  2. **Supervisor Process & Explicit Injected Identity**: Sets `RELEASE_ID` explicitly into the process environment when starting or reloading the candidate (`RELEASE_ID=${CANDIDATE_BUILD_ID} PORT=${EXPECTED_PORT} pm2 reload ${EXPECTED_PM2_APP} --update-env`) and restores the previous `RELEASE_ID` on rollback. This prevents depending on file access timing or when Next.js loads modules and reads `.next/BUILD_ID`. Verifies subscription user, PM2 online status, `pm_cwd` matching `APP_ROOT`, and the served identity in memory via HTTP (`/api/health`, boot-captured, no secrets). Maintains documented verification boundary limits for legacy releases returning HTTP 404.
  3. **Zero Alternative Validation Paths in SIMULATION_MODE**: The deployment script runs 100% production validation logic in both testing and production; test environments substitute only external boundary operations (`curl`, `git`, `pm2`).
  4. **Strict Release Classification & Origin ETag Comparison**:
     - *Origin OK + Public OK and updated* => `ACTIVE` (exit 0).
     - *Origin OK + Public HTTP 200 + Positive evidence of old version* => `PENDING_CACHE_INVALIDATION` (exit 0).
     - *Public content incorrect without old version evidence* => `PUBLIC_FAILED` (triggers rollback, exit 1).
     - Completely eliminates `OR public_content_ok != true` which allowed declaring cache invalidation without evidence.
     - Avoids false cache alarms on unchanged pages: compares public ETag with current origin response for the same route. Stale cache is only flagged if public ETag differs from origin and matches pre-deployment ETag, or if public `/api/health` serves previous release identity.
  5. **State Machine Rollback**: Idempotent rollback across `INITIAL`, `LIVE_MOVED`, `STAGING_MOVED`, `VERIFYING`, `ORIGIN_FAILED`, `PUBLIC_FAILED`.

### Simulation Test Suite
- **Path**: `scripts/tests/test_runbook_simulation.sh`
- **Coverage**: 28 end-to-end tests exercising real production script functions in an isolated sandbox with controllable test doubles:
  - Happy path `ACTIVE` (exit 0)
  - Stale cache detection `PENDING_CACHE_INVALIDATION` (exit 0)
  - Origin 500 failure rollback (`ORIGIN_FAILED`, exit 1)
  - Public 500 failure rollback (`PUBLIC_FAILED`, exit 1)
  - Served identity mismatch rollback (exit 1)
  - PM2 reload failure rollback (exit 1)
  - Early SHA format / remote non-existence rejection (exit 1)
  - Legacy release 404 verification boundary
  - Real signal traps `SIGINT` (130) and `SIGTERM` (143)
  - **Regression 1**: Public content incorrect without old version evidence strictly yields `PUBLIC_FAILED` and triggers rollback
  - **Regression 2**: Unchanged page retaining identical ETag between origin and public proxy classifies as `ACTIVE`
  - **Regression 3**: Candidate reload and rollback receive and serve respective `RELEASE_ID` via PM2 environment and boot introspection
- **Execution**:
  ```bash
  bash scripts/tests/test_runbook_simulation.sh
  ```

---
**Protocol by**: PrintPrice OS Orchestrator
**Status**: ACTIVE / READY FOR LAUNCH

