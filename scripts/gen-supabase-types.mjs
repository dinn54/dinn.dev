import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();
const outputPath = path.join(
  projectRoot,
  "src/shared/lib/supabase/types.ts",
);
const logPath = "/tmp/supabase-gen-types.log";
const logStream = fs.createWriteStream(logPath, { flags: "w" });

const child = spawn(
  "npx",
  [
    "supabase",
    "gen",
    "types",
    "typescript",
    "--project-id",
    "mowzqxruruhcvjgpzzdb",
  ],
  {
    stdio: ["ignore", "pipe", "pipe"],
  },
);

const outStream = fs.createWriteStream(outputPath, { flags: "w" });

child.stdout.on("data", (chunk) => {
  outStream.write(chunk);
});

child.stderr.on("data", (chunk) => {
  process.stderr.write(chunk);
  logStream.write(chunk);
});

child.on("error", (error) => {
  process.stderr.write(`${error.message}\n`);
  logStream.end();
  outStream.end();
  process.exitCode = 1;
});

child.on("close", (code) => {
  outStream.end();
  logStream.end();

  if (code !== 0) {
    process.exitCode = code ?? 1;
    return;
  }

  process.stdout.write(
    `Supabase types written to ${outputPath}\nLog written to ${logPath}\n`,
  );
});
