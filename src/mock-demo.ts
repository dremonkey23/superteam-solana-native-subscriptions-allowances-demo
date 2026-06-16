import { describeSolanaMapping } from "./solana-mapping.js";
import { addDays, AllowancePolicy, ChargeRequest, evaluateCharge } from "./allowance-policy.js";

const now = new Date("2026-06-16T14:00:00.000Z");

const policy: AllowancePolicy = {
  policyId: "policy:demo-001",
  owner: "user:demo-owner-no-wallet",
  agentId: "agent:research-buyer",
  allowedMerchants: ["merchant:canadian-devtools-saas"],
  tokenSymbol: "mock-USDC",
  perChargeLimit: 25,
  periodLimit: 60,
  periodDays: 30,
  cadenceDays: 30,
  startsAt: addDays(now, -1),
  expiresAt: addDays(now, 90),
  revoked: false,
};

const priorApprovedCharges: ChargeRequest[] = [
  {
    requestId: "req:prior-001",
    policyId: policy.policyId,
    merchantId: "merchant:canadian-devtools-saas",
    amount: 20,
    timestamp: addDays(now, -31),
    memo: "Prior monthly subscription outside rolling period",
  },
];

const scenarios: Array<{ label: string; request: ChargeRequest; policyOverride?: Partial<AllowancePolicy> }> = [
  {
    label: "ALLOW: approved merchant under caps after cadence window",
    request: {
      requestId: "req:allow-001",
      policyId: policy.policyId,
      merchantId: "merchant:canadian-devtools-saas",
      amount: 15,
      timestamp: now,
      memo: "Monthly research subscription",
    },
  },
  {
    label: "BLOCK: merchant not allowlisted",
    request: {
      requestId: "req:block-merchant",
      policyId: policy.policyId,
      merchantId: "merchant:unknown-saas",
      amount: 15,
      timestamp: addDays(now, 31),
      memo: "Unapproved merchant",
    },
  },
  {
    label: "BLOCK: amount exceeds per-charge cap",
    request: {
      requestId: "req:block-per-charge",
      policyId: policy.policyId,
      merchantId: "merchant:canadian-devtools-saas",
      amount: 30,
      timestamp: addDays(now, 31),
      memo: "Over single-charge cap",
    },
  },
  {
    label: "BLOCK: cadence violation",
    request: {
      requestId: "req:block-cadence",
      policyId: policy.policyId,
      merchantId: "merchant:canadian-devtools-saas",
      amount: 10,
      timestamp: addDays(now, 10),
      memo: "Too soon after last charge",
    },
  },
  {
    label: "BLOCK: period cap exceeded",
    policyOverride: { periodLimit: 20 },
    request: {
      requestId: "req:block-period",
      policyId: policy.policyId,
      merchantId: "merchant:canadian-devtools-saas",
      amount: 10,
      timestamp: addDays(now, 30),
      memo: "Would exceed rolling period cap",
    },
  },
  {
    label: "BLOCK: revoked policy",
    policyOverride: { revoked: true },
    request: {
      requestId: "req:block-revoked",
      policyId: policy.policyId,
      merchantId: "merchant:canadian-devtools-saas",
      amount: 10,
      timestamp: addDays(now, 31),
      memo: "After user revocation",
    },
  },
  {
    label: "BLOCK: expired policy",
    policyOverride: { expiresAt: addDays(now, -1) },
    request: {
      requestId: "req:block-expired",
      policyId: policy.policyId,
      merchantId: "merchant:canadian-devtools-saas",
      amount: 10,
      timestamp: now,
      memo: "After expiry",
    },
  },
];

const ledger: ChargeRequest[] = [...priorApprovedCharges];
let firstDecisionForMapping: ReturnType<typeof evaluateCharge> | undefined;

console.log("\nAI-Agent Allowance Controls — Mock Demo");
console.log("Network: mock/local only | Mainnet: disabled | Private keys: none\n");
console.log("Policy:", JSON.stringify({
  policyId: policy.policyId,
  owner: policy.owner,
  agentId: policy.agentId,
  allowedMerchants: policy.allowedMerchants,
  perChargeLimit: policy.perChargeLimit,
  periodLimit: policy.periodLimit,
  cadenceDays: policy.cadenceDays,
  tokenSymbol: policy.tokenSymbol,
}, null, 2));

for (const scenario of scenarios) {
  const activePolicy = { ...policy, ...scenario.policyOverride };
  const decision = evaluateCharge(activePolicy, scenario.request, ledger);
  firstDecisionForMapping ??= decision;

  console.log(`\n${scenario.label}`);
  console.log(`Decision: ${decision.approved ? "APPROVED" : "REJECTED"} — ${decision.reason}`);
  console.log("Audit:", JSON.stringify(decision.auditEvent, null, 2));

  if (decision.approved) {
    ledger.push(scenario.request);
  }
}

console.log("\nCanadian context:");
console.log("Example merchant: Canadian devtools SaaS / creator tooling vendor");
console.log("Use case: bounded AI-agent subscription payments for teams and builders.\n");

console.log("\nSolana primitive mapping preview:");
console.log(describeSolanaMapping(policy, scenarios[0]!.request, firstDecisionForMapping!));

console.log("\nSummary:");
console.log(`Approved charges recorded: ${ledger.length - priorApprovedCharges.length}`);
console.log("This demo made no RPC calls and sent no transactions.\n");
