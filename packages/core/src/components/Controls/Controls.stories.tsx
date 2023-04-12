import { Meta } from "@storybook/react";
import { Cards, List } from "@hitachivantara/uikit-react-icons";
import {
  HvButton,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvControls,
  HvControlsViewConfiguration,
  HvLabel,
  HvLeftControl,
  HvListContainer,
  HvListItem,
  HvMultiButton,
  HvPanel,
  HvRightControl,
  HvSimpleGrid,
  HvTableColumnConfig,
  useHvData,
  useHvFilters,
  useHvGlobalFilter,
  useHvSortBy,
} from "~/components";
import { useMemo, useState, useCallback } from "react";
import { getColumns, makeData, NewEntry } from "./makedata";

const meta: Meta<typeof HvControls> = {
  title: "Widgets/Controls",
  component: HvControls,
  subcomponents: { HvLeftControl, HvRightControl },
  parameters: {
    eyes: { include: false },
  },
};

export default meta;

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

const singleView = [
  {
    id: "card",
    icon: <Cards />,
    "aria-label": "Select card view",
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
    useHvSortBy
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
        callbacks={{ setGlobalFilter: setGlobalFilter, setSortBy: setSortBy }}
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
          {rows?.map((row) => {
            return (
              <HvCard
                bgcolor="atmo1"
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
    useHvSortBy
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
            "aria-controls": `${idsToControl.cards} ${idsToControl.list}`,
          }}
        />
      </HvControls>
      {currentView === "card" && (
        <HvSimpleGrid cols={3}>
          {rows?.map((row) => {
            return (
              <HvCard
                bgcolor="atmo1"
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
        <HvPanel style={{ float: "left" }}>
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

export const CustomControls = () => {
  const originalData = useMemo(() => makeData(15), []);
  const [data] = useState(originalData);
  const [severitySelection, setSeveritySelection] = useState(0);
  const [temperatureSelection] = useState(0);
  const buttons = useMemo(
    () => ["All", "Critical", "Major", "Average", "Minor"],
    []
  );

  const filterSeverity = useCallback(
    (rows) =>
      rows.filter(
        (row) =>
          buttons[severitySelection] === "All" ||
          row.original.severity === buttons[severitySelection]
      ),
    [buttons, severitySelection]
  );

  const sliderTemperature = useCallback(
    (rows) =>
      rows.filter((row) => row.original.temperature > temperatureSelection),
    [temperatureSelection]
  );

  const columns: HvTableColumnConfig<NewEntry, string>[] = useMemo(
    () => [
      { Header: "Title", accessor: "name" },
      { Header: "Event Type", accessor: "eventType" },
      { Header: "Status", accessor: "status" },
      { Header: "Severity", accessor: "severity", filter: filterSeverity },
      { Header: "Priority", accessor: "priority" },
      {
        Header: "Temperature",
        accessor: "temperature",
        filter: sliderTemperature,
      },
    ],
    [filterSeverity, sliderTemperature]
  );

  const { rows, setFilter } = useHvData<NewEntry, string>(
    {
      data,
      columns,
    },
    useHvFilters
  );

  const handleChange = (_, idx) => {
    setSeveritySelection(idx);
    setFilter?.("severity", buttons[idx]);
  };

  // const onSliderChange = (values) => {
  //   setTemperatureSelection(values[0]);
  //   setFilter("temperature", values[0]);
  // };

  const cardsId = "CustomControlsCardsId";

  return (
    <div
      style={{
        display: "grid",
        gap: 8,
      }}
    >
      <HvControls views={singleView} defaultView="card" hideViewSwitcher>
        <HvLeftControl id="MultibuttonFilter" hideSearch>
          <HvMultiButton style={{ width: "350px" }}>
            {buttons.map((button, i) => (
              <HvButton
                id={button.toLowerCase()}
                key={`${buttons[i]}`}
                selected={severitySelection === i}
                onClick={(evt) => handleChange(evt, i)}
                aria-controls={cardsId}
              >
                {button}
              </HvButton>
            ))}
          </HvMultiButton>
        </HvLeftControl>
        <HvRightControl hideSortBy>
          <HvLabel id="temp-label" htmlFor="tempFilter" label="Temperature:" />
          {/* <HvSlider
            style={{ width: "240px", zIndex: 40 }}
            id="tempFilter-controls"
            hideInput
            onChange={onSliderChange}
            defaultValues={[25]}
            maxPointValue={70}
            minPointValue={25}
            knobProps={[
              {
                "aria-label": "temp-slider",
                "aria-controls": cardsId,
              },
            ]}
          /> */}
        </HvRightControl>
      </HvControls>
      <HvSimpleGrid id={cardsId} cols={3}>
        {rows?.map((row) => {
          return (
            <HvCard
              bgcolor="atmo1"
              key={`${row?.values?.name}-row`}
              style={{ width: "100%" }}
            >
              <HvCardHeader title={row?.values?.name} />
              <HvCardContent>Event: {row?.values?.eventType}</HvCardContent>
              <HvCardContent>Severity: {row?.values?.severity}</HvCardContent>
              <HvCardContent>
                Temperature: {row?.values?.temperature}
              </HvCardContent>
            </HvCard>
          );
        })}
      </HvSimpleGrid>
    </div>
  );
};

export const MixedControls = () => {
  const originalData = useMemo(() => makeData(15), []);
  const [data] = useState(originalData);
  const [severitySelection, setSeveritySelection] = useState(0);
  const [temperatureSelection] = useState(0);
  const buttons = useMemo(
    () => ["All", "Critical", "Major", "Average", "Minor"],
    []
  );

  const filterSeverity = useCallback(
    (rows) =>
      rows.filter(
        (row) =>
          buttons[severitySelection] === "All" ||
          row.original.severity === buttons[severitySelection]
      ),
    [buttons, severitySelection]
  );

  const sliderTemperature = useCallback(
    (rows) =>
      rows.filter((row) => row.original.temperature > temperatureSelection),
    [temperatureSelection]
  );

  const columns: HvTableColumnConfig<NewEntry, string>[] = useMemo(
    () => [
      { Header: "Title", accessor: "name" },
      { Header: "Event Type", accessor: "eventType" },
      { Header: "Status", accessor: "status" },
      { Header: "Severity", accessor: "severity", filter: filterSeverity },
      { Header: "Priority", accessor: "priority" },
      {
        Header: "Temperature",
        accessor: "temperature",
        filter: sliderTemperature,
      },
    ],
    [filterSeverity, sliderTemperature]
  );

  const { rows, setFilter, setGlobalFilter } = useHvData<NewEntry, string>(
    {
      data,
      columns,
    },
    useHvFilters,
    useHvGlobalFilter
  );

  const handleChange = (_, idx) => {
    setSeveritySelection(idx);
    setFilter?.("severity", buttons[idx]);
  };

  // const onSliderChange = (values) => {
  //   setTemperatureSelection(values[0]);
  //   setFilter("temperature", values[0]);
  // };

  const cardsId = "mixedControlsCardsId";

  return (
    <div
      style={{
        display: "grid",
        gap: 8,
      }}
    >
      <HvControls
        views={singleView}
        defaultView="card"
        hideViewSwitcher
        callbacks={{ setGlobalFilter: setGlobalFilter }}
      >
        <HvLeftControl id="MultibuttonFilter" placeholder="Search">
          <HvMultiButton style={{ width: "350px" }}>
            {buttons.map((button, i) => (
              <HvButton
                id={button.toLowerCase()}
                key={`${buttons[i]}`}
                selected={severitySelection === i}
                onClick={(evt) => handleChange(evt, i)}
                aria-controls={cardsId}
              >
                {button}
              </HvButton>
            ))}
          </HvMultiButton>
        </HvLeftControl>
        <HvRightControl hideSortBy>
          <HvLabel id="temp-label" htmlFor="tempFilter" label="Temperature:" />
          {/* <HvSlider
            style={{ width: "240px", zIndex: 40 }}
            id="tempFilter-mixed"
            hideInput
            onChange={onSliderChange}
            defaultValues={[25]}
            maxPointValue={70}
            minPointValue={25}
            knobProps={[
              {
                "aria-label": "temp-slider",
                "aria-controls": cardsId,
              },
            ]}
          /> */}
        </HvRightControl>
      </HvControls>
      <HvSimpleGrid id={cardsId} cols={3}>
        {rows?.map((row) => {
          return (
            <HvCard
              bgcolor="atmo1"
              key={`${row?.values?.name}-row`}
              style={{ width: "100%" }}
            >
              <HvCardHeader title={row?.values?.name} />
              <HvCardContent>Event: {row?.values?.eventType}</HvCardContent>
              <HvCardContent>Severity: {row?.values?.severity}</HvCardContent>
              <HvCardContent>
                Temperature: {row?.values?.temperature}
              </HvCardContent>
            </HvCard>
          );
        })}
      </HvSimpleGrid>
    </div>
  );
};
