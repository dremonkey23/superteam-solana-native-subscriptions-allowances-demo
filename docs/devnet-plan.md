# Devnet Implementation Plan — Approval-Gated

This is the next step after approval. It is not executed by the current packet.

## Goal

Map the local AI-agent allowance controller to Solana’s official subscriptions primitive using devnet-only resources.

## Proposed stack

- `@solana/subscriptions`
- `@solana/kit`
- `@solana/kit-plugin-rpc`
- `@solana/kit-plugin-signer`
- `@solana-program/token`
- devnet SPL token mint or existing devnet test mint

## Flow

1. Create or select a throwaway devnet wallet.
2. Request devnet SOL from faucet.
3. Create a test token account and mint test tokens.
4. Create Subscription Authority PDA for `(user, mint)`.
5. Create fixed delegation for one AI-agent delegate.
6. Attempt a compliant transfer.
7. Attempt an over-limit transfer and show rejection.
8. Revoke/close delegation.
9. Capture explorer links and logs.

## Approval gates

Each action below needs explicit approval before execution:

- wallet/keypair creation
- faucet request
- RPC configuration
- token mint/account creation
- devnet transaction broadcast
- explorer link publication
- GitHub push
- Superteam submission

## Expected final demo upgrade

The local mock remains the default. Devnet adds an optional command such as:

```bash
npm run devnet:demo
```

That command should refuse to run unless a clear `--i-understand-this-sends-devnet-transactions` flag is present.
