import { useMemo } from "react";
import { Ban } from "@hitachivantara/uikit-react-icons";
import { StoryObj } from "@storybook/react";
import {
  HvTableContainer,
  HvTable,
  HvTableProps,
  HvTableBody,
  HvTableColumnConfig,
  HvTableHead,
  HvTableHeader,
  HvTableRow,
  HvTableCell,
  HvEmptyState,
  HvCheckBox,
  HvTypography,
  HvDropDownMenu,
} from "@hitachivantara/uikit-react-core";

import {
  AssetEvent,
  getColumns,
  makeData,
  useToggleIndex,
} from "./storiesUtils";

import { GroupedRows as GroupedRowsStory } from "./TableSamples/GroupedRows";
import GroupedRowsRaw from "./TableSamples/GroupedRows?raw";
import { ResponsiveTable as ResponsiveTableStory } from "./TableSamples/ResponsiveTable";
import ResponsiveTableRaw from "./TableSamples/ResponsiveTable?raw";
import { ListRow as ListRowStory } from "./TableSamples/ListRow";
import ListRowRaw from "./TableSamples/ListRow?raw";

export default {
  title: "Visualizations/Table",
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
                  icon={<Ban role="none" />}
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

    const columns = useMemo<HvTableColumnConfig<AssetEvent, string>[]>(() => {
      return [...getColumns(), { Header: "Details", accessor: "link" }];
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
  },
};

export const GroupedRows: StoryObj<HvTableProps> = {
  parameters: {
    docs: {
      source: { code: GroupedRowsRaw },
      description: {
        story: "A table example with grouped rows.",
      },
    },
  },
  render: () => <GroupedRowsStory />,
};

export const ResponsiveTable = () => <ResponsiveTableStory />;

ResponsiveTable.parameters = {
  docs: {
    source: { code: ResponsiveTableRaw },
    description: {
      story:
        "A table with non-table elements and responsive layout (try resizing your browser).",
    },
  },
};

export const ListRow = () => <ListRowStory />;

ListRow.parameters = {
  docs: {
    source: { code: ListRowRaw },
    description: {
      story: "List row variant of the table.",
    },
  },
};
