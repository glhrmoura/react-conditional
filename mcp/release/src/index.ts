#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { inspectPackage, inspectPackageSchema } from "./tools/inspect-package.js";
import { checkVersion, checkVersionSchema } from "./tools/check-version.js";
import { runTests, runTestsSchema } from "./tools/run-tests.js";
import { runBuild, runBuildSchema } from "./tools/run-build.js";
import { previewPackage, previewPackageSchema } from "./tools/preview-package.js";
import { bumpVersion, bumpVersionSchema } from "./tools/bump-version.js";
import { createRelease, createReleaseSchema } from "./tools/create-release.js";
import { publishPackage, publishPackageSchema } from "./tools/publish-package.js";
import { publish, publishSchema } from "./tools/publish.js";
import { checkNpmVersion, checkNpmVersionSchema } from "./tools/check-npm-version.js";
import { getGates } from "./utils/gates.js";
import { resolveCwd } from "./utils/package.js";

function asText(data: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(data, null, 2),
      },
    ],
  };
}

function asError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify({ ok: false, error: message }, null, 2),
      },
    ],
    isError: true,
  };
}

const server = new McpServer({
  name: "react-conditional-release-mcp",
  version: "0.1.0",
});

server.tool(
  "inspect_package",
  "Inspect package.json publishability, scripts, repository, and scoped access settings.",
  inspectPackageSchema,
  async (args) => {
    try {
      return asText(await inspectPackage(args));
    } catch (error) {
      return asError(error);
    }
  }
);

server.tool(
  "check_version",
  "Compare local package.json version with the version currently published on npm.",
  checkVersionSchema,
  async (args) => {
    try {
      return asText(await checkVersion(args));
    } catch (error) {
      return asError(error);
    }
  }
);

server.tool(
  "run_tests",
  "Run the package test script. Marks the tests gate as passed on success.",
  runTestsSchema,
  async (args) => {
    try {
      return asText(await runTests(args));
    } catch (error) {
      return asError(error);
    }
  }
);

server.tool(
  "run_build",
  "Run the package build script. Marks the build gate as passed on success.",
  runBuildSchema,
  async (args) => {
    try {
      return asText(await runBuild(args));
    } catch (error) {
      return asError(error);
    }
  }
);

server.tool(
  "preview_package",
  "Run npm pack --dry-run to preview the tarball contents before release.",
  previewPackageSchema,
  async (args) => {
    try {
      return asText(await previewPackage(args));
    } catch (error) {
      return asError(error);
    }
  }
);

server.tool(
  "bump_version",
  "Bump package.json version (patch|minor|major). Requires confirm=true.",
  bumpVersionSchema,
  async (args) => {
    try {
      return asText(await bumpVersion(args));
    } catch (error) {
      return asError(error);
    }
  }
);

server.tool(
  "create_release",
  "Commit package.json and create a local vX.Y.Z git tag. Requires prior gates and confirm=true.",
  createReleaseSchema,
  async (args) => {
    try {
      return asText(await createRelease(args));
    } catch (error) {
      return asError(error);
    }
  }
);

server.tool(
  "publish_package",
  "Push the release tag to origin to trigger GitHub Actions OIDC npm publish. Never uses NPM_TOKEN. Requires confirm=true.",
  publishPackageSchema,
  async (args) => {
    try {
      return asText(await publishPackage(args));
    } catch (error) {
      return asError(error);
    }
  }
);

server.tool(
  "publish",
  "Run the full release pipeline: inspect, version check, tests, build, pack dry-run, bump, tag, and push for GitHub Actions OIDC publish. Requires confirm=true.",
  publishSchema,
  async (args) => {
    try {
      return asText(await publish(args));
    } catch (error) {
      return asError(error);
    }
  }
);

server.tool(
  "check_npm_version",
  "Check local npm/node versions and whether npm meets Trusted Publishing OIDC requirements.",
  checkNpmVersionSchema,
  async (args) => {
    try {
      return asText(await checkNpmVersion(args));
    } catch (error) {
      return asError(error);
    }
  }
);

server.tool(
  "release_status",
  "Show the current release safety gates for this package.",
  {
    cwd: z.string().optional(),
  },
  async (args) => {
    try {
      const cwd = await resolveCwd(args.cwd);
      return asText({ cwd, gates: getGates(cwd) });
    } catch (error) {
      return asError(error);
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
