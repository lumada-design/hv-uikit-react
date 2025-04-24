import { useCallback } from "react";
import { HvOption, HvSelect } from "@hitachivantara/uikit-react-core";

import { useDocsThemeContext } from "../../contexts/DocsThemeContext";

const themesModes = [
  "pentahoPlus-dawn",
  "pentahoPlus-wicked",
  "ds5-dawn",
  "ds5-wicked",
  "ds3-dawn",
  "ds3-wicked",
];

export const ThemeSwitcher = () => {
  const { docsTheme, setDocsTheme } = useDocsThemeContext();

  const handleThemeChange = useCallback(
    (value: any) => {
      const theme = value.split("-")[0];
      const mode = value.split("-")[1];

      if (!theme || !mode) return;

      setDocsTheme?.({ theme, mode });
    },
    [setDocsTheme],
  );

  console.log(docsTheme);

  return (
    <HvSelect
      onChange={(e, value) => handleThemeChange(value)}
      value={`${docsTheme.theme}-${docsTheme.mode}`}
      className="w-180px"
    >
      {themesModes.map((t) => {
        console.log(t, t === `${docsTheme.theme}-${docsTheme.mode}`);
        return (
          <HvOption value={t} key={t} label={t}>
            {t}
          </HvOption>
        );
      })}
    </HvSelect>
  );
};
