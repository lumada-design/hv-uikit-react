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
  HvIconButton,
} from "@hitachivantara/uikit-react-core";

import { Close, Edit } from "@hitachivantara/uikit-react-icons";

import { makeData, getColumns, AssetEvent } from "../storiesUtils";

const EditableCell = ({ value }) => <HvInput defaultValue={value} />;

export const UseHvRowState = () => {
  const columns = useMemo(
    () => [
      ...getColumns(),
      {
        id: "edit",
        Cell: (props) => {
          const { row, setRowState } = props;
          return (
            <HvIconButton
              title={row.state.isEditing ? "Close" : "Edit"}
              variant="secondaryGhost"
              aria-label="edit button"
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
    ],
    []
  );
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
                <HvTableHeader {...col.getHeaderProps()}>
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
                  <HvTableCell
                    {...cell.getCellProps()}
                    style={row.state?.isEditing ? { maxWidth: 70 } : undefined}
                  >
                    {row.state?.isEditing && cell.column.id !== "edit" ? (
                      <EditableCell value={cell.value} />
                    ) : (
                      cell.render("Cell")
                    )}
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
