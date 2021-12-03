import React, { useMemo } from "react";
import { HvTypography, HvEmptyState, HvCheckBox, HvDropDownMenu } from "@hv/uikit-react-core";
import { Ban } from "@hv/uikit-react-icons";

import {
  HvTable,
  HvTableContainer,
  HvTableRow,
  HvTableHead,
  HvTableHeader,
  HvTableBody,
  HvTableCell,
} from "../..";

import { makeData, getColumns, useToggleIndex } from "./utils";

export default {
  title: "Lab/Table",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvTable } from '@hv/uikit-react-lab'",
  },
  component: HvTable,
  subcomponents: {
    HvTableContainer,
    HvTableRow,
    HvTableHead,
    HvTableHeader,
    HvTableBody,
    HvTableCell,
  },
};

export const Main = () => {
  const columns = getColumns();
  const data = makeData(6);

  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            {columns.map((el) => (
              <HvTableHeader key={el.Header}>{el.Header}</HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {data.map((el) => (
            <HvTableRow key={el.id} hover>
              <HvTableCell>{el.name}</HvTableCell>
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

Main.parameters = {
  docs: {
    description: { story: "A minimal table example." },
  },
};

export const NoData = () => (
  <HvTableContainer>
    <HvTable>
      <HvTableHead>
        <HvTableRow>
          {getColumns().map((el) => (
            <HvTableHeader key={el.Header}>{el.Header}</HvTableHeader>
          ))}
        </HvTableRow>
      </HvTableHead>
      <HvTableBody>
        <HvTableRow>
          <HvTableCell colSpan="100%" style={{ height: 96 }}>
            <HvEmptyState message="No data to display." icon={<Ban role="presentation" />} />
          </HvTableCell>
        </HvTableRow>
      </HvTableBody>
    </HvTable>
  </HvTableContainer>
);

NoData.parameters = {
  docs: {
    description: { story: "Table with no data available." },
  },
};

export const SimpleTable = () => {
  const [checkedIdx, toggleChecked] = useToggleIndex(0);

  const columns = useMemo(() => {
    const initialColumns = getColumns();

    initialColumns.push({
      Header: "Details",
      accessor: "link",
    });

    return initialColumns;
  }, []);

  const data = useMemo(
    () =>
      makeData(6).map((row) => ({
        ...row,
        link: "/details",
      })),
    []
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
                <HvCheckBox checked={checkedIdx === idx} onClick={toggleChecked(idx)} />
              </HvTableCell>
              <HvTableCell>{el.name}</HvTableCell>
              <HvTableCell>{el.createdDate}</HvTableCell>
              <HvTableCell>{el.eventType}</HvTableCell>
              <HvTableCell>{el.status}</HvTableCell>
              <HvTableCell>{el.riskScore}</HvTableCell>
              <HvTableCell>{el.severity}</HvTableCell>
              <HvTableCell>{el.priority}</HvTableCell>
              <HvTableCell>
                <HvTypography variant="link" component="a" onClick={() => alert(el.link)}>
                  Details Page
                </HvTypography>
              </HvTableCell>
              <HvTableCell variant="actions">
                <HvDropDownMenu
                  keepOpened={false}
                  placement="left"
                  onClick={(e, item) => alert(item.label)}
                  dataList={[
                    {
                      label: "Share",
                    },
                    {
                      label: "Hide",
                    },
                    {
                      label: "Remove",
                    },
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

SimpleTable.parameters = {
  docs: {
    description: {
      story:
        "Simple table that uses `HvTable variants` in order to control checkbox selection and secondary actions.",
    },
  },
};
