import { useState } from "react";
import { CodeEditor, useLiveRunner, type Scope } from "react-live-runner";
import useEditorTheme from "@docs/hooks/useEditorTheme";

import { ExpandableControls } from "./ExpandableControls";

type ExpandableLayoutProps = {
  scope: Scope | null; // Execution scope for the live runner
  code: Record<string, string>; // Source code as a record of file names to content
};

/**
 * ExpandableLayout renders a live preview and an expandable code editor
 * with interactive controls for toggling and resetting the code.
 */
export const ExpandableLayout = ({ scope, code }: ExpandableLayoutProps) => {
  const editorTheme = useEditorTheme(); // Get the theme for the code editor
  const [isExpanded, setIsExpanded] = useState(false); // State for toggling the editor view

  // LiveRunner setup for rendering the live preview and managing code state
  const {
    element,
    code: editorCode,
    error: liveError,
    onChange,
  } = useLiveRunner({
    initialCode: Object.values(code)[0], // Use the first file's content as the default
    scope: scope || {}, // Use provided scope or an empty object
  });

  // Resets the code editor to its initial state
  const resetCode = () => onChange(Object.values(code)[0]);

  return (
    <div className="relative mt-3">
      {/* Compact Controls */}
      <ExpandableControls
        onToggle={() => setIsExpanded((prev) => !prev)} // Toggle the expanded state
        isExpanded={isExpanded}
        code={editorCode}
        onReset={resetCode}
      />

      {/* Preview Section */}
      <div
        className={[
          "flex px-3 py-4 [&_tr]:table-row gap-2 bg-[var(--uikit-colors-atmo1)]",
          "border rounded-round border-[var(--uikit-colors-atmo3)]",
          isExpanded ? "border-b-0 rounded-b-0" : "border-b-1",
        ].join(" ")}
      >
        {liveError ? (
          <div className="text-red-500">{liveError}</div> // Display error if present
        ) : (
          element // Render the live preview element
        )}
      </div>

      {/* Code Editor Section */}
      <div
        className="max-h-[300px] overflow-auto rounded-b-round"
        style={{
          maxHeight: isExpanded ? "300px" : "0px", // Dynamically adjust height
          transition: "max-height 0.2s ease-in-out", // Smooth expand/collapse transition
        }}
      >
        <CodeEditor
          value={editorCode}
          onChange={onChange}
          theme={editorTheme}
          className="font-mono text-[.85em] rounded-b-round"
        />
      </div>
    </div>
  );
};
