/**
 * Schema for colocated `<Component>.contract.ts` files.
 *
 * A contract says how a component is meant to be used: what each variant means,
 * what state props imply, which anti-patterns to avoid. It is typed against the
 * component's props, so naming a variant or prop that does not exist is a
 * compile error. Props themselves are extracted by docgen — do not restate them.
 *
 * Contract files are build-time only: not exported from `index.ts`, not imported
 * by component code, and they must use type-only imports. See
 * `docs/adr/0001-design-rules-and-metadata.md`.
 */

type StringKeys<P> = Extract<keyof P, string>;

/** The string values of a component's `variant` prop, if it has one. */
export type HvVariantOf<P> = P extends { variant?: infer V }
  ? Extract<NonNullable<V>, string>
  : never;

/** A component-level rule. Its full id is `<ComponentName>/<id>`. */
export interface HvContractAntiPattern {
  /** Short kebab-case id, unique within the component, e.g. `"variant"`. */
  id: string;
  /** What not to do. */
  dont: string;
  /** Why it is wrong. */
  why: string;
  /** What to do instead. */
  instead: string;
}

export interface HvContractA11y {
  role?: string;
  requirements: readonly string[];
}

export type HvTokenCategory =
  | "color"
  | "space"
  | "size"
  | "radius"
  | "typography";

export interface HvContract<P> {
  /** Exported component name, e.g. `"HvButton"`. */
  name: `Hv${string}`;
  /** Overrides the docgen description when it does not say what the component is for. */
  purpose?: string;
  /** Exported sub-components meant to be composed with this one. */
  parts?: readonly `Hv${string}`[];
  /** Design rule ids that apply to this component, e.g. `"tokens/color"`. */
  rules?: readonly string[];
  /** What each variant means. Keys must be real values of the `variant` prop. */
  variants?: Partial<Record<HvVariantOf<P>, string>>;
  /** What a state or behaviour prop implies. Keys must be real props. */
  states?: Partial<Record<StringKeys<P>, string>>;
  /** Which tokens apply, per category. */
  tokens?: Partial<Record<HvTokenCategory, string>>;
  antiPatterns?: readonly HvContractAntiPattern[];
  a11y?: HvContractA11y;
  /**
   * Narrows the advertised props when extraction over-reports, e.g. a component
   * whose props extend a large upstream type.
   */
  props?: { only?: readonly StringKeys<P>[]; hide?: readonly StringKeys<P>[] };
}
