import { HvProvider } from "@hitachivantara/uikit-react-core";
import { useTheme } from "nextra-theme-docs";

import Logo from "./components/Logo";
import Pre from "./components/Pre";

const MainContainer = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();

  return (
    <HvProvider
      classNameKey="hv-docs"
      colorMode={resolvedTheme === "dark" ? "wicked" : "dawn"}
    >
      {children}
    </HvProvider>
  );
};

// More configs here: https://nextra.site/docs/docs-theme/theme-configuration
export default {
  project: {
    link: "https://github.com/lumada-design/hv-uikit-react",
  },
  docsRepositoryBase:
    "https://github.com/lumada-design/hv-uikit-react/tree/master/apps/docs",
  logo: <Logo />,
  footer: {
    text: null,
    component: null,
  },
  components: {
    pre: Pre,
  },
  main: ({ children }) => <MainContainer>{children}</MainContainer>,
  useNextSeoProps() {
    return {
      titleTemplate: "%s – NEXT UI",
    };
  },
};
