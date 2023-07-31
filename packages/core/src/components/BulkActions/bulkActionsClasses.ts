import { getClasses } from "@core/utils/classes";

export interface HvBulkActionsClasses {
  root?: string;
  semantic?: string;
  actions?: string;
  selectAllContainer?: string;
  selectAll?: string;
  selectAllPages?: string;
}

const classKeys: (keyof HvBulkActionsClasses)[] = [
  "root",
  "semantic",
  "actions",
  "selectAllContainer",
  "selectAll",
  "selectAllPages",
];

const bulkActionsClasses = getClasses(classKeys, "HvBulkActions");

export default bulkActionsClasses;
