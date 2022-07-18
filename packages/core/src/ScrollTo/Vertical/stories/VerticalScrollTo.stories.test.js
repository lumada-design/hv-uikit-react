import React from "react";
import { makeStyles } from "@mui/styles";
import { HvScrollToVertical, HvContainer, HvInput, HvTypography } from "../../..";

export default {
  title: "Tests/ScrollTo/Vertical",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended applitools test scenarios
export const DocumentScroll = () => {
  const options = [
    { label: "Server status summary", value: "documentScrollId1" },
    { label: "Optimization", value: "documentScrollId2" },
    { label: "Performance analysis", value: "documentScrollId3" },
    { label: "Insights", value: "documentScrollId4" },
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
      <HvScrollToVertical
        id="documentScroll"
        href
        options={options}
        position="fixed"
        offset={150}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className={classes.page}>
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

DocumentScroll.parameters = {
  docs: {
    description: {
      story: "Basic navigation providing a clickable area to show scrolling capabilities",
    },
  },
};
