import {
  createTheme,
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
import JSON5 from "json5";
import { Download, Reset, Duplicate } from "@hitachivantara/uikit-react-icons";
import { getThemeCode } from "generator/utils";
import { HvCodeEditor } from "@hitachivantara/uikit-react-code-editor";
import { IconButton } from "components/common/IconButton";
import { styles } from "./CodeEditor.styles";

const CodeEditor = ({
  themeName,
  setCopied,
}: {
  themeName: string;
  setCopied: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const { selectedTheme, selectedMode, changeTheme } = useTheme();

  const { customTheme, updateCustomTheme, themeChanges } =
    useContext(GeneratorContext);

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
      base: "ds5",
    });
    updateCustomTheme({ ...newTheme }, { isReset: true });
  };

  const codeChangedHandler = (code?: string) => {
    if (!code) return;

    const snippet = code.substring(
      code.indexOf("({") + 1,
      code.indexOf("});") + 1
    );

    try {
      const parsed = JSON5.parse(snippet);
      if (customTheme.base !== parsed.base) {
        if (parsed.base === "ds3" || parsed.base === "ds5") {
          changeTheme(parsed.base, selectedMode);
          updateCustomTheme(
            { ...parsed },
            {
              isBaseChange: true,
              isCodeEdit: true,
            }
          );
        } else {
          console.log("invalid base theme");
        }
      } else {
        updateCustomTheme({ ...parsed }, { isCodeEdit: true });
      }
    } catch {
      console.log("error processing theme JSON");
    }
  };

  const debouncedHandler = debounce(codeChangedHandler, 1000);

  return (
    <HvBox css={{ position: "relative" }}>
      <HvBox className={styles.codeEditorTools}>
        <HvTooltip
          enterDelay={500}
          title={<HvTypography>Download</HvTypography>}
        >
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
            label="Reset"
            icon={<Reset />}
            onClick={onResetHandler}
            disabled={!themeChanges || Object.keys(themeChanges).length === 0}
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
