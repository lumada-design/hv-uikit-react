import type { HvContract } from "../types/contract";
import type { HvTagProps } from "./Tag";

export const contract = {
  name: "HvTag",
  parts: ["HvTagsInput"],
  rules: ["components/prefer", "status/semantic-color", "tokens/color"],
  variants: {
    filled: "Deprecated.",
    outlined: "Deprecated.",
  },
  states: {
    type: "semantic for status (positive, warning, negative); categorical for grouping with category colors.",
    color:
      "A semantic color for semantic tags, a category color (cat1…) for categorical ones.",
    onDelete: "Renders the delete icon; required for removable tags.",
    selectable: "Turns the tag into a toggle; controlled with selected.",
    label: "The tag text; always set it, color alone is not a label.",
  },
  tokens: { color: "Semantic or category color tokens only." },
  antiPatterns: [
    {
      id: "look-alike",
      dont: "Build tags or status pills from styled spans or divs.",
      why: "They miss the tag's sizing, colors and focus behaviour; see components/prefer.",
      instead: "Use HvTag with label.",
    },
    {
      id: "type-color",
      dont: "Use categorical colors for status, or semantic colors for categories.",
      why: "It breaks the color meaning users learn; see status/semantic-color.",
      instead:
        'type="semantic" with positive/warning/negative for status; type="categorical" with catN for groups.',
    },
    {
      id: "deprecated-variant",
      dont: "Set variant.",
      why: "variant is deprecated.",
      instead: "Use type and color.",
    },
  ],
  a11y: {
    requirements: [
      "The label is the accessible name; keep it meaningful without the color.",
      "Removable tags expose the delete button to keyboard users.",
    ],
  },
} as const satisfies HvContract<HvTagProps>;
