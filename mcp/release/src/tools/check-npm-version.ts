import { z } from "zod";
import { runCommand } from "../utils/exec.js";
import { assertDir, resolveCwd } from "../utils/package.js";

export const checkNpmVersionSchema = {
  cwd: z.string().optional(),
};

export async function checkNpmVersion(args: { cwd?: string }) {
  const cwd = await resolveCwd(args.cwd);
  await assertDir(cwd);

  const npm = await runCommand("npm", ["--version"], cwd);
  const node = await runCommand("node", ["--version"], cwd);

  if (!npm.ok) {
    throw new Error(npm.stderr || "Failed to read npm version");
  }

  const npmVersion = npm.stdout.trim();
  const [major, minor, patch] = npmVersion.split(".").map(Number);
  const supportsOidc =
    major > 11 ||
    (major === 11 && minor > 5) ||
    (major === 11 && minor === 5 && patch >= 1);

  return {
    cwd,
    npmVersion,
    nodeVersion: node.stdout.trim(),
    supportsTrustedPublishingOidc: supportsOidc,
    minimumNpm: "11.5.1",
    note: supportsOidc
      ? "Local npm supports OIDC. Actual publish still runs in GitHub Actions, not in this MCP."
      : "Local npm is below 11.5.1. CI workflow upgrades npm before publish.",
  };
}
