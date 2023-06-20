import { CSSInterpolation, css, cx } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-react-core";
import { HvChartTooltipParams } from "@viz/types";
import { customTooltipData } from "./mockData";

const styles: { [key: string]: CSSInterpolation } = {
  root: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.colors.atmo1,
    width: "fit-content",
    minWidth: 220,
    boxShadow: theme.colors.shadow,
  },
  container: {
    padding: theme.spacing(["15px", "sm"]),
    display: "flex",
    flexDirection: "column",
  },
  containerBorder: {
    borderBottom: `3px solid ${theme.colors.atmo2}`,
  },
  valuesContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    marginBottom: 10,
  },
  separator: {
    marginRight: theme.space.md,
  },
  thresholdContainer: {
    display: "flex",
    alignItems: "center",
    "& > div": {
      width: 24,
      height: 24,
      "& > svg": {
        marginLeft: 0,
      },
    },
  },
  label: {
    fontFamily: theme.fontFamily.body,
    fontWeight: theme.fontWeights.semibold,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
  },
  text: {
    fontFamily: theme.fontFamily.body,
    fontWeight: theme.fontWeights.normal,
    fontSize: theme.fontSizes.sm,
    color: theme.colors.secondary,
  },
  icon: {
    display: "flex",
    "& svg": {
      margin: "auto",
      color: "inherit",
    },
    width: 32,
    height: 32,
  },
};

const percentage = (value: number) => Math.round(value * 100);

const thresholdSwitcher = (
  value: number,
  index: number,
  thresholds: {
    name: string;
    value: number;
  }[]
) => {
  const roundedValue = percentage(value);
  if (index === 0) return `> ${roundedValue}%`;
  if (index === thresholds.length - 1) return `< ${roundedValue}%`;

  const previousValue = percentage(thresholds[index - 1].value);
  return `${roundedValue}% - ${previousValue}%`;
};

const iconSwitcher = (value: string) =>
  ({
    good: `<div class="${css(styles.icon)}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16" width="16">
                  <path fill="${
                    theme.colors.positive
                  }" d="M6.387 12 4 9.613l.707-.707 1.613 1.613 4.65-5.58.768.641zM8 15a6.953 6.953 0 0 1-4.943-2.057A7.023 7.023 0 1 1 8 15m8-7a8 8 0 1 0-8 8 8 8 0 0 0 8-8z"></path>
                </svg>
              </div>`,
    average: `<div class="${css(styles.icon)}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16" width="16">
                  <g fill="${theme.colors.warning}">
                    <path d="M8 0C3.58179 0 0 3.58173 0 8s3.58179 8 8 8 8-3.58173 8-8c-.00488-4.41626-3.58374-7.99506-8-8zm0 15c-3.86597 0-7-3.13403-7-7 0-3.86603 3.13403-7 7-7s7 3.13397 7 7c-.00439 3.86414-3.13574 6.99561-7 7z"></path>
                    <path d="M5 7.5h6v1H5z"></path>
                  </g>
                </svg>
              </div>`,
    poor: `<div class="${css(styles.icon)}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16" width="16">
                  <path fill="${
                    theme.colors.sema12
                  }" d="M7.5 4.001h1v6h-1zm0 8h1v-1h-1zM16 8a8 8 0 1 0-8 8 8 8 0 0 0 8-8zm-1 0a7 7 0 1 1-7-7 7 7 0 0 1 7 7z"></path>
                </svg>
              </div>`,
    bad: `<div class="${css(styles.icon)}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16" width="16">
                  <g fill="${theme.colors.sema14}">
                    <path d="M8 0C3.58179 0 0 3.58173 0 8s3.58179 8 8 8 8-3.58173 8-8c-.00488-4.41626-3.58374-7.99506-8-8zm0 15c-3.86597 0-7-3.13403-7-7 0-3.86603 3.13403-7 7-7s7 3.13397 7 7c-.00439 3.86414-3.13574 6.99561-7 7z"></path>
                    <path d="M9 11h1v1H9zm-3 0h1v1H6zm3-7h1v6H9zM6 4h1v6H6z"></path>
                 </g>
                </svg>
              </div>`,
    critical: `<div class="${css(styles.icon)}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="16" width="16">
                  <g fill="${theme.colors.sema6}">
                    <path d="M8 0C3.58179 0 0 3.58173 0 8s3.58179 8 8 8 8-3.58173 8-8c-.00488-4.41626-3.58374-7.99506-8-8zm0 15c-3.86597 0-7-3.13403-7-7 0-3.86603 3.13403-7 7-7s7 3.13397 7 7c-.00439 3.86414-3.13574 6.99561-7 7z"></path>
                    <path d="M7.5 11h1v1h-1zm3 0h1v1h-1zm-6 0h1v1h-1zm3-7h1v6h-1zm3 0h1v6h-1zm-6 0h1v6h-1z"></path>
                  </g>
                </svg>
              </div>`,
  }[value.toLowerCase()]);

export const renderTooltip = (params?: HvChartTooltipParams) => {
  const metric = customTooltipData.metrics.find(
    (m) => m.metric === params?.title
  );

  const colorValue = metric?.threshold.find(
    (ts, tsIndex) =>
      metric.value >= ts.value || tsIndex === metric.threshold.length - 1
  );

  return `
      <div class="${css(styles.root)}">
        <div class="${cx(css(styles.container), css(styles.containerBorder))}">
          <div>
            <p class="${css(styles.label)}">${metric?.metric}</p>
          </div>
        </div>
        <div class="${cx(css(styles.container), css(styles.containerBorder))}">
          <div class="${cx(css(styles.valuesContainer), css(styles.title))}">
            <div class="${cx(css(styles.label), css(styles.separator))}">
              ${colorValue?.name}
            </div>
            <div class="${css(styles.thresholdContainer)}">
              ${iconSwitcher(colorValue?.name || "")}
              <p class="${css(styles.text)}">${
    metric?.value ? percentage(metric.value) : "-"
  }%</p>
            </div>
          </div>
          <div class="${css(styles.valuesContainer)}">
            <div class="${cx(css(styles.label), css(styles.separator))}">
              Total times
            </div>
            <div class="${css(styles.text)}">${
    customTooltipData.totalTimes
  }</div>
          </div>
        </div>
        <div class="${css(styles.container)}">
          <p class="${cx(css(styles.title), css(styles.label))}">
            Thresholds
          </p>
            ${metric?.threshold
              ?.map(
                (threshold, index) =>
                  `
              <div key="${threshold.name}" class="${css(
                    styles.valuesContainer
                  )}">
                <div class="${cx(
                  css(styles.thresholdContainer),
                  css(styles.separator)
                )}">
                  ${iconSwitcher(threshold.name)}
                  <p class="${css(styles.label)}">${threshold.name}</p>
                </div>
                <div class="${css(styles.text)}">
                  ${thresholdSwitcher(threshold.value, index, metric.threshold)}
                </div>
              </div>
              `
              )
              .join(" ")}
        </div>
      </div>`;
};
