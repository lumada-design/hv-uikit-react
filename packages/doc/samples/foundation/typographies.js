import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import withStyles from "@material-ui/core/styles/withStyles";
import HvTypography from "@hv/uikit-react-core/dist/Typography";
import Collapse from "@material-ui/core/Collapse";
import Code from "@hv/uikit-react-icons/dist/Generic/Code";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
  group: {
    margin: "10px",
    padding: "10px",
    width: "500px"
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
    marginLeft: "auto",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  }
});

const text =
  "ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";

const CodeButton = ({ classes, onClick }) => (
  <IconButton
    className={classes.iconCode}
    aria-label="Delete"
    onClick={onClick}
  >
    <Code />
  </IconButton>
);

const Group = ({ classes, name, typography, theme }) => {
  const [snippetIsOpen, setSnippetIsOpen] = useState(false);
  let nameTypography = `${name} ${theme.deprecated.typography[name] ? "(deprecated)" : ""}`;

  return (
    <div className={classes.group}>
      <div className={classes.container}>
        <HvTypography variant="mTitle">{nameTypography}</HvTypography>
        <CodeButton
          classes={classes}
          onClick={() => setSnippetIsOpen(!snippetIsOpen)}
        />
      </div>
      <div className={classes.sentenceContainer}>
        <HvTypography variant={name}>{text}</HvTypography>
      </div>
      <Collapse in={snippetIsOpen}>
        <SyntaxHighlighter
          language="css"
          style={theme.type === "dark" ? darcula : prism}
          customStyle={{
            margin: 0,
            borderRadius: 0,
            fontSize: 14
          }}
        >
          {JSON.stringify(typography, null, 4)}
        </SyntaxHighlighter>
      </Collapse>
    </div>
  );
};

const Typographies = ({ classes, theme }) => {
  const { typography } = theme.hv;
  const keys = Object.keys(typography);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {keys
        .filter(item => !(Array.isArray(typography[item])))
        .map((group, idx) => (
          <Group
            key={idx}
            classes={classes}
            name={group}
            typography={typography[group]}
            theme={theme.hv}
          />
        ))}
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Typographies);
