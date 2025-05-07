import {
  ds3,
  ds5,
  HvProvider,
  pentahoPlus,
} from "@hitachivantara/uikit-react-core";

import { useDocsTheme } from "../../hooks/useDocsTheme";

export const DocsProvider = ({ children }: { children: React.ReactNode }) => {
  const { docsTheme, docsMode } = useDocsTheme();

  return (
    <HvProvider
      themes={[pentahoPlus, ds5, ds3]}
      theme={docsTheme}
      colorMode={docsMode}
      cssTheme="scoped"
    >
      {children}
    </HvProvider>
  );
};
