import { useState } from "react";
import { CodeEditor, useLiveRunner, type Scope } from "react-live-runner";
import { Check, Code, Copy } from "@phosphor-icons/react";
import {
  HvDialog,
  HvDialogContent,
  HvDialogTitle,
  HvIconButton,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

import { DocsContainer } from "./DocsProvider";

type PopupLayoutProps = {
  id?: string;
  scope: Scope | null;
  code: Record<string, string>;
  title: string | undefined;
};

/**
 * PopupLayout renders a live preview and an expandable code editor
 * with interactive controls for toggling and resetting the code.
 */
export const PopupLayout = ({ id, scope, code, title }: PopupLayoutProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const initialCode = Object.values(code)[0];

  const {
    element,
    error,
    code: editorCode,
    onChange,
  } = useLiveRunner({
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
    <section
      id={id}
      data-pagefind-ignore
      className="bg-transparent relative border-border border-1 border-t-0 -ml-px h-full"
    >
      <HvDialog
        onClose={() => setIsExpanded(false)}
        open={isExpanded}
        fullWidth
        maxWidth="md"
      >
        <HvDialogTitle>Code</HvDialogTitle>
        <HvDialogContent className="py-sm">
          <HvIconButton
            title={copySuccess ? "Copied!" : "Copy Code"}
            variant="secondarySubtle"
            onClick={handleCopyToClipboard}
            className="z-1 absolute right-md top-64px"
          >
            {copySuccess ? <Check /> : <Copy />}
          </HvIconButton>
          <CodeEditor
            value={editorCode}
            onChange={onChange}
            className="font-mono text-[.85em] rounded-round border border-color-inherit"
          />
        </HvDialogContent>
      </HvDialog>

      {/* Poupup Controls */}
      <div className="absolute flex justify-between items-center p-sm gap-xs w-full">
        <HvTypography variant="label" className="pl-xs">
          {title}
        </HvTypography>
        <HvIconButton
          title="Show Code"
          onClick={() => setIsExpanded((prev) => !prev)}
        >
          <Code />
        </HvIconButton>
      </div>
      <div className="h-full [&>*]:h-full [&>*]:bg-transparent">
        {/* Preview Section */}
        <DocsContainer
          className="p-md flex items-center justify-center h-full [&>div]:flex-wrap "
          error={error}
          element={element}
        />
      </div>
      <pre className="hidden">{editorCode}</pre>
    </section>
  );
};
