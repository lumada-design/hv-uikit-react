import { useMemo, useState } from "react";
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
  useHvData,
  useHvGlobalFilter,
  useHvSortBy,
} from "@hitachivantara/uikit-react-core";
import { Cards, List } from "@hitachivantara/uikit-react-icons";

import { getColumns, makeData, NewEntry } from "../makedata";

const views: HvControlsViewConfiguration[] = [
  {
    id: "card",
    icon: <Cards />,
    "aria-label": "Select card view",
    label: "Select card view",
  },
  {
    id: "list",
    icon: <List />,
    "aria-label": "Select list view",
    label: "Select list view",
  },
];

export const Controls = () => {
  const originalData = useMemo(() => makeData(10), []);
  const [currentView, setCurrentView] = useState("card");
  const [data] = useState(originalData);
  const columns = useMemo(() => getColumns(), []);

  const { rows, setGlobalFilter, setSortBy } = useHvData<NewEntry, string>(
    {
      data,
      columns,
    },
    useHvGlobalFilter,
    useHvSortBy,
  );

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
        callbacks={{ setGlobalFilter, setSortBy }}
        onViewChange={(evt, id) => setCurrentView(id)}
      >
        <HvLeftControl
          placeholder="Search"
          searchProps={{
            inputProps: {
              "aria-label": "Search",
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
            "aria-label": "Sort by",
            "aria-controls": `${idsToControl.cards} ${idsToControl.list}`,
          }}
        />
      </HvControls>
      {currentView === "card" && (
        <HvSimpleGrid id={idsToControl.cards} cols={3}>
          {rows?.map((row) => {
            return (
              <HvCard
                bgcolor="bgContainer"
                key={`${row?.values?.name}-row`}
                style={{ width: "100%" }}
              >
                <HvCardHeader title={row?.values?.name} />
                <HvCardContent>Event: {row?.values?.eventType}</HvCardContent>
                <HvCardContent>Severity: {row?.values?.severity}</HvCardContent>
              </HvCard>
            );
          })}
        </HvSimpleGrid>
      )}
      {currentView === "list" && (
        <HvPanel id={idsToControl.list} style={{ float: "left" }}>
          <HvListContainer condensed>
            {rows?.map((row) => {
              return (
                <HvListItem
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
