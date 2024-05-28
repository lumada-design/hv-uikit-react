import { css, cx } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";
import {
  HvBoxplot,
  HvBoxplotProps,
  HvChartTooltipParams,
} from "@hitachivantara/uikit-react-viz";

const styles = {
  root: css({
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.bgSurface,
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
    borderBottom: `3px solid ${theme.colors.bgPage}`,
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
    color: theme.colors.text,
  }),
  color: css({
    display: "flex",
    width: 12,
    height: 12,
    padding: 4,
    border: `1px solid ${theme.colors.text}`,
  }),
};

const renderTooltip = (params?: HvChartTooltipParams) => {
  const value = params?.value;

  const valueToShow = value
    ? `$${Math.round(value?.[1] as number)} - $${Math.round(value?.[4] as number)}`
    : "No sales";

  return `
      <div class="${styles.root}">
        <div class="${cx(styles.container, styles.containerBorder)}">
          <div>
            <p class="${styles.label}">${params?.title}</p>
          </div>
        </div>
        <div class="${cx(styles.container, styles.containerBorder)}">
          <div class="${cx(styles.valuesContainer, styles.title)}">
            <div class="${cx(styles.label, styles.separator)}">
            ${params?.series?.[0]?.name}
            </div>
            <div class="${cx(styles.label, styles.separator)}">
            ${valueToShow}
            </div>
          </div>
        </div>
      </div>`;
};

export const CustomTooltip = ({ data }: { data: HvBoxplotProps["data"] }) => {
  return (
    <HvBoxplot
      name="Steel Wheels"
      data={data}
      groupBy="Country"
      measures="Sales"
      tooltip={{
        show: true,
        component: renderTooltip,
      }}
    />
  );
};
