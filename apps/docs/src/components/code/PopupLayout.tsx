import { useState } from "react";
import { CodeEditor, useLiveRunner, type Scope } from "react-live-runner";
import { Check, Copy } from "@phosphor-icons/react";
import {
  HvButton,
  HvDialog,
  HvDialogContent,
  HvDialogTitle,
  HvTooltip,
} from "@hitachivantara/uikit-react-core";

import useEditorTheme from "../../hooks/useEditorTheme";
import { PopupControls } from "./PopupControls";

type PopupLayoutProps = {
  scope: Scope | null;
  code: Record<string, string>;
};

/**
 * PopupLayout renders a live preview and an expandable code editor
 * with interactive controls for toggling and resetting the code.
 */
export const PopupLayout = ({ scope, code }: PopupLayoutProps) => {
  const editorTheme = useEditorTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const initialCode = Object.values(code)[0];

  const { element, code: editorCode } = useLiveRunner({
    initialCode,
    scope: scope || {},
  });

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(editorCode);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <section className="relative border-1 -mt-px -ml-px">
      <HvDialog
        onClose={() => setIsExpanded(false)}
        open={isExpanded}
        fullWidth
        maxWidth="md"
      >
        <HvDialogTitle>Code</HvDialogTitle>
        <HvDialogContent className="py-sm">
          <HvTooltip title={copySuccess ? "Copied!" : "Copy Code"}>
            <HvButton
              icon
              variant="secondarySubtle"
              onClick={handleCopyToClipboard}
              aria-label="Copy Code"
              className="z-1 absolute right-md top-64px"
            >
              {copySuccess ? <Check /> : <Copy />}
            </HvButton>
          </HvTooltip>
          <CodeEditor
            value={editorCode}
            theme={editorTheme}
            className="font-mono text-[.85em] rounded-round border border-color-inherit"
          />
        </HvDialogContent>
      </HvDialog>
      {/* Poupup Controls */}
      <PopupControls
        onToggle={() => setIsExpanded((prev) => !prev)}
        isExpanded={isExpanded}
        code={editorCode}
      />

      {/* Preview Section */}
      <div className="p-md flex items-center justify-center">
        <div>{element}</div>
      </div>
    </section>
  );
};
