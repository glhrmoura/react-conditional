import { z } from 'zod';
import { runCommand } from '../utils/exec.js';
import {
  assertDir,
  detectPackageManager,
  readPackageJson,
  resolveCwd,
  toPackageInfo,
} from '../utils/package.js';
import { markBuild } from '../utils/gates.js';

export const runBuildSchema = {
  cwd: z.string().optional(),
  script: z
    .string()
    .optional()
    .describe('Build script name. Defaults to "build".'),
};

export async function runBuild(args: { cwd?: string; script?: string }) {
  const cwd = await resolveCwd(args.cwd);
  await assertDir(cwd);
  const script = args.script || 'build';
  const info = toPackageInfo(await readPackageJson(cwd));
  const pm = await detectPackageManager(cwd);

  if (!info.scripts[script]) {
    const gates = markBuild(cwd, true);
    return {
      cwd,
      skipped: true,
      reason: `No "${script}" script in package.json`,
      gates,
    };
  }

  const command =
    pm === 'yarn'
      ? ['yarn', script]
      : pm === 'pnpm'
        ? ['pnpm', 'run', script]
        : ['npm', 'run', script];

  const result = await runCommand(command[0], command.slice(1), cwd);
  const gates = markBuild(cwd, result.ok);

  if (!result.ok) {
    throw new Error(
      `Build failed (exit ${result.code}).\n${result.stderr || result.stdout}`
    );
  }

  return {
    cwd,
    skipped: false,
    packageManager: pm,
    script,
    stdout: result.stdout,
    gates,
  };
}
