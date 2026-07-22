import { basename, dirname, join } from "node:path";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { spawn } from "node:child_process";

const nextDir = ".next";
const buildIdPath = join(nextDir, "BUILD_ID");

if (!existsSync(buildIdPath)) {
  throw new Error("No production build found. Run npm run build first.");
}

function filesUnder(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : [path];
  });
}

const manifestFiles = filesUnder(join(nextDir, "server"));
const manifestText = manifestFiles
  .filter((path) => path.endsWith(".js"))
  .map((path) => readFileSync(path, "utf8"))
  .join("\n");
const chunkNames = [...manifestText.matchAll(/static\/chunks\/([^"']+\.js)/g)].map(
  (match) => match[1],
);
function resolveStaticChunk(chunkName) {
  const normalizedChunk = decodeURIComponent(chunkName).replace(/^\/+/, "");
  const exactPath = join(nextDir, "static", "chunks", normalizedChunk);
  if (existsSync(exactPath)) return exactPath;

  const directory = dirname(exactPath);
  const stem = basename(normalizedChunk, ".js");
  return filesUnder(directory).find(
    (path) => basename(path).startsWith(`${stem}-`) && path.endsWith(".js"),
  );
}

const missingChunks = [...new Set(chunkNames)].filter(
  (chunk) =>
    // Next references this App Router manifest entry without emitting a file.
    chunk !== "app-pages-internals.js" &&
    !resolveStaticChunk(chunk),
);

if (missingChunks.length) {
  throw new Error(
    `Production build is incomplete; missing static chunks: ${missingChunks.join(", ")}`,
  );
}

const nextCommand = process.platform === "win32" ? "next.cmd" : "next";
const child = spawn(nextCommand, ["start", ...process.argv.slice(2)], {
  stdio: "inherit",
});
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  else process.exit(code ?? 1);
});
