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
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import debounce from "lodash/debounce";
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
import merge from "lodash/merge";
import { styles } from "./CodeEditor.styles";

const CodeEditor = ({
  themeName,
  setCopied,
}: {
  themeName: string;
  setCopied: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const { selectedTheme, selectedMode, changeTheme } = useTheme();

  const {
    customTheme,
    updateCustomTheme,
    undo,
    redo,
    canUndo,
    canRedo,
    themeChanges,
  } = useContext(GeneratorContext);

  const fileName = `${themeName}.ts`;

  const fullCode = getThemeCode(themeName, selectedTheme, themeChanges);
  const encodedCode = encodeURIComponent(fullCode);

  const [value, setValue] = useState(fullCode);

  useEffect(() => {
    const code = getThemeCode(themeName, selectedTheme, themeChanges);
    setValue(code);
  }, [customTheme, selectedTheme, selectedMode, themeChanges, themeName]);

  const onCopyHandler = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  };

  const onResetHandler = () => {
    const newTheme = createTheme({
      name: "customTheme",
      base: selectedTheme as HvBaseTheme,
    });
    updateCustomTheme(newTheme);
  };

  const codeChangedHandler = (code?: string) => {
    if (!code) return;

    const snippet = code.substring(
      code.indexOf("({") + 1,
      code.indexOf("});") + 1
    );

    const themeJson = snippet.replace(
      /(['"])?([a-zA-Z0-9_]+)(['"])?:/g,
      '"$2": '
    );

    try {
      const parsed = JSON.parse(themeJson);
      if (customTheme.base !== parsed.base) {
        changeTheme(parsed.base, selectedMode);
        const merged = merge({}, parsed, themeChanges);
        const newTheme = createTheme(merged);
        updateCustomTheme(newTheme, true, false);
      } else {
        const newTheme = createTheme(parsed);
        updateCustomTheme(newTheme);
      }
    } catch {
      console.log("error processing theme JSON");
    }
  };

  const debouncedHandler = debounce(codeChangedHandler, 1000);

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
          // readOnly: true,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
        }}
        language="typescript"
        value={value}
        height={300}
        width="100%"
        className={styles.codeEditor}
        onChange={debouncedHandler}
      />
    </HvBox>
  );
};

export default CodeEditor;
