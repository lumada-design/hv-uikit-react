import { useLocalStorage } from "usehooks-ts";

export const useDocsTheme = () => {
  return useLocalStorage("uikit-docs-theme", "pentahoPlus");
};
