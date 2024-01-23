import nextra from "nextra";
import UnoCSS from "@unocss/webpack";
import rehypeMdxCodeProps from "rehype-mdx-code-props";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
  mdxOptions: {
    rehypePlugins: [rehypeMdxCodeProps],
  },
});

export default withNextra({
  output: "export",
  images: { unoptimized: true },
  basePath: process.env.NEXTRA_BASE_PATH || "",
  transpilePackages: [
    "@hitachivantara/uikit-react-core",
    "@hitachivantara/uikit-react-code-editor",
    "@hitachivantara/uikit-react-icons",
    "@hitachivantara/uikit-react-lab",
    "@hitachivantara/uikit-react-shared",
    "@hitachivantara/uikit-styles",
    "@hitachivantara/uikit-react-viz",
  ],
  webpack: (config) => {
    config.cache = false;
    config.plugins.push(UnoCSS());

    config.module.rules.push({
      test: /\.(tsx|ts)$/,
      use: [
        {
          // Replace vite's import.meta.env.DEV for something compatible with NextJS
          // https://nextjs.org/docs/app/building-your-application/upgrading/from-vite#step-7-migrate-the-environment-variables
          loader: "string-replace-loader",
          options: {
            search: "import.meta.env.DEV",
            replace: "process.env.NODE_ENV !== 'production'",
            flags: "g",
          },
        },
      ],
    });
    if (!config.resolve.fallback) config.resolve.fallback = {};

    config.resolve.fallback.fs = false;

    config.resolve.aliasFields = ["browser"];

    return config;
  },
});
