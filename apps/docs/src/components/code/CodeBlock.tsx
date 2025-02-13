import { useMemo } from "react";

import { ExpandableLayout } from "./ExpandableLayout";
import { ToggableLayout } from "./ToggableLayout";
import { resolveComponents, resolveImports } from "./utils";

type CodeBlockProps = {
  title?: string;
  layout?: "expandable" | "toggable";
  code: Record<string, string> | string;
};

/**
 * CodeBlock component: A live code editor with preview functionality.
 * Supports multiple files with tabbed navigation and live updates.
 */
export const CodeBlock = ({
  title,
  layout = "toggable",
  code,
}: CodeBlockProps) => {
  // Normalize code input to be an object with a single file if it's a string
  // This ensures consistent handling of single-file and multi-file inputs.
  const normalizedCode = useMemo(
    () => (typeof code === "string" ? { main: code.trim() } : code),
    [code],
  );

  // Resolves additional imports required by th e code.
  // These may include external modules or dependencies used within the code.
  const imports = resolveImports(code);

  // Identifies and resolves custom components used in the code.
  // This enables integration of custom or reusable UI components into the live preview.
  const components = resolveComponents(code);

  // Combines resolved imports and components into a single `scope` object.
  // The `scope` is passed to the layout for rendering and execution of the code.
  const scope = { ...components, ...imports };

  // Select the layout component based on the `layout` prop.
  const ComponentLayout =
    layout === "expandable" ? ExpandableLayout : ToggableLayout;

  return <ComponentLayout title={title} code={normalizedCode} scope={scope} />;
};
