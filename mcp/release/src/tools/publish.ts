import { z } from "zod";
import { inspectPackage } from "./inspect-package.js";
import { checkVersion } from "./check-version.js";
import { runTests } from "./run-tests.js";
import { runBuild } from "./run-build.js";
import { previewPackage } from "./preview-package.js";
import { bumpVersion } from "./bump-version.js";
import { createRelease } from "./create-release.js";
import { publishPackage } from "./publish-package.js";
import { checkNpmVersion } from "./check-npm-version.js";

export const publishSchema = {
  type: z
    .enum(["patch", "minor", "major"])
    .default("patch")
    .describe("Semver bump type. Defaults to patch."),
  confirm: z
    .boolean()
    .describe(
      "Must be true. Runs the full release pipeline: inspect, version check, tests, build, pack dry-run, bump, tag, and push for GitHub Actions OIDC publish."
    ),
  allowDirty: z
    .boolean()
    .optional()
    .describe("Allow unrelated dirty files besides package.json when creating the release commit."),
  pushBranch: z
    .boolean()
    .optional()
    .describe("Also push the current branch before pushing the release tag. Defaults to true."),
  cwd: z.string().optional(),
};

export async function publish(args: {
  type?: "patch" | "minor" | "major";
  confirm: boolean;
  allowDirty?: boolean;
  pushBranch?: boolean;
  cwd?: string;
}) {
  if (!args.confirm) {
    throw new Error("publish requires confirm=true");
  }

  const type = args.type || "patch";
  const cwd = args.cwd;

  const steps: Record<string, unknown> = {};

  steps.npm = await checkNpmVersion({ cwd });
  steps.inspect = await inspectPackage({ cwd });
  steps.version = await checkVersion({ cwd });
  steps.tests = await runTests({ cwd });
  steps.build = await runBuild({ cwd });
  steps.preview = await previewPackage({ cwd });
  steps.bump = await bumpVersion({ cwd, type, confirm: true });
  steps.release = await createRelease({
    cwd,
    confirm: true,
    allowDirty: args.allowDirty ?? true,
  });
  steps.publish = await publishPackage({
    cwd,
    confirm: true,
    pushBranch: args.pushBranch,
  });

  return {
    ok: true,
    type,
    version: (steps.bump as { version: string }).version,
    tag: (steps.release as { tag: string }).tag,
    authMode: "github-actions-oidc",
    steps,
  };
}
