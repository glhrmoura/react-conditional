export type BumpType = "patch" | "minor" | "major";

export type PackageInfo = {
  name: string;
  version: string;
  private: boolean;
  access: "public" | "restricted" | null;
  scripts: Record<string, string>;
  repository: string | null;
  publishConfig: Record<string, unknown> | null;
  files: string[] | null;
};

export type GateState = {
  inspected: boolean;
  versionChecked: boolean;
  testsPassed: boolean;
  buildPassed: boolean;
  previewPassed: boolean;
  bumped: boolean;
  bumpedVersion: string | null;
  releaseCreated: boolean;
  releaseTag: string | null;
};

export type ExecResult = {
  ok: boolean;
  code: number | null;
  stdout: string;
  stderr: string;
};
