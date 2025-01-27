import { useState } from "react";
import { CodeEditor, useLiveRunner, type Scope } from "react-live-runner";
import useEditorTheme from "@docs/hooks/useEditorTheme";
import { clsx } from "clsx";
import { HvTab, HvTabs, HvTypography } from "@hitachivantara/uikit-react-core";

import { ToggableControls } from "./ToggableControls";

type ToggableLayoutProps = {
  title?: string;
  code: Record<string, string>;
  scope: Scope;
};

export const ToggableLayout = ({ title, scope, code }: ToggableLayoutProps) => {
  const editorTheme = useEditorTheme();

  const [tmpCode, setTmpCode] = useState({ ...code });
  const [activeTab, setActiveTab] = useState(0);
  const [showPreview, setShowPreview] = useState(true);

  // Setup live code runner
  const { element, error, onChange } = useLiveRunner({
    initialCode: Object.values(code)[0], // Default to the first file
    scope: scope || {},
  });

  // Determine if there are multiple files
  const hasMultipleFiles = Object.keys(code).length > 1;

  // Extract filenames for tabs
  const fileNames = Object.keys(code).map(
    (file) => file.split("/").pop() || file,
  );

  // Updates the temporary code and triggers live updates in the runner.
  const handleEditorChange = (value: string) => {
    setTmpCode((prev) => ({
      ...prev,
      [Object.keys(tmpCode)[activeTab]]: value,
    }));
    onChange(value);
  };

  return (
    <>
      <div className={clsx("flex justify-between items-center mb-2")}>
        {/* Title */}
        <HvTypography variant="title4">{title}</HvTypography>

        {/* Toolbar for controls: toggle preview, reset, and copy */}
        <ToggableControls
          code={tmpCode}
          showPreview={showPreview}
          toggleView={() => setShowPreview((prev) => !prev)}
          onReset={() => {
            setTmpCode({ ...code }); // Reset to initial code
          }}
        />
      </div>

      {/* Main content: Preview or Editor */}
      {showPreview ? (
        <div
          className={clsx(
            "flex items-center justify-center p-4 gap-2 min-h-[400px] mb-10",
            "border border-[var(--uikit-colors-atmo3)] rounded-round",
            "bg-[var(--uikit-colors-atmo1)] [&_tr]:table-row",
          )}
        >
          {/* Render errors or the live preview */}
          {error ? <div className="text-red-500">{error}</div> : element}
        </div>
      ) : (
        <>
          {/* Code editor for active tab */}
          <div className="max-h-[400px] overflow-auto rounded-round">
            <CodeEditor
              value={Object.values(tmpCode)[activeTab]}
              onChange={handleEditorChange}
              theme={editorTheme}
              className="font-mono text-[.88em]"
            />
          </div>

          {/* Tabs for navigating between files in multi-file mode */}
          {hasMultipleFiles && (
            <HvTabs
              floating
              value={activeTab}
              onChange={(_, value) => setActiveTab(value)}
              aria-label="File Tabs"
              className="py-2"
            >
              {fileNames.map((fileName) => (
                <HvTab
                  key={fileName}
                  label={fileName}
                  aria-label={`Tab for file ${fileName}`}
                />
              ))}
            </HvTabs>
          )}
        </>
      )}
    </>
  );
};
