import useIsMounted from "@docs/hooks/useIsMounted";
import { useTheme } from "nextra-theme-docs";
// @ts-ignore
import { themes } from "prism-react-renderer";

const useEditorTheme = () => {
  const isMounted = useIsMounted();
  const { resolvedTheme } = useTheme();

  return isMounted
    ? resolvedTheme === "dark"
      ? themes.oneDark
      : themes.oneDark
    : themes.oneDark;
};

export default useEditorTheme;
