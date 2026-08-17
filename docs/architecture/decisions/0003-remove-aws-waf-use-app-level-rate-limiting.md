# ADR 0003: Replace AWS WAF With Application-Level Rate Limiting
**Status:** Accepted

## Context
AWS WAF has no free tier under any configuration — a flat ~$5/month WebACL fee applies
from the first request, regardless of traffic volume.

## Decision
Implement a per-IP rate limiter (DynamoDB counter items with TTL) and a honeypot form
field inside the Register Lambda, instead of an AWS WAF WebACL.

## Consequences
+ $0 cost; reuses the `registrations` table's existing free-tier capacity.
- No managed-rule bot/signature detection or CAPTCHA — meaningfully less sophisticated
  than WAF. If abuse becomes a real problem, revisit with paid WAF or a free
  third-party CAPTCHA (e.g. reCAPTCHA) on the frontend.
