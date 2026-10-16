/**
 * Checks run by `uikit-tools validate`. These are the POC's eight checks for
 * HvButton and HvAvatar; each now reports the id of the rule it enforces, and
 * takes allowed values from the installed metadata instead of a copied list.
 * Rule text shown to users comes from the metadata, never from here.
 */
import type { AgentsMetadata } from "../core/types.js";

export type Props = Record<string, unknown>;

export interface CheckResult {
  pass: boolean;
  /** What is wrong in this instance, e.g. `variant "danger" is not valid`. */
  detail?: string;
}

export interface Check {
  componentName: string;
  /** Design rule id (`tokens/color`) or component rule id (`HvButton/variant`). */
  ruleId: string;
  /** How serious a failure is. Not the rule's enforcement (checked/context). */
  severity: "error" | "warn" | "info";
  check: (props: Props, metadata: AgentsMetadata) => CheckResult;
}

const RAW_COLOR = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$|^(rgb|hsl)a?\(/i;

const variantValues = (m: AgentsMetadata, component: string) =>
  m.components[component]?.props.find((p) => p.name === "variant")?.values ??
  [];

const validVariant =
  (component: string): Check["check"] =>
  (props, m) => {
    const variant = props.variant;
    if (typeof variant !== "string") return { pass: true };
    const allowed = variantValues(m, component);
    if (allowed.length === 0 || allowed.includes(variant))
      return { pass: true };
    return {
      pass: false,
      detail: `variant "${variant}" is not a ${component} variant (${allowed.join(", ")})`,
    };
  };

export const CHECKS: Check[] = [
  {
    componentName: "HvButton",
    ruleId: "HvButton/variant",
    severity: "error",
    check: validVariant("HvButton"),
  },
  {
    componentName: "HvButton",
    ruleId: "tokens/color",
    severity: "error",
    check: (props) => {
      const style = props.style as Record<string, unknown> | undefined;
      const values = [props.color, style?.color].filter(
        (v): v is string => typeof v === "string",
      );
      const raw = values.find((v) => RAW_COLOR.test(v));
      return raw
        ? { pass: false, detail: `raw color "${raw}" on HvButton` }
        : { pass: true };
    },
  },
  {
    componentName: "HvButton",
    ruleId: "HvButton/selected-toggle",
    severity: "warn",
    check: (props) =>
      props.selected === true && props["aria-pressed"] === undefined
        ? { pass: false, detail: "selected is set without aria-pressed" }
        : { pass: true },
  },
  {
    componentName: "HvButton",
    ruleId: "HvButton/icon-name",
    severity: "error",
    check: (props) => {
      const emojiOnly =
        typeof props.children === "string" &&
        /^\s*\p{Extended_Pictographic}+\s*$/u.test(props.children);
      return (props.icon === true || emojiOnly) &&
        !props["aria-label"] &&
        !props.title
        ? { pass: false, detail: "icon-only HvButton has no aria-label" }
        : { pass: true };
    },
  },
  {
    componentName: "HvAvatar",
    ruleId: "HvAvatar/variant",
    severity: "error",
    check: validVariant("HvAvatar"),
  },
  {
    componentName: "HvAvatar",
    ruleId: "HvAvatar/alt",
    severity: "error",
    check: (props) =>
      (props.src || props.srcSet) && !props.alt
        ? { pass: false, detail: "HvAvatar has src but no alt" }
        : { pass: true },
  },
  {
    componentName: "HvAvatar",
    ruleId: "HvAvatar/group-background",
    severity: "warn",
    check: (props) => {
      const style = props.style as Record<string, unknown> | undefined;
      return props.backgroundColor || style?.backgroundColor
        ? { pass: false, detail: "HvAvatar sets backgroundColor" }
        : { pass: true };
    },
  },
  {
    componentName: "HvAvatar",
    ruleId: "HvAvatar/image-and-initials",
    severity: "warn",
    check: (props) =>
      props.src && typeof props.children === "string" && props.children.trim()
        ? { pass: false, detail: "HvAvatar has both src and initials" }
        : { pass: true },
  },
];

export const checksFor = (component: string) =>
  CHECKS.filter((c) => c.componentName === component);

export const checkedComponents = () => [
  ...new Set(CHECKS.map((c) => c.componentName)),
];
