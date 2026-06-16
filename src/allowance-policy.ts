export type AllowancePolicy = {
  policyId: string;
  owner: string;
  agentId: string;
  allowedMerchants: string[];
  tokenSymbol: string;
  perChargeLimit: number;
  periodLimit: number;
  periodDays: number;
  cadenceDays: number;
  startsAt: Date;
  expiresAt: Date;
  revoked: boolean;
};

export type ChargeRequest = {
  requestId: string;
  policyId: string;
  merchantId: string;
  amount: number;
  timestamp: Date;
  memo: string;
};

export type AuditEvent = {
  requestId: string;
  policyId: string;
  merchantId: string;
  amount: number;
  approved: boolean;
  reason: string;
  timestamp: string;
  remainingPeriodAllowance: number;
};

export type Decision = {
  approved: boolean;
  reason: string;
  remainingPeriodAllowance: number;
  auditEvent: AuditEvent;
};

const DAY_MS = 24 * 60 * 60 * 1000;

function daysBetween(a: Date, b: Date): number {
  return Math.abs(b.getTime() - a.getTime()) / DAY_MS;
}

function periodStart(now: Date, periodDays: number): Date {
  return new Date(now.getTime() - periodDays * DAY_MS);
}

export function evaluateCharge(
  policy: AllowancePolicy,
  request: ChargeRequest,
  priorApprovedCharges: ChargeRequest[],
): Decision {
  let approved = false;
  let reason = "approved";

  const recentCharges = priorApprovedCharges.filter(
    (charge) =>
      charge.policyId === policy.policyId &&
      charge.timestamp >= periodStart(request.timestamp, policy.periodDays),
  );
  const spentThisPeriod = recentCharges.reduce((sum, charge) => sum + charge.amount, 0);
  const remainingBeforeRequest = Math.max(policy.periodLimit - spentThisPeriod, 0);

  if (request.policyId !== policy.policyId) {
    reason = "policy mismatch";
  } else if (policy.revoked) {
    reason = "policy revoked";
  } else if (request.timestamp < policy.startsAt) {
    reason = "policy not active yet";
  } else if (request.timestamp > policy.expiresAt) {
    reason = "policy expired";
  } else if (!policy.allowedMerchants.includes(request.merchantId)) {
    reason = "merchant not allowlisted";
  } else if (request.amount <= 0) {
    reason = "amount must be positive";
  } else if (request.amount > policy.perChargeLimit) {
    reason = "amount exceeds per-charge limit";
  } else {
    const lastMerchantCharge = [...recentCharges]
      .filter((charge) => charge.merchantId === request.merchantId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];

    if (lastMerchantCharge && daysBetween(lastMerchantCharge.timestamp, request.timestamp) < policy.cadenceDays) {
      reason = "cadence violation";
    } else if (request.amount > remainingBeforeRequest) {
      reason = "amount exceeds remaining period allowance";
    } else {
      approved = true;
    }
  }

  const remainingPeriodAllowance = approved
    ? Math.max(remainingBeforeRequest - request.amount, 0)
    : remainingBeforeRequest;

  return {
    approved,
    reason,
    remainingPeriodAllowance,
    auditEvent: {
      requestId: request.requestId,
      policyId: policy.policyId,
      merchantId: request.merchantId,
      amount: request.amount,
      approved,
      reason,
      timestamp: request.timestamp.toISOString(),
      remainingPeriodAllowance,
    },
  };
}

export function addDays(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}
