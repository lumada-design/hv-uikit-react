// More configs here: https://nextra.site/docs/docs-theme/theme-configuration
export default {
  logo: <span>NEXT UI Kit</span>, // TODO - Use svg icon to change the "fill" property with "currentColor"
  docsRepositoryBase:
    "https://github.com/lumada-design/hv-uikit-react/tree/master/apps/docs",
  project: {
    link: "https://github.com/lumada-design/hv-uikit-react",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – NEXT UI Kit",
    };
  },
  footer: {
    text: (
      <span>© Hitachi Vantara Corporation {new Date().getFullYear()}.</span>
    ),
  },
  sidebar: { toggleButton: true },
};
