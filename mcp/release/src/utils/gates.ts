import type { GateState } from "../types/index.js";

const gates = new Map<string, GateState>();

function emptyGates(): GateState {
  return {
    inspected: false,
    versionChecked: false,
    testsPassed: false,
    buildPassed: false,
    previewPassed: false,
    bumped: false,
    bumpedVersion: null,
    releaseCreated: false,
    releaseTag: null,
  };
}

export function getGates(cwd: string): GateState {
  const existing = gates.get(cwd);
  if (existing) {
    return existing;
  }
  const created = emptyGates();
  gates.set(cwd, created);
  return created;
}

export function markInspected(cwd: string): GateState {
  const state = getGates(cwd);
  state.inspected = true;
  return state;
}

export function markVersionChecked(cwd: string): GateState {
  const state = getGates(cwd);
  state.versionChecked = true;
  return state;
}

export function markTests(cwd: string, passed: boolean): GateState {
  const state = getGates(cwd);
  state.testsPassed = passed;
  if (!passed) {
    state.previewPassed = false;
    state.releaseCreated = false;
  }
  return state;
}

export function markBuild(cwd: string, passed: boolean): GateState {
  const state = getGates(cwd);
  state.buildPassed = passed;
  if (!passed) {
    state.previewPassed = false;
    state.releaseCreated = false;
  }
  return state;
}

export function markPreview(cwd: string, passed: boolean): GateState {
  const state = getGates(cwd);
  state.previewPassed = passed;
  if (!passed) {
    state.releaseCreated = false;
  }
  return state;
}

export function markBumped(cwd: string, version: string): GateState {
  const state = getGates(cwd);
  state.bumped = true;
  state.bumpedVersion = version;
  state.releaseCreated = false;
  state.releaseTag = null;
  return state;
}

export function markRelease(cwd: string, tag: string): GateState {
  const state = getGates(cwd);
  state.releaseCreated = true;
  state.releaseTag = tag;
  return state;
}

export function assertReadyForRelease(state: GateState): string[] {
  const missing: string[] = [];
  if (!state.inspected) missing.push("inspect_package");
  if (!state.testsPassed) missing.push("run_tests");
  if (!state.buildPassed) missing.push("run_build");
  if (!state.previewPassed) missing.push("preview_package");
  if (!state.bumped) missing.push("bump_version");
  return missing;
}

export function assertReadyForPublish(state: GateState): string[] {
  const missing = assertReadyForRelease(state);
  if (!state.releaseCreated) missing.push("create_release");
  return missing;
}
