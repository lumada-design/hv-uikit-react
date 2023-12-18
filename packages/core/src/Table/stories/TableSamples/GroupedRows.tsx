import {
  HvTableContainer,
  HvTable,
  HvTableBody,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableCell,
  theme,
} from "@hitachivantara/uikit-react-core";

import { getGroupedRowsColumns, makeData } from "../storiesUtils";

export const GroupedRows = () => {
  const columns = getGroupedRowsColumns();
  const data = makeData(8);

  const style = {
    borderRight: `solid 1px ${theme.colors.atmo4}`,
  };

  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            {columns.map((el, index) => (
              <HvTableHeader key={el.Header} {...(index === 0 && { ...style })}>
                {el.Header}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {data.map((el, index) => (
            <HvTableRow key={el.id}>
              {index % 3 === 0 && (
                <HvTableCell
                  rowSpan={3}
                  style={{ verticalAlign: "top", ...style }}
                >
                  {el.name}
                </HvTableCell>
              )}
              <HvTableCell>{el.createdDate}</HvTableCell>
              <HvTableCell>{el.eventType}</HvTableCell>
              <HvTableCell>{el.status}</HvTableCell>
              <HvTableCell>{el.riskScore}</HvTableCell>
              <HvTableCell>{el.severity}</HvTableCell>
              <HvTableCell>{el.priority}</HvTableCell>
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};
