import { runCommand } from "./exec.js";

export async function gitStatus(cwd: string): Promise<string> {
  const result = await runCommand("git", ["status", "--porcelain"], cwd);
  return result.stdout;
}

export async function gitAdd(cwd: string, files: string[]): Promise<void> {
  const result = await runCommand("git", ["add", "--", ...files], cwd);
  if (!result.ok) {
    throw new Error(result.stderr || "git add failed");
  }
}

export async function gitCommit(cwd: string, message: string): Promise<void> {
  const result = await runCommand("git", ["commit", "-m", message], cwd);
  if (!result.ok) {
    throw new Error(result.stderr || result.stdout || "git commit failed");
  }
}

export async function gitTag(cwd: string, tag: string): Promise<void> {
  const result = await runCommand("git", ["tag", tag], cwd);
  if (!result.ok) {
    throw new Error(result.stderr || "git tag failed");
  }
}

export async function gitPush(cwd: string, args: string[]): Promise<string> {
  const result = await runCommand("git", ["push", ...args], cwd);
  if (!result.ok) {
    throw new Error(result.stderr || result.stdout || "git push failed");
  }
  return [result.stdout, result.stderr].filter(Boolean).join("\n");
}

export async function gitCurrentBranch(cwd: string): Promise<string> {
  const result = await runCommand("git", ["branch", "--show-current"], cwd);
  if (!result.ok) {
    throw new Error(result.stderr || "failed to read current branch");
  }
  return result.stdout;
}
