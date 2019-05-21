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

const styles = theme => ({
  group: {
    marginBottom: 20
  },
  groupName: {
    ...theme.hv.typography.mTitle,
    marginBottom: 15
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

const Group = ({ classes, name, theme, colors }) => {
  const keys = Object.keys(colors);
  const deprecatedColors = theme.deprecated.palette[name];

  return (
    <div className={classes.group}>
      <div className={classes.groupName}>{name}</div>
      <div className={classes.colors}>
        {keys.map((color, idx) => (
          <div key={idx} className={classes.colorContainer}>
            <div className={classes.colorName}>{`${color} ${
              deprecatedColors[color] ? "(deprecated)" : ""
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

const Colors = ({ classes, theme }) => {
  const { palette } = theme.hv;
  const keys = Object.keys(palette);

  return (
    <div>
      {keys.map((group, idx) => (
        <Group
          key={idx}
          classes={classes}
          name={group}
          theme={theme.hv}
          colors={palette[group]}
        />
      ))}
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Colors);
