import { AllowancePolicy, ChargeRequest, Decision } from "./allowance-policy.js";

export type SolanaPrimitiveMapping = {
  localConcept: string;
  solanaConcept: string;
  note: string;
};

export const SOLANA_PRIMITIVE_MAPPING: SolanaPrimitiveMapping[] = [
  {
    localConcept: "AllowancePolicy.policyId",
    solanaConcept: "Delegation PDA",
    note: "A fixed or recurring delegation account can encode the spend authority boundary.",
  },
  {
    localConcept: "AllowancePolicy.owner",
    solanaConcept: "User authority / token owner",
    note: "The user creates or revokes the delegation; the agent does not receive unlimited wallet control.",
  },
  {
    localConcept: "AllowancePolicy.allowedMerchants",
    solanaConcept: "Delegate / puller authorization",
    note: "A production design should constrain who can pull against the delegated authority.",
  },
  {
    localConcept: "AllowancePolicy.perChargeLimit",
    solanaConcept: "Fixed delegation amount or subscription plan amount",
    note: "Single-charge controls map to plan/delegation amount checks.",
  },
  {
    localConcept: "AllowancePolicy.periodLimit",
    solanaConcept: "Recurring delegation period cap",
    note: "Repeating caps reset by configured period length.",
  },
  {
    localConcept: "Decision.auditEvent",
    solanaConcept: "Program event / indexed log",
    note: "Approved and rejected paths should produce inspectable evidence.",
  },
];

export function describeSolanaMapping(policy: AllowancePolicy, exampleRequest: ChargeRequest, exampleDecision: Decision): string {
  return JSON.stringify(
    {
      mode: "design-only-no-rpc",
      policyId: policy.policyId,
      exampleMerchant: exampleRequest.merchantId,
      exampleDecision: exampleDecision.approved ? "approved" : "rejected",
      mapping: SOLANA_PRIMITIVE_MAPPING,
    },
    null,
    2,
  );
}
