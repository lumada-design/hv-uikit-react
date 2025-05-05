import { useCallback } from "react";
import {
  HvOption,
  HvSelect,
  HvTooltip,
} from "@hitachivantara/uikit-react-core";
import { Info } from "@hitachivantara/uikit-react-icons";

import { useDocsThemeContext } from "../../contexts/DocsThemeContext";

const themes = ["pentahoPlus", "ds5", "ds3"];

export const ThemeSwitcher = () => {
  const { docsTheme, setDocsTheme } = useDocsThemeContext();

  const handleThemeChange = useCallback(
    (value: any) => {
      localStorage.setItem("uikit-docs-theme", value);
      setDocsTheme?.(value);
    },
    [setDocsTheme],
  );

  return (
    <div className="flex items-center gap-0">
      <HvSelect
        onChange={(e, value) => handleThemeChange(value)}
        value={docsTheme}
        className="w-140px"
      >
        {themes.map((t) => {
          return (
            <HvOption value={t} key={t} label={t}>
              {t}
            </HvOption>
          );
        })}
      </HvSelect>
      <HvTooltip title="Change the theme on the samples">
        <Info />
      </HvTooltip>
    </div>
  );
};
