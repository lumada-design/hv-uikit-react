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

export const ControlsControlled = () => {
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
    cards: "controlledCardsGrid",
    list: "controlledItemList",
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
        selectedView={currentView}
        onViewChange={(evt, id) => setCurrentView(id)}
      >
        <HvLeftControl
          placeholder="Search"
          onSearch={(e, value) => setGlobalFilter?.(value)}
          searchProps={{
            inputProps: {
              "aria-label": "Search",
              "aria-controls": `${idsToControl.cards} ${idsToControl.list}`,
            },
          }}
        />
        <HvRightControl
          onSort={(value) =>
            setSortBy?.([
              {
                id: value?.accessor || "",
                desc: value?.desc,
              },
            ])
          }
          values={[
            {
              id: "nameAsc",
              accessor: "name",
              label: "Name Ascending",
              desc: false,
              selected: true,
            },
            {
              id: "nameDesc",
              accessor: "name",
              label: "Name Descending",
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
