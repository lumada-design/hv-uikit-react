import React, { useEffect, useMemo, useState } from "react";

import {
  HvGrid,
  HvTypography,
  HvGlobalActions,
  HvCheckBoxGroup,
  HvCheckBox,
  HvStack,
  HvDropdown,
  HvSwitch,
} from "@hitachivantara/uikit-react-core";

import {
  HvBarChart,
  HvChartAggregation,
  HvLineChart,
} from "@hitachivantara/uikit-react-viz";

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
  { label: "Territory", value: "territory" },
  { label: "Country", value: "country" },
  { label: "State Province", value: "state_province" },
  { label: "City", value: "city" },
  { label: "Type", value: "type" },
  { label: "Line", value: "line" },
  { label: "Vendor", value: "vendor" },
  { label: "Product", value: "product" },
  { label: "Year", value: "year" },
  { label: "Quarter", value: "quarter" },
  { label: "Month", value: "month" },
  { label: "Customer", value: "customer" },
];

const fieldAggMap: Record<string, [string, HvChartAggregation]> = {
  quantity: ["avg", "average"],
  sales: ["avg", "average"],
};

// ECharts have problems with BIGINT, so we cast to INTEGER
const initialQuery = `select A.territory, A.country, A.state_province, A.city, A.type, A.line, A.vendor, A.product,
  CAST(A.year as INTEGER) as year,
  A.quarter, A.month,
  A.customer,
  CAST(A.quantity as INTEGER) as quantity,
  CAST(A.sales as INTEGER) as sales
  from public.steelwheels as A`;

const moneyFormatter = (value?: number | string) =>
  `$${Number(value).toFixed(2)}`;
const quantityFormatter = (value?: number | string) =>
  `${parseFloat(Number(value).toFixed(2))}`;

const Project: React.FC = () => {
  const [pushDownQuery, setPushDownQuery] = useState<boolean>(false);

  const [measures, setMeasures] = useState<string[]>(["sales"]);
  const [groupBy, setGroupBy] = useState<string[]>(["territory"]);
  const [splitBy, setSplitBy] = useState<string[]>(["year"]);

  const sqlQuery = useMemo(() => {
    if (!pushDownQuery) {
      return initialQuery;
    }

    const measureFields = measures
      .map(
        (m) =>
          `${fieldAggMap[m][0].toUpperCase()}(CAST(A.${m} as INTEGER)) as ${m}`
      )
      .join(", ");
    const keyFields = [...groupBy, ...splitBy].map((g) => `A.${g}`).join(", ");

    const fromClause = "public.steelwheels as A";

    return `select ${keyFields}, ${measureFields} from ${fromClause} group by ${keyFields}`;
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

  const [chartType, setChartType] = useState<"bar" | "line">("bar");
  const ChartComponent = chartType === "bar" ? HvBarChart : HvLineChart;

  return (
    <HvGrid container>
      <HvGrid item xs={12}>
        <HvTypography variant="title2">Data Visualization Example</HvTypography>
      </HvGrid>
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
            <HvCheckBox label="Sales (average)" value="sales" />
            <HvCheckBox label="Quantity (average)" value="quantity" />
          </HvCheckBoxGroup>
          <HvDropdown
            label="Group by"
            multiSelect
            showSearch
            maxHeight={100}
            values={dimensions.map((d) => ({
              ...d,
              selected: groupBy.includes(d.value),
            }))}
            placement="left"
            onChange={(v: any) => {
              if (pushDownQuery) setData(undefined);
              setGroupBy(v?.map((d: any) => d.value));
            }}
            singleSelectionToggle={false}
          />
          <HvDropdown
            label="Split by"
            multiSelect
            showSearch
            maxHeight={100}
            values={dimensions.map((d) => ({
              ...d,
              selected: splitBy.includes(d.value),
            }))}
            placement="left"
            onChange={(v: any) => {
              if (pushDownQuery) setData(undefined);
              setSplitBy(v?.map((d: any) => d.value));
            }}
            singleSelectionToggle={false}
          />
        </HvStack>
      </HvGrid>
      <HvGrid item xs={10}>
        <HvGlobalActions title="Visualization" variant="section">
          Bar Chart{" "}
          <HvSwitch
            aria-label="Show debug info"
            onChange={() => {
              setChartType((old) => (old === "bar" ? "line" : "bar"));
            }}
            value={chartType === "line"}
          />{" "}
          Line Chart
        </HvGlobalActions>
        {data && (
          <ChartComponent
            data={data}
            xAxis={{
              labelFormatter: (s) => {
                if (typeof s === "string") {
                  return s.split("_").join(" ");
                }
                return s != null ? Number(s).toFixed(2) : "-";
              },
            }}
            yAxis={[
              { id: "sales", labelFormatter: moneyFormatter },
              { id: "quantity", labelFormatter: quantityFormatter },
            ]}
            groupBy={groupBy}
            splitBy={splitBy}
            measures={measures.map((m) => ({
              field: m,
              agg: fieldAggMap[m][1],
              stack: chartType !== "line" ? m : undefined,
              yAxis: m,
              valueFormatter:
                m === "sales" ? moneyFormatter : quantityFormatter,
            }))}
            seriesNameFormatter={(s?: string) => `${s?.split("_").join(" ")}`}
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
