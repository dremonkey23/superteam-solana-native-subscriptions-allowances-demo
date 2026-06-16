import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const bannedPatterns: Array<{ label: string; regex: RegExp }> = [
  { label: "mainnet RPC/network", regex: /mainnet-beta|api\.mainnet|mainnet\.helius|mainnet/i },
  { label: "key material wording", regex: /private[_ -]?key|secret[_ -]?key|seed phrase|mnemonic/i },
  { label: "submission completion claim", regex: /submitted successfully|submission complete/i },
  { label: "environment file reference", regex: /\.env/i },
];

const allowedSafetyLanguage = /no |not |none|disabled|prohibited|requires explicit approval|out of scope|must not|do not|without|before any|approval-gated/i;

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (entry === "node_modules" || entry === ".git") return [];
    if (stat.isDirectory()) return walk(full);
    return [full];
  });
}

const files = walk(root).filter((file) => /\.(md|ts|json)$/.test(file) && !file.endsWith("scripts/verify-safety.ts"));
const findings: string[] = [];

for (const file of files) {
  const rel = file.replace(root + "/", "");
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  lines.forEach((line, index) => {
    for (const pattern of bannedPatterns) {
      if (pattern.regex.test(line) && !allowedSafetyLanguage.test(line)) {
        findings.push(`${rel}:${index + 1}: ${pattern.label}: ${line.trim()}`);
      }
    }
  });
}

if (findings.length > 0) {
  console.error("Safety verification failed:");
  for (const finding of findings) console.error(`- ${finding}`);
  process.exit(1);
}

console.log("Safety verification passed.");
console.log(`Scanned ${files.length} public packet files.`);
console.log("No unsafe network, key, env, or submission indicators found outside explicit safety language.");
