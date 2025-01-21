import { css, keyframes } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";
import { HvBarChart, HvBarChartProps } from "@hitachivantara/uikit-react-viz";

const appear = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const styles = {
  root: css({
    position: "absolute",
    width: "fit-content",
    boxShadow: theme.colors.shadow,
    backgroundColor: theme.colors.atmo1,
    padding: theme.space.sm,
    display: "flex",
    fontFamily: theme.fontFamily.body,
    fontWeight: theme.fontWeights.normal,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
    animation: `${appear} .2s ease-in-out`,
  }),
};

const tooltipId = "viz-truncated-tooltip";

const events: HvBarChartProps["onEvents"] = {
  mouseover: (params, instance) => {
    if (params.componentType !== "yAxis") return;
    if (params.targetType !== "axisLabel") return;

    const fullValue = params.value;
    const targetValue = params.event?.target;
    const displayValue = targetValue?.style?.text;

    if (fullValue === displayValue) return;

    // Create tooltip
    const tooltip = document.createElement("div");
    tooltip.setAttribute("id", tooltipId);
    tooltip.className = `${styles.root} ${css({
      left: `${targetValue?.transform[4]}px`,
      top: `${targetValue?.transform[5]}px`,
    })}`;
    tooltip.innerText = fullValue;

    // Add tooltip
    instance?.getDom().appendChild(tooltip);
  },
  mouseout: (params) => {
    if (params.componentType !== "yAxis") return;
    if (params.targetType !== "axisLabel") return;

    // Remove tooltip
    document.getElementById(tooltipId)?.remove();
  },
};

export const CustomEchartsOptions = () => {
  const formatter = (value?: string | number) => `${Number(value) / 1000}k`;

  return (
    <HvBarChart
      data={{
        Group: [
          "Group 1 with a very very long label",
          "Group 2",
          "Group 3 with a very very long label",
        ],
        Sales: [2300, 1000, 7800],
        Target: [2100, 7700, 3000],
      }}
      groupBy="Group"
      measures={["Sales", "Target"]}
      xAxis={{
        labelFormatter: formatter,
      }}
      tooltip={{
        valueFormatter: formatter,
      }}
      horizontal
      stack="total"
      onOptionChange={(option) => {
        // Truncate axis label
        option.yAxis[0] = {
          ...option.yAxis[0],
          triggerEvent: true,
          axisLabel: {
            ...option.yAxis[0].axisLabel,
            overflow: "truncate",
            width: 80,
          },
        };
        return option;
      }}
      onEvents={events}
    />
  );
};
