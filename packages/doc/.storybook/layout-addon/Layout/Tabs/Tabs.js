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
import PropTypes from "prop-types";
import MUITabs from "@material-ui/core/Tabs";
import MUITab from "@material-ui/core/Tab";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import TableAPI from "../TableAPI";
import TableCSS from "../TableCSS";

const TabUsage = ({ parameters }) => {
  const { usage } = parameters;

  return (
    <SyntaxHighlighter
      language="javascript"
      style={prism}
      customStyle={{ margin: 0, borderRadius: 0, fontSize: 14 }}
    >
      {usage}
    </SyntaxHighlighter>
  );
};

const TabAPI = ({ propsMetaData }) => (
  <TableAPI propsMetaData={propsMetaData} />
);

const TabCSS = ({ propsMetaData }) => (
  <TableCSS propsMetaData={propsMetaData["classes"].type.value} />
);

class Tabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes, parameters, propsMetaData } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <MUITabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        >
          <MUITab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Usage"
          />
          <MUITab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="API"
          />
          <MUITab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="CSS"
          />
        </MUITabs>
        <div className={classes.props}>
          {value === 0 && <TabUsage parameters={parameters} />}
          {value === 1 && <TabAPI propsMetaData={propsMetaData} />}
          {value === 2 && <TabCSS propsMetaData={propsMetaData} />}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Tabs;
