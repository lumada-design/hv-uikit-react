import type { MetaRecord } from "nextra";

export default {
  "-- Overview": {
    type: "separator",
    title: "Overview",
  },
  index: "Introduction",
  "get-started": "Get started",
  "project-status": "Project Status",
  "-- Community": {
    type: "separator",
    title: "Community",
  },
  contributing: "Contributing",
  guidelines: "Guidelines",
  releases: "Releases",
  "-- Foundation": {
    type: "separator",
    title: "Foundation",
  },
  "ui-kit-tokens": {
    title: "UI Kit Tokens",
    theme: { layout: "full", toc: false },
  },
  theming: "Theming",
  "color-palette": {
    title: "Color Palette",
    theme: { layout: "full", toc: false },
  },
  icons: {
    title: "Icons",
    theme: { toc: false },
  },
  "icon-library": {
    title: "Icon Library",
    theme: { layout: "full", toc: false },
  },
  "-- Guides": {
    type: "separator",
    title: "Guides",
  },
  styling: "Styling",
  layout: "Layout",
  forms: "Forms",
  accessibility: "Accessibility",
} satisfies MetaRecord;
