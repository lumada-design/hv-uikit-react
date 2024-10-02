import React, { useMemo, useState } from "react";
import {
  CodeEditor,
  LiveError,
  LivePreview,
  LiveProvider,
} from "react-live-runner";
// @ts-ignore
import { themes } from "prism-react-renderer";
import * as HvCore from "@hitachivantara/uikit-react-core";

interface LiveProps {
  children: string;
}

export const Live: React.FC<LiveProps> = ({ children }) => {
  // Initialize code state with trimmed children
  const initialCode = children.trimEnd();
  const [code, setCode] = useState<string>(initialCode);

  // Memoize the extraction of unique Hv component names
  const hvComponents = useMemo(() => {
    // Match valid JavaScript identifiers starting with "Hv"
    const matches = code.match(/\bHv[A-Za-z0-9_]*\b/g) || [];
    return Array.from(new Set(matches)) as string[];
  }, [code]);

  // Memoize the creation of the scope object containing Hv components
  const scope = useMemo(() => {
    return hvComponents.reduce<Record<string, any>>((acc, componentName) => {
      const component = HvCore[componentName as keyof typeof HvCore];
      if (component) {
        acc[componentName] = component;
      } else {
        console.warn(`Component "${componentName}" not found in HvCore.`);
      }
      return acc;
    }, {});
  }, [hvComponents]);

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  return (
    <LiveProvider code={code} scope={scope} theme={themes.dracula}>
      <LiveProvider code={code} scope={{ ...scope }} theme={themes.dracula}>
        <LivePreview className="flex gap-3 p-3 border border-atmo3 rounded-t-lg" />
        <CodeEditor
          value={code}
          onChange={handleCodeChange}
          theme={themes.dracula}
        />
        <LiveError className="text-xs p-3" />
      </LiveProvider>
    </LiveProvider>
  );
};
