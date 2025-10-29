"use client";

import { useMemo } from "react";

import { ExpandableLayout } from "./ExpandableLayout";
import { PopupLayout } from "./PopupLayout";
import { ToggableLayout } from "./ToggableLayout";
import { resolveComponents, resolveImports } from "./utils";

type CodeBlockProps = {
  title?: string;
  description?: string;
  layout?: "expandable" | "toggable" | "popup";
  code: Record<string, string> | string;
};

const layoutMap = {
  expandable: ExpandableLayout,
  toggable: ToggableLayout,
  popup: PopupLayout,
};

/**
 * CodeBlock component: A live code editor with preview functionality.
 * Supports multiple files with tabbed navigation and live updates.
 */
export const CodeBlock = ({
  title,
  description,
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
  const ComponentLayout = layoutMap[layout] || layoutMap.toggable;

  return (
    <ComponentLayout
      title={title}
      description={description}
      code={normalizedCode}
      scope={scope}
    />
  );
};
