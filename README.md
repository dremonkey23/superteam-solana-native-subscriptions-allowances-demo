# Superteam Solana Native Subscriptions & Allowances — Technical Demo Packet

Public-ready starter packet for a **safe devnet/mock TypeScript demo**: AI-agent allowance controls for recurring Solana-native subscriptions.

## Status

- **Phase:** local demo packet, not submitted
- **Network:** mock by default, devnet design only
- **Keys:** no private keys, no seed phrases, no `.env` requirement
- **Mainnet:** explicitly out of scope
- **Approvals still required:** region/account selection, any wallet connection, any devnet deployment, any final submission

## Demo thesis

AI agents need constrained spending authority. This packet demonstrates an allowance controller that can approve or reject agent-initiated subscription payments based on:

1. merchant allowlist
2. per-transaction cap
3. rolling-period spend cap
4. subscription cadence
5. expiry timestamp
6. revocation state
7. audit log evidence

The demo is intentionally framed as **control-plane logic**, not financial execution.

## What this repo contains

```text
.
├── README.md
├── docs/
│   ├── architecture.md
│   ├── approval-gates.md
│   ├── demo-script.md
│   ├── references.md
│   ├── submission-draft.md
│   └── verification-evidence.md
├── src/
│   ├── allowance-policy.ts
│   └── mock-demo.ts
└── scripts/
    └── verify-safety.ts
```

## Quick start

```bash
npm install
npm run demo
npm test
npm run verify
npm run typecheck
```

Shortcut:

```bash
npm run check
```

Expected behavior:

- allows compliant subscription charge
- rejects non-allowlisted merchant
- rejects over-cap charge
- rejects cadence violation
- rejects expired/revoked allowance
- confirms no mainnet/private-key/submission indicators exist in source files

## Safety contract

This repository must remain safe to publish and safe to run locally.

Hard rules:

- Do not add private keys, seed phrases, or wallet export files.
- Do not submit to Superteam or any bounty platform without explicit approval.
- Do not use mainnet or mainnet-beta RPC endpoints.
- Do not broadcast transactions.
- Do not require login, KYC, wallet signing, or account binding for the local mock.
- Any future devnet path must be opt-in, clearly labeled, and approval-gated.

## Demo storyline

1. User grants `agent:research-buyer` an allowance for one approved SaaS merchant.
2. Agent tries a valid monthly subscription charge under cap.
3. Controller approves and records an audit event.
4. Agent tries a charge to an unapproved merchant.
5. Controller blocks it.
6. Agent tries to exceed the monthly cap.
7. Controller blocks it.
8. User revokes the allowance.
9. Any future charge is blocked.

## Canadian relevance

This demo is globally useful, but it is framed with Superteam Canada’s bonus criteria in mind.

Example Canadian-aligned use cases:

- **Canadian SaaS vendors:** AI agents can manage recurring subscriptions for tools used by startups, agencies, and SMBs without receiving broad wallet authority.
- **Canadian creator tooling:** creators can authorize agents to pay for editing, analytics, distribution, or community tools with hard caps and revocation.
- **Canadian dev shops / hackathon teams:** project agents can buy API credits, RPC plans, or deployment services under a team-approved allowance.
- **Cross-border contractors:** allowance policies can make recurring crypto-native payment approvals clearer for distributed teams working with Canadian clients.

The key benefit: teams can experiment with agent-driven purchasing while preserving user control, auditability, and bounded spend.

## Devnet extension design

The current code is mock-only. A future devnet branch can map this control plane to Solana primitives:

- PDA: allowance policy account owned by user authority
- SPL token account: user-funded devnet USDC-like mint vault
- instruction: `create_allowance(policy)`
- instruction: `attempt_charge(subscription_invoice)`
- instruction: `revoke_allowance(policy_id)`
- event: append-only audit log emitted for every decision

No devnet implementation should happen until approval is given.

## Recommended packet deliverables

For the Superteam technical demo packet, prepare:

1. `README.md` — public summary and local run instructions
2. `docs/architecture.md` — control model and devnet mapping
3. `docs/demo-script.md` — 2-minute recorded demo script
4. `src/mock-demo.ts` — executable mock showing allowance decisions
5. screenshots or terminal recording from `npm run demo`

## Non-goals

- no production custody
- no DeFi yield
- no mainnet payments
- no autonomous unrestricted spend
- no hidden wallet signing
- no claims of live integration unless later built and verified
