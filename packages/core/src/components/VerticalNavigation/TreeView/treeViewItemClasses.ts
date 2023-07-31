import { getClasses } from "@core/utils/classes";

export interface HvVerticalNavigationTreeViewItemClasses {
  /** Style applied to the root of the component. */
  node?: string;
  /** Style applied to the content. */
  content?: string;
  /** Style applied to the content when it is a link. */
  link?: string;
  /** Style applied to the group. */
  group?: string;
  /** Style applied when item is disabled. */
  disabled?: string;
  /** Style applied when item is expandable. */
  expandable?: string;
  /** Style applied when item is collapsed. */
  collapsed?: string;
  /** Style applied when item is expanded */
  expanded?: string;
  /** Style applied when item is selectable. */
  selectable?: string;
  /** Style applied when item is unselectable. */
  unselectable?: string;
  /** Style applied when item is selectable. */
  selected?: string;
  /** Style applied when item is unselectable. */
  unselected?: string;
  /** Style applied when item is focused. */
  focused?: string;
  /** Styled applied when navigation open is false */
  minimized?: string;
  hide?: string;
}

const classKeys: (keyof HvVerticalNavigationTreeViewItemClasses)[] = [
  "node",
  "content",
  "link",
  "group",
  "disabled",
  "expandable",
  "collapsed",
  "selectable",
  "unselectable",
  "selected",
  "unselected",
  "focused",
  "minimized",
  "hide",
];

const treeViewItemClasses = getClasses(
  classKeys,
  "HvVerticalNavigationTreeViewItem"
);

export default treeViewItemClasses;
