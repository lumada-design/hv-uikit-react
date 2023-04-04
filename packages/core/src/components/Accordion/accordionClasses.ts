import { getClasses } from "~/utils";

export type HvAccordionClasses = {
  /** Styles applied to the component root of the accordion. */
  root?: string;
  /** Styles applied to the content when it is hidden. */
  hidden?: string;
  /** Styles applied to the content when it is hidden. */
  container?: string;
  /** Styles applied to the label button. */
  label?: string;
  /** Styles applied to the label button when it is disabled. */
  disabled?: string;
};

const classKeys: string[] = [
  "root",
  "hidden",
  "container",
  "label",
  "disabled",
];

const accordionClasses = getClasses<HvAccordionClasses>(
  classKeys,
  "HvAccordion"
);

export default accordionClasses;
