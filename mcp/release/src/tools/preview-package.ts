import { z } from 'zod';
import { runCommand } from '../utils/exec.js';
import { assertDir, resolveCwd } from '../utils/package.js';
import { markPreview } from '../utils/gates.js';

export const previewPackageSchema = {
  cwd: z.string().optional(),
};

export async function previewPackage(args: { cwd?: string }) {
  const cwd = await resolveCwd(args.cwd);
  await assertDir(cwd);

  const result = await runCommand('npm', ['pack', '--dry-run', '--json'], cwd);
  const gates = markPreview(cwd, result.ok);

  if (!result.ok) {
    throw new Error(
      `npm pack --dry-run failed.\n${result.stderr || result.stdout}`
    );
  }

  let files: unknown = result.stdout;
  try {
    files = JSON.parse(result.stdout);
  } catch {
    files = result.stdout;
  }

  return {
    cwd,
    dryRun: true,
    pack: files,
    gates,
  };
}
