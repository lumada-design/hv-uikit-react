import React, { useMemo } from "react";
import range from "lodash/range";

import { Ban } from "@hv/uikit-react-icons";
import { HvCheckBox, HvDropDownMenu, HvEmptyState, HvTypography } from "@hv/uikit-react-core";

import {
  HvTable,
  HvTableBody,
  HvTableCell,
  HvTableContainer,
  HvTableHead,
  HvTablePagination,
  HvTableRow,
} from "../..";

import { makeData, getColumns, useToggleIndex } from "./utils";

export default {
  title: "Lab/Table",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvTable } from '@hv/uikit-react-core'",
  },
  component: HvTable,
  subcomponents: {
    HvTableBody,
    HvTableCell,
    HvTableContainer,
    HvTableHead,
    HvTablePagination,
    HvTableRow,
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
              <HvTableCell key={el.Header}>{el.Header}</HvTableCell>
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

export const Empty = () => {
  const EmptyRow = () => (
    <HvTableRow>
      <HvTableCell colSpan="100%" style={{ height: 100 }}>
        <HvEmptyState message="No data to display" icon={<Ban role="presentation" />} />
      </HvTableCell>
    </HvTableRow>
  );
  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            {getColumns().map((el) => (
              <HvTableCell key={el.Header}>{el.Header}</HvTableCell>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          <EmptyRow />
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

export const EmptyCells = () => {
  const columns = getColumns();
  const data = makeData(6).map((entry) => ({
    ...entry,
    // make some entries empty
    status: entry.status === "Closed" ? null : entry.status,
  }));

  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            {columns.map((el) => (
              <HvTableCell key={el.Header}>{el.Header}</HvTableCell>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {data.map((el) => (
            <HvTableRow key={el.id} hover>
              <HvTableCell>{el.name}</HvTableCell>
              <HvTableCell>{el.createdDate}</HvTableCell>
              <HvTableCell>{el.eventType}</HvTableCell>
              <HvTableCell>{el.status ?? "—"}</HvTableCell>
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

EmptyCells.parameters = {
  docs: {
    description: {
      story: "Table cells with null or empty values should instead display an em-dash (—).",
    },
  },
};

export const SelectableSimple = () => {
  const columns = getColumns();
  const data = useMemo(() => makeData(6), []);

  const actions = useMemo(() => range(3).map((i) => ({ label: `Option ${i + 1}` })), []);

  const [checkedIdx, toggleChecked] = useToggleIndex(0);

  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            <HvTableCell padding="checkbox" />
            {columns.map((el) => (
              <HvTableCell key={el.Header}>{el.Header}</HvTableCell>
            ))}
            <HvTableCell padding="checkbox" />
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {data.map((el, idx) => (
            <HvTableRow key={el.id} hover selected={checkedIdx === idx}>
              <HvTableCell padding="checkbox">
                <HvCheckBox checked={checkedIdx === idx} onClick={toggleChecked(idx)} />
              </HvTableCell>
              <HvTableCell>{el.name}</HvTableCell>
              <HvTableCell>{el.createdDate}</HvTableCell>
              <HvTableCell>{el.eventType}</HvTableCell>
              <HvTableCell>{el.status}</HvTableCell>
              <HvTableCell>{el.riskScore}</HvTableCell>
              <HvTableCell>{el.severity}</HvTableCell>
              <HvTableCell>{el.priority}</HvTableCell>
              <HvTableCell padding="checkbox">
                <HvDropDownMenu keepOpened={false} placement="left" dataList={actions} />
              </HvTableCell>
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

SelectableSimple.parameters = {
  docs: {
    description: { story: "A table with checkboxes being managed by a simple hook." },
  },
};

export const TableRowClick = () => {
  const columns = useMemo(() => {
    const initialColumns = getColumns();
    initialColumns.push({
      Header: "Details",
      accessor: "link",
      Cell: (props) => {
        const { row } = props;
        const { original } = row;
        const { link } = original;

        return (
          <HvTypography variant="xsInlineLink" component="a" href={link}>
            Details Page
          </HvTypography>
        );
      },
    });

    return initialColumns;
  }, []);

  const data = useMemo(() => {
    const initialData = makeData(6);

    return initialData.map((row) => {
      const updatedRow = { ...row };
      updatedRow.link =
        "https://hitachivantara.sharepoint.com/sites/DesignSystem/Pattern%20Library/Home.aspx";
      return updatedRow;
    });
  }, []);

  const onRowClicked = (row) => {
    const win = window.open(row.link, "_blank");
    win.focus();
  };

  return (
    <HvTableContainer>
      <HvTable>
        <HvTableHead>
          <HvTableRow>
            {columns.map((el) => (
              <HvTableCell key={el.Header}>{el.Header}</HvTableCell>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody>
          {data.map((el) => (
            <HvTableRow
              key={el.id}
              hover
              onClick={(e) => onRowClicked(el, e)}
              style={{ cursor: "pointer" }}
            >
              <HvTableCell>{el.name}</HvTableCell>
              <HvTableCell>{el.createdDate}</HvTableCell>
              <HvTableCell>{el.eventType}</HvTableCell>
              <HvTableCell>{el.status}</HvTableCell>
              <HvTableCell>{el.riskScore}</HvTableCell>
              <HvTableCell>{el.severity}</HvTableCell>
              <HvTableCell>{el.priority}</HvTableCell>
              <HvTableCell>
                <HvTypography variant="xsInlineLink" component="a" href={el.link}>
                  Details Page
                </HvTypography>
              </HvTableCell>
            </HvTableRow>
          ))}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

TableRowClick.parameters = {
  docs: {
    description: { story: "A table example where you can click on a row." },
  },
};
