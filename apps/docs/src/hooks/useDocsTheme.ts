import { useTheme } from "nextra-theme-docs";
import { useLocalStorage } from "usehooks-ts";

export const useDocsTheme = () => {
  const { resolvedTheme } = useTheme();
  const [docsTheme, setDocsTheme] = useLocalStorage<string>(
    "uikit-docs-theme",
    "pentahoPlus",
  );
  const docsMode = resolvedTheme === "dark" ? "wicked" : "dawn";
  return { docsTheme, docsMode, setDocsTheme };
};
