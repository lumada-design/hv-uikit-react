import {
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvControls,
  HvControlsViewConfiguration,
  HvLeftControl,
  HvListContainer,
  HvListItem,
  HvPanel,
  HvRightControl,
  HvSimpleGrid,
  HvTypography,
  useHvGlobalFilter,
  useHvSortBy,
  useHvTable,
} from "@hitachivantara/uikit-react-core";
import { Cards, List } from "@hitachivantara/uikit-react-icons";
import { useMemo, useState } from "react";
import { getColumns, makeData } from "./makedata";

export const Controls = () => {
  const originalData = useMemo(() => makeData(10), []);
  const [currentView, setCurrentView] = useState("card");
  const [data] = useState(originalData);
  const columns = useMemo(() => getColumns(), []);

  const instance = useHvTable(
    {
      data,
      columns,
    },
    useHvGlobalFilter,
    useHvSortBy
  );

  const views: HvControlsViewConfiguration[] = [
    {
      id: "card",
      icon: <Cards />,
      // // "aria-label": "Select card view",
      label: "Select card view",
    },
    {
      id: "list",
      icon: <List />,
      // // "aria-label": "Select list view",
      label: "Select list view",
    },
  ];

  const idsToControl = {
    cards: "cardsGrid",
    list: "itemList",
  };

  return (
    <div
      style={{
        display: "grid",
        gap: 8,
      }}
    >
      <HvControls
        views={views}
        defaultView="card"
        callbacks={instance}
        onViewChange={(evt, id) => setCurrentView(id)}
      >
        <HvLeftControl
          placeholder="Search"
          searchProps={{
            inputProps: {
              "aria-controls": `${idsToControl.cards} ${idsToControl.list}`,
            },
          }}
        />
        <HvRightControl
          values={[
            {
              id: "nameAsc",
              accessor: "name",
              label: "Name Ascending",
              desc: false,
            },
            {
              id: "nameDesc",
              accessor: "name",
              label: "Name Descending",
              desc: true,
            },
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
            {
              id: "severityAsc",
              accessor: "severity",
              label: "Severity Ascending",
              desc: false,
            },
            {
              id: "severityDesc",
              accessor: "severity",
              label: "Severity Descending",
              desc: true,
            },
          ]}
          sortProps={{
            "aria-controls": `${idsToControl.cards} ${idsToControl.list}`,
          }}
        />
      </HvControls>
      {currentView === "card" && (
        <HvSimpleGrid id={idsToControl.cards} cols={3}>
          {instance?.rows?.map((row) => {
            return (
              <HvCard
                bgcolor="atmo1"
                key={`${row?.values?.name}-row`}
                style={{ width: "100%" }}
              >
                <HvCardHeader title={row?.values?.name} />
                <HvCardContent
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <HvTypography variant="label">Event:</HvTypography>&nbsp;
                  <HvTypography>{row?.values?.eventType}</HvTypography>
                </HvCardContent>
                <HvCardContent
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <HvTypography variant="label">Severity:</HvTypography>&nbsp;
                  <HvTypography>{row?.values?.severity}</HvTypography>
                </HvCardContent>
              </HvCard>
            );
          })}
        </HvSimpleGrid>
      )}
      {currentView === "list" && (
        <HvPanel id={idsToControl.list} style={{ float: "left" }}>
          <HvListContainer condensed>
            {instance?.rows?.map((row) => {
              return (
                <HvListItem
                  // bgcolor="atmo1"
                  key={`${row?.values?.name}-row`}
                  style={{ width: "100%" }}
                >
                  Name: {row?.values?.name}
                </HvListItem>
              );
            })}
          </HvListContainer>
        </HvPanel>
      )}
    </div>
  );
};
