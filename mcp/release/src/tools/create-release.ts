import { z } from "zod";
import {
  assertDir,
  readPackageJson,
  resolveCwd,
  toPackageInfo,
} from "../utils/package.js";
import {
  assertReadyForRelease,
  getGates,
  markRelease,
} from "../utils/gates.js";
import {
  gitAdd,
  gitCommit,
  gitCurrentBranch,
  gitStatus,
  gitTag,
} from "../utils/git.js";

export const createReleaseSchema = {
  cwd: z.string().optional(),
  confirm: z
    .boolean()
    .describe("Must be true to create the local commit and tag."),
  allowDirty: z
    .boolean()
    .optional()
    .describe("Allow unrelated dirty files besides package.json. Defaults to false."),
  message: z
    .string()
    .optional()
    .describe('Commit message. Defaults to "release: vX.Y.Z".'),
};

export async function createRelease(args: {
  cwd?: string;
  confirm: boolean;
  allowDirty?: boolean;
  message?: string;
}) {
  const cwd = await resolveCwd(args.cwd);
  await assertDir(cwd);

  if (!args.confirm) {
    throw new Error("create_release requires confirm=true");
  }

  const gates = getGates(cwd);
  const missing = assertReadyForRelease(gates);
  if (missing.length) {
    throw new Error(
      `Release gates incomplete. Run first: ${missing.join(" → ")}`
    );
  }

  const info = toPackageInfo(await readPackageJson(cwd));
  const version = gates.bumpedVersion || info.version;
  const tag = `v${version}`;
  const branch = await gitCurrentBranch(cwd);
  const status = await gitStatus(cwd);

  const dirtyLines = status
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const unrelated = dirtyLines.filter((line) => {
    const file = line.replace(/^[A-Z? ]+/, "").trim();
    return file !== "package.json";
  });

  if (unrelated.length && !args.allowDirty) {
    throw new Error(
      `Working tree has unrelated changes. Commit/stash them or pass allowDirty=true.\n${unrelated.join("\n")}`
    );
  }

  const packageChanged = dirtyLines.some((line) => line.includes("package.json"));
  if (!packageChanged) {
    throw new Error(
      "package.json has no pending version change. Run bump_version first."
    );
  }

  await gitAdd(cwd, ["package.json"]);
  await gitCommit(cwd, args.message || `release: ${tag}`);
  await gitTag(cwd, tag);
  const nextGates = markRelease(cwd, tag);

  return {
    cwd,
    branch,
    version,
    tag,
    pushed: false,
    nextStep:
      "Call publish_package with confirm=true to push the tag and trigger GitHub Actions OIDC publish.",
    gates: nextGates,
  };
}
