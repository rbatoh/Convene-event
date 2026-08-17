# Incident Response Runbook

## Alerts
CloudWatch alarms will trigger the `OpsSNSTopic`.

## Initial Triage
1. Check CloudWatch Logs for the failing Lambda function.
2. Check the `NotificationDLQ` for failed email notification events.
3. Rollback the deployment if the errors correspond to a recent release (see `deploy-and-rollback.md`).
