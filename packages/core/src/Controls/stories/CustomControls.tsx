import { useMemo, useState } from "react";
import {
  HvButton,
  HvCard,
  HvCardContent,
  HvCardHeader,
  HvControls,
  HvLabel,
  HvLeftControl,
  HvMultiButton,
  HvRightControl,
  HvSimpleGrid,
  HvSlider,
  HvSliderProps,
  HvTableColumnConfig,
  useHvData,
  useHvFilters,
} from "@hitachivantara/uikit-react-core";
import { Cards } from "@hitachivantara/uikit-react-icons";

import { makeData, NewEntry } from "../makedata";

const singleView = [
  {
    id: "card",
    icon: <Cards />,
    "aria-label": "Select card view",
  },
];

export const CustomControls = () => {
  const originalData = useMemo(() => makeData(15), []);
  const [data] = useState(originalData);
  const [severitySelection, setSeveritySelection] = useState(0);
  const [temperatureSelection, setTemperatureSelection] = useState(0);
  const buttons = useMemo(
    () => ["All", "Critical", "Major", "Average", "Minor"],
    [],
  );

  const columns = useMemo<HvTableColumnConfig<NewEntry, string>[]>(() => {
    const filterSeverity: HvTableColumnConfig<NewEntry>["filter"] = (rows) =>
      rows.filter(
        (row) =>
          buttons[severitySelection] === "All" ||
          row.original.severity === buttons[severitySelection],
      );

    const filterTemperature: HvTableColumnConfig<NewEntry>["filter"] = (rows) =>
      rows.filter(
        (row) => row.original.temperature > String(temperatureSelection),
      );

    return [
      { Header: "Title", accessor: "name" },
      { Header: "Event Type", accessor: "eventType" },
      { Header: "Status", accessor: "status" },
      { Header: "Severity", accessor: "severity", filter: filterSeverity },
      { Header: "Priority", accessor: "priority" },
      {
        Header: "Temperature",
        accessor: "temperature",
        filter: filterTemperature,
      },
    ];
  }, [temperatureSelection, buttons, severitySelection]);

  const { rows, setFilter } = useHvData<NewEntry, string>(
    {
      data,
      columns,
    },
    useHvFilters,
  );

  const handleChange = (_: any, idx: number) => {
    setSeveritySelection(idx);
    setFilter?.("severity", buttons[idx]);
  };

  const onSliderChange: HvSliderProps["onChange"] = (values) => {
    setTemperatureSelection(values[0]);
    setFilter?.("temperature", values[0]);
  };

  const cardsId = "CustomControlsCardsId";

  return (
    <div
      style={{
        display: "grid",
        gap: 8,
      }}
    >
      <HvControls views={singleView} defaultView="card" hideViewSwitcher>
        <HvLeftControl hideSearch>
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
            style={{ width: "200px", zIndex: 40 }}
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
