import { z } from 'zod';
import {
  assertDir,
  bumpSemver,
  readPackageJson,
  resolveCwd,
  toPackageInfo,
  writePackageJson,
} from '../utils/package.js';
import { markBumped } from '../utils/gates.js';

export const bumpVersionSchema = {
  cwd: z.string().optional(),
  type: z.enum(['patch', 'minor', 'major']).describe('Semver bump type.'),
  confirm: z
    .boolean()
    .describe('Must be true to write the new version to package.json.'),
};

export async function bumpVersion(args: {
  cwd?: string;
  type: 'patch' | 'minor' | 'major';
  confirm: boolean;
}) {
  const cwd = await resolveCwd(args.cwd);
  await assertDir(cwd);

  if (!args.confirm) {
    throw new Error('bump_version requires confirm=true');
  }

  const pkg = await readPackageJson(cwd);
  const info = toPackageInfo(pkg);
  if (!info.version) {
    throw new Error('package.json is missing version');
  }

  const next = bumpSemver(info.version, args.type);
  pkg.version = next;
  await writePackageJson(cwd, pkg);
  const gates = markBumped(cwd, next);

  return {
    cwd,
    previousVersion: info.version,
    version: next,
    type: args.type,
    gates,
  };
}
