import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { PackageInfo } from "../types/index.js";

async function findRepoRoot(start: string): Promise<string> {
  let dir = start;
  for (let i = 0; i < 8; i++) {
    try {
      const pkgPath = path.join(dir, "package.json");
      await access(pkgPath);
      const raw = await readFile(pkgPath, "utf8");
      const pkg = JSON.parse(raw) as { name?: string };
      if (pkg.name === "@glhrmoura/react-conditional") {
        return dir;
      }
    } catch {
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  throw new Error("Could not locate @glhrmoura/react-conditional package root");
}

let cachedRoot: string | null = null;

export async function repoRootFromMcp(): Promise<string> {
  if (cachedRoot) {
    return cachedRoot;
  }
  const here = path.dirname(fileURLToPath(import.meta.url));
  cachedRoot = await findRepoRoot(here);
  return cachedRoot;
}

export async function resolveCwd(cwd?: string): Promise<string> {
  if (cwd) {
    return path.resolve(cwd);
  }
  if (process.env.RELEASE_CWD) {
    return path.resolve(process.env.RELEASE_CWD);
  }
  return repoRootFromMcp();
}

export async function assertDir(cwd: string): Promise<void> {
  await access(cwd);
}

export async function readPackageJson(cwd: string): Promise<Record<string, unknown>> {
  const filePath = path.join(cwd, "package.json");
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as Record<string, unknown>;
}

export async function writePackageJson(
  cwd: string,
  data: Record<string, unknown>
): Promise<void> {
  const filePath = path.join(cwd, "package.json");
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function toPackageInfo(pkg: Record<string, unknown>): PackageInfo {
  const publishConfig =
    pkg.publishConfig && typeof pkg.publishConfig === "object"
      ? (pkg.publishConfig as Record<string, unknown>)
      : null;

  const access =
    publishConfig && typeof publishConfig.access === "string"
      ? (publishConfig.access as "public" | "restricted")
      : null;

  const repository =
    typeof pkg.repository === "string"
      ? pkg.repository
      : pkg.repository &&
          typeof pkg.repository === "object" &&
          typeof (pkg.repository as { url?: unknown }).url === "string"
        ? (pkg.repository as { url: string }).url
        : null;

  return {
    name: String(pkg.name || ""),
    version: String(pkg.version || ""),
    private: Boolean(pkg.private),
    access,
    scripts:
      pkg.scripts && typeof pkg.scripts === "object"
        ? (pkg.scripts as Record<string, string>)
        : {},
    repository,
    publishConfig,
    files: Array.isArray(pkg.files) ? (pkg.files as string[]) : null,
  };
}

export function isScoped(name: string): boolean {
  return name.startsWith("@");
}

export function bumpSemver(
  version: string,
  type: "patch" | "minor" | "major"
): string {
  const match = /^(\d+)\.(\d+)\.(\d+)(?:[-+].*)?$/.exec(version);
  if (!match) {
    throw new Error(`Invalid semver version: ${version}`);
  }

  let major = Number(match[1]);
  let minor = Number(match[2]);
  let patch = Number(match[3]);

  if (type === "major") {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (type === "minor") {
    minor += 1;
    patch = 0;
  } else {
    patch += 1;
  }

  return `${major}.${minor}.${patch}`;
}

export async function detectPackageManager(cwd: string): Promise<"yarn" | "pnpm" | "npm"> {
  try {
    await access(path.join(cwd, "yarn.lock"));
    return "yarn";
  } catch {
  }

  try {
    await access(path.join(cwd, "pnpm-lock.yaml"));
    return "pnpm";
  } catch {
  }

  return "npm";
}
