import { getClasses } from "~/utils";

export type HvListClasses = {
  /** Styles applied to the component root class. */
  root?: string;
  /** Styles applied to the component root class in virtualized form. */
  virtualizedRoot?: string;
  /** Styles applied to the list item selector. */
  selectorRoot?: string;
  /** Styles applied to the list item selector label container. */
  selectorContainer?: string;
  /** Style applied to the icon box. */
  box?: string;
  /** Styles applied when the list item text when truncate. */
  truncate?: string;
  /** Styles applied to the list item. */
  item?: string;
  /** Styles applied to the list item when it has a selector. */
  itemSelector?: string;
  /** Styles applied to the list item when it has a link path. */
  link?: string;
  /** Styles applied to the select all selector. */
  selectAllSelector?: string;
};

const classKeys: string[] = [
  "root",
  "virtualizedRoot",
  "selectorRoot",
  "selectorContainer",
  "box",
  "truncate",
  "item",
  "itemSelector",
  "link",
  "selectAllSelector",
];

const listClasses = getClasses<HvListClasses>(classKeys, "HvList");

export default listClasses;
