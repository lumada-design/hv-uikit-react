import { css } from "@emotion/css";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvContainer,
  HvInput,
  HvPanel,
  HvScrollToHorizontal,
  HvScrollToHorizontalProps,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

const meta: Meta<typeof HvScrollToHorizontal> = {
  title: "Components/Scroll To/Horizontal",
  component: HvScrollToHorizontal,
};
export default meta;

export const Main: StoryObj<HvScrollToHorizontalProps> = {
  args: {
    navigationMode: "push",
    position: "sticky",
    tooltipPosition: "top",
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
        "& > div": {
          minHeight: 400,
          backgroundColor: theme.colors.atmo3,
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
      <>
        <HvScrollToHorizontal
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
      </>
    );
  },
};

export const Overflow: StoryObj<HvScrollToHorizontalProps> = {
  parameters: {
    docs: {
      description: {
        story: "Scroll to with big strings on the items.",
      },
    },
    // Enables Chromatic snapshot
    chromatic: { disableSnapshot: false },
    eyes: { include: true },
  },
  render: () => {
    const options = [
      { label: "Server status summaryssssssssssssssssssss", value: "Id1" },
      { label: "Optimization", value: "Id2" },
      { label: "Performance analysis", value: "Id3" },
      { label: "Insightssssssssssssssssssssssssssssss", value: "Id4" },
      { label: "Analytics", value: "Id5" },
      { label: "Indicators", value: "Id6" },
      { label: "Settings", value: "Id7" },
      { label: "Monitoring", value: "Id8" },
      { label: "About", value: "Id9" },
      { label: "Markers", value: "Id10" },
    ];

    return <HvScrollToHorizontal options={options} navigationMode="none" />;
  },
};
