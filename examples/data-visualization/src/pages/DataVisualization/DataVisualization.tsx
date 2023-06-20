import React, { useEffect, useMemo, useState } from "react";

import {
  HvGrid,
  HvGlobalActions,
  HvCheckBoxGroup,
  HvCheckBox,
  HvStack,
  HvDropdown,
} from "@hitachivantara/uikit-react-core";

import { HvLineChart } from "@hitachivantara/uikit-react-viz";

import { tableFromIPC } from "apache-arrow";
import { fromArrow } from "arquero";
import ColumnTable from "arquero/dist/types/table/column-table";
import { withProvider } from "providers/Provider";

export const executeQuery = async (sql: string) => {
  return tableFromIPC(
    fetch("http://localhost:8081/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sql }),
    })
  );
};

const dimensions = [
  { label: "Year", value: "year", selected: true },
  { label: "Month", value: "month" },
  { label: "Day of month", value: "day" },
  { label: "Date (timeseries)", value: "date" },
];

const fieldTableMap: Record<string, string> = {
  tmin: "A",
  tmax: "A",
  precipitation: "B",
};

const fieldAggMap: Record<string, "min" | "max" | "sum"> = {
  tmin: "min",
  tmax: "max",
  precipitation: "sum",
};

// ECharts have problems with BIGINT, so we cast to INTEGER
const initialQuery = `select
  CAST(A.year as INTEGER) as year,
  CAST(A.month as INTEGER) as month,
  CAST(A.day as INTEGER) as day,
  CAST(CAST(CONCAT(lpad(CAST(A.year as STRING), 4, '0'), '-', lpad(CAST(A.month as STRING), 2, '0'), '-', lpad(CAST(A.day as STRING), 2, '0'), 'T01:00:00Z') AS TIMESTAMP) AS DATE) as date,
  A.tmin, A.tmax, B.precipitation from public.lisbon_temperature as A FULL JOIN public.lisbon_precipitation as B ON A.year = B.year AND A.month = B.month AND A.day = B.day
  ORDER BY date`;

const temperatureFormater = (value?: number | string) =>
  `${parseFloat(Number(value).toFixed(2))}ºC`;
const precipitationFormatter = (value?: number | string) =>
  `${parseFloat(Number(value).toFixed(2))}mm`;

const Project: React.FC = () => {
  const [pushDownQuery, setPushDownQuery] = useState<boolean>(false);

  const [measures, setMeasures] = useState<string[]>(["tmin", "tmax"]);
  const [groupBy, setGroupBy] = useState<string>("year");

  const sqlQuery = useMemo(() => {
    if (!pushDownQuery) {
      return initialQuery;
    }

    const measureFields = measures
      .map(
        (m) =>
          `${fieldAggMap[m].toUpperCase()}(${fieldTableMap[m]}.${m}) as ${m}`
      )
      .join(", ");
    const noA = !measureFields.includes("A.");
    const keyField = `${noA ? "B" : "A"}.${groupBy}`;
    const keyFields = groupBy
      ? groupBy !== "date"
        ? `CAST(${keyField} as INTEGER) as ${groupBy}, `
        : `CAST(CAST(CONCAT(lpad(CAST(A.year as STRING), 4, '0'), '-', lpad(CAST(A.month as STRING), 2, '0'), '-', lpad(CAST(A.day as STRING), 2, '0'), 'T01:00:00Z') AS TIMESTAMP) AS DATE) as date, `
      : "";

    let fromClause = "public.lisbon_temperature as A";
    if (noA) {
      fromClause = "public.lisbon_precipitation as B";
    } else if (measures.includes("precipitation")) {
      fromClause =
        "public.lisbon_temperature as A FULL JOIN public.lisbon_precipitation as B ON A.year = B.year AND A.month = B.month AND A.day = B.day";
    }

    return `select ${keyFields}${measureFields} from ${fromClause} group by ${
      groupBy !== "date" ? keyField : groupBy
    } order by ${groupBy}`;
  }, [pushDownQuery, measures, groupBy]);

  const [data, setData] = useState<ColumnTable>();

  useEffect(() => {
    executeQuery(sqlQuery).then((value) => {
      setData(fromArrow(value));
    });
  }, [sqlQuery]);

  const [debugStartCols, setDebugStartCols] = useState<number>(0);
  const [debugStartRows, setDebugStartRows] = useState<number>(0);

  useEffect(() => {
    setDebugStartCols(data?.numCols() ?? 0);
    setDebugStartRows(data?.numRows() ?? 0);
    data?.print();
  });

  return (
    <HvGrid container>
      <HvGrid item xs={2}>
        <HvStack>
          <HvGlobalActions title="Config" variant="section" />
          <HvCheckBox
            label="Push down query"
            value={pushDownQuery}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              value: boolean
            ) => {
              setPushDownQuery(value);
            }}
          />
          <HvCheckBoxGroup
            label="Measure"
            name="measures"
            value={measures}
            onChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              value: string[]
            ) => {
              if (pushDownQuery) setData(undefined);
              setMeasures(value);
            }}
          >
            <HvCheckBox label="Min. Temperature" value="tmin" />
            <HvCheckBox label="Max. Temperature" value="tmax" />
            <HvCheckBox label="Precipitation" value="precipitation" />
          </HvCheckBoxGroup>
          <HvDropdown
            label="Group by"
            values={dimensions}
            placement="left"
            onChange={(v: any) => {
              if (pushDownQuery) setData(undefined);
              setGroupBy(v?.value);
            }}
            singleSelectionToggle={false}
          />
        </HvStack>
      </HvGrid>
      <HvGrid item xs={10}>
        <HvGlobalActions title="Visualization" variant="section" />
        {data && (
          <HvLineChart
            data={data}
            horizontalRangeSlider={{ show: true }}
            xAxis={{
              type: groupBy === "date" ? "time" : "categorical",
            }}
            yAxis={[
              { id: "temperature", labelFormatter: temperatureFormater },
              { id: "precipitation", labelFormatter: precipitationFormatter },
            ]}
            groupBy={groupBy}
            measures={measures.map((m) => ({
              field: m,
              sampling: fieldAggMap[m],
              agg: fieldAggMap[m],
              hideSymbol: true,

              yAxis: m === "precipitation" ? "precipitation" : "temperature",
              valueFormatter:
                m === "precipitation"
                  ? precipitationFormatter
                  : temperatureFormater,
            }))}
            sortBy={groupBy}
          />
        )}
      </HvGrid>
      <HvGrid item xs={12}>
        <HvGlobalActions title="Query" variant="section" />
        <code>{sqlQuery}</code>
        <div>
          <strong>
            {debugStartCols} cols x {debugStartRows} rows
          </strong>
        </div>
      </HvGrid>
    </HvGrid>
  );
};

export default withProvider(Project);
