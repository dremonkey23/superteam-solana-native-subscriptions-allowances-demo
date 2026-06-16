# References and Accuracy Notes

Sources used to keep the demo aligned with the actual Solana subscriptions primitive.

## Official Solana announcement

Source: <https://solana.com/news/subscriptions-and-allowances>

Key points reflected in this packet:

- Solana Subscriptions supports **three payment patterns**:
  - fixed delegations / allowances
  - recurring delegations
  - subscription plans
- Fixed delegation lets a user pre-authorize spend up to a cap with optional expiration.
- The Solana announcement explicitly names AI agents as a use case for bounded autonomous spend.
- Recurring delegations support repeating caps that reset each cycle.
- Subscription plans let merchants publish billing tiers that subscribers can accept.

## Official Solana docs

Source: <https://solana.com/docs/payments/subscriptions/subscription-plan>

Key points reflected in this packet:

- A merchant can publish billing terms.
- A subscriber accepts those terms.
- A merchant or approved puller can collect up to the plan amount during each billing period.
- The TypeScript path uses `@solana/subscriptions` plus Solana kit/token packages.

## Open-source program repository

Source: <https://github.com/solana-program/subscriptions>

Key points reflected in this packet:

- The program creates a **Subscription Authority PDA** for each `(user, mint)` pair.
- The Subscription Authority is the single delegate on the user token account.
- Actual transfers are limited by Delegation PDA authorization.
- Supported models include fixed delegation, recurring delegation, and subscription plan.
- The program emits on-chain events for indexer integration.
- SPL Token and Token-2022 are both supported.

## How this demo maps to the primitive

This local packet is a control-plane demo, not an on-chain implementation.

| Local mock | Solana primitive |
|---|---|
| `AllowancePolicy` | Fixed or recurring delegation account data |
| `allowedMerchants` | delegate / puller allowlist concept |
| `perChargeLimit` | fixed delegation cap or plan amount |
| `periodLimit` + `cadenceDays` | recurring delegation period cap and period length |
| `revoked` | close/cancel/revoke delegation path |
| audit event JSON | emitted program events / indexed logs |

## Intentional simplifications

- The mock uses string IDs instead of public keys.
- The mock uses `mock-USDC` instead of SPL token accounts.
- The mock does not derive PDAs.
- The mock does not call RPC.
- The mock does not transfer tokens.
- The mock does not implement the full `@solana/subscriptions` client.

These are deliberate so the packet stays safe, local, and reviewable before any devnet approval.
