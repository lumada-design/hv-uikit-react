import React, { useState } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import theme from "@hv-ui/themes/dist/theme.json";
import startCase from "lodash/startCase";
import Collapse from "@material-ui/core/Collapse";
import HvButton from "../../../src/Button";

const styles = () => ({
  group: {
    margin: "10px",
    padding: "10px",
    width: "300px"
  },
  groupName: {
    ...theme.typography.mediumTitle,
    marginBottom: 15
  },
  typographyInfoContainer: {
    marginTop: "10px",
    padding: "10px",
    backgroundColor: theme.palette.atmosphere.atmo4
  },
  sentenceContainer: {
    display: "flex",
    padding: "10px",
    backgroundColor: theme.palette.atmosphere.atmo4,
    border: `1px solid ${theme.palette.atmosphere.atmo5}`
  },
  container: {
    display: "flex",
    paddingBottom: "5px"
  },
  iconCode: {
    marginLeft: "auto"
  }
});

const text =
  "ellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";

const TypographyProp = ({ classes, name, value }) => (
  <div className={classes.container}>
    <Typography variant="subtitle1">{`${startCase(name)}:`}</Typography>
    <Typography variant="body1">{`${value}`}</Typography>
  </div>
);

const CodeButton = ({ classes, onClick }) => (
  <HvButton className={classes.iconCode} colorType="link" onClick={onClick}>
    {"< >"}
  </HvButton>
);

const Group = ({ classes, name, typography }) => {
  const keys = Object.keys(typography);
  const [snippetIsOpen, setSnippetIsOpen] = useState(false);

  return (
    <div className={classes.group}>
      <div className={classes.container}>
        <Typography variant="h3">{name}</Typography>
        <CodeButton
          classes={classes}
          onClick={() => setSnippetIsOpen(!snippetIsOpen)}
        />
      </div>
      <div className={classes.sentenceContainer}>
        <div style={{ ...theme.typography[name] }}>{text}</div>
      </div>

      <Collapse in={snippetIsOpen}>
        <div className={classes.typographyInfoContainer}>
          {keys.map(property => (
            <TypographyProp
              classes={classes}
              name={property}
              value={typography[property]}
            />
          ))}
        </div>
      </Collapse>
    </div>
  );
};

const Typographies = ({ classes }) => {
  const { typography } = theme;
  const keys = Object.keys(typography);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {keys
        .filter(item => !(typeof typography[item] === "string"))
        .map((group, idx) => (
          <Group
            key={idx}
            classes={classes}
            name={group}
            typography={typography[group]}
          />
          ))}
    </div>
  );
};

export default withStyles(styles)(Typographies);
