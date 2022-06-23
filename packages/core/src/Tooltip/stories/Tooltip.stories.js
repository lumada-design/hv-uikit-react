/* eslint-disable react/prop-types */
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { HvTooltip, HvTypography } from "../..";
import tooltipStyling from "../styles";

export default {
  title: "Overlay/Tooltip",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvTooltip } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.6.0",
  },
  component: HvTooltip,
};

export const Main = () => {
  const styling = {
    placeholder: {
      display: "flex",
      textAlign: "center",
      justifyContent: "space-between",
      maxWidth: 600,
      margin: "0 auto",
      paddingTop: 80,
    },
  };

  const data = <HvTypography>Grid View</HvTypography>;

  return (
    <div style={styling.placeholder}>
      <HvTooltip title={data}>
        <HvTypography>Hover here</HvTypography>
      </HvTooltip>
      <HvTooltip title={data} open>
        <HvTypography>Tooltip open</HvTypography>
      </HvTooltip>
    </div>
  );
};

export const LongText = () => {
  const data = (
    <HvTypography>
      Tooltips can showcase truncated text. The text should be concise and not redundant.
    </HvTypography>
  );

  return (
    <HvTooltip title={data}>
      <HvTypography id="placeholder" tabIndex="0">
        Hover here
      </HvTypography>
    </HvTooltip>
  );
};

const LongTextContainer = ({ children }) => (
  <div
    style={{
      display: "flex",
      textAlign: "center",
      justifyContent: "center",
      paddingTop: 90,
    }}
  >
    {children}
  </div>
);

LongText.decorators = [(storyFn) => <LongTextContainer>{storyFn()}</LongTextContainer>];

export const Multiline = () => {
  const title = {
    title: "January",
    elements: [
      { name: "Sales", value: "52,000 units" },
      { name: "Profit", value: "50%" },
    ],
  };

  const TooltipContent = ({ classes }) => (
    <div>
      <div className={classes.title}>
        <div>
          <HvTypography variant="highlightText">{title.title}</HvTypography>
        </div>
      </div>
      <div className={classes.valueWrapper}>
        {title.elements.map((element) => (
          <div key={element.name} className={classes.values}>
            <HvTypography variant="highlightText">{element.name}</HvTypography>
            <div className={classes.separator} />
            <HvTypography>{element.value}</HvTypography>
          </div>
        ))}
      </div>
    </div>
  );

  const TooltipContentWithStyles = withStyles(tooltipStyling)(TooltipContent);

  return (
    <HvTooltip title={<TooltipContentWithStyles />} useSingle={false}>
      <HvTypography>Hover here</HvTypography>
    </HvTooltip>
  );
};

const MultilineContainer = ({ children }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      paddingTop: 170,
    }}
  >
    {children}
  </div>
);

Multiline.decorators = [(storyFn) => <MultilineContainer>{storyFn()}</MultilineContainer>];

export const MultilineWithoutHeader = () => {
  const data = [
    { name: "Status", value: "Open" },
    { name: "Date", value: "12/08/2018" },
    { name: "Assignee", value: "Management" },
    { name: "Approval", value: "Not yet requested" },
  ];

  const TooltipContent = ({ classes }) => (
    <div className={classes.valueWrapper}>
      {data.map((element) => (
        <div key={element.name} className={classes.values}>
          <HvTypography variant="highlightText">{element.name}</HvTypography>
          <div className={classes.separator} />
          <HvTypography>{element.value}</HvTypography>
        </div>
      ))}
    </div>
  );

  const TooltipContentWithStyles = withStyles(tooltipStyling)(TooltipContent);

  return (
    <HvTooltip title={<TooltipContentWithStyles />} useSingle={false}>
      <HvTypography>Hover here</HvTypography>
    </HvTooltip>
  );
};

MultilineWithoutHeader.decorators = [
  (storyFn) => <MultilineContainer>{storyFn()}</MultilineContainer>,
];
