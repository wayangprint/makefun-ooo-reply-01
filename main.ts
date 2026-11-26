// makefun micro entry: a single funny out-of-office line.
// Pure function of constants — nothing here reads the clock, the network,
// or any random source, so the bytes written are the same on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const EM_DASH = String.fromCodePoint(0x2014);

const SEGMENTS: readonly string[] = [
  "I'm out of office",
  EM_DASH,
  "my inbox is now self-governing and has already voted to ignore you.",
];

function buildLine(segments: readonly string[]): string {
  return segments.join(" ");
}

function targetDir(): string {
  const configured = (process.env.MAKEFUN_OUTPUT_DIR ?? "").trim();
  return configured === "" ? "/output" : resolve(configured);
}

function persist(line: string, dir: string): void {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), line, { encoding: "utf8" });
}

const outOfOfficeLine = buildLine(SEGMENTS);
persist(outOfOfficeLine, targetDir());
process.stdout.write(`${outOfOfficeLine}\n`);
