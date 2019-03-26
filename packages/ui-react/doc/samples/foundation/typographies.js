/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import theme from "@hv-ui/themes/dist/theme.json";
import Collapse from "@material-ui/core/Collapse";
import HvButton from "../../../src/Button";

const styles = () => ({
  group: {
    margin: "10px",
    padding: "10px",
    width: "500px"
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
    borderTop: `1px solid ${theme.palette.atmosphere.atmo5}`
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

const CodeButton = ({ classes, onClick }) => (
  <HvButton className={classes.iconCode} colorType="link" onClick={onClick}>
    {"< >"}
  </HvButton>
);

const Group = ({ classes, name, typography }) => {
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
        <SyntaxHighlighter
          language="css"
          style={prism}
          customStyle={{ margin: 0, borderRadius: 0, fontSize: 14 }}
        >
          {JSON.stringify(typography, null, 4)}
        </SyntaxHighlighter>
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
