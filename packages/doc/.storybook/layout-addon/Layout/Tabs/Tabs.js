import React from "react";
import { basename } from "path";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Tab as MUITab, Tabs as MUITabs, useTheme } from "@material-ui/core";
import TableAPI from "../TableAPI";
import TableCSS from "../TableCSS";
import Accessibility from "../Accessibility";

const TabUsage = ({ parameters }) => {
  const { usage } = parameters;
  const theme = useTheme();

  return (
    <SyntaxHighlighter
      language="javascript"
      style={theme.hv.type === "dark" ? darcula : prism}
      customStyle={{
        backgroundColor: theme.palette.atmo3,
        margin: 0,
        borderRadius: 0,
        fontSize: 14
      }}
    >
      {usage}
    </SyntaxHighlighter>
  );
};

const TabAPI = ({ propsMetaData }) => <TableAPI propsMetaData={propsMetaData} />;

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
    const { classes, parameters, propsMetaData, theme } = this.props;
    const { value } = this.state;

    let accessPage = null;
    try {
      const folder = basename(parameters.fileName, ".js").toLowerCase();
      accessPage = require(`../../../../pages/components/${folder}/accessibility.md`);
    } catch (error) {}

    const showCssTab = !isNil(propsMetaData) && !isNil(propsMetaData.classes);
    const showAccessibilityTab = !isNil(accessPage);

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
          {showCssTab && (
            <MUITab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="CSS"
            />
          )}
          {showAccessibilityTab && (
            <MUITab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label="Accessibility"
            />
          )}
        </MUITabs>
        <div className={classes.props}>
          {value === 0 && <TabUsage parameters={parameters} />}
          {value === 1 && <TabAPI propsMetaData={propsMetaData} />}
          {value === 2 && <TabCSS propsMetaData={propsMetaData} />}
          {value === 3 && <Accessibility pageData={accessPage.default} />}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  classes: PropTypes.object.isRequired,
  propsMetaData: PropTypes.object,
  descriptionMetadata: PropTypes.string
};

export default Tabs;
