# 2-Minute Demo Script

## Title

AI-Agent Allowance Controls for Solana Native Subscriptions

## Opening — 15 sec

"This is a safe mock demo for Solana-native subscription allowances. The point is simple: an AI agent can request recurring payments, but it cannot spend unless the user-defined allowance policy permits it. No private keys, no mainnet, no real payments."

## Scene 1 — Policy setup — 20 sec

Show the allowance policy:

- agent: `agent:research-buyer`
- approved merchant: `merchant:canadian-devtools-saas`
- per-charge cap: 25 mock USDC
- monthly cap: 60 mock USDC
- cadence: every 30 days
- expiry: future date

Line:

"The user gives the agent bounded authority: one approved Canadian-aligned SaaS merchant, strict per-charge and period caps, cadence controls, and revocation."

## Scene 2 — Valid subscription — 20 sec

Run:

```bash
npm run demo
```

Point to approved request:

"The compliant charge is approved and logged. The audit event captures policy, merchant, amount, and remaining allowance."

## Scene 3 — Blocked behavior — 35 sec

Point to rejected requests:

- wrong merchant rejected
- amount over per-charge cap rejected
- cadence violation rejected
- period cap exceeded rejected
- revoked policy rejected

Line:

"The agent is not trusted with broad wallet authority. The controller enforces intent before payment execution."

## Scene 4 — Solana devnet path — 30 sec

Show `docs/architecture.md` mapping.

Line:

"The mock maps cleanly to Solana devnet: an allowance PDA, signed user revocation, merchant allowlist, token-vault CPI, and program logs for auditability. That devnet implementation is the next approval-gated step."

## Close — 20 sec

"The takeaway: native subscription payments become safer when agent authority is policy-bound, revocable, capped, and auditable. This packet proves the control model locally before any wallet, devnet, or submission step."
