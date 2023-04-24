import { getClasses } from "@hitachivantara/uikit-react-core";

export type HvWizardContentClasses = {
  /** Style applied to the Wizard content container. */
  contentContainer?: string;
  /** Style applied to the Wizard to fix its height. */
  fixedHeight?: string;
  /** Style applied to the summary container around the page content container. */
  summaryRef?: string;
  /** Style applied to the Summary container to stick it to the top. */
  summarySticky?: string;
  /** Style applied to the Summary container to position it on the right. */
  summaryContainer?: string;
};

const classKeys: string[] = [
  "contentContainer",
  "fixedHeight",
  "summaryRef",
  "summarySticky",
  "summaryContainer",
];

const wizardContentClasses = getClasses<HvWizardContentClasses>(
  classKeys,
  "HvWizardContent"
);

export default wizardContentClasses;
