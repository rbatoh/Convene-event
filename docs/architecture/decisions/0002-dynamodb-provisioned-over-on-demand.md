# ADR 0002: DynamoDB Provisioned Capacity (Fixed 25/25) Instead of On-Demand
**Status:** Accepted

## Context
DynamoDB's Always Free allocation (25 GB, 25 RCU, 25 WCU) only applies to provisioned-
capacity tables. On-demand billing has no free allocation and bills from request one.

## Decision
Run both tables and their GSIs in `PROVISIONED` mode, fixed at a combined 20/20
RCU/WCU (5/5 per table/index), with Auto Scaling disabled.

## Consequences
+ Genuinely $0 regardless of traffic pattern.
+ A traffic spike throttles (with automatic SDK retry) instead of generating a bill.
- Sustained traffic above the fixed ceiling degrades to retries/latency rather than
  scaling automatically. Acceptable at this project's expected volume; revisit if
  that changes.
