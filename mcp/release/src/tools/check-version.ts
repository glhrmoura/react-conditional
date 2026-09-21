import { z } from "zod";
import { runCommand } from "../utils/exec.js";
import {
  assertDir,
  readPackageJson,
  resolveCwd,
  toPackageInfo,
} from "../utils/package.js";
import { markVersionChecked } from "../utils/gates.js";

export const checkVersionSchema = {
  cwd: z.string().optional(),
};

export async function checkVersion(args: { cwd?: string }) {
  const cwd = await resolveCwd(args.cwd);
  await assertDir(cwd);
  const info = toPackageInfo(await readPackageJson(cwd));

  if (!info.name) {
    throw new Error("package.json is missing name");
  }

  const view = await runCommand(
    "npm",
    ["view", info.name, "version", "--json"],
    cwd
  );

  let publishedVersion: string | null = null;
  let exists = false;

  if (view.ok) {
    exists = true;
    try {
      publishedVersion = JSON.parse(view.stdout) as string;
    } catch {
      publishedVersion = view.stdout.replace(/"/g, "").trim() || null;
    }
  } else if (
    view.stderr.includes("E404") ||
    view.stdout.includes("E404") ||
    view.stderr.toLowerCase().includes("not found")
  ) {
    exists = false;
  } else {
    throw new Error(view.stderr || view.stdout || "npm view failed");
  }

  const gates = markVersionChecked(cwd);

  return {
    cwd,
    name: info.name,
    localVersion: info.version,
    publishedVersion,
    existsOnNpm: exists,
    needsBump: exists && publishedVersion === info.version,
    gates,
  };
}
