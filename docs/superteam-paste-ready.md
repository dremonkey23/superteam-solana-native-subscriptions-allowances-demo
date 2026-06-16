# Superteam Paste-Ready Submission Text

## Project title

AI-Agent Allowance Controls for Solana Native Subscriptions

## Public GitHub repository

https://github.com/dremonkey23/superteam-solana-native-subscriptions-allowances-demo

## Short description

A TypeScript technical demo showing how Solana Native Subscriptions & Allowances can let AI agents request recurring payments while staying bounded by user-defined controls: merchant allowlists, per-charge caps, rolling-period limits, cadence checks, expiry, revocation, and audit logs.

## Long description

This demo explores a practical agentic payments use case: allowing an AI agent to manage recurring software subscriptions without granting broad wallet authority. The local mock models an allowance policy that approves or rejects charge requests before payment execution. It demonstrates the control-plane behavior needed for safer agent spending: only approved merchants, strict caps, cadence enforcement, expiry, revocation, and auditable decisions.

The code is intentionally local-first and safe to run. It makes no RPC calls, uses no wallet connection, includes no credentials, sends no transactions, and processes no live payments. It is designed as a clear bridge from mock logic to Solana's native subscriptions and allowances primitives: local allowance policies map to fixed/recurring delegations, audit events map to program logs or indexed events, and the future devnet path can use official Solana subscriptions tooling after explicit operator approval.

## Canadian relevance

The demo includes Canadian-aligned scenarios for Superteam Canada. Example use cases include Canadian SaaS vendors, creator tooling companies, dev agencies, and startups that want AI agents to manage recurring API, RPC, or tooling spend with clear user control and revocation.

## How to run

```bash
npm install
npm run check
```

`npm run check` runs the terminal demo, automated tests, safety verification, and TypeScript typecheck.

## What this demonstrates

- AI-agent subscription spending with user-controlled allowance boundaries.
- Merchant allowlist checks.
- Per-charge and rolling-period caps.
- Cadence enforcement for recurring charges.
- Expiry and revocation behavior.
- Audit events for approved and rejected decisions.
- A design-only mapping from local policy concepts to Solana subscriptions and allowances primitives.

## Verification

Clean clone verification passed after publishing:

- Demo: passed
- Tests: 8/8 passed
- Safety scanner: passed across public packet files
- TypeScript typecheck: passed

## Demo video

Optional / not included yet.

## Social proof

Optional / not included yet.
