# Approval Gates

This packet is built to stop before anything that needs human approval.

## Allowed now

- Create local repo files
- Write public-ready docs
- Build mock TypeScript logic
- Run local mock tests/demo
- Draft submission narrative
- Prepare a checklist for later devnet work

## Requires explicit approval

- Selecting Superteam region/account
- Connecting any wallet
- Creating or importing any keypair
- Requesting faucet funds
- Deploying an Anchor/Solana program
- Sending devnet transactions
- Uploading to GitHub/public repo
- Submitting to Superteam or any bounty page
- Publishing a video/demo publicly

## Prohibited in this packet

- No mainnet transactions
- No mainnet-beta RPC endpoints
- No private keys or seed phrases
- No custodial flows
- No real payment collection
- No real merchant settlement
- No claims that the code processes live payments

## Public-readiness checklist

Before publishing or submitting:

- [ ] `npm run demo` passes
- [ ] `npm run verify` passes
- [ ] no `.env`, keypair, seed phrase, or wallet file committed
- [ ] README states mock/devnet-only status
- [ ] screenshots do not reveal usernames, tokens, wallets, or account pages
- [ ] final submission reviewed by Drizzy
