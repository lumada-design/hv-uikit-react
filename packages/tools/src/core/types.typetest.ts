/**
 * The tools read metadata.json with their own copy of its type (core is only a
 * peer dependency). This fails `npm run typecheck` if the copy and the shape
 * core writes (packages/core/scripts/agents-format.ts) ever differ.
 * Excluded from the package build.
 */
import type { AgentsMetadata as Written } from "../../../core/scripts/agents-format.ts";
import type { AgentsMetadata as Read } from "./types.js";

type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;

export const sameShape: Equal<Written, Read> = true;
