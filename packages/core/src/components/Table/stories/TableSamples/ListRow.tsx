import { useMemo } from "react";
import {
  HvTableContainer,
  HvTable,
  HvTableBody,
  HvTableColumnConfig,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableCell,
  HvCheckBox,
  HvDropDownMenu,
  HvButton,
} from "@hitachivantara/uikit-react-core";

import {
  AssetEvent,
  getColumns,
  makeData,
  useToggleIndex,
} from "../storiesUtils";

export const ListRow = () => {
  const [checkedIdx, toggleChecked] = useToggleIndex(0);

  const columns = useMemo<HvTableColumnConfig<AssetEvent, string>[]>(() => {
    return [...getColumns(), { Header: "Details", accessor: "link" }];
  }, []);

  const data = useMemo<AssetEvent[]>(
    () => makeData(4).map((row) => ({ ...row, link: "/details" })),
    []
  );

  if (!data) return null;

  return (
    <HvTableContainer style={{ padding: 2 }}>
      <HvTable variant="listrow">
        <HvTableHead>
          <HvTableRow>
            <HvTableCell variant="listcheckbox" />
            {columns.map((el) => (
              <HvTableHeader key={el.Header}>{el.Header}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody withNavigation>
          {data.map((el, idx) => (
            <HvTableRow key={el.id} hover selected={checkedIdx === idx}>
              <HvTableCell variant="listcheckbox">
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
              <HvTableCell variant="listactions">
                <HvButton
                  variant="secondaryGhost"
                  onClick={() => alert("CLICK!")}
                >
                  View
                </HvButton>
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
