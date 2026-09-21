import { z } from 'zod';
import { runCommand } from '../utils/exec.js';
import {
  assertDir,
  detectPackageManager,
  readPackageJson,
  resolveCwd,
  toPackageInfo,
} from '../utils/package.js';
import { markTests } from '../utils/gates.js';

export const runTestsSchema = {
  cwd: z.string().optional(),
  script: z
    .string()
    .optional()
    .describe('Test script name. Defaults to "test".'),
};

export async function runTests(args: { cwd?: string; script?: string }) {
  const cwd = await resolveCwd(args.cwd);
  await assertDir(cwd);
  const script = args.script || 'test';
  const info = toPackageInfo(await readPackageJson(cwd));
  const pm = await detectPackageManager(cwd);

  if (!info.scripts[script]) {
    const gates = markTests(cwd, true);
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
  const gates = markTests(cwd, result.ok);

  if (!result.ok) {
    throw new Error(
      `Tests failed (exit ${result.code}).\n${result.stderr || result.stdout}`
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
