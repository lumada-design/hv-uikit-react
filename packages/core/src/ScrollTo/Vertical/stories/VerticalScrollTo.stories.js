import React from "react";
import { makeStyles } from "@mui/styles";
import { HvScrollToVertical, HvContainer, HvInput, HvTypography } from "../../..";

export default {
  title: "Navigation/ScrollTo/Vertical",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvScrollToVertical } from '@hitachivantara/uikit-react-core'",
  },
  component: HvScrollToVertical,
};

export const Main = () => {
  const options = [
    { label: "Server status summary", value: "mainId1" },
    { label: "Optimization", value: "mainId2" },
    { label: "Performance analysis", value: "mainId3" },
    { label: "Insights", value: "mainId4" },
  ];
  return <HvScrollToVertical id="main" options={options} />;
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
      display: "flex",
      position: "relative",
    },
    content: {
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
    <div className={classes.container}>
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
          <div id="pageContentId" className={classes.page}>
            <div tabIndex={-1} id={options[0].value} className={classes.content}>
              <div className={classes.title}>
                <HvTypography variant="xlTitle">{options[0].label}</HvTypography>
              </div>
              <div className={classes.component}>
                <HvInput id={elementsIds[0]} name="textField0" label="label1" />
              </div>
            </div>
            <div tabIndex={-1} id={options[1].value} className={classes.content}>
              <div className={classes.title}>
                <HvTypography variant="xlTitle">{options[1].label}</HvTypography>
              </div>
              <div className={classes.component}>
                <HvInput id={elementsIds[1]} name="textField1" label="label2" />
              </div>
            </div>
            <div tabIndex={-1} id={options[2].value} className={classes.content}>
              <div className={classes.title}>
                <HvTypography variant="xlTitle">{options[2].label}</HvTypography>
              </div>
              <div className={classes.component}>
                <HvInput id={elementsIds[2]} name="textField2" label="label3" />
              </div>
            </div>
            <div tabIndex={-1} id={options[3].value} className={classes.content}>
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
    </div>
  );
};

WithContent.parameters = {
  docs: {
    description: {
      story: "Basic navigation providing a clickable area to show scrolling capabilities",
    },
  },
};
