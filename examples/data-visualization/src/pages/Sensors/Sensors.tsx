import React, { useEffect, useMemo, useState } from "react";

import {
  HvGrid,
  HvGlobalActions,
  HvCheckBoxGroup,
  HvCheckBox,
  HvStack,
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

// ECharts have problems with BIGINT, so we cast to INTEGER
const initialQuery = `select
  A.datetime,
  CAST(A.sensor1 as INTEGER) as sensor1,
  CAST(A.sensor2 as INTEGER) as sensor2,
  CAST(A.sensor3 as INTEGER) as sensor3,
  CAST(A.sensor4 as INTEGER) as sensor4,
  CAST(A.sensor5 as INTEGER) as sensor5,
  CAST(A.sensor6 as INTEGER) as sensor6,
  CAST(A.sensor7 as INTEGER) as sensor7
  from public.sensors as A
  ORDER BY A.datetime`;

const valueFormatter = (value?: number | string) =>
  `${parseFloat(Number(value).toFixed(2))}`;

const Project: React.FC = () => {
  const [pushDownQuery, setPushDownQuery] = useState<boolean>(false);

  const [measures, setMeasures] = useState<string[]>(["sensor1"]);
  const groupBy = "datetime";

  const sqlQuery = useMemo(() => {
    if (!pushDownQuery) {
      return initialQuery;
    }

    const measureFields = measures
      .map((m) => `CAST(A.${m} as INTEGER) as ${m}`)
      .join(", ");
    const keyField = `A.${groupBy}`;
    const keyFields = keyField;

    const fromClause = "public.sensors as A";

    return `select ${keyFields}, ${measureFields} from ${fromClause} order by ${groupBy}`;
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
            showSelectAll
            onChange={(
              event: React.ChangeEvent<HTMLInputElement>,
              value: string[]
            ) => {
              if (pushDownQuery) setData(undefined);
              setMeasures(value);
            }}
          >
            <HvCheckBox label="Sensor 1" value="sensor1" />
            <HvCheckBox label="Sensor 2" value="sensor2" />
            <HvCheckBox label="Sensor 3" value="sensor3" />
            <HvCheckBox label="Sensor 4" value="sensor4" />
            <HvCheckBox label="Sensor 5" value="sensor5" />
            <HvCheckBox label="Sensor 6" value="sensor6" />
            <HvCheckBox label="Sensor 7" value="sensor7" />
          </HvCheckBoxGroup>
        </HvStack>
      </HvGrid>
      <HvGrid item xs={10}>
        <HvGlobalActions title="Visualization" variant="section" />
        {data && (
          <HvLineChart
            data={data}
            horizontalRangeSlider={{ show: true }}
            xAxis={{
              type: "time",
            }}
            groupBy={groupBy}
            measures={measures.map((m) => ({
              field: m,
              sampling: "lttb",
              hideSymbol: true,

              valueFormatter,
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
