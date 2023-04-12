import styled from "@emotion/styled";
import { useTheme, Breakpoints as MuiBreakpoints } from "@mui/material/styles";
import { Ban } from "@hitachivantara/uikit-react-icons";
import { theme } from "@hitachivantara/uikit-styles";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvTableContainer,
  HvTable,
  HvTableProps,
  HvTableBody,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableCell,
  HvEmptyState,
  HvCheckBox,
  HvTypography,
  HvDropDownMenu,
  HvButton,
  HvOverflowTooltip,
} from "~/components";
import { useMemo } from "react";
import {
  getColumns,
  getGroupedRowsColumns,
  makeData,
  useToggleIndex,
} from "./storiesUtils";

// #region Responsive table styled components

const StyledResponsiveTableContainer = styled(HvTableContainer)({
  inWidth: 200,
  maxHeight: 300,
});

const StyledResponsiveTable = styled(HvTable)({
  display: "flex",
  flexFlow: "column wrap",
});

const StyledResponsiveHead = styled(HvTableHead)(
  ({ $breakpoints }: { $breakpoints: MuiBreakpoints }) => ({
    display: "flex",
    flexFlow: "column wrap",
    height: "auto",

    [$breakpoints.only("md")]: {
      "&:first-of-type": {
        position: "sticky",
        top: -1,
        zIndex: 3,
      },
    },

    [$breakpoints.down("sm")]: {
      "&:first-of-type": {
        display: "none",
      },
    },
  })
);

const StyledResponsiveBody = styled(HvTableBody)(
  ({ $breakpoints }: { $breakpoints: MuiBreakpoints }) => ({
    display: "flex",
    flexFlow: "column wrap",

    [$breakpoints.only("md")]: {
      "&:first-of-type": {
        position: "sticky",
        top: -1,
        zIndex: 3,
      },
    },

    [$breakpoints.down("sm")]: {
      "&:first-of-type": {
        display: "none",
      },
    },
  })
);

const StyledResponsiveTableRow = styled(HvTableRow)(
  ({ $breakpoints }: { $breakpoints: MuiBreakpoints }) => ({
    display: "flex",
    flexFlow: "row wrap",

    "&>*": {
      width: "calc(100% / 7)",

      display: "flex",
      alignItems: "center",

      [$breakpoints.down("sm")]: {
        width: "100%",

        "&:first-of-type": {
          width: "100%",
          justifyContent: "center",
          backgroundColor: theme.colors.atmo1,
        },
      },
    },

    [$breakpoints.down("sm")]: {
      "& > div:not(:first-of-type)::before": {
        content: "attr(data-label) ",
        fontWeight: "bold",
        width: 150,
      },
    },
  })
);

const StyledResponsiveTableHeader = styled(HvTableHeader)({
  display: "flex",
  alignItems: "start",
});

// #endregion Responsive table styled components

const meta: Meta<typeof HvTable> = {
  title: "Guides/Table",
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
export default meta;

export const Main: StoryObj<HvTableProps> = {
  args: {
    stickyColumns: false,
    stickyHeader: false,
    variant: "default",
  },
  argTypes: {
    classes: { control: { disable: true } },
    component: { control: { disable: true } },
  },
  render: (args) => {
    const columns = getColumns();
    const data = makeData(6);

    return (
      <HvTableContainer>
        <HvTable {...args}>
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
  },
};

export const NoData: StoryObj<HvTableProps> = {
  parameters: {
    docs: {
      description: {
        story: "Table with no data available.",
      },
    },
  },
  render: () => {
    return (
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
                <HvEmptyState
                  message="No data to display."
                  icon={<Ban role="presentation" />}
                />
              </HvTableCell>
            </HvTableRow>
          </HvTableBody>
        </HvTable>
      </HvTableContainer>
    );
  },
};

export const SimpleTable: StoryObj<HvTableProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Simple table that uses `HvTable` features in order to style checkbox and secondary actions columns.",
      },
    },
  },
  render: () => {
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
                  <HvCheckBox
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
                  <HvTypography
                    link
                    component="a"
                    onClick={() => alert(el.link)}
                  >
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
  },
};

export const GroupedRows: StoryObj<HvTableProps> = {
  parameters: {
    docs: {
      description: {
        story: "A table example with grouped rows.",
      },
    },
  },
  render: () => {
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
                <HvTableHeader
                  key={el.Header}
                  {...(index === 0 && { ...style })}
                >
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
  },
};

export const ResponsiveTable = () => {
  const columns = useMemo(() => getColumns(), []);
  const data = useMemo(() => makeData(20), []);
  const muiTheme = useTheme();

  return (
    <StyledResponsiveTableContainer>
      <StyledResponsiveTable component="div">
        <StyledResponsiveHead $breakpoints={muiTheme.breakpoints}>
          <StyledResponsiveTableRow $breakpoints={muiTheme.breakpoints}>
            {columns.map((el) => (
              <StyledResponsiveTableHeader key={el.Header}>
                <HvOverflowTooltip data={el.Header}>
                  {el.Header}
                </HvOverflowTooltip>
              </StyledResponsiveTableHeader>
            ))}
          </StyledResponsiveTableRow>
        </StyledResponsiveHead>
        <StyledResponsiveBody $breakpoints={muiTheme.breakpoints}>
          {data.map((row) => {
            return (
              <StyledResponsiveTableRow
                key={row.id}
                hover
                $breakpoints={muiTheme.breakpoints}
              >
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
              </StyledResponsiveTableRow>
            );
          })}
        </StyledResponsiveBody>
      </StyledResponsiveTable>
    </StyledResponsiveTableContainer>
  );
};

ResponsiveTable.parameters = {
  docs: {
    description: {
      story:
        "A table with non-table elements and responsive layout (try resizing your browser).",
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
    data && (
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
                    <HvCheckBox
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
                      onClick={(_, item) => alert(item.label)}
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
    )
  );
};

ListRow.parameters = {
  docs: {
    description: {
      story: "List row variant of the table.",
    },
  },
};
