import type { HvContract } from "../types/contract";
import type { HvCardProps } from "./Card";

export const contract = {
  name: "HvCard",
  parts: [
    "HvCardHeader",
    "HvCardContent",
    "HvCardMedia",
    "HvActionBar",
    "HvStatusIcon",
  ],
  rules: ["components/prefer", "tokens/color", "status/semantic-color"],
  states: {
    bgcolor:
      'Use bgcolor="bgContainer" unless the design asks for another theme background.',
    selected:
      "Adds a top bar in the text color; marks the chosen card in a selectable set.",
    statusColor:
      "Colors the top bar and wins over the selected bar; use a semantic color.",
    icon: "Conveys the card status; pass an HvStatusIcon.",
  },
  tokens: {
    color: "bgcolor and statusColor take theme color tokens only.",
  },
  antiPatterns: [
    {
      id: "header",
      dont: "Put the title as plain text or a heading directly in HvCard.",
      why: "The title layout and spacing are skipped.",
      instead: "Use HvCardHeader with the title prop.",
    },
    {
      id: "content",
      dont: "Place body content directly in HvCard.",
      why: "Content spacing is not applied.",
      instead: "Wrap body content in HvCardContent.",
    },
    {
      id: "actions",
      dont: "Place action buttons outside HvActionBar.",
      why: "The action layout breaks.",
      instead:
        "Put every card action inside HvActionBar, with at most one primary button.",
    },
    {
      id: "status-icon",
      dont: "Pass an icon other than HvStatusIcon to the icon prop.",
      why: "The card icon conveys status and must stay consistent.",
      instead: "Use HvStatusIcon with a status in the icon prop.",
    },
  ],
  a11y: {
    role: "none (renders a plain div)",
    requirements: [
      "The HvCardHeader title is the card's visible name; keep it short and specific.",
      "The status shown by the icon must also be readable as text in the content.",
      "The selected bar is visual only; expose selection through the set's selection control.",
    ],
  },
} as const satisfies HvContract<HvCardProps>;
