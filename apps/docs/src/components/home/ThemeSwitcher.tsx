import { useCallback } from "react";
import { useRouter } from "next/router";
import { HvSelect } from "@hitachivantara/uikit-react-core";

import { useDocsTheme } from "../../hooks/useDocsTheme";

const themes = [
  { value: "pentahoPlus", label: "Pentaho+" },
  { value: "ds5", label: "NEXT v5" },
  { value: "ds3", label: "NEXT v3" },
];

const allowedPaths = ["/components", "/charts", "/examples"];

export const ThemeSwitcher = () => {
  const router = useRouter();
  const { docsTheme, setDocsTheme } = useDocsTheme();

  const handleThemeChange = useCallback(
    (value: any) => {
      setDocsTheme(value);
    },
    [setDocsTheme],
  );

  if (!allowedPaths.some((path) => router.pathname.startsWith(path))) {
    return null;
  }

  return (
    <HvSelect
      onChange={(e, value) => handleThemeChange(value)}
      value={themes.find((t) => t.value === docsTheme)?.value}
      className="w-120px"
      title="Change the theme on the samples"
      options={themes}
      variant="secondaryGhost"
    />
  );
};
