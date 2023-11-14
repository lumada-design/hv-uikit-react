import { DashboardProps } from "../Dashboard";
import { DashboardContentType, Renderer } from "./Renderers";
import { DashboardSpecs } from "../types";

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
  nodes?: DashboardSpecs["nodes"]
): DashboardProps["content"] => {
  if (nodes) {
    return nodes.reduce((acc: NonNullable<DashboardProps["content"]>, cur) => {
      const type = getType(cur.node.type);

      if (type) {
        acc.push({
          id: cur.node.id,
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
  }
};
