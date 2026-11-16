# JAWBIQ — 56-Day Development & Delivery Plan

**Status:** Planned concept. **Target dates:** 16 November 2026–10 January 2027 (56 calendar days, weekends included). Milestones depend on Meta approval, testing and pilot feedback.

**Stack:** Laravel, Next.js, MySQL, queues/Redis, Ollama local AI, official Meta WhatsApp Cloud API.

## Daily tasks

### Week 1: Discovery and architecture
**Outcome:** Validated scope and an official Meta test flow

- [ ] **Day 1 — Write product one-pager**: Define target customers, pain points, MVP and exclusions.
- [ ] **Day 2 — Interview 3 business owners**: Document their common WhatsApp requests and buying objections.
- [ ] **Day 3 — Validate JAWBIQ brand**: Check domain, OMPIC trademark and positioning before registration.
- [ ] **Day 4 — Set up Meta sandbox**: Create Meta app and prove test-number inbound/outbound messages.
- [ ] **Day 5 — Define pricing safeguards**: Document service-window limits, free-tier and no-template policy.
- [ ] **Day 6 — Initialize app repos and CI**: Create Laravel API, Next.js UI, env examples and basic lint/test workflow.
- [ ] **Day 7 — Approve architecture**: Sign off tenancy, deployment, threat model and acceptance criteria.

### Week 2: Laravel and WhatsApp messaging
**Outcome:** Authenticated webhook-to-reply pipeline

- [ ] **Day 8 — Design schema**: Migrate businesses, users, messages, conversations, leads and usage ledger.
- [ ] **Day 9 — Add authentication**: Create protected API endpoints, sessions and reset controls.
- [ ] **Day 10 — Scope each tenant**: Apply company policies and query ownership checks.
- [ ] **Day 11 — Verify Meta challenge**: Pass GET webhook handshake with exact verify token.
- [ ] **Day 12 — Verify signed events**: Validate HMAC of raw POST body and deduplicate Meta message IDs.
- [ ] **Day 13 — Build outbound adapter**: Send authorized service replies via official Cloud API.
- [ ] **Day 14 — Queue and retry events**: Add durable jobs, idempotency, bounded retries and integration tests.

### Week 3: Local AI receptionist
**Outcome:** Multilingual grounded answers with escalation

- [ ] **Day 15 — Benchmark Ollama**: Compare small Qwen3 models for memory, speed and answer quality.
- [ ] **Day 16 — Design knowledge base**: Store company FAQs, hours, services and approved prices.
- [ ] **Day 17 — Implement grounded retrieval**: Provide only scoped and approved tenant knowledge to the model.
- [ ] **Day 18 — Manage conversation context**: Use minimum needed messages, truncation and retention rules.
- [ ] **Day 19 — Answer or escalate**: Block invented prices/bookings; defer when business facts are missing.
- [ ] **Day 20 — Test languages**: Evaluate real Darija, Arabic, French and English scenarios.
- [ ] **Day 21 — Implement safe handoff**: Honor human requests, opt-outs and uncertainty.

### Week 4: Inbox and CRM
**Outcome:** Business-facing dashboard with staff takeover

- [ ] **Day 22 — Build Next.js UI shell**: Add authenticated navigation and responsive components.
- [ ] **Day 23 — Build inbox listing**: Filter conversations by state, assignment and unread status.
- [ ] **Day 24 — Build threaded view**: Render sanitized messages, timestamps and delivery states.
- [ ] **Day 25 — Refresh inbox activity**: Add polling or real-time events and reconnect behavior.
- [ ] **Day 26 — Capture leads**: Record qualified requests, contact permission and owner notes.
- [ ] **Day 27 — Assign human agents**: Pause bot immediately on takeover and enforce owner controls.
- [ ] **Day 28 — Enable human replies**: Send agent messages via official API with error feedback.

### Week 5: Multi-tenant onboarding
**Outcome:** Independent configuration for three businesses

