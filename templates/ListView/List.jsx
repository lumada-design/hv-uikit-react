import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {
  HvLoading,
  HvTableContainer,
  HvTable,
  HvTableHead,
  HvTableRow,
  HvTableCell,
  HvTableHeader,
  HvTableBody,
} from "@hitachivantara/uikit-react-core";

import { getColumns } from "./data";

/**
 * The requests table.
 *
 * @param {instance} Object the instance returned by the `useHvData` data.
 * @param {isLoading} boolean indicates whether or not the data is loading.
 */
const List = ({ instance, isLoading }) => {
  const columns = useMemo(() => getColumns(), []);

  return (
    <HvTableContainer style={{ padding: "2px" }}>
      <HvTable variant="listrow" {...instance.getTableProps()}>
        <HvTableHead>
          <HvTableRow>
            <HvTableCell variant="listcheckbox" />
            {columns.map((col) => (
              <HvTableHeader key={col.Header}>{col.Header}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        {isLoading ? (
          <tbody>
            <tr>
              <td colSpan={7}>
                <div style={{ marginTop: 40, marginBottom: 40 }}>
                  <HvLoading label="Loading data..." />
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
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
        )}
      </HvTable>
    </HvTableContainer>
  );
};

List.propTypes = {
  /**
   * The instance object which contains all the data information and functions.
   */
  instance: PropTypes.object,
  /**
   * Indicates whether or not the data is loading.
   */
  isLoading: PropTypes.bool,
};

export default List;
