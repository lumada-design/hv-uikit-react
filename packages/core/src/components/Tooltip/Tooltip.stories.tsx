import { Meta, StoryObj } from "@storybook/react";
import { HvBox, HvTypography } from "~/components";
import { HvTooltip, HvTooltipProps } from "./Tooltip";
import tooltipClasses from "./tooltipClasses";

const meta: Meta<typeof HvTooltip> = {
  title: "Components/Tooltip/Tooltip",
  component: HvTooltip,
};
export default meta;

export const Main: StoryObj<HvTooltipProps> = {
  args: {
    open: true,
    title: <HvTypography>Grid View</HvTypography>,
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: ({ title, open }) => {
    {
      const styling = {
        placeholder: {
          display: "flex",
          justifyContent: "space-between",
          maxWidth: 600,
          margin: "0 auto",
          paddingTop: 80,
        },
      };

      return (
        <HvBox sx={styling.placeholder}>
          <HvTooltip title={title} open>
            <HvTypography>Hover here</HvTypography>
          </HvTooltip>
          <HvTooltip title={title} open={open}>
            <HvTypography>Tooltip open</HvTypography>
          </HvTooltip>
        </HvBox>
      );
    }
  },
};

export const LongText = () => {
  const styling = {
    longTextContainer: {
      display: "flex",
      justifyContent: "center",
      paddingTop: 90,
    },
  };

  const data = (
    <HvTypography>
      Tooltips can showcase truncated text. The text should be concise and not
      redundant.
    </HvTypography>
  );

  return (
    <HvBox sx={styling.longTextContainer}>
      <HvTooltip open title={data}>
        <HvTypography id="placeholder" tabIndex={0}>
          Hover here
        </HvTypography>
      </HvTooltip>
    </HvBox>
  );
};

export const Multiline = () => {
  const title = {
    title: "January",
    elements: [
      { name: "Sales", value: "52,000 units" },
      { name: "Profit", value: "50%" },
    ],
  };

  const styling = {
    longTextContainer: {
      display: "flex",
      justifyContent: "center",
      paddingTop: 170,
    },
  };

  const TooltipContent = ({ classes }) => (
    <div>
      <div className={classes.title}>
        <div>
          <HvTypography variant="label">{title.title}</HvTypography>
        </div>
      </div>
      <div className={classes.valueWrapper}>
        {title.elements.map((element) => (
          <div key={element.name} className={classes.values}>
            <HvTypography variant="label">{element.name}</HvTypography>
            <div className={classes.separator} />
            <HvTypography>{element.value}</HvTypography>
          </div>
        ))}
      </div>
    </div>
  );

  const classes = {
    values: tooltipClasses.values,
    title: tooltipClasses.title,
    separator: tooltipClasses.separator,
    valueWrapper: tooltipClasses.valueWrapper,
  };

  return (
    <HvBox sx={styling.longTextContainer}>
      <HvTooltip
        open
        title={<TooltipContent classes={classes} />}
        useSingle={false}
      >
        <HvTypography>Hover here</HvTypography>
      </HvTooltip>
    </HvBox>
  );
};

export const MultilineWithoutHeader = () => {
  const data = [
    { name: "Status", value: "Open" },
    { name: "Date", value: "12/08/2018" },
    { name: "Assignee", value: "Management" },
    { name: "Approval", value: "Not yet requested" },
  ];

  const styling = {
    container: {
      display: "flex",
      justifyContent: "center",
      paddingTop: 170,
    },
  };

  const TooltipContent = ({ classes }) => (
    <div className={classes.valueWrapper}>
      {data.map((element) => (
        <div key={element.name} className={classes.values}>
          <HvTypography variant="label">{element.name}</HvTypography>
          <div className={classes.separator} />
          <HvTypography>{element.value}</HvTypography>
        </div>
      ))}
    </div>
  );

  const classes = {
    values: tooltipClasses.values,
    title: tooltipClasses.title,
    separator: tooltipClasses.separator,
    valueWrapper: tooltipClasses.valueWrapper,
  };

  return (
    <HvBox sx={styling.container}>
      <HvTooltip
        open
        title={<TooltipContent classes={classes} />}
        useSingle={false}
      >
        <HvTypography>Hover here</HvTypography>
      </HvTooltip>
    </HvBox>
  );
};
