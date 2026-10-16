/**
 * Type-level tests for HvContract, checked by `npm run typecheck`. Each
 * `@ts-expect-error` must stay an error: if the contract type stops rejecting
 * these, the directive becomes unused and typecheck fails.
 */
import type { HvButtonProps } from "../Button";
import type { HvContract } from "./contract";

export const unknownVariant = {
  name: "HvButton",
  variants: {
    primary: "The main action.",
    // @ts-expect-error "danger" is not a value of HvButton's variant prop
    danger: "Not a real variant.",
  },
} as const satisfies HvContract<HvButtonProps>;

export const unknownState = {
  name: "HvButton",
  states: {
    disabled: "Not interactive.",
    // @ts-expect-error "loading" is not a prop of HvButton
    loading: "Not a real prop.",
  },
} as const satisfies HvContract<HvButtonProps>;

export const unknownPropInOnly = {
  name: "HvButton",
  // @ts-expect-error "intent" is not a prop of HvButton
  props: { only: ["variant", "intent"] },
} as const satisfies HvContract<HvButtonProps>;
