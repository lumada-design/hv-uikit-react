import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvContainer,
  HvInput,
  HvPanel,
  HvScrollToVertical,
  HvScrollToVerticalProps,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvScrollToVertical> = {
  title: "Components/ScrollToVertical",
  component: HvScrollToVertical,
};
export default meta;

export const Main: StoryObj<HvScrollToVerticalProps> = {
  args: {
    navigationMode: "push",
    position: "absolute",
    tooltipPosition: "left",
    offset: 20,
  },
  argTypes: {
    classes: { control: { disable: true } },
    options: { control: { disable: true } },
  },
  render: (args) => {
    const options = [
      { label: "Server status summary", value: "mainId1" },
      { label: "Optimization", value: "mainId2" },
      { label: "Performance analysis", value: "mainId3" },
      { label: "Insights", value: "mainId4" },
    ];

    const styles = {
      container: css({
        display: "flex",
        flexFlow: "column",
        gap: 30,
        maxHeight: 400,
        overflow: "auto",
        padding: "0 20px",
        width: "calc(100% - 60px)",
        "& > div": {
          minHeight: 400,
          backgroundColor: theme.colors.bgPageSecondary,
          outline: "none",
        },
      }),
      title: css({
        paddingBottom: theme.space.md,
      }),
      component: css({
        width: 400,
      }),
    };

    return (
      <div className="relative">
        <HvScrollToVertical
          {...args}
          scrollElementId="pageContentId"
          options={options}
        />
        <HvContainer id="pageContentId" className={styles.container}>
          {options.map((option) => (
            <HvPanel key={option.value} id={option.value}>
              <HvTypography variant="title1" className={styles.title}>
                {option.label}
              </HvTypography>
              <div className={styles.component}>
                <HvInput label="Label" />
              </div>
            </HvPanel>
          ))}
        </HvContainer>
      </div>
    );
  },
};
