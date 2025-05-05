import { useState } from "react";
import { CodeEditor, useLiveRunner, type Scope } from "react-live-runner";
import { Check, Code, Copy } from "@phosphor-icons/react";
import {
  ds3,
  ds5,
  HvButton,
  HvDialog,
  HvDialogContent,
  HvDialogTitle,
  HvIconButton,
  HvProvider,
  HvTooltip,
  pentahoPlus,
} from "@hitachivantara/uikit-react-core";

import { useDocsThemeContext } from "../../contexts/DocsThemeContext";
import useEditorTheme from "../../hooks/useEditorTheme";

type PopupLayoutProps = {
  id?: string;
  scope: Scope | null;
  code: Record<string, string>;
};

/**
 * PopupLayout renders a live preview and an expandable code editor
 * with interactive controls for toggling and resetting the code.
 */
export const PopupLayout = ({ id, scope, code }: PopupLayoutProps) => {
  const editorTheme = useEditorTheme();
  const { docsTheme, docsMode } = useDocsThemeContext();
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
    <HvProvider
      themes={[pentahoPlus, ds5, ds3]}
      theme={docsTheme}
      colorMode={docsMode}
      cssTheme="scoped"
      rootElementId={id}
    >
      <div id={id} className="bg-transparent h-full">
        <section className="relative border-1 border-t-0 -ml-px h-full">
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
          <div className="absolute right-0 flex items-center p-xs gap-xs">
            <HvIconButton
              title="Show Code"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              <Code />
            </HvIconButton>
          </div>
          {/* Preview Section */}
          <div className="p-md flex items-center justify-center h-full">
            <div>{element}</div>
          </div>
        </section>
      </div>
    </HvProvider>
  );
};
