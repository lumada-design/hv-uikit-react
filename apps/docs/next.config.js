const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  defaultShowCopyCode: true,
});

// If you have other Next.js configurations, you can pass them as the parameter:
// module.exports = withNextra({ /* other next.js config */ })
module.exports = withNextra({
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
    "@hitachivantara/uikit-react-pentaho",
  ],
  webpack: (config) => {
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
