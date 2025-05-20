import nextra from "nextra";
import rehypeMdxCodeProps from "rehype-mdx-code-props";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
  search: {
    codeblocks: false,
  },
  mdxOptions: {
    rehypePlugins: [rehypeMdxCodeProps],
    rehypePrettyCodeOptions: {
      theme: {
        light: "one-dark-pro",
        dark: "one-dark-pro",
      },
    },
  },
});

export default withNextra({
  output: "export",
  distDir: process.env.NODE_ENV === "development" ? ".next" : "dist",
  images: { unoptimized: true },
  basePath: process.env.NEXTRA_BASE_PATH || "",
  transpilePackages: ["@hitachivantara/uikit-react-viz"],
  webpack: (config) => {
    config.cache = false; // Disable cache for debugging

    // String replacement for Vite's import.meta.env.DEV
    config.module.rules.push({
      test: /\.(tsx|ts)$/,
      use: [
        {
          loader: "string-replace-loader",
          options: {
            search: "import.meta.env.DEV",
            replace: "process.env.NODE_ENV !== 'production'",
            flags: "g",
          },
        },
      ],
    });

    // Add raw file loader
    config.module.rules.push({
      test: /\.(tsx|ts|mdx)$/,
      resourceQuery: /raw/,
      use: "raw-loader",
    });

    // Fix for fs module not found
    if (!config.resolve.fallback) config.resolve.fallback = {};
    config.resolve.fallback.fs = false;

    return config;
  },
});
