import { Meta, StoryObj } from "@storybook/react";
import { css } from "@emotion/css";
import {
  HvContainer,
  HvInput,
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
  args: { tooltipPosition: "top" },
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

    return <HvScrollToHorizontal {...args} id="main" options={options} />;
  },
};

export const WithContent = () => {
  const options = [
    { label: "Server status summary", value: "contentId1" },
    { label: "Optimization", value: "contentId2" },
    { label: "Performance analysis", value: "contentId3" },
    { label: "Insights", value: "contentId4" },
  ];

  const styles = {
    container: css({
      height: "1000px",
      backgroundColor: theme.colors.atmo3,
      marginBottom: "20px",
      padding: "30px",
      outline: "none",
    }),
    page: css({
      height: "1080px",
      overflow: "auto",
      padding: "0 20px",
    }),
    title: css({
      paddingBottom: "30px",
    }),
    component: css({
      width: "400px",
    }),
  };

  const elementsIds = ["ele1", "ele2", "ele3", "ele4"];

  return (
    <HvContainer>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div id="pageContentId" className={styles.page}>
          <HvScrollToHorizontal
            id="WithContent"
            href
            options={options}
            scrollElementId="pageContentId"
            position="sticky"
            offset={150}
          />
          <div tabIndex={-1} id={options[0].value} className={styles.container}>
            <div className={styles.title}>
              <HvTypography variant="title1">{options[0].label}</HvTypography>
            </div>
            <div className={styles.component}>
              <HvInput id={elementsIds[0]} name="textField0" label="label1" />
            </div>
          </div>
          <div tabIndex={-1} id={options[1].value} className={styles.container}>
            <div className={styles.title}>
              <HvTypography variant="title1">{options[1].label}</HvTypography>
            </div>
            <div className={styles.component}>
              <HvInput id={elementsIds[1]} name="textField1" label="label2" />
            </div>
          </div>
          <div tabIndex={-1} id={options[2].value} className={styles.container}>
            <div className={styles.title}>
              <HvTypography variant="title1">{options[2].label}</HvTypography>
            </div>
            <div className={styles.component}>
              <HvInput id={elementsIds[2]} name="textField2" label="label3" />
            </div>
          </div>
          <div tabIndex={-1} id={options[3].value} className={styles.container}>
            <div className={styles.title}>
              <HvTypography variant="title1">{options[3].label}</HvTypography>
            </div>
            <div className={styles.component}>
              <HvInput id={elementsIds[3]} name="textField3" label="label4" />
            </div>
          </div>
        </div>
      </div>
    </HvContainer>
  );
};

WithContent.parameters = {
  docs: {
    description: {
      story:
        "Basic navigation providing a clickable area to show scrolling capabilities.",
    },
  },
  eyes: { include: false },
};

export const Overflow: StoryObj<HvScrollToHorizontalProps> = {
  parameters: {
    docs: {
      description: {
        story: "Scroll to with big strings on the items.",
      },
    },
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

    return (
      <HvScrollToHorizontal
        id="bigScroll"
        scrollElementId="nothing"
        options={options}
      />
    );
  },
};
