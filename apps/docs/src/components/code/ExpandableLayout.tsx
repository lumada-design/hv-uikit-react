import { useState } from "react";
import { CodeEditor, useLiveRunner, type Scope } from "react-live-runner";
import { clsx } from "clsx";
import {
  ds3,
  ds5,
  HvProvider,
  pentahoPlus,
} from "@hitachivantara/uikit-react-core";

import { useDocsTheme } from "../../hooks/useDocsTheme";
import useEditorTheme from "../../hooks/useEditorTheme";
import { ExpandableControls } from "./ExpandableControls";

type ExpandableLayoutProps = {
  scope: Scope | null;
  code: Record<string, string>;
};

/**
 * ExpandableLayout renders a live preview and an expandable code editor
 * with interactive controls for toggling and resetting the code.
 */
export const ExpandableLayout = ({ scope, code }: ExpandableLayoutProps) => {
  const editorTheme = useEditorTheme();
  const { docsTheme, docsMode } = useDocsTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const initialCode = Object.values(code)[0];

  const {
    element,
    code: editorCode,
    error: liveError,
    onChange,
  } = useLiveRunner({
    initialCode,
    scope: scope || {},
  });

  return (
    <section className="relative mt-md rounded-round [&>*]:border-border">
      {/* Compact Controls */}
      <ExpandableControls
        onToggle={() => setIsExpanded((prev) => !prev)}
        isExpanded={isExpanded}
        code={editorCode}
        onReset={() => onChange(initialCode)}
      />

      {/* Preview Section */}
      <div
        className={clsx(
          "p-md py-[40px] bg-bgPage border rounded-inherit",
          isExpanded && "rounded-b-0",
        )}
      >
        <div
          className={clsx(
            "p-md pt-lg bg-bgPage border rounded-inherit",
            isExpanded && "rounded-b-0",
          )}
        >
          {liveError ? (
            <div className="text-negative">{liveError}</div>
          ) : (
            <>{element}</>
          )}
        </div>
      </div>

      {/* Code Editor Section */}
      <div
        className="max-h-400px overflow-auto rounded-b-inherit -mt-xxs transition-max-height"
        style={{
          maxHeight: isExpanded ? 400 : 0,
        }}
      >
        <CodeEditor
          value={editorCode}
          onChange={onChange}
          theme={editorTheme}
          className="font-mono text-[.85em] rounded-b-inherit border border-color-inherit"
        />
      </div>
    </section>
  );
};
