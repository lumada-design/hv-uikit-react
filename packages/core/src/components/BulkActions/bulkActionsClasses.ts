import { getClasses } from "@core/utils";

export interface HvBulkActionsClasses {
  root?: string;
  semantic?: string;
  actions?: string;
  selectAllContainer?: string;
  selectAll?: string;
  selectAllPages?: string;
}

const classKeys: string[] = [
  "root",
  "semantic",
  "actions",
  "selectAllContainer",
  "selectAll",
  "selectAllPages",
];

const bulkActionsClasses = getClasses<HvBulkActionsClasses>(
  classKeys,
  "HvBulkActions"
);

export default bulkActionsClasses;
