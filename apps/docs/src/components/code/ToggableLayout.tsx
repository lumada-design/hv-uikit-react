import { useState } from "react";
import { CodeEditor, useLiveRunner, type Scope } from "react-live-runner";
import { clsx } from "clsx";
import { HvTab, HvTabs, HvTypography } from "@hitachivantara/uikit-react-core";

import { DocsContainer } from "./DocsProvider";
import { ToggableControls } from "./ToggableControls";

type ToggableLayoutProps = {
  title?: string;
  code: Record<string, string>;
  scope: Scope;
};

export const ToggableLayout = ({ title, scope, code }: ToggableLayoutProps) => {
  const [tmpCode, setTmpCode] = useState({ ...code });
  const [activeTab, setActiveTab] = useState(0);
  const [showPreview, setShowPreview] = useState(true);

  const { element, error, onChange } = useLiveRunner({
    initialCode: Object.values(code)[0],
    scope: scope || {},
  });

  const hasMultipleFiles = Object.keys(code).length > 1;

  const fileNames = Object.keys(code).map(
    (file) => file.split("/").pop() || file,
  );

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
            setTmpCode({ ...code });
          }}
        />
      </div>

      {/* Main content: Preview or Editor */}
      {showPreview ? (
        <DocsContainer
          className={clsx(
            "p-md pt-lg min-h-100px mb-lg",
            "border border-atmo3 rounded-round",
            "bg-bgContainer [&_tr]:table-row",
          )}
          error={error}
          element={element}
        />
      ) : (
        <>
          {/* Code editor for active tab */}
          <div className="max-h-[400px] overflow-auto rounded-round">
            <CodeEditor
              value={Object.values(tmpCode)[activeTab]}
              onChange={handleEditorChange}
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
              className="py-sm"
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
