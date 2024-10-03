import { Pre } from "@docs/components/code";
import { Logo, Main } from "@docs/components/common";
import { ThemeSwitch, type DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  project: {
    link: "https://github.com/lumada-design/hv-uikit-react",
  },
  docsRepositoryBase:
    "https://github.com/lumada-design/hv-uikit-react/tree/master/apps/docs",
  head: () => {
    return <title>UI Kit</title>;
  },
  logo: () => {
    return <Logo />;
  },
  main: ({ children }) => {
    return <Main>{children}</Main>;
  },
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
