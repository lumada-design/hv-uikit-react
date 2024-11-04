import { Pre } from "@docs/components/code/Pre";
import { Footer } from "@docs/components/Footer";
import { UIKitLogo } from "@docs/components/logo/uikit";
import { Main } from "@docs/components/Main";
import { ThemeSwitch, type DocsThemeConfig } from "nextra-theme-docs";

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
    extraContent: <ThemeSwitch lite />,
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
