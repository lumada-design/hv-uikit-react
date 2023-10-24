import { useMemo } from "react";
import {
  HvTable,
  HvTableContainer,
  HvTableRow,
  HvTableHead,
  HvTableHeader,
  HvTableBody,
  HvTableCell,
  HvTableInstance,
} from "@hitachivantara/uikit-react-core";

import { getColumns, idsToControl } from "lib/utils/assetInventory";

interface ListViewProps {
  instance: HvTableInstance<AssetInventoryModel, string>;
}

/**
 * The list view of the Asset Inventory.
 *
 * @param {Object} instance - the instance returned by the `useHvData` data.
 */
export const ListView = ({ instance }: ListViewProps) => {
  const columns = useMemo(() => getColumns(), []);

  return (
    <HvTableContainer style={{ padding: "2px" }} id={idsToControl.list}>
      <HvTable variant="listrow" {...instance.getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            <HvTableCell variant="listcheckbox" />
            {columns.map((col) => (
              <HvTableHeader key={col.Header}>{col.Header}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody withNavigation {...instance.getTableBodyProps()}>
          {instance.page.map((row) => {
            instance.prepareRow(row);
            return (
              <HvTableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <HvTableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export default ListView;
