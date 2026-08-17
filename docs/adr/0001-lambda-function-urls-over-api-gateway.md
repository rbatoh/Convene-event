# ADR 0001: Use Lambda Function URLs Instead of API Gateway
**Status:** Accepted

## Context
API Gateway's REST API free tier is time-boxed to 12 months (legacy accounts) or the
6-month signup credit (new accounts) — not on AWS's permanent Always Free list. This
project needs to stay free indefinitely, regardless of account age.

## Decision
Expose each backend Lambda directly via a Lambda Function URL instead of routing
through API Gateway.

## Consequences
+ No API Gateway cost, ever.
+ Simpler admin-endpoint auth (Function URL `AuthType: AWS_IAM` vs. API keys/usage plans).
- No built-in request validation, usage plans, or centralized throttling — validation
  moved into Lambda code; rate limiting handled at the application level (see ADR 0003).
- The frontend tracks five endpoint URLs instead of one base path + routes.
