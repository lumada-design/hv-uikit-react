import { css, cx } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";
import {
  HvChartTooltipParams,
  HvHeatmap,
} from "@hitachivantara/uikit-react-viz";

import { data as customData, days, hours } from "./data";

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.atmo1,
    width: "fit-content",
    minWidth: 220,
    boxShadow: theme.colors.shadow,
  }),
  container: css({
    padding: theme.spacing("15px", "sm"),
    display: "flex",
    flexDirection: "column",
  }),
  containerBorder: css({
    borderBottom: `3px solid ${theme.colors.atmo2}`,
  }),
  valuesContainer: css({
    display: "flex",
    gap: 8,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  }),
  title: css({
    marginBottom: 10,
  }),
  separator: css({
    marginRight: theme.space.md,
  }),
  thresholdContainer: css({
    display: "flex",
    alignItems: "center",
    "& > div": {
      width: 24,
      height: 24,
      "& > svg": {
        marginLeft: 0,
      },
    },
  }),
  label: css({
    fontFamily: theme.fontFamily.body,
    fontWeight: theme.fontWeights.semibold,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
  }),
  color: css({
    display: "flex",
    width: 12,
    height: 12,
    padding: 4,
    border: `1px solid ${theme.colors.secondary}`,
  }),
};

const renderTooltip = (params?: HvChartTooltipParams) => {
  const value = params?.value;

  const valueToShow = value
    ? `${days[Number(value[1])]} - ${hours[Number(value[0])]}`
    : "-";

  return `
      <div class="${styles.root}">
        <div class="${cx(styles.container, styles.containerBorder)}">
          <div>
            <p class="${styles.label}">${params?.title}</p>
          </div>
        </div>
        <div class="${cx(styles.container, styles.containerBorder)}">
          <div class="${cx(styles.valuesContainer, styles.title)}">
            <div class="${styles.color}" style="background-color: ${params?.series?.[0].color}"></div>
            <div class="${cx(styles.label, styles.separator)}">
              ${valueToShow}
            </div>
            <div class="${cx(styles.label, styles.separator)}">
            ${params?.series?.[0]?.name}
            </div>
          </div>
        </div>
      </div>`;
};

export const CustomTooltip = () => {
  return (
    <HvHeatmap
      name="My Heatmap"
      data={customData}
      xAxis={{ data: hours }}
      yAxis={{ data: days }}
      min={0}
      max={12}
      tooltip={{
        show: true,
        component: renderTooltip,
      }}
      colorScale={["#a65852", "#fbe45b"]}
    />
  );
};
