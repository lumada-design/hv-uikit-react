import { useMemo } from "react";
import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableInstance,
  HvTableRow,
} from "@hitachivantara/uikit-react-core";

import { getColumns, ListViewEntry } from "./data";

interface TableProps {
  instance: HvTableInstance<ListViewEntry, string>;
  id?: string;
}

export const Table = ({ instance, id }: TableProps) => {
  const columns = useMemo(() => getColumns(), []);

  return (
    <HvTableContainer style={{ padding: "2px" }} id={id}>
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
