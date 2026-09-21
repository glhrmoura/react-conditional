import { z } from 'zod';
import { assertDir, resolveCwd } from '../utils/package.js';
import { assertReadyForPublish, getGates } from '../utils/gates.js';
import { gitPush } from '../utils/git.js';

export const publishPackageSchema = {
  cwd: z.string().optional(),
  confirm: z
    .boolean()
    .describe(
      'Must be true. Pushes the release tag to origin so GitHub Actions can publish via OIDC. Never runs npm publish locally and never uses NPM_TOKEN.'
    ),
  pushBranch: z
    .boolean()
    .optional()
    .describe('Also push the current branch before pushing tags. Defaults to true.'),
};

export async function publishPackage(args: {
  cwd?: string;
  confirm: boolean;
  pushBranch?: boolean;
}) {
  const cwd = await resolveCwd(args.cwd);
  await assertDir(cwd);

  if (!args.confirm) {
    throw new Error('publish_package requires confirm=true');
  }

  const gates = getGates(cwd);
  const missing = assertReadyForPublish(gates);
  if (missing.length) {
    throw new Error(
      `Publish gates incomplete. Run first: ${missing.join(' → ')}`
    );
  }

  if (!gates.releaseTag) {
    throw new Error('Missing release tag. Run create_release first.');
  }

  const outputs: string[] = [];

  if (args.pushBranch !== false) {
    outputs.push(await gitPush(cwd, ['-u', 'origin', 'HEAD']));
  }

  outputs.push(await gitPush(cwd, ['origin', gates.releaseTag]));

  return {
    cwd,
    tag: gates.releaseTag,
    publishedLocally: false,
    authMode: 'github-actions-oidc',
    message:
      'Tag pushed. GitHub Actions workflow publish.yml should authenticate to npm via OIDC Trusted Publishing. No NPM_TOKEN was used by this MCP.',
    git: outputs.filter(Boolean).join('\n'),
    gates,
  };
}
