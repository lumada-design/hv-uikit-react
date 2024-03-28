import { useMemo } from "react";
import {
  HvCheckBox,
  HvDropDownMenu,
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableColumnConfig,
  HvTableContainer,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import {
  AssetEvent,
  getColumns,
  makeData,
  useToggleIndex,
} from "../storiesUtils";

export const SimpleTable = () => {
  const [checkedIdx, toggleChecked] = useToggleIndex(0);

  const columns = useMemo<HvTableColumnConfig<AssetEvent, string>[]>(() => {
    return [...getColumns(), { Header: "Details", accessor: "link" }];
  }, []);

  const data = useMemo(
    () =>
      makeData(6).map((row) => ({
        ...row,
        link: "/details",
      })),
    [],
  );

  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            <HvTableCell variant="checkbox" />
            {columns.map((el) => (
              <HvTableHeader key={el.Header}>{el.Header}</HvTableHeader>
            ))}
            <HvTableCell variant="actions" />
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {data.map((el, idx) => (
            <HvTableRow key={el.id} hover selected={checkedIdx === idx}>
              <HvTableCell variant="checkbox">
                <HvCheckBox
                  aria-label="Tick to select the row"
                  checked={checkedIdx === idx}
                  onClick={toggleChecked(idx)}
                />
              </HvTableCell>
              <HvTableCell>{el.name}</HvTableCell>
              <HvTableCell>{el.createdDate}</HvTableCell>
              <HvTableCell>{el.eventType}</HvTableCell>
              <HvTableCell>{el.status}</HvTableCell>
              <HvTableCell align="center">{el.riskScore}</HvTableCell>
              <HvTableCell>{el.severity}</HvTableCell>
              <HvTableCell>{el.priority}</HvTableCell>
              <HvTableCell>
                <HvTypography link component="a" onClick={() => alert(el.link)}>
                  Details Page
                </HvTypography>
              </HvTableCell>
              <HvTableCell variant="actions">
                <HvDropDownMenu
                  keepOpened={false}
                  placement="left"
                  onClick={(e, item) => alert(item.id)}
                  dataList={[
                    { id: "share", label: "Share" },
                    { id: "hide", label: "Hide" },
                    { id: "remove", label: "Remove" },
                  ]}
                />
              </HvTableCell>
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};
