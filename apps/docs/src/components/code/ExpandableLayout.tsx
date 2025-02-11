import { useState } from "react";
import { CodeEditor, useLiveRunner, type Scope } from "react-live-runner";
import useEditorTheme from "@docs/hooks/useEditorTheme";

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
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    element,
    code: editorCode,
    error: liveError,
    onChange,
  } = useLiveRunner({
    initialCode: Object.values(code)[0],
    scope: scope || {},
  });

  const resetCode = () => onChange(Object.values(code)[0]);

  return (
    <div className="relative mt-3">
      {/* Compact Controls */}
      <ExpandableControls
        onToggle={() => setIsExpanded((prev) => !prev)}
        isExpanded={isExpanded}
        code={editorCode}
        onReset={resetCode}
      />

      {/* Preview Section */}
      <div
        className={[
          "p-4 pt-5 [&_tr]:table-row gap-2 bg-[var(--uikit-colors-atmo2)] overflow-hidden",
          "border rounded-round border-[var(--uikit-colors-atmo4)]",
          isExpanded ? "rounded-b-0" : "",
        ].join(" ")}
      >
        {liveError ? <div className="text-red-500">{liveError}</div> : element}
      </div>

      {/* Code Editor Section */}
      <div
        className="max-h-[300px] overflow-auto rounded-b-round mt-[-4px]"
        style={{
          maxHeight: isExpanded ? "300px" : "0px",
          transition: "max-height 0.2s ease-in-out",
        }}
      >
        <CodeEditor
          value={editorCode}
          onChange={onChange}
          theme={editorTheme}
          className="font-mono text-[.85em] rounded-b-round border border-[var(--uikit-colors-atmo4)]"
        />
      </div>
    </div>
  );
};
