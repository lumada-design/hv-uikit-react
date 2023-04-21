import { getClasses } from "@hitachivantara/uikit-react-core";

export type HvStepNavigationClasses = {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied to the title element. */
  titles?: string;
  /** Styles applied to the li element. */
  li?: string;
  /**  Styles applied to the ol element. */
  ol?: string;
  /** Styles applied to the separator element. */
  separator?: string;
};

const classKeys: string[] = ["root", "li", "ol", "separator", "titles"];

const stepNavigationClasses = getClasses<HvStepNavigationClasses>(
  classKeys,
  "HvStepNavigation"
);

export default stepNavigationClasses;
