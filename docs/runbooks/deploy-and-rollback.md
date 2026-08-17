# Deploy and Rollback Runbook

## How to Deploy
Deployments are managed automatically via GitHub Actions:
1. Merge a Pull Request to `main`.
2. The staging environment will deploy automatically.
3. Once staging is smoke-tested, a reviewer must manually approve the deployment in the GitHub Actions UI (under Environments > production).
4. The exact same build artifact is then promoted to production.

## How to Rollback
If a production deployment introduces a critical bug:
1. Revert the offending commit on `main`.
2. This will trigger a new CI/CD build to deploy the reverted state.
3. Alternately, use GitHub Actions to re-run an older, known-good deployment job.
