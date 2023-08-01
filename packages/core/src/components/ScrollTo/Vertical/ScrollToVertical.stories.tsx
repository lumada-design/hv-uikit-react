import { Meta, StoryObj } from "@storybook/react";
import {
  HvContainer,
  HvInput,
  HvScrollToVertical,
  HvScrollToVerticalProps,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";

const meta: Meta<typeof HvScrollToVertical> = {
  title: "Components/Scroll To/Vertical",
  component: HvScrollToVertical,
};
export default meta;

export const Main: StoryObj<HvScrollToVerticalProps> = {
  args: {
    tooltipPosition: "left",
  },
  render: (args) => {
    const options = [
      { label: "Server status summary", value: "mainId1" },
      { label: "Optimization", value: "mainId2" },
      { label: "Performance analysis", value: "mainId3" },
      { label: "Insights", value: "mainId4" },
    ];

    return <HvScrollToVertical {...args} id="main" options={options} />;
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
      display: "flex",
      position: "relative",
    }),
    content: css({
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
    <div className={styles.container}>
      <HvContainer>
        <HvScrollToVertical
          id="WithContent"
          href
          options={options}
          scrollElementId="pageContentId"
          position="absolute"
          offset={150}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div id="pageContentId" className={styles.page}>
            <div tabIndex={-1} id={options[0].value} className={styles.content}>
              <div className={styles.title}>
                <HvTypography variant="title1">{options[0].label}</HvTypography>
              </div>
              <div className={styles.component}>
                <HvInput id={elementsIds[0]} name="textField0" label="label1" />
              </div>
            </div>
            <div tabIndex={-1} id={options[1].value} className={styles.content}>
              <div className={styles.title}>
                <HvTypography variant="title1">{options[1].label}</HvTypography>
              </div>
              <div className={styles.component}>
                <HvInput id={elementsIds[1]} name="textField1" label="label2" />
              </div>
            </div>
            <div tabIndex={-1} id={options[2].value} className={styles.content}>
              <div className={styles.title}>
                <HvTypography variant="title1">{options[2].label}</HvTypography>
              </div>
              <div className={styles.component}>
                <HvInput id={elementsIds[2]} name="textField2" label="label3" />
              </div>
            </div>
            <div tabIndex={-1} id={options[3].value} className={styles.content}>
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
    </div>
  );
};

WithContent.parameters = {
  docs: {
    description: {
      story:
        "Basic navigation providing a clickable area to show scrolling capabilities.",
    },
  },
};
