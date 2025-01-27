// eslint-disable-next-line
import React from "react";
import { importCode, type Scope } from "react-live-runner";
import * as HvCore from "@hitachivantara/uikit-react-core";
import * as HvIcons from "@hitachivantara/uikit-react-icons";

type ResolveContext = {
  files: Record<string, string>;
  baseScope: Scope;
  imports: Scope;
  resolvedFiles: Map<string, unknown>;
  dependencyStack: string[];
};

// Define the base scope with initial imports
const defaultScope: Scope = {
  import: {
    react: React,
    "@hitachivantara/uikit-react-core": HvCore,
    "@hitachivantara/uikit-react-icons": HvIcons,
  },
};

/**
 * Extracts all unique component names from the provided file contents
 * that match the given naming pattern (e.g., starting with "Hv").
 * Resolves these components from HvCore or HvIcons, if available.
 */
export const resolveComponents = (
  code: Record<string, string> | string,
): Scope => {
  const componentsScope: Scope = {};

  // Regex to capture JSX tags and component usage
  const componentRegex = /<([A-Z][A-Za-z0-9]*)/g;

  // Helper to resolve a component name
  const resolveComponent = (component: string): unknown =>
    HvCore[component as keyof typeof HvCore] ||
    HvIcons[component as keyof typeof HvIcons];

  // Normalize input to an array of strings
  const contents = typeof code === "string" ? [code] : Object.values(code);

  for (const content of contents) {
    const matches = extractUniqueMatches(content, componentRegex);

    for (const component of matches) {
      // Skip already resolved components
      if (!componentsScope[component]) {
        const resolved = resolveComponent(component);

        if (resolved) {
          componentsScope[component] = resolved;
        }
      }
    }
  }

  return componentsScope;
};

/**
 * Resolves additional imports for the provided code files.
 * Excludes the initial file and handles errors during scope enhancement.
 */
export const resolveImports = (
  code: Record<string, string> | string,
): Scope | null => {
  let importsScope: Scope | null = null;

  if (typeof code === "string") {
    // If only a single string is provided, use the default scope
    importsScope = defaultScope;
  } else {
    // Clone code object and exclude the first file
    const clonedCode = { ...code };
    delete clonedCode[Object.keys(clonedCode)[0]];

    // Extend the scope with remaining files
    importsScope = extendScopeWithFiles(defaultScope, clonedCode);
  }

  return importsScope;
};

/**
 * Extracts unique matches from a string based on the given regex pattern.
 */
const extractUniqueMatches = (content: string, regex: RegExp): Set<string> => {
  const matches = new Set<string>();
  let match: RegExpExecArray | null;

  regex.lastIndex = 0; // Ensure regex state is reset
  match = regex.exec(content);

  while (match !== null) {
    matches.add(match[1]); // Add the captured group (e.g., component name)
    match = regex.exec(content);
  }

  return matches;
};

/**
 * Extends the given scope by resolving imports for additional files.
 * Prevents circular dependencies and caches resolved files for efficiency.
 * Ignores relative paths (e.g., './' or '../').
 */
const extendScopeWithFiles = (
  baseScope: Scope,
  files: Record<string, string>,
): Scope => {
  const imports: Scope = { ...baseScope.import }; // Clone base imports
  const context: ResolveContext = {
    files,
    baseScope,
    imports,
    resolvedFiles: new Map<string, unknown>(),
    dependencyStack: [],
  };

  for (const fileName of Object.keys(files)) {
    try {
      imports[fileName] = resolveFile(fileName, context);
    } catch (err) {
      console.error(`Error resolving file "${fileName}":`, err);
      throw new Error(
        `[Error in ${fileName}] ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  return { ...baseScope, import: imports };
};

/**
 * Resolves a file's code and updates the cache.
 * Handles circular dependencies and caching.
 */
const resolveFile = (fileName: string, context: ResolveContext): unknown => {
  const { files, baseScope, imports, resolvedFiles, dependencyStack } = context;

  if (resolvedFiles.has(fileName)) return resolvedFiles.get(fileName); // Use cached result

  if (!files[fileName]) {
    throw new Error(`File not found: ${fileName}`);
  }

  if (dependencyStack.includes(fileName)) {
    throw new Error(
      `Circular dependency detected: ${dependencyStack.join(" -> ")} -> ${fileName}`,
    );
  }

  dependencyStack.push(fileName);

  try {
    const module = importCode(files[fileName], {
      ...baseScope,
      import: imports,
    });
    resolvedFiles.set(fileName, module); // Cache the resolved module
    return module;
  } finally {
    dependencyStack.pop(); // Ensure the file is removed from the stack
  }
};
