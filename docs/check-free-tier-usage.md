# Check Free Tier Usage Runbook

To ensure the architecture remains within the AWS Always Free limits:
1. Check the AWS Billing Dashboard.
2. Verify DynamoDB provisioned capacity remains exactly at 5 RCU / 5 WCU across all tables and GSIs combined (total 20/20).
3. Verify Lambda invocations are below 1M per month.
4. Verify CloudFront data transfer is below 1TB.

> Remember that AWS Free Tier limits apply to the *entire account*, not just this project.
