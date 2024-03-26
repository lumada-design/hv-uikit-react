import {
  HvTable,
  HvTableContainer,
  HvTableRow,
  HvTableHead,
  HvTableHeader,
  HvTableBody,
  HvTableCell,
  HvTableInstance,
  HvTableColumnConfig,
} from "@hitachivantara/uikit-react-core";

import { AssetEvent } from "./data";

interface ListViewProps {
  id?: string;
  columns: HvTableColumnConfig<AssetEvent, string>[];
  instance: HvTableInstance<AssetEvent, string>;
}

export const ListView = ({ id, instance, columns }: ListViewProps) => {
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

export default ListView;
