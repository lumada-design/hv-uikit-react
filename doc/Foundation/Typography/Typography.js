import React, { useState } from "react";
import { darcula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import withStyles from "@material-ui/core/styles/withStyles";
import { HvTypography } from "@hv/uikit-react-core";
import { Code } from "@hv/uikit-react-icons";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@material-ui/core";

const styles = (theme) => ({
  group: {
    margin: "10px",
    padding: "10px",
    width: "100%",
  },
  sentenceContainer: {
    display: "flex",
    padding: "10px",
    borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo4}`,
  },
  container: {
    display: "flex",
    paddingBottom: "5px",
  },
});

const text = "The quick brown fox jumps over the lazy dog.";

const Group = ({ classes, name, typography }) => {
  const theme = useTheme();

  return (
    <div className={classes.group}>
      <div className={classes.container}>
        <HvTypography variant="mTitle">{name}</HvTypography>
      </div>
      <div className={classes.sentenceContainer}>
        <HvTypography variant={name}>{text}</HvTypography>
      </div>
    </div>
  );
};

const Typography = ({ classes }) => {
  const theme = useTheme();
  const { typography } = theme.hv;
  const keys = Object.keys(typography);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {keys
        .filter((item) => !Array.isArray(typography[item]))
        .map((group) => (
          <Group
            key={`group_${group}`}
            classes={classes}
            name={group}
            typography={typography[group]}
          />
        ))}
    </div>
  );
};

export default withStyles(styles)(Typography);
