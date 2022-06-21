import React, { useMemo } from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import {
  HvButton,
  HvTypography,
  HvEmptyState,
  HvCheckBox,
  HvDropDownMenu,
} from "@hitachivantara/uikit-react-core";

import { Ban } from "@hitachivantara/uikit-react-icons";

import {
  HvTable,
  HvTableContainer,
  HvTableRow,
  HvTableHead,
  HvTableHeader,
  HvTableBody,
  HvTableCell,
} from "../..";

import { makeData, getColumns, getGroupedRowsColumns, useToggleIndex } from "./utils";

export default {
  title: "Lab/Table",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvTable } from '@hitachivantara/uikit-react-lab'",
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
            <HvTableRow key={el.id} hover striped>
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
          <HvTableCell colSpan={100} style={{ height: 96 }}>
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
              <HvTableCell align="center">{el.riskScore}</HvTableCell>
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
        "Simple table that uses HvTable features in order to style checkbox and secondary actions columns.",
    },
  },
};

export const GroupedRows = () => {
  const theme = useTheme();
  const columns = getGroupedRowsColumns();
  const data = makeData(8);

  const style = {
    borderRight: `solid 1px ${theme.palette.atmo4}`,
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
                  style={{
                    verticalAlign: "top",
                    ...style,
                  }}
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

GroupedRows.parameters = {
  docs: {
    description: { story: "A table example with grouped rows." },
  },
};

export const ResponsiveTable = () => {
  const useStyles = makeStyles((theme) => ({
    flexTable: {
      display: "flex",
      flexFlow: "column wrap",
    },

    flexRowGroup: {
      display: "flex",
      flexFlow: "column wrap",

      [theme.breakpoints.only("md")]: {
        "&:first-of-type": {
          position: "sticky",
          top: -1,
          zIndex: 3,
        },
      },

      [theme.breakpoints.down("sm")]: {
        "&:first-of-type": {
          display: "none",
        },
      },
    },

    flexRow: {
      display: "flex",
      flexFlow: "row wrap",

      "&>*": {
        width: "calc(100% / 7)",

        display: "flex",
        alignItems: "center",

        [theme.breakpoints.down("sm")]: {
          width: "100%",

          "&:first-of-type": {
            width: "100%",
            justifyContent: "center",
            backgroundColor: theme.palette.atmo1,
          },
        },
      },

      [theme.breakpoints.down("sm")]: {
        "& > div:not(:first-of-type)::before": {
          content: "attr(data-label) ",
          fontWeight: "bold",
          width: 150,
        },
      },
    },

    columnHeader: {
      display: "flex",
      alignItems: "start",
    },

    container: { minWidth: 200, maxHeight: 300 },
  }));

  const classes = useStyles();

  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(20), []);

  return (
    <HvTableContainer className={classes.container}>
      <HvTable component="div" className={classes.flexTable}>
        <HvTableHead className={classes.flexRowGroup}>
          <HvTableRow className={classes.flexRow}>
            {columns.map((el) => (
              <HvTableHeader key={el.Header} className={classes.columnHeader}>
                {el.Header}
              </HvTableHeader>
            ))}
          </HvTableRow>
        </HvTableHead>
        <HvTableBody className={classes.flexRowGroup}>
          {data.map((row) => {
            return (
              <HvTableRow key={row.id} hover className={classes.flexRow}>
                {Object.keys(row)
                  .slice(1)
                  .map((key, i) => (
                    <HvTableCell
                      key={`${row[key]}_${columns[i].Header}`}
                      data-label={columns[i].Header}
                    >
                      {row[key]}
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

ResponsiveTable.parameters = {
  docs: {
    description: {
      story: "A table with non-table elements and responsive layout (try resizing your browser).",
    },
  },
};

export const ListRow = () => {
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
      makeData(4).map((row) => ({
        ...row,
        link: "/details",
      })),
    []
  );

  return (
    <HvTableContainer style={{ padding: "2px" }}>
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
          {data.map((el, idx) => {
            return (
              <HvTableRow key={el.id} hover selected={checkedIdx === idx}>
                <HvTableCell variant="listcheckbox">
                  <HvCheckBox checked={checkedIdx === idx} onClick={toggleChecked(idx)} />
                </HvTableCell>
                <HvTableCell>{el.name}</HvTableCell>
                <HvTableCell>{el.createdDate}</HvTableCell>
                <HvTableCell>{el.eventType}</HvTableCell>
                <HvTableCell>{el.status}</HvTableCell>
                <HvTableCell align="center">{el.riskScore}</HvTableCell>
                <HvTableCell>{el.severity}</HvTableCell>
                <HvTableCell>{el.priority}</HvTableCell>
                <HvTableCell variant="listactions">
                  <HvButton category="ghost">View</HvButton>
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
            );
          })}
        </HvTableBody>
      </HvTable>
    </HvTableContainer>
  );
};

ListRow.parameters = {
  docs: {
    description: {
      story: "List Row Variant of the table.",
    },
  },
};
