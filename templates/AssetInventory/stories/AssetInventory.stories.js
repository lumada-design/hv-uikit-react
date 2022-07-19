import React, { useState, useMemo } from "react";
import {
  HvSimpleGrid,
  HvCard,
  HvCardHeader,
  HvCardContent,
  HvCheckBox,
  HvActionBar,
  HvActionsGeneric,
  HvTypography,
  HvBulkActions,
  HvPagination,
} from "@hitachivantara/uikit-react-core";
import {
  HvControls,
  HvLeftControl,
  HvRightControl,
  HvTable,
  HvTableContainer,
  HvTableRow,
  HvTableHead,
  HvTableHeader,
  HvTableBody,
  HvTableCell,
  useHvData,
  useHvSortBy,
  useHvGlobalFilter,
  useHvRowSelection,
  useHvBulkActions,
  useHvPagination,
} from "@hitachivantara/uikit-react-lab";
import {
  Cards,
  List,
  Level0Good,
  Level1,
  Level2Average,
  Level3Bad,
  Add,
  Delete,
  Preview,
} from "@hitachivantara/uikit-react-icons";
import { getColumns, makeData } from "./makedata";

export default {
  title: "Templates/Asset Inventory",
  parameters: {
    docs: {
      source: {
        code: null,
      },
    },
  },
};

const makeIcon = (color) => {
  switch (color) {
    case "sema1":
      return <Level0Good semantic="sema1" />;
    case "sema2":
      return <Level1 semantic="sema2" />;
    case "sema3":
      return <Level2Average semantic="sema3" />;
    case "sema4":
      return <Level3Bad semantic="sema4" />;
    default:
      return undefined;
  }
};

const actions = [
  { id: "add", label: "Add", icon: <Add /> },
  { id: "delete", label: "Delete", icon: <Delete /> },
  { id: "put", label: "Preview", icon: <Preview /> },
];

