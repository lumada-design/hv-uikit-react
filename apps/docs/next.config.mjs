import UnoCSS from "@unocss/webpack";
import nextra from "nextra";
import rehypeMdxCodeProps from "rehype-mdx-code-props";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./src/theme.config.tsx",
  defaultShowCopyCode: true,
  mdxOptions: {
    rehypePlugins: [rehypeMdxCodeProps],
  },
});

export default withNextra({
  output: "export",
  distDir: "dist",
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
    "@hitachivantara/uikit-react-pentaho",
  ],
  webpack: (config, { isServer }) => {
    config.cache = false; // https://github.com/unocss/unocss/pull/1198
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

    return config;
  },
});
