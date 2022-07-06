import React from "react";
import { makeStyles } from "@material-ui/core";
import { HvScrollToHorizontal, HvContainer, HvInput, HvTypography } from "../../..";

export default {
  title: "Navigation/ScrollTo/Horizontal",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvScrollToHorizontal } from '@hitachivantara/uikit-react-core'",
  },
  component: HvScrollToHorizontal,
};

export const Main = () => {
  const options = [
    { label: "Server status summary", value: "mainId1" },
    { label: "Optimization", value: "mainId2" },
    { label: "Performance analysis", value: "mainId3" },
    { label: "Insights", value: "mainId4" },
  ];
  return <HvScrollToHorizontal id="main" options={options} />;
};

export const WithContent = () => {
  const options = [
    { label: "Server status summary", value: "contentId1" },
    { label: "Optimization", value: "contentId2" },
    { label: "Performance analysis", value: "contentId3" },
    { label: "Insights", value: "contentId4" },
  ];

  const useStyles = makeStyles((theme) => ({
    container: {
      height: "1000px",
      backgroundColor: theme.palette.atmo3,
      marginBottom: "20px",
      padding: "30px",
      outline: "none",
    },
    page: {
      height: "1080px",
      overflow: "auto",
      padding: "0 20px",
    },
    title: {
      paddingBottom: "30px",
    },
    component: {
      width: "400px",
    },
  }));
  const classes = useStyles();
  const elementsIds = ["ele1", "ele2", "ele3", "ele4"];

  return (
    <HvContainer>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div id="pageContentId" className={classes.page}>
          <HvScrollToHorizontal
            id="WithContent"
            href
            options={options}
            scrollElementId="pageContentId"
            position="sticky"
            offset={150}
          />
          <div tabIndex={-1} id={options[0].value} className={classes.container}>
            <div className={classes.title}>
              <HvTypography variant="xlTitle">{options[0].label}</HvTypography>
            </div>
            <div className={classes.component}>
              <HvInput id={elementsIds[0]} name="textField0" label="label1" />
            </div>
          </div>
          <div tabIndex={-1} id={options[1].value} className={classes.container}>
            <div className={classes.title}>
              <HvTypography variant="xlTitle">{options[1].label}</HvTypography>
            </div>
            <div className={classes.component}>
              <HvInput id={elementsIds[1]} name="textField1" label="label2" />
            </div>
          </div>
          <div tabIndex={-1} id={options[2].value} className={classes.container}>
            <div className={classes.title}>
              <HvTypography variant="xlTitle">{options[2].label}</HvTypography>
            </div>
            <div className={classes.component}>
              <HvInput id={elementsIds[2]} name="textField2" label="label3" />
            </div>
          </div>
          <div tabIndex={-1} id={options[3].value} className={classes.container}>
            <div className={classes.title}>
              <HvTypography variant="xlTitle">{options[3].label}</HvTypography>
            </div>
            <div className={classes.component}>
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
      story: "Basic navigation providing a clickable area to show scrolling capabilities",
    },
  },
};

export const Overflow = () => {
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

  return <HvScrollToHorizontal id="bigScroll" scrollElementId="nothing" options={options} />;
};

Overflow.parameters = {
  docs: {
    description: {
      story: "Scroll to with big strings on the items",
    },
  },
};
