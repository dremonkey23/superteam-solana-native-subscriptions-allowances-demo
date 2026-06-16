# Architecture: AI-Agent Allowance Controls

## Problem

AI agents can initiate useful recurring purchases, but unchecked payment authority is unacceptable. A subscription rail needs explicit, inspectable controls before any agent can spend.

## Core objects

### AllowancePolicy

A user-authorized policy that defines where, when, and how much an agent may spend.

Fields:

- `policyId` — stable policy identifier
- `owner` — user authority / wallet public key in future devnet path
- `agentId` — constrained AI agent identity
- `allowedMerchants` — merchant IDs allowed for this policy
- `tokenSymbol` — display token, e.g. mock USDC
- `perChargeLimit` — max amount for one invoice
- `periodLimit` — max aggregate amount per period
- `periodDays` — rolling period size
- `cadenceDays` — minimum days between charges
- `expiresAt` — hard stop timestamp
- `revoked` — emergency shutoff

### ChargeRequest

A proposed subscription charge initiated by an agent.

Fields:

- `requestId`
- `policyId`
- `merchantId`
- `amount`
- `timestamp`
- `memo`

### Decision

The controller output.

Fields:

- `approved`
- `reason`
- `remainingPeriodAllowance`
- `auditEvent`

## Decision flow

```text
agent charge request
        │
        ▼
load allowance policy
        │
        ▼
check revoked / expired
        │
        ▼
check merchant allowlist
        │
        ▼
check per-charge cap
        │
        ▼
check cadence
        │
        ▼
check rolling period cap
        │
        ▼
approve or reject + audit event
```

## Solana devnet mapping — design only

This is not implemented yet. It is the safe next design step after approval.

| Demo concept | Solana devnet primitive |
|---|---|
| AllowancePolicy | PDA account derived from owner + agent + nonce |
| allowedMerchants | account data field or merchant registry PDA |
| perChargeLimit / periodLimit | serialized policy fields |
| rolling spend history | policy account counters + last charge timestamps |
| revoke | signed instruction from owner authority |
| charge request | instruction from merchant/agent signer referencing policy |
| audit event | program logs/events indexed by explorer or off-chain worker |
| token transfer | devnet SPL token transfer CPI from controlled vault |

## Canadian use-case framing

Although the demo is not Canada-only, it is useful for Canadian builders and companies:

- a Toronto SaaS vendor selling usage-based analytics plans
- a Vancouver creator studio authorizing an agent to pay for editing/distribution tools
- a Montréal dev agency letting project agents buy limited API/RPC credits
- a Canadian startup using revocable allowances for contractor-operated automation

These examples are deliberately non-custodial and policy-first: the agent can request payment, but user-defined controls decide whether the charge is allowed.

## Suggested Anchor program instructions

```rust
create_allowance(ctx, policy_config)
update_allowance(ctx, policy_config)
revoke_allowance(ctx, policy_id)
attempt_charge(ctx, invoice)
```

## Security posture

- User authority owns policy creation, update, and revoke.
- Agent never receives raw unlimited wallet authority.
- Merchant must match allowlist.
- Every decision produces inspectable audit output.
- Spending limits are enforced before any token movement.
- Devnet must use a throwaway keypair only after approval.
- Mainnet is prohibited in this demo packet.

## Demo modes

### Mode 1 — Mock local

Current mode. Pure TypeScript. No Solana RPC. No wallet. No network.

### Mode 2 — Devnet simulated ledger

Future mode. Uses devnet-only RPC and fake/devnet token mint. Requires explicit approval.

### Mode 3 — On-chain Anchor demo

Future stretch. Deploys a minimal Anchor program to devnet. Requires explicit approval and separate review.
