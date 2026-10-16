import type { HvContract } from "../types/contract";
import type { HvGlobalActionsProps } from "./GlobalActions";

export const contract = {
  name: "HvGlobalActions",
  purpose:
    "The page header bar: the page title and the actions that affect the whole page.",
  rules: ["layout/page", "tokens/space"],
  variants: {
    global: "Default. The page header: renders an h1 and sticks to the top.",
    section: "Heads a section within a page; renders an h2 and does not stick.",
  },
  states: {
    title: "The page or section title.",
    backButton: "A custom back button, or false to hide it on top-level pages.",
    position:
      "sticky by default for global; fixed or relative only when the layout needs it.",
    headingLevel:
      "Overrides the heading level when the page structure needs it.",
  },
  tokens: {
    space: "Inherits the page inset; never remove its padding through classes.",
  },
  antiPatterns: [
    {
      id: "outside-page",
      dont: "Place HvGlobalActions outside the padded page container.",
      why: "The bar no longer lines up with the content; see layout/page.",
      instead:
        "Make it the first child of the page stack (flex flex-col gap-md p-md).",
    },
    {
      id: "one-global",
      dont: 'Use more than one variant="global" per page.',
      why: "There is one page title and one sticky header.",
      instead: 'Use variant="section" for section headers.',
    },
    {
      id: "actions",
      dont: "Put page actions somewhere else in the page.",
      why: "Users look for page-level actions in the header bar.",
      instead:
        "Pass page actions as children of HvGlobalActions, with one primary.",
    },
  ],
  a11y: {
    requirements: [
      "global renders the page h1; keep one h1 per page.",
      "The back button needs an accessible name when customized.",
    ],
  },
} as const satisfies HvContract<HvGlobalActionsProps>;