export const Main = () => {
  const originalData = useMemo(() => makeData(10), []);
  const [currentView, setCurrentView] = useState("card");
  const [data] = useState(originalData);
  const columns = useMemo(() => getColumns(), []);

  const instance = useHvData(
    {
      data,
      columns,
      initialState: { pageSize: 8 },
    },
    useHvGlobalFilter,
    useHvSortBy,
    useHvPagination,
    useHvRowSelection,
    useHvBulkActions
  );

  const views = [
    { id: "card", icon: <Cards />, "aria-label": "Select card view" },
    { id: "list", icon: <List />, "aria-label": "Select list view" },
  ];

  const idsToControl = {
    cards: "cardsGrid",
    list: "itemList",
  };

  const bulkActionProps = instance.getHvBulkActionsProps?.();

  const handleAction = (e, id, action) =>
    alert(
      `Callback for action ${action.label} on items ${instance.selectedFlatRows
        .map((r) => r.id)
        .join(", ")}`
    );

  return (
    <div
      style={{
        display: "grid",
        gap: 20,
      }}
    >
      <HvTypography variant="normalText">
        The Asset Inventory page showcases all the items in the app and is constituted by 2 views:
        while the List View allows you to see all the information in a spreadsheet-like display, the
        Card View is where you can view the same items as blocks. Use both views or just one of
        them, according to your use case. You can access the code to this template{" "}
        <a
          target="_blank"
          href="https://github.com/lumada-design/hv-uikit-react/tree/master/templates/AssetInventory/"
          rel="noreferrer"
        >
          over at github
        </a>
      </HvTypography>

      <HvControls
        views={views}
        defaultView="card"
        callbacks={instance}
        onViewChange={(evt, id) => setCurrentView(id)}
      >
        <HvLeftControl
          placeholder="Search"
          searchProps={{
            inputProps: { "aria-controls": `${idsToControl.cards} ${idsToControl.list}` },
          }}
        />
        <HvRightControl
          values={[
            { id: "nameAsc", accessor: "name", label: "Name Ascending", desc: false },
            { id: "nameDesc", accessor: "name", label: "Name Descending", desc: true },
            {
              id: "eventTypeAsc",
              accessor: "eventType",
              label: "Event Type Ascending",
              desc: false,
            },
            {
              id: "eventTypeDesc",
              accessor: "eventType",
              label: "Event Type Descending",
              desc: true,
            },
            { id: "severityAsc", accessor: "severity", label: "Severity Ascending", desc: false },
            { id: "severityDesc", accessor: "severity", label: "Severity Descending", desc: true },
          ]}
          sortProps={{
            "aria-controls": `${idsToControl.cards} ${idsToControl.list}`,
          }}
        />
      </HvControls>
      <HvBulkActions
        {...bulkActionProps}
        numTotal={data.length}
        numSelected={instance.selectedFlatRows.length}
        maxVisibleActions={2}
        onSelectAll={() => bulkActionProps.onSelectAll()}
        onSelectAllPages={() => bulkActionProps.onSelectAllPages()}
        actions={actions}
        actionsCallback={handleAction}
        checkboxProps={{ "aria-controls": `${idsToControl.cards} ${idsToControl.list}` }}
      />
      {currentView === "card" && (
        <HvSimpleGrid
          id={idsToControl.cards}
          breakpoints={[
            { minWidth: 1270, cols: 4, spacing: "md" },
            { minWidth: 960, cols: 3, spacing: "md" },
            { minWidth: 600, cols: 2, spacing: "sm" },
            { minWidth: 0, cols: 1, spacing: "sm" },
          ]}
        >
          {instance.page.map((row) => {
            return (
              <HvCard
                bgcolor="atmo1"
                key={`${row?.values?.name}-row`}
                style={{ width: "100%" }}
                statusColor={row?.original?.statusColor}
                icon={makeIcon(row?.original?.statusColor)}
              >
                <HvCardHeader title={row?.values?.name} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <HvCardContent>
                      <HvTypography variant="highlightText">Event</HvTypography>
                      <HvTypography noWrap>{row?.values?.eventType}</HvTypography>
                    </HvCardContent>
                    <HvCardContent>
                      <HvTypography variant="highlightText">Severity</HvTypography>
                      <HvTypography noWrap>{row?.values?.severity}</HvTypography>
                    </HvCardContent>
                  </div>
                  <div>
                    <HvCardContent>
                      <HvTypography variant="highlightText">Status</HvTypography>
                      <HvTypography noWrap>{row?.values?.status}</HvTypography>
                    </HvCardContent>
                    <HvCardContent>
                      <HvTypography variant="highlightText">Priority</HvTypography>
                      <HvTypography noWrap>{row?.values?.priority}</HvTypography>
                    </HvCardContent>
                  </div>
                </div>
                <HvActionBar>
                  <HvCheckBox
                    onChange={() => instance.toggleRowSelected(row.id)}
                    checked={instance.selectedFlatRows.some((r) => r.id === row.id)}
                    value="value"
                    inputProps={{ "aria-label": "leaf input" }}
                  />
                  <div style={{ flex: 1 }} />
                  <HvActionsGeneric actions={[{ id: "view1", label: "View" }]} />
                </HvActionBar>
              </HvCard>
            );
          })}
        </HvSimpleGrid>
      )}
      {currentView === "list" && (
        <HvTableContainer style={{ padding: "2px" }}>
          <HvTable variant="listrow" {...instance.getTableProps()}>
            <HvTableHead>
              <HvTableRow>
                <HvTableCell variant="listcheckbox" />
                {columns.map((col) => (
                  <HvTableHeader key={col.Header}>{col.Header}</HvTableHeader>
                ))}
              </HvTableRow>
            </HvTableHead>
            <HvTableBody withNavigation {...instance.getTableBodyProps()}>
              {instance.page.map((row) => {
                instance.prepareRow(row);
                return (
                  <HvTableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <HvTableCell {...cell.getCellProps()}>{cell.render("Cell")}</HvTableCell>
                    ))}
                  </HvTableRow>
                );
              })}
            </HvTableBody>
          </HvTable>
        </HvTableContainer>
      )}
      {instance.page?.length ? (
        <HvPagination {...instance.getHvPaginationProps()} pageSizeOptions={[8, 16, 32, 64]} />
      ) : undefined}
    </div>
  );
};
