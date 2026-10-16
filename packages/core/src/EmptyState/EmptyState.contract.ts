import type { HvContract } from "../types/contract";
import type { HvEmptyStateProps } from "./EmptyState";

export const contract = {
  name: "HvEmptyState",
  purpose:
    "Explains why a view has no content (no data, no results, an error) and what the user can do next.",
  rules: ["data/states"],
  states: {
    title: 'What is empty, in a few words, e.g. "No datasets yet".',
    message: "Why it is empty or what failed, in one sentence.",
    action: "The next step the user can take, e.g. a create or retry button.",
    icon: "Required. An icon from @pentaho/uikit-react-icons matching the reason, e.g. <Info /> for no data.",
  },
  antiPatterns: [
    {
      id: "blank",
      dont: "Leave a table or list blank when there is no data.",
      why: "Users cannot tell an empty result from a broken page.",
      instead:
        "Render HvEmptyState with a title and message in place of the data view.",
    },
    {
      id: "no-way-forward",
      dont: "Show an empty or error state with no action when the user can fix it.",
      why: "The user is left stuck.",
      instead: "Pass an HvButton in action, e.g. Create or Try again.",
    },
    {
      id: "error-as-empty",
      dont: 'Show "No results" when the request failed.',
      why: "It hides the failure and suggests the data does not exist.",
      instead: "Say what failed in message and offer a retry.",
    },
  ],
  a11y: {
    requirements: [
      "The title is announced as text; keep it specific.",
      "When it replaces content after a user action, announce the change (e.g. aria-live on the region).",
    ],
  },
} as const satisfies HvContract<HvEmptyStateProps>;
