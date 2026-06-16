import assert from "node:assert/strict";
import test from "node:test";
import { addDays, AllowancePolicy, ChargeRequest, evaluateCharge } from "../src/allowance-policy.js";

const now = new Date("2026-06-16T14:00:00.000Z");

function basePolicy(overrides: Partial<AllowancePolicy> = {}): AllowancePolicy {
  return {
    policyId: "policy:test",
    owner: "user:test-owner-no-wallet",
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
    ...overrides,
  };
}

function request(overrides: Partial<ChargeRequest> = {}): ChargeRequest {
  return {
    requestId: "req:test",
    policyId: "policy:test",
    merchantId: "merchant:canadian-devtools-saas",
    amount: 15,
    timestamp: now,
    memo: "Test subscription charge",
    ...overrides,
  };
}

test("approves compliant charge", () => {
  const decision = evaluateCharge(basePolicy(), request(), []);
  assert.equal(decision.approved, true);
  assert.equal(decision.reason, "approved");
  assert.equal(decision.remainingPeriodAllowance, 45);
});

test("rejects merchant not on allowlist", () => {
  const decision = evaluateCharge(basePolicy(), request({ merchantId: "merchant:unknown" }), []);
  assert.equal(decision.approved, false);
  assert.equal(decision.reason, "merchant not allowlisted");
});

test("rejects charge above per-charge cap", () => {
  const decision = evaluateCharge(basePolicy(), request({ amount: 26 }), []);
  assert.equal(decision.approved, false);
  assert.equal(decision.reason, "amount exceeds per-charge limit");
});

test("rejects cadence violation", () => {
  const prior = request({ requestId: "req:prior", amount: 10, timestamp: addDays(now, -5) });
  const decision = evaluateCharge(basePolicy(), request({ timestamp: now }), [prior]);
  assert.equal(decision.approved, false);
  assert.equal(decision.reason, "cadence violation");
});

test("rejects rolling period cap overflow", () => {
  const prior = request({ requestId: "req:prior", amount: 50, timestamp: addDays(now, -10) });
  const decision = evaluateCharge(basePolicy({ periodDays: 40 }), request({ amount: 15, timestamp: addDays(now, 25) }), [prior]);
  assert.equal(decision.approved, false);
  assert.equal(decision.reason, "amount exceeds remaining period allowance");
  assert.equal(decision.remainingPeriodAllowance, 10);
});

test("rejects revoked policy", () => {
  const decision = evaluateCharge(basePolicy({ revoked: true }), request(), []);
  assert.equal(decision.approved, false);
  assert.equal(decision.reason, "policy revoked");
});

test("rejects expired policy", () => {
  const decision = evaluateCharge(basePolicy({ expiresAt: addDays(now, -1) }), request(), []);
  assert.equal(decision.approved, false);
  assert.equal(decision.reason, "policy expired");
});

test("audit event mirrors decision", () => {
  const decision = evaluateCharge(basePolicy(), request({ requestId: "req:audit" }), []);
  assert.equal(decision.auditEvent.requestId, "req:audit");
  assert.equal(decision.auditEvent.approved, decision.approved);
  assert.equal(decision.auditEvent.reason, decision.reason);
});
