import { Pre } from "@docs/components/code";
import { Logo } from "@docs/components/Logo";
import { Main } from "@docs/components/Main";
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
  feedback: {
    content: null,
  },
  editLink: {
    component: null,
  },
  color: {
    hue: 210,
  },
};

export default config;
