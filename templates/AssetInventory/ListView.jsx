import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  HvTable,
  HvTableContainer,
  HvTableRow,
  HvTableHead,
  HvTableHeader,
  HvTableBody,
  HvTableCell,
} from "@hitachivantara/uikit-react-lab";
import { getColumns } from "./makedata";
import { idsToControl } from "./utils";

/**
 * The list view of the Asset Inventory.
 *
 * @param {instance} Object the instance returned by the `useHvData` data.
 */
const ListView = ({ instance }) => {
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
                  <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                ))}
              </HvTableRow>
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

ListView.propTypes = {
  /**
   * The instance object which contains all the data information and functions.
   */
  instance: PropTypes.object,
};

export default ListView;
