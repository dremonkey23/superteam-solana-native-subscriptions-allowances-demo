# Contributing

This repository is a demo packet for Solana Native Subscriptions & Allowances.

## Safety rules

Do not contribute changes that:

- do not add wallet private keys, seed phrases, or keypair files
- do not call mainnet or mainnet-beta RPC endpoints
- do not broadcast transactions by default
- do not require `.env` secrets to run the local mock
- do not imply the demo processes live payments
- do not submit or publish anything automatically

## Local checks

```bash
npm install
npm run check
```

`npm run check` runs:

1. mock demo
2. automated policy tests
3. safety scanner
4. TypeScript typecheck

## Future devnet work

Devnet work should be isolated behind explicit opt-in commands and reviewed before use. It must not replace the safe local mock path.
