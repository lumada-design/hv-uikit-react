import React from "react";
import { useTheme } from "nextra-theme-docs";
import { HvProvider } from "@hitachivantara/uikit-react-core";

import { Logo } from "./components/Logo";

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
  logo: <Logo />,
  docsRepositoryBase:
    "https://github.com/lumada-design/hv-uikit-react/tree/master/apps/docs",
  project: {
    link: "https://github.com/lumada-design/hv-uikit-react",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – NEXT UI",
    };
  },
  footer: {
    text: null,
    component: null,
  },
  main: ({ children }: { children: React.ReactNode }) => (
    <MainContainer>{children}</MainContainer>
  ),
  primaryHue: 212,
  primarySaturation: 70,
};
