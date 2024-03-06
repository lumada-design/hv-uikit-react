import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { css } from "@emotion/css";
import { useDebounceCallback } from "usehooks-ts";
import JSON5 from "json5";
import { HvIconButton, useTheme } from "@hitachivantara/uikit-react-core";
import { Download, Reset, Duplicate } from "@hitachivantara/uikit-react-icons";
import { HvCodeEditor } from "@hitachivantara/uikit-react-code-editor";

import { useGeneratorContext } from "~/generator/GeneratorContext";
import { getThemeCode } from "~/generator/utils";

const codeEditorStyles = css({
  ".margin, .margin-view-overlays": {
    paddingLeft: "4px!important",
  },
  ".visible.scrollbar.horizontal": {
    height: "10px!important",
    "& .slider": {
      top: "2px!important",
    },
  },
  ".suggest-widget": {
    display: "none!important",
  },
});

const CodeEditor = ({
  themeName,
  setCopied,
}: {
  themeName: string;
  setCopied: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
  const { selectedTheme, selectedMode, changeTheme } = useTheme();

  const { customTheme, updateCustomTheme, themeChanges } =
    useGeneratorContext();

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
    updateCustomTheme({}, { isReset: true, updateThemeChanges: false });
    changeTheme("ds5", "dawn");
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

  const debouncedHandler = useDebounceCallback(codeChangedHandler, 1000);

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-xs py-1 border border-b-0 border-atmo4">
        <HvIconButton
          title="Download"
          component="a"
          download={fileName}
          href={`data:text/plain;charset=utf-8,${encodedCode}`}
        >
          <Download />
        </HvIconButton>
        <div className="flex">
          <HvIconButton
            title="Reset"
            onClick={onResetHandler}
            disabled={!themeChanges || Object.keys(themeChanges).length === 0}
          >
            <Reset />
          </HvIconButton>
          <HvIconButton title="Copy to Clipboard" onClick={onCopyHandler}>
            <Duplicate />
          </HvIconButton>
        </div>
      </div>
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
        className={codeEditorStyles}
        onChange={debouncedHandler}
      />
    </div>
  );
};

export default CodeEditor;
