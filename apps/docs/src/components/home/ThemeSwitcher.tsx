import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import {
  HvOption,
  HvSelect,
  HvTooltip,
} from "@hitachivantara/uikit-react-core";
import { Info } from "@hitachivantara/uikit-react-icons";

import { useDocsTheme } from "../../hooks/useDocsTheme";

const themes = ["pentahoPlus", "ds5", "ds3"];

const allowedPaths = ["/components", "/charts", "/examples"];

export const ThemeSwitcher = () => {
  const router = useRouter();
  const { docsTheme, setDocsTheme } = useDocsTheme();

  const handleThemeChange = useCallback((value: any) => {
    setDocsTheme(value);
  }, []);

  if (!allowedPaths.some((path) => router.pathname.startsWith(path))) {
    return null;
  }

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
