import { DashboardLayout, DashboardProps } from "./Dashboard";
import { DashboardContentType, Renderer } from "./Renderers";
import { DashboardNode } from "../types";

const getType = (type?: string): DashboardContentType | undefined => {
  switch (type) {
    case "barChart":
      return "bar-chart";
    case "donutChart":
      return "donut-chart";
    case "lineChart":
      return "line-chart";
    case "kpi":
      return type;
    default:
      break;
  }
};

export const buildContent = (
  nodes: DashboardNode[]
): NonNullable<DashboardProps["content"]> => {
  return nodes.reduce((acc: NonNullable<DashboardProps["content"]>, cur) => {
    const type = getType(cur.node.type);

    if (type) {
      acc.push({
        id: cur.node.id,
        type,
        component: (
          <Renderer
            type={type}
            endpoint={cur.endpoint}
            measure={cur.node.data.measure}
            groupBy={cur.node.data.groupBy}
            title={cur.node.data.title}
            unit={cur.node.data.unit}
            aggregation={cur.node.data.aggregation}
          />
        ),
      });
    }

    return acc;
  }, []);
};

export const buildLayout = (
  content: NonNullable<DashboardProps["content"]>,
  layout?: DashboardLayout[]
) => {
  return content.map((node, idx) => {
    const item = layout?.find((x) => x.i === node.id);

    if (item) {
      return item;
    }

    const cols = 12;
    const w = 4;
    const h = 3;
    const perRow = cols / w;

    return {
      i: node.id,
      w,
      x: (idx * w) % cols,
      h: node.type === "kpi" ? 1 : h,
      y: Math.floor(idx / perRow) * h,
    };
  });
};
