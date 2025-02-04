import * as React from "react";
import { useMemo, useState } from "react";
import {
  CodeEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from "react-live-runner";
import useEditorTheme from "@docs/hooks/useEditorTheme";
import * as HvCodeEditor from "@hitachivantara/uikit-react-code-editor";
import * as HvCore from "@hitachivantara/uikit-react-core";
import * as HvIcons from "@hitachivantara/uikit-react-icons";
import * as HvLab from "@hitachivantara/uikit-react-lab";
import * as HvViz from "@hitachivantara/uikit-react-viz";

import { Toolbar } from "./Toolbar";

interface LiveProps {
  children: string;
}

const imports = {
  import: {
    react: React,
    "@hitachivantara/uikit-react-core": HvCore,
    "@hitachivantara/uikit-react-icons": HvIcons,
    "@hitachivantara/uikit-react-code-editor": HvCodeEditor,
    "@hitachivantara/uikit-react-lab": HvLab,
    "@hitachivantara/uikit-react-code-viz": HvViz,
  },
};

// Extract unique matches from code based on a given regex
const extractMatches = (code: string, regex: RegExp): string[] => [
  ...new Set((code.match(regex) || []).map((match) => match.replace(/</g, ""))),
];

// Generate the scope for LiveProvider
const generateScope = (hvComponents: string[], hvIcons: string[]) => {
  const components = hvComponents.reduce<Record<string, any>>((acc, name) => {
    const component =
      HvCore[name as keyof typeof HvCore] ||
      HvCodeEditor[name as keyof typeof HvCodeEditor] ||
      HvLab[name as keyof typeof HvLab] ||
      HvViz[name as keyof typeof HvViz];
    if (component) acc[name] = component;
    return acc;
  }, {});

  const icons = hvIcons.reduce<Record<string, any>>((acc, name) => {
    const icon = HvIcons[name as keyof typeof HvIcons];
    if (icon) acc[name] = icon;
    return acc;
  }, {});

  return { ...components, ...icons, theme: HvCore.theme };
};

export const Live = ({ children }: LiveProps) => {
  const [initialCode] = useState(children?.trimEnd());
  const [code, setCode] = useState(initialCode);
  const [isExpanded, setIsExpanded] = useState(false);
  const editorTheme = useEditorTheme();

  // Extract components, hooks and icons from the code
  const hvComponents = useMemo(
    () => extractMatches(code, /\b(?:Hv|use|hv)[A-Za-z0-9_]*\b/g),
    [code],
  );
  const hvIcons = useMemo(
    () => extractMatches(code, /<(?!(Hv))[A-Z][a-zA-Z0-9]*/g),
    [code],
  );

  // Generate scope for LiveProvider
  const scope = generateScope(hvComponents, hvIcons);

  return (
    <LiveProvider code={code} scope={{ ...scope, ...imports }}>
      {/* Live Preview */}
      <LivePreview className="flex gap-3 p-2 mt-3 border border-[var(--uikit-colors-atmo4)] border-b-0 rounded-t-round overflow-auto [&>*:first-child]:w-full" />

      {/* Toolbar */}
      <Toolbar
        onToggle={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
        code={code}
        onReset={() => setCode(initialCode)}
      />

      {/* Code Editor */}
      <div
        className={`overflow-auto border-x-1 border-[var(--uikit-colors-atmo4)] rounded-b-round ${
          isExpanded ? "border-b-transparent" : "border-b-1"
        }`}
        style={{
          maxHeight: isExpanded ? "0px" : "250px",
          transition: "max-height 0.2s ease-in-out",
        }}
      >
        <CodeEditor
          className="font-mono text-sm leading-2.2 border-[var(--uikit-colors-atmo4)] rounded-b-round"
          value={code}
          onChange={(value) => setCode(value)}
          theme={editorTheme}
        />
      </div>

      {/* Error Display */}
      <LiveError className="text-xs p-3 bg-red-100 text-red-700 mt-1" />
    </LiveProvider>
  );
};
