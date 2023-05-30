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
import { useContext } from "react";
import {
  Download,
  Undo,
  Redo,
  Reset,
  Duplicate,
} from "@hitachivantara/uikit-react-icons";
import { getThemeCode } from "generator/utils";
import { HvCodeEditor } from "@hitachivantara/uikit-react-code-editor";
import { IconButton } from "components/common/IconButton";
import { styles } from "./CodeEditor.styles";

export const groupsToShow = ["acce", "atmo", "base", "sema"] as const; // "sup", "cat"

const CodeEditor = ({ themeName, setCopied }): JSX.Element => {
  const { activeTheme, selectedTheme } = useTheme();

  const { customTheme, updateCustomTheme, undo, redo, canUndo, canRedo } =
    useContext(GeneratorContext);

  const fileName = `${themeName}.ts`;

  const fullCode = getThemeCode(
    themeName,
    selectedTheme,
    activeTheme,
    customTheme
  );
  const encodedCode = encodeURIComponent(fullCode);

  const onCopyHandler = () => {
    navigator.clipboard.writeText(fullCode);
    setCopied(true);
  };

  const onResetHandler = () => {
    const newTheme = createTheme({
      name: "customTheme",
      base: selectedTheme as HvBaseTheme,
    });
    updateCustomTheme(newTheme);
  };

  return (
    <HvBox css={{ position: "relative" }}>
      <HvBox className={styles.codeEditorTools}>
        <HvTooltip title={<HvTypography>Download</HvTypography>}>
          <HvButton
            variant="secondaryGhost"
            component="a"
            download={fileName}
            href={`data:text/plain;charset=utf-8,${encodedCode}`}
            endIcon={<Download />}
          >
            {fileName}
          </HvButton>
        </HvTooltip>
        <HvBox css={{ display: "flex" }}>
          <IconButton
            label="Undo"
            icon={<Undo />}
            disabled={!canUndo}
            onClick={undo}
          />
          <IconButton
            label="Redo"
            icon={<Redo />}
            disabled={!canRedo}
            onClick={redo}
          />
          <IconButton
            label="Reset"
            icon={<Reset />}
            disabled={!canUndo && !canRedo}
            onClick={onResetHandler}
          />
          <IconButton
            label="Copy to Clipboard"
            icon={<Duplicate />}
            onClick={onCopyHandler}
          />
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
