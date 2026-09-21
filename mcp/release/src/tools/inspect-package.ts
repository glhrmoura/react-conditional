import { z } from "zod";
import {
  assertDir,
  isScoped,
  readPackageJson,
  resolveCwd,
  toPackageInfo,
} from "../utils/package.js";
import { markInspected } from "../utils/gates.js";

export const inspectPackageSchema = {
  cwd: z
    .string()
    .optional()
    .describe("Absolute path to the package root. Defaults to the react-conditional repo root."),
};

export async function inspectPackage(args: { cwd?: string }) {
  const cwd = await resolveCwd(args.cwd);
  await assertDir(cwd);
  const pkg = await readPackageJson(cwd);
  const info = toPackageInfo(pkg);
  const gates = markInspected(cwd);

  return {
    cwd,
    package: info,
    scoped: isScoped(info.name),
    canPublishLocally: !info.private,
    warnings: [
      ...(info.private ? ["Package is private and cannot be published."] : []),
      ...(isScoped(info.name) && info.access !== "public"
        ? ['Scoped package without publishConfig.access="public". CI should use --access public.']
        : []),
      ...(!info.repository
        ? ["Missing repository field. Required for npm provenance with Trusted Publishing."]
        : []),
    ],
    gates,
  };
}
