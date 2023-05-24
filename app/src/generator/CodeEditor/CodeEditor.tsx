import {
  createTheme,
  HvBaseTheme,
  HvBox,
  HvButton,
  HvTooltip,
  HvTypography,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { GeneratorContext } from "generator/GeneratorContext";
import { useContext, useEffect, useState } from "react";
import {
  Download,
  Undo,
  Redo,
  Reset,
  Duplicate,
} from "@hitachivantara/uikit-react-icons";
import { downloadTheme, themeDiff } from "generator/utils";
import { HvCodeEditor } from "@hitachivantara/uikit-react-code-editor";
import { styles } from "./CodeEditor.styles";

export const groupsToShow = ["acce", "atmo", "base", "sema"] as const; // "sup", "cat"

const CodeEditor = ({ themeName, setCopied }): JSX.Element => {
  const [fullCode, setFullCode] = useState("");
  const { activeTheme, selectedTheme } = useTheme();

  const { customTheme, updateCustomTheme, undo, redo, canUndo, canRedo } =
    useContext(GeneratorContext);

  useEffect(() => {
    const temp: any = {};
    temp.name = themeName;
    temp.base = selectedTheme;
    const final = {
      ...temp,
      ...themeDiff(activeTheme as object, customTheme),
    };

    // the `replace` bit below is just a regex to remove the quotes from
    // the properties names, for displaying effect only.
    setFullCode(
      `import { createTheme } from "@hitachivantara/uikit-react-core";
  
const ${themeName} = createTheme(${JSON.stringify(final, null, 2).replace(
        /"([^(")"]+)":/g,
        "$1:"
      )})
      
export default ${themeName};`
    );
  }, [customTheme]);

  const onCopyHandler = () => {
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
  };

  const onDownloadHandler = () => {
    downloadTheme(`${themeName}.ts`, fullCode);
  };

  const onResetHandler = () => {
    const newTheme = createTheme({
      name: "customTheme",
      base: selectedTheme as HvBaseTheme,
    });
    updateCustomTheme(newTheme);
  };

  const onUndoHandler = () => {
    undo?.();
  };

  const onRedoHandler = () => {
    redo?.();
  };

  return (
    <HvBox css={{ position: "relative" }}>
      <HvBox className={styles.codeEditorTools}>
        <HvBox>
          <HvTypography variant="label">{themeName}.ts</HvTypography>
          <HvTooltip title={<HvTypography>Download</HvTypography>}>
            <HvButton variant="secondaryGhost" icon onClick={onDownloadHandler}>
              <Download />
            </HvButton>
          </HvTooltip>
        </HvBox>
        <HvBox css={{ display: "flex" }}>
          <HvBox>
            {canUndo ? (
              <HvTooltip title={<HvTypography>Undo</HvTypography>}>
                <HvButton variant="secondaryGhost" icon onClick={onUndoHandler}>
                  <Undo />
                </HvButton>
              </HvTooltip>
            ) : (
              <HvButton variant="secondaryGhost" icon disabled={!canUndo}>
                <Undo />
              </HvButton>
            )}
          </HvBox>
          <HvBox>
            {canRedo ? (
              <HvTooltip title={<HvTypography>Redo</HvTypography>}>
                <HvButton variant="secondaryGhost" icon onClick={onRedoHandler}>
                  <Redo />
                </HvButton>
              </HvTooltip>
            ) : (
              <HvButton variant="secondaryGhost" icon disabled={!canRedo}>
                <Redo />
              </HvButton>
            )}
          </HvBox>
          <HvBox>
            <HvTooltip title={<HvTypography>Reset</HvTypography>}>
              <HvButton
                variant="secondaryGhost"
                icon
                onClick={onResetHandler}
                disabled={!canUndo && !canRedo}
              >
                <Reset />
              </HvButton>
            </HvTooltip>
          </HvBox>
          <HvBox>
            <HvTooltip title={<HvTypography>Copy to Clipboard</HvTypography>}>
              <HvButton variant="secondaryGhost" icon onClick={onCopyHandler}>
                <Duplicate />
              </HvButton>
            </HvTooltip>
          </HvBox>
        </HvBox>
      </HvBox>
      <HvCodeEditor
        options={{
          minimap: { enabled: false },
          readOnly: true,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
        }}
        language="typescript"
        value={fullCode}
        height={260}
        width="100%"
        className={styles.codeEditor}
      />
    </HvBox>
  );
};

export default CodeEditor;
