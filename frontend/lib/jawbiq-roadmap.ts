/** JAWBIQ proposed 56-day delivery plan. Never imply completion. */
export const jawbiqStartDate = "2026-11-16";
export const jawbiqTargetDate = "2027-01-10";
export const jawbiqWeeks = [
  {
    "title": "Discovery and architecture",
    "goal": "Validated scope and an official Meta test flow",
    "days": [
      {
        "title": "Write product one-pager",
        "acceptance": "Define target customers, pain points, MVP and exclusions"
      },
      {
        "title": "Interview 3 business owners",
        "acceptance": "Document their common WhatsApp requests and buying objections"
      },
      {
        "title": "Validate JAWBIQ brand",
        "acceptance": "Check domain, OMPIC trademark and positioning before registration"
      },
      {
        "title": "Set up Meta sandbox",
        "acceptance": "Create Meta app and prove test-number inbound/outbound messages"
      },
      {
        "title": "Define pricing safeguards",
        "acceptance": "Document service-window limits, free-tier and no-template policy"
      },
      {
        "title": "Initialize app repos and CI",
        "acceptance": "Create Laravel API, Next.js UI, env examples and basic lint/test workflow"
      },
      {
        "title": "Approve architecture",
        "acceptance": "Sign off tenancy, deployment, threat model and acceptance criteria"
      }
    ]
  },
  {
    "title": "Laravel and WhatsApp messaging",
    "goal": "Authenticated webhook-to-reply pipeline",
    "days": [
      {
        "title": "Design schema",
        "acceptance": "Migrate businesses, users, messages, conversations, leads and usage ledger"
      },
      {
        "title": "Add authentication",
        "acceptance": "Create protected API endpoints, sessions and reset controls"
      },
      {
        "title": "Scope each tenant",
        "acceptance": "Apply company policies and query ownership checks"
      },
      {
        "title": "Verify Meta challenge",
        "acceptance": "Pass GET webhook handshake with exact verify token"
      },
      {
        "title": "Verify signed events",
        "acceptance": "Validate HMAC of raw POST body and deduplicate Meta message IDs"
      },
      {
        "title": "Build outbound adapter",
        "acceptance": "Send authorized service replies via official Cloud API"
      },
      {
        "title": "Queue and retry events",
        "acceptance": "Add durable jobs, idempotency, bounded retries and integration tests"
      }
    ]
  },
  {
    "title": "Local AI receptionist",
    "goal": "Multilingual grounded answers with escalation",
    "days": [
      {
        "title": "Benchmark Ollama",
        "acceptance": "Compare small Qwen3 models for memory, speed and answer quality"
      },
      {
        "title": "Design knowledge base",
        "acceptance": "Store company FAQs, hours, services and approved prices"
      },
      {
        "title": "Implement grounded retrieval",
        "acceptance": "Provide only scoped and approved tenant knowledge to the model"
      },
      {
        "title": "Manage conversation context",
        "acceptance": "Use minimum needed messages, truncation and retention rules"
      },
      {
        "title": "Answer or escalate",
        "acceptance": "Block invented prices/bookings; defer when business facts are missing"
      },
      {
        "title": "Test languages",
        "acceptance": "Evaluate real Darija, Arabic, French and English scenarios"
      },
      {
        "title": "Implement safe handoff",
        "acceptance": "Honor human requests, opt-outs and uncertainty"
      }
    ]
  },
  {
    "title": "Inbox and CRM",
    "goal": "Business-facing dashboard with staff takeover",
    "days": [
      {
        "title": "Build Next.js UI shell",
        "acceptance": "Add authenticated navigation and responsive components"
      },
      {
        "title": "Build inbox listing",
        "acceptance": "Filter conversations by state, assignment and unread status"
      },
      {
        "title": "Build threaded view",
        "acceptance": "Render sanitized messages, timestamps and delivery states"
      },
      {
        "title": "Refresh inbox activity",
        "acceptance": "Add polling or real-time events and reconnect behavior"
      },
      {
        "title": "Capture leads",
        "acceptance": "Record qualified requests, contact permission and owner notes"
      },
      {
        "title": "Assign human agents",
        "acceptance": "Pause bot immediately on takeover and enforce owner controls"
      },
      {
        "title": "Enable human replies",
        "acceptance": "Send agent messages via official API with error feedback"
      }
    ]
  },
  {
    "title": "Multi-tenant onboarding",
    "goal": "Independent configuration for three businesses",
    "days": [
      {
        "title": "Map Meta phone onboarding",
        "acceptance": "Document WABA connection, roles and eligibility prerequisites"
      },
      {
        "title": "Secure token lifecycle",
        "acceptance": "Encrypt secrets and implement rotation and least-privilege access"
      },
      {
        "title": "Create business wizard",
        "acceptance": "Capture company profile, preferences and contact options"
      },
      {
        "title": "Create knowledge editor",
        "acceptance": "Edit and publish validated FAQs and service information"
      },
      {
        "title": "Add schedules",
        "acceptance": "Support each business timezone, hours and holiday handling"
      },
      {
        "title": "Add staff RBAC",
        "acceptance": "Implement owner/agent invites, permissions and audit events"
      },
      {
        "title": "Prove isolation",
        "acceptance": "Test tenant-level isolation across API, queues, files and UI"
      }
    ]
  },
  {
    "title": "Plans, cost guardrails and privacy",
    "goal": "Controlled paid pilot with transparent usage",
    "days": [
      {
        "title": "Implement atomic quota",
        "acceptance": "Reserve outbound messages atomically and reconcile delivery states"
      },
      {
        "title": "Enforce service windows",
        "acceptance": "Reject expired 24-hour window and disallow paid templates by default"
      },
      {
        "title": "Create subscriptions",
        "acceptance": "Enforce plan entitlements, trials, seats and limits"
      },
      {
        "title": "Sandbox billing",
        "acceptance": "Test subscription webhooks, state, failures and cancellation"
      },
      {
        "title": "Build analytics",
        "acceptance": "Show response times, messages, leads, usage and handoff rates"
      },
      {
        "title": "Document privacy",
        "acceptance": "Prepare Morocco privacy/CNDP checklist, export, deletion and retention"
      },
      {
        "title": "Complete security review",
        "acceptance": "Audit RBAC, webhooks, encryption, rate limits and dependencies"
      }
    ]
  },
  {
    "title": "QA and staging",
    "goal": "Regression-tested release candidate",
    "days": [
      {
        "title": "Load-test jobs",
        "acceptance": "Simulate bursts, retries and outages without duplicate sends"
      },
      {
        "title": "Test adversarial failures",
        "acceptance": "Test replay, injection, wrong tenant and invalid credentials"
      },
      {
        "title": "Test API contracts",
        "acceptance": "Validate migrations, permissions, billing hooks and lifecycle"
      },
      {
        "title": "Run end-to-end UAT",
        "acceptance": "Verify customer message to FAQ response, lead and human takeover"
      },
      {
        "title": "Benchmark resilience",
        "acceptance": "Test AI timeout and Meta outage fallback under normal server load"
      },
      {
        "title": "Prepare staging operations",
        "acceptance": "Configure Nginx/TLS, workers, backups, alerts and rollback"
      },
      {
        "title": "Approve release candidate",
        "acceptance": "Freeze scope, fix blockers and record go/no-go decision"
      }
    ]
  },
  {
    "title": "Pilots and final delivery",
    "goal": "Three pilot tests and documented handover",
    "days": [
      {
        "title": "Pilot with business A",
        "acceptance": "Onboard first business with approved test data and gather feedback"
      },
      {
        "title": "Pilot with business B",
        "acceptance": "Verify independent company knowledge, contacts and agents"
      },
      {
        "title": "Pilot with business C",
        "acceptance": "Validate multilingual flows and real lead qualification safely"
      },
      {
        "title": "Fix critical bugs",
        "acceptance": "Resolve P0/P1 reports and rerun affected acceptance tests"
      },
      {
        "title": "Reconcile operations",
        "acceptance": "Check Meta usage against records, restore backups and test alerts"
      },
      {
        "title": "Document and train",
        "acceptance": "Write owner/agent guides, support steps and privacy procedures"
      },
      {
        "title": "Deliver release",
        "acceptance": "Present demo, tests, known limits, sign-off and portfolio case-study update"
      }
    ]
  }
] as const;
