import { useMemo } from "react";
import {
  HvTable,
  HvTableBody,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableCell,
  useHvData,
  useHvRowState,
  HvInput,
  HvTableColumnConfig,
  HvIconButton,
} from "@hitachivantara/uikit-react-core";

import { Close, Edit } from "@hitachivantara/uikit-react-icons";

import { makeData, AssetEvent } from "../storiesUtils";

const EditableCell = ({ value }) => <HvInput defaultValue={value} />;

const getRowStateColumns = (): HvTableColumnConfig<AssetEvent, string>[] => [
  {
    Header: "Title",
    accessor: "name",
    style: { minWidth: 140, maxWidth: 140 },
    Cell: ({ value, row }) => {
      return row.state?.isEditing ? (
        <EditableCell value={value} />
      ) : (
        (value as unknown as React.ReactElement)
      );
    },
  },
  {
    Header: "Time",
    accessor: "createdDate",
    style: { minWidth: 100 },
  },
  {
    Header: "Event Type",
    accessor: "eventType",
    style: { minWidth: 140, maxWidth: 140 },
    Cell: ({ value, row }) => {
      return row.state?.isEditing ? (
        <EditableCell value={value} />
      ) : (
        (value as unknown as React.ReactElement)
      );
    },
  },
  {
    Header: "Status",
    accessor: "status",
    style: { minWidth: 100 },
  },
  { Header: "Severity", accessor: "severity" },
  { Header: "Priority", accessor: "priority" },
  {
    id: "edit",
    Cell: (props) => {
      const { row, setRowState } = props;
      return (
        <HvIconButton
          title={row.state.isEditing ? "Close" : "Edit"}
          variant="secondaryGhost"
          onClick={() =>
            setRowState?.([row.id], (state) => ({
              ...state,
              isEditing: !state.isEditing,
            }))
          }
        >
          {row.state.isEditing ? <Close /> : <Edit />}
        </HvIconButton>
      );
    },
  },
];

export const UseHvRowState = () => {
  const columns = useMemo(() => getRowStateColumns(), []);
  const data = useMemo(() => makeData(6), []);

  const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
    useHvData<AssetEvent, string>({ columns, data }, useHvRowState);

  return (
    <HvTableContainer>
      <HvTable {...getTableProps()}>
        <HvTableHead>
          {headerGroups.map((headerGroup) => (
            <HvTableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((col) => (
                <HvTableHeader
                  {...col.getHeaderProps()}
                  aria-hidden={col.variant === "actions" ? true : undefined}
                >
                  {col.render("Header")}
                </HvTableHeader>
              ))}
            </HvTableRow>
          ))}
        </HvTableHead>
        <HvTableBody {...getTableBodyProps()}>
          {rows.map((row) => {
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
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};
