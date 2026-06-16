# Submission Draft — Not Submitted

> Approval-gated: this is a local draft only. Do not paste or submit without final human review.

## Listing

Technical Demo: Solana Native Subscriptions & Allowances Code Sample

## Project title

AI-Agent Allowance Controls for Solana Native Subscriptions

## Public repo link

https://github.com/dremonkey23/superteam-solana-native-subscriptions-allowances-demo

## Short description

A TypeScript technical demo showing how Solana Native Subscriptions & Allowances can enable AI agents to request recurring payments while remaining bounded by user-defined controls: merchant allowlists, per-charge caps, rolling-period limits, cadence checks, expiry, revocation, and audit logs.

## Longer description

This demo explores a practical agentic payments use case: letting an AI agent manage recurring software subscriptions without granting broad wallet authority. The local mock models an allowance policy that approves or rejects charge requests before any payment execution. It demonstrates the control-plane behavior needed for safer agent spending: only approved merchants, strict caps, cadence enforcement, expiry, revocation, and auditable decisions.

The implementation is intentionally safe and local-first. It does not require private keys, wallet connection, RPC calls, devnet transactions, or mainnet usage. It is designed as a clear bridge from mock logic to Solana’s subscriptions primitive: local allowance policies map to fixed/recurring delegations, audit events map to on-chain events/indexed logs, and the future devnet path can use the official `@solana/subscriptions` tooling.

## Canadian relevance

The demo includes Canadian-aligned scenarios for the Superteam Canada bonus criteria. Example use cases include Canadian SaaS vendors, creator tooling companies, dev agencies, and startups that want AI agents to manage recurring API/RPC/tooling spend with clear user control and revocation.

## What to highlight in submission

- Original AI-agent allowance-control use case
- Public-ready README and architecture docs
- Runnable TypeScript mock demo
- Automated tests for policy decisions
- Safety scanner that verifies no unsafe key/mainnet/submission indicators outside explicit safety language
- Clear future devnet mapping without prematurely requiring wallet or transaction approvals

## Suggested final submission fields

### Repo

`https://github.com/dremonkey23/superteam-solana-native-subscriptions-allowances-demo`

### Demo video

Optional. Recommended if time permits: record `npm run demo` and quick README walkthrough.

### Social proof

Optional. Only post after approval.

### Notes

This is a safe mock/devnet-design demo. It does not process live payments. Future devnet implementation is approval-gated.

## Pre-submit checklist

- [x] Public repo approved
- [x] Repo pushed
- [x] README checked on GitHub rendering
- [x] `npm run check` passes on clean clone
- [x] Paste-ready submission text prepared
- [ ] Demo video recorded or explicitly skipped
- [ ] Social post drafted or explicitly skipped
- [ ] Final Superteam submission approved
