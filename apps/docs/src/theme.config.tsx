import { Logo, Main, Pre } from "@docs/components";
import { ThemeSwitch, type DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  project: {
    link: "https://github.com/lumada-design/hv-uikit-react",
  },
  docsRepositoryBase:
    "https://github.com/lumada-design/hv-uikit-react/tree/master/apps/docs",
  head: () => <title>UI Kit</title>,
  logo: Logo,
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
    component: null,
  },
  sidebar: {
    toggleButton: false,
  },
  color: {
    hue: 215,
  },
  feedback: {
    content: null,
  },
  editLink: {
    component: null,
  },
  gitTimestamp: () => null,
};

export default config;