- [ ] **Day 29 — Map Meta phone onboarding**: Document WABA connection, roles and eligibility prerequisites.
- [ ] **Day 30 — Secure token lifecycle**: Encrypt secrets and implement rotation and least-privilege access.
- [ ] **Day 31 — Create business wizard**: Capture company profile, preferences and contact options.
- [ ] **Day 32 — Create knowledge editor**: Edit and publish validated FAQs and service information.
- [ ] **Day 33 — Add schedules**: Support each business timezone, hours and holiday handling.
- [ ] **Day 34 — Add staff RBAC**: Implement owner/agent invites, permissions and audit events.
- [ ] **Day 35 — Prove isolation**: Test tenant-level isolation across API, queues, files and UI.

### Week 6: Plans, cost guardrails and privacy
**Outcome:** Controlled paid pilot with transparent usage

- [ ] **Day 36 — Implement atomic quota**: Reserve outbound messages atomically and reconcile delivery states.
- [ ] **Day 37 — Enforce service windows**: Reject expired 24-hour window and disallow paid templates by default.
- [ ] **Day 38 — Create subscriptions**: Enforce plan entitlements, trials, seats and limits.
- [ ] **Day 39 — Sandbox billing**: Test subscription webhooks, state, failures and cancellation.
- [ ] **Day 40 — Build analytics**: Show response times, messages, leads, usage and handoff rates.
- [ ] **Day 41 — Document privacy**: Prepare Morocco privacy/CNDP checklist, export, deletion and retention.
- [ ] **Day 42 — Complete security review**: Audit RBAC, webhooks, encryption, rate limits and dependencies.

### Week 7: QA and staging
**Outcome:** Regression-tested release candidate

- [ ] **Day 43 — Load-test jobs**: Simulate bursts, retries and outages without duplicate sends.
- [ ] **Day 44 — Test adversarial failures**: Test replay, injection, wrong tenant and invalid credentials.
- [ ] **Day 45 — Test API contracts**: Validate migrations, permissions, billing hooks and lifecycle.
- [ ] **Day 46 — Run end-to-end UAT**: Verify customer message to FAQ response, lead and human takeover.
- [ ] **Day 47 — Benchmark resilience**: Test AI timeout and Meta outage fallback under normal server load.
- [ ] **Day 48 — Prepare staging operations**: Configure Nginx/TLS, workers, backups, alerts and rollback.
- [ ] **Day 49 — Approve release candidate**: Freeze scope, fix blockers and record go/no-go decision.

### Week 8: Pilots and final delivery
**Outcome:** Three pilot tests and documented handover

- [ ] **Day 50 — Pilot with business A**: Onboard first business with approved test data and gather feedback.
- [ ] **Day 51 — Pilot with business B**: Verify independent company knowledge, contacts and agents.
- [ ] **Day 52 — Pilot with business C**: Validate multilingual flows and real lead qualification safely.
- [ ] **Day 53 — Fix critical bugs**: Resolve P0/P1 reports and rerun affected acceptance tests.
- [ ] **Day 54 — Reconcile operations**: Check Meta usage against records, restore backups and test alerts.
- [ ] **Day 55 — Document and train**: Write owner/agent guides, support steps and privacy procedures.
- [ ] **Day 56 — Deliver release**: Present demo, tests, known limits, sign-off and portfolio case-study update.

## Mandatory acceptance criteria
- Signed Meta webhook authentication and idempotent inbound events.
- No paid outbound templates by default and a conservative atomic monthly per-number budget guard, with Meta billing reconciliation; no guarantee of zero external charges without account-level verification.
- All data and knowledge scoped by company; cross-tenant access tests pass.
- Human handoff, opt-out and no-fabricated-prices policies demonstrated.
- E2E and outage tests pass; backups and rollback documented.
- Privacy/consent/retention reviewed; release requires recorded go/no-go.

## Explicitly excluded from MVP
Bulk marketing broadcasts; unrestricted AI chats; telephone calls; payment inside WhatsApp; unsupported integration methods.

## Portfolio policy
Keep the status **Concept** until implementation or pilot evidence exists. Mark milestones complete only after tests and screenshots are recorded.
