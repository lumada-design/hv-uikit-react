import { useState, useMemo } from "react";
import range from "lodash/range";
import {
  HvTableContainer,
  HvTable,
  HvTableBody,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableCell,
  HvTableSection,
  HvTypography,
  HvActionsGeneric,
  useHvPagination,
  useHvRowSelection,
  useHvBulkActions,
  useHvData,
} from "@hitachivantara/uikit-react-core";

import { AssetEvent, EmptyRow, getColumns, makeData } from "../storiesUtils";

export const PropsTableSection = () => {
  const columns = useMemo(() => getColumns(), []);
  const [data] = useState(makeData(4));

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    state: { pageSize },
  } = useHvData<AssetEvent, string>(
    { columns, data, initialState: { pageSize: 3 } },
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  const actions = useMemo(
    () => (
      <HvActionsGeneric
        actions={[
          { id: "action1", label: "Action 1" },
          {
            id: "action2",
            label: "Action 2",
          },
          {
            id: "action3",
            label: "Action 3",
          },
        ]}
        actionsCallback={(_, __, action) => {
          console.log(action.label);
        }}
        maxVisibleActions={1}
      />
    ),
    []
  );

  const renderTableRow = (i: number) => {
    const row = page[i];

    if (!row) return <EmptyRow key={i} />;

    prepareRow(row);

    return (
      <HvTableRow {...row.getRowProps()}>
        {row.cells.map((cell) => (
          <HvTableCell {...cell.getCellProps()}>
            {cell.render("Cell")}
          </HvTableCell>
        ))}
      </HvTableRow>
    );
  };

  return (
    <HvTableSection
      raisedHeader
      title={<HvTypography variant="title3">Sample Table</HvTypography>}
      actions={actions}
      expandable
      defaultExpanded={false}
    >
      <HvTableContainer tabIndex={0}>
        <HvTable {...getTableProps()}>
          <HvTableHead>
            {headerGroups.map((headerGroup) => (
              <HvTableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((col) => (
                  <HvTableHeader {...col.getHeaderProps()}>
                    {col.render("Header")}
                  </HvTableHeader>
                ))}
              </HvTableRow>
            ))}
          </HvTableHead>
          <HvTableBody {...getTableBodyProps()}>
            {pageSize && range(pageSize).map(renderTableRow)}
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
    </HvTableSection>
  );
};
