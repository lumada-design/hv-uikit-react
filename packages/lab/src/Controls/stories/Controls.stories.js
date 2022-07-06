import React, { useState, useMemo, useCallback } from "react";
import {
  HvSimpleGrid,
  HvCard,
  HvCardHeader,
  HvCardContent,
  HvPanel,
  HvListContainer,
  HvListItem,
  HvSlider,
  HvMultiButton,
  HvButton,
  HvLabel,
} from "@hitachivantara/uikit-react-core";
import { useTable, useSortBy, useFilters, useGlobalFilter } from "react-table";
import { Cards, List } from "@hitachivantara/uikit-react-icons";
import { HvControls, HvLeftControl, HvRightControl } from "../..";
import { getColumns, makeData } from "./makedata";

export default {
  title: "Lab/Controls",
  parameters: {
    componentSubtitle: "",
    usage:
      'import { \n  HvControls,\n  HvLeftControl,\n  HvRightControl,\n } from "@hitachivantara/uikit-react-lab"',
    subcomponents: { HvLeftControl, HvRightControl },
  },
  component: HvControls,
};

export const Controls = () => {
  const originalData = useMemo(() => makeData(10), []);
  const [currentView, setCurrentView] = useState("card");
  const [data] = useState(originalData);
  const columns = useMemo(() => getColumns(), []);

  const instance = useTable(
    {
      data,
      columns,
    },
    useGlobalFilter,
    useSortBy
  );

  const views = [
    { id: "card", icon: <Cards />, "aria-label": "Select card view" },
    { id: "list", icon: <List />, "aria-label": "Select list view" },
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
      {currentView === "card" && (
        <HvSimpleGrid id={idsToControl.cards} cols={3}>
          {instance?.rows?.map((row) => {
            return (
              <HvCard bgcolor="atmo1" key={`${row?.values?.name}-row`} style={{ width: "100%" }}>
                <HvCardHeader title={row?.values?.name} />
                <HvCardContent>Event: {row?.values?.eventType}</HvCardContent>
                <HvCardContent>Severity: {row?.values?.severity}</HvCardContent>
              </HvCard>
            );
          })}
        </HvSimpleGrid>
      )}
      {currentView === "list" && (
        <HvPanel id={idsToControl.list} m="10px" style={{ float: "left" }}>
          <HvListContainer condensed>
            {instance?.rows?.map((row) => {
              return (
                <HvListItem
                  bgcolor="atmo1"
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

  const instance = useTable(
    {
      data,
      columns,
    },
    useGlobalFilter,
    useSortBy
  );

  const idsToControl = {
    cards: "controlledCardsGrid",
    list: "controlledItemList",
  };

  const views = [
    { id: "card", icon: <Cards />, "aria-label": "Select card view" },
    { id: "list", icon: <List />, "aria-label": "Select list view" },
  ];

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
          onSearch={(e, value) => instance?.setGlobalFilter(value)}
          searchProps={{
            inputProps: { "aria-controls": `${idsToControl.cards} ${idsToControl.list}` },
          }}
        />
        <HvRightControl
          onSort={(value) =>
            instance.setSortBy([
              {
                id: value?.accessor,
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
            { id: "nameDesc", accessor: "name", label: "Name Descending", desc: true },
          ]}
          sortProps={{
            "aria-controls": `${idsToControl.cards} ${idsToControl.list}`,
          }}
        />
      </HvControls>
      {currentView === "card" && (
        <HvSimpleGrid cols={3}>
          {instance?.rows?.map((row) => {
            return (
              <HvCard bgcolor="atmo1" key={`${row?.values?.name}-row`} style={{ width: "100%" }}>
                <HvCardHeader title={row?.values?.name} />
                <HvCardContent>Severity: {row?.values?.severity}</HvCardContent>
              </HvCard>
            );
          })}
        </HvSimpleGrid>
      )}
      {currentView === "list" && (
        <HvPanel m="10px" style={{ float: "left" }}>
          <HvListContainer condensed>
            {instance?.rows?.map((row) => {
              return (
                <HvListItem
                  bgcolor="atmo1"
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
  const [temperatureSelection, setTemperatureSelection] = useState(0);
  const buttons = useMemo(() => ["All", "Critical", "Major", "Average", "Minor"], []);

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
    (rows) => rows.filter((row) => row.original.temperature > temperatureSelection),
    [temperatureSelection]
  );

  const columns = useMemo(
    () => [
      { Header: "Title", accessor: "name" },
      { Header: "Event Type", accessor: "eventType" },
      { Header: "Status", accessor: "status" },
      { Header: "Severity", accessor: "severity", filter: filterSeverity },
      { Header: "Priority", accessor: "priority" },
      { Header: "Temperature", accessor: "temperature", filter: sliderTemperature },
    ],
    [filterSeverity, sliderTemperature]
  );

  const instance = useTable(
    {
      data,
      columns,
    },
    useFilters
  );

  const views = [{ id: "card", icon: <Cards />, "aria-label": "Select card view" }];

  const handleChange = (event, idx) => {
    setSeveritySelection(idx);
    instance.setFilter("severity", buttons[idx]);
  };

  const onSliderChange = (values) => {
    setTemperatureSelection(values[0]);
    instance.setFilter("temperature", values[0]);
  };

  const cardsId = "CustomControlsCardsId";

  return (
    <div
      style={{
        display: "grid",
        gap: 8,
      }}
    >
      <HvControls views={views} defaultView="card" hideViewSwitcher>
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
          <HvSlider
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
          />
        </HvRightControl>
      </HvControls>
      <HvSimpleGrid id={cardsId} cols={3}>
        {instance?.rows?.map((row) => {
          return (
            <HvCard bgcolor="atmo1" key={`${row?.values?.name}-row`} style={{ width: "100%" }}>
              <HvCardHeader title={row?.values?.name} />
              <HvCardContent>Event: {row?.values?.eventType}</HvCardContent>
              <HvCardContent>Severity: {row?.values?.severity}</HvCardContent>
              <HvCardContent>Temperature: {row?.values?.temperature}</HvCardContent>
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
  const [temperatureSelection, setTemperatureSelection] = useState(0);
  const buttons = useMemo(() => ["All", "Critical", "Major", "Average", "Minor"], []);

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
    (rows) => rows.filter((row) => row.original.temperature > temperatureSelection),
    [temperatureSelection]
  );

  const columns = useMemo(
    () => [
      { Header: "Title", accessor: "name" },
      { Header: "Event Type", accessor: "eventType" },
      { Header: "Status", accessor: "status" },
      { Header: "Severity", accessor: "severity", filter: filterSeverity },
      { Header: "Priority", accessor: "priority" },
      { Header: "Temperature", accessor: "temperature", filter: sliderTemperature },
    ],
    [filterSeverity, sliderTemperature]
  );

  const instance = useTable(
    {
      data,
      columns,
    },
    useFilters,
    useGlobalFilter
  );

  const views = [{ id: "card", icon: <Cards />, "aria-label": "Select card view" }];

  const handleChange = (event, idx) => {
    setSeveritySelection(idx);
    instance.setFilter("severity", buttons[idx]);
  };

  const onSliderChange = (values) => {
    setTemperatureSelection(values[0]);
    instance.setFilter("temperature", values[0]);
  };

  const cardsId = "mixedControlsCardsId";

  return (
    <div
      style={{
        display: "grid",
        gap: 8,
      }}
    >
      <HvControls views={views} defaultView="card" hideViewSwitcher callbacks={instance}>
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
          <HvSlider
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
          />
        </HvRightControl>
      </HvControls>
      <HvSimpleGrid id={cardsId} cols={3}>
        {instance?.rows?.map((row) => {
          return (
            <HvCard bgcolor="atmo1" key={`${row?.values?.name}-row`} style={{ width: "100%" }}>
              <HvCardHeader title={row?.values?.name} />
              <HvCardContent>Event: {row?.values?.eventType}</HvCardContent>
              <HvCardContent>Severity: {row?.values?.severity}</HvCardContent>
              <HvCardContent>Temperature: {row?.values?.temperature}</HvCardContent>
            </HvCard>
          );
        })}
      </HvSimpleGrid>
    </div>
  );
};
