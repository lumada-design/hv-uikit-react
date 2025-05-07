import { ThemeSwitch, type DocsThemeConfig } from "nextra-theme-docs";

import { Pre } from "./src/components/code/Pre";
import { Footer } from "./src/components/Footer";
import { ThemeSwitcher } from "./src/components/home/ThemeSwitcher";
import { UIKitLogo } from "./src/components/logo/uikit";
import { Main } from "./src/components/Main";

const config: DocsThemeConfig = {
  project: {
    link: "https://github.com/lumada-design/hv-uikit-react",
  },
  docsRepositoryBase:
    "https://github.com/lumada-design/hv-uikit-react/tree/master/apps/docs",
  head: () => <title>UI Kit</title>,
  logo: UIKitLogo,
  main: Main,
  components: {
    pre: Pre,
  },
  navbar: {
    extraContent: (
      <>
        <ThemeSwitch lite />
        <ThemeSwitcher />
      </>
    ),
  },
  search: {
    placeholder: "Search...",
  },
  footer: {
    component: Footer,
  },
  sidebar: {
    toggleButton: false,
  },
  feedback: {
    content: null,
  },
  editLink: {
    component: null,
  },
  color: {
    hue: 210,
  },
  toc: {
    title: "Table of Contents",
  },
  gitTimestamp: () => null,
};

export default config;
