# Security Policy

## Demo boundary

This repository is designed to be safe to run locally:

- no wallet connection required
- no key material required
- no RPC calls in the mock demo
- no transactions sent
- no live payment processing

## Reporting issues

If you find a security issue, open an issue in the public repository after it exists, or contact the maintainer privately before disclosure.

## Sensitive files

Never commit:

- no private keys
- no seed phrases
- no wallet exports
- no `.env` files
- no faucet keypairs
- no RPC provider secrets
- no screenshots that expose account or wallet details

## Verification

Run:

```bash
npm run verify
```

The safety scanner checks public packet files for unsafe network/key/submission indicators outside explicit safety language.
