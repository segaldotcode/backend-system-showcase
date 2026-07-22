# Backend System Showcase

## Why this exists

Six repositories, each solving one real backend problem on its own, are more convincing together than apart. This repo is the hub: it ties feature flags, audit logging, payment tracking, an AI admin assistant and a proactive monitoring agent into one story, and shows the flow that runs across all of them.

The thread: a payment is created in Payment Tracking, the state change is logged automatically in the Audit Log System, a feature flag controls which flow is active, the AI Admin Assistant summarizes the day's activity in plain language, and the eve Audit Agent watches all of it in the background, without being asked.

## The ecosystem

| Project | Role |
| --- | --- |
| [Feature Flags Dashboard](https://github.com/segaldotcode/feature-flags-dashboard) | Controls application behavior per user context, with a plain-language "why is this flag ON" explanation |
| [Audit Log System](https://github.com/segaldotcode/audit-log-system) | Traces every user action with a timeline UI, replay and suspicious activity detection |
| [Payment Tracking System](https://github.com/segaldotcode/payment-tracking-system) | Payment lifecycle state machine with refunds and receipt linking |
| [AI Admin Assistant](https://github.com/segaldotcode/ai-admin-assistant) | Natural language queries over the audit logs and payments, backed by real business data |
| [Branch Origin Finder](https://github.com/segaldotcode/branch-origin-finder) | CLI/web tool that infers a Git branch's likely parent from merge-base, reflog and confidence scoring |
| [eve Audit Agent](https://github.com/segaldotcode/eve-audit-agent) | Proactive agent that watches Supabase events in real time and reports anomalies with a human approval gate |

Four of these (Feature Flags, Audit Log, Payment Tracking, AI Admin Assistant) share a single Supabase instance, so a change in one is visible in the others without any custom integration layer.

## Features

- Ecosystem overview with a card per project, its role, its stack and a link to its repo
- Live status pulled from the shared Supabase instance: recent audit events, payment activity, active flags, read directly from the same tables the other projects write to
- A simple architecture diagram showing how the six projects connect through Supabase
- Light/dark theme toggle (with interaction sound)
- French/English language toggle

## Tech stack

- Next.js (App Router)
- Supabase (read-only access to the shared `audit_logs`, `payments` and `users` tables)
- Tailwind CSS + Shadcn UI
- next-themes (dark/light mode)
- cuelume (interaction sounds)
- pnpm

## Screenshots / Demo GIF

Coming soon.

## How to reuse

1. Clone the repo and install dependencies: `pnpm install`
2. Add Supabase credentials to `.env.local` (see `.env.example`), pointing at the same project used by feature-flags-dashboard, audit-log-system, payment-tracking-system and ai-admin-assistant, so the live status section has real data to read
3. Run `pnpm dev`. Without valid credentials or shared data, the live status card falls back to an "unavailable" or "no data yet" message instead of breaking the page

## Architecture

- `lib/projects.ts` lists the six repositories once (URL, stack, whether they share the Supabase instance), consumed by both the project cards and the architecture diagram
- `lib/supabase/ecosystem.ts` is the only place that talks to Supabase: read-only counts on `audit_logs`, `payments` and `users`, plus the last few audit events, wrapped in a try/catch that returns `null` instead of throwing
- `components/ecosystem/` holds the three building blocks of the page: `project-card.tsx`, `status-panel.tsx` (stat tiles, payments by status, recent activity) and `architecture-diagram.tsx` (a small dependency-free diagram built from the same `lib/projects.ts` data)
- `lib/i18n/` mirrors the pattern used across the other five repos: `en.json`/`fr.json` dictionaries plus a translator for audit action codes and payment statuses
- `app/page.tsx` reads the language from the URL, fetches the ecosystem status server-side, and renders the three sections: the project grid, the live status panel and the architecture diagram
