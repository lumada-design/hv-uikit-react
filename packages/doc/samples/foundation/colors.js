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

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@hv/uikit-react-core/dist/Typography";

const styles = theme => ({
  colorGroup: {
    paddingBottom: "50px"
  },
  title: {
    paddingBottom: "20px"
  },
  groupName: {
    ...theme.hv.typography.mTitle,
    marginBottom: "15px"
  },
  colors: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "flexStart",
    flexDirection: "row"
  },
  colorContainer: {},
  colorSquare: {
    width: 150,
    height: 150,
    border: `1px solid ${theme.hv.palette.atmosphere.atmo5}`,
    margin: "0 20px 20px 0"
  },
  colorName: {
    ...theme.hv.typography.highlightText
  },
  colorCode: {
    ...theme.hv.typography.infoText
  }
});

const Group = ({ classes, name, deprecated, colors }) => {
  const keys = Object.keys(colors);
  return (
    <div>
      <div className={classes.groupName}>{name}</div>
      <div className={classes.colors}>
        {keys.map((color, idx) => (
          <div key={idx} className={classes.colorContainer}>
            <div className={classes.colorName}>{`${color} ${
              deprecated[color] ? "(deprecated)" : ""
            }`}</div>
            <div className={classes.colorCode}>{colors[color]}</div>
            <div
              className={classes.colorSquare}
              style={{ backgroundColor: colors[color] }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ColorsGroup = ({ classes, title, keys, deprecated, colors }) => (
  <div className={classes.colorGroup}>
    <div className={classes.title}>
      <Typography variant="xlTitle">{title}</Typography>
    </div>
    {keys.map((group, idx) => (
      <Group
        key={idx}
        classes={classes}
        name={group}
        deprecated={deprecated[group]}
        colors={colors[group]}
      />
    ))}
  </div>
);

const Colors = ({ classes, theme }) => {
  const { palette } = theme.hv;
  const vizPalette = theme.hv.viz.palette;
  const keys = Object.keys(palette);
  const keyViz = Object.keys(vizPalette);
  return (
    <div>
      <ColorsGroup
        title="Main"
        keys={keys}
        deprecated={theme.hv.deprecated.palette}
        colors={palette}
        classes={classes}
      />
      <ColorsGroup
        title="Visualisation"
        keys={keyViz}
        deprecated={theme.hv.deprecated.viz.palette}
        colors={vizPalette}
        classes={classes}
      />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Colors);
