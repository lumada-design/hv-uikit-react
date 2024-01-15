import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import withStyles from "@material-ui/core/styles/withStyles";
import { HvTypography } from "@hitachivantara/uikit-react-core";
import Collapse from "@material-ui/core/Collapse";
import { Code } from "@hitachivantara/uikit-react-icons";
import IconButton from "@material-ui/core/IconButton";
import { useTheme } from "@material-ui/core";

const styles = theme => ({
  group: {
    margin: "10px",
    padding: "10px",
    width: "450px"
  },
  groupName: {
    ...theme.hv.typography.mTitle,
    marginBottom: 15
  },
  typographyInfoContainer: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: theme.hv.palette.atmosphere.atmo4
  },
  sentenceContainer: {
    display: "flex",
    padding: "10px",
    borderTop: `1px solid ${theme.hv.palette.atmosphere.atmo5}`
  },
  container: {
    display: "flex",
    paddingBottom: "5px"
  },
  iconCode: {
    marginLeft: "auto"
  },
  icon: {
    width: 32,
    height: 32
  }
});

const text =
  "ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";

const CodeButton = ({ classes, onClick }) => (
  <IconButton className={classes.iconCode} aria-label="Delete" onClick={onClick}>
    <Code className={classes.icon} />
  </IconButton>
);

const Group = ({ classes, name, typography }) => {
  const theme = useTheme();
  const [snippetIsOpen, setSnippetIsOpen] = useState(false);

  const toggleSnippet = () => setSnippetIsOpen(!snippetIsOpen);

  return (
    <div className={classes.group}>
      <div className={classes.container}>
        <HvTypography variant="mTitle">{name}</HvTypography>
        <CodeButton classes={classes} onClick={toggleSnippet} />
      </div>
      <Collapse in={snippetIsOpen}>
        <SyntaxHighlighter
          language="css"
          style={theme.hv.type === "dark" ? darcula : prism}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            fontSize: 14
          }}
        >
          {JSON.stringify(typography, null, 4)}
        </SyntaxHighlighter>
      </Collapse>
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
        .filter(item => !Array.isArray(typography[item]))
        .map(group => (
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
