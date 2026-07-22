import { existsSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

const buildDir = ".next";
const previousDir = `.next-previous-${Date.now()}-${process.pid}`;
const nextCommand = process.platform === "win32" ? "next.cmd" : "next";
const tsconfigPath = "tsconfig.json";
const nextEnvPath = "next-env.d.ts";
const originalTsconfig = readFileSync(tsconfigPath, "utf8");
const originalNextEnv = readFileSync(nextEnvPath, "utf8");

function restoreNextConfigFiles() {
  writeFileSync(tsconfigPath, originalTsconfig);
  writeFileSync(nextEnvPath, originalNextEnv);
}

if (existsSync(buildDir)) renameSync(buildDir, previousDir);

const result = spawnSync(nextCommand, ["build"], {
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production" },
});

if (result.status !== 0) {
  restoreNextConfigFiles();
  rmSync(buildDir, { recursive: true, force: true });
  if (existsSync(previousDir)) renameSync(previousDir, buildDir);
  process.exit(result.status ?? 1);
}

restoreNextConfigFiles();
rmSync(previousDir, { recursive: true, force: true });

console.log("Completed the production build in .next.");
