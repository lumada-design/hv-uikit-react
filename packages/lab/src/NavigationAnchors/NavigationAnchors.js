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
import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const RETRY_MAX = 5;

class NavigationAnchors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex || 0,
      throttle: false
    };
  }

  componentDidMount() {
    const { scrollElementId } = this.props;
    this.afterLoadScrollIntoView();
    // Check if scrolled
    this.scrollEle = document.getElementById(scrollElementId);
    if (this.scrollEle) {
      this.scrollEle.addEventListener("wheel", this.checkScroll);
    }
  }

  componentWillUnmount() {
    if (this.scrollEle) {
      this.scrollEle.removeEventListener("wheel", this.checkScroll);
    }
    clearInterval(this.checkRenderedInterval);
  }

  // afterLoadScrollIntoView waits for the elements to be rendered on the page
  afterLoadScrollIntoView = () => {
    const hashValue = document.location.hash.split("#")[1] || "";
    let ele = document.getElementById(hashValue);

    let retry = 0;
    this.checkRenderedInterval = setInterval(() => {
      ele = document.getElementById(hashValue);
      if (ele) {
        ele.scrollIntoView({ behavior: "smooth" });
        clearInterval(this.checkRenderedInterval);
      } else {
        retry += 1;
        if (retry === RETRY_MAX) {
          clearInterval(this.checkRenderedInterval);
        }
      }
    }, 1000);
  };

  checkScroll = () => {
    const { throttle } = this.state;
    if (!throttle) {
      const selectedIndex = this.hasScrolledIntoView();
      if (selectedIndex > -1) {
        this.setState({ selectedIndex });
      }
      this.setState({
        throttle: true
      });
      setTimeout(() => {
        this.setState({
          throttle: false
        });
      }, 100);
    }
  };

  hasScrolledIntoView = () => {
    const { options, scrollElementId } = this.props;

    // Select last nav item if user has scrolled to bottom of page
    const page = document.getElementById(scrollElementId);
    if (!!page && page.scrollHeight - page.scrollTop === page.offsetHeight) {
      return options.length - 1;
    }

    const bounds = this.scrollEle.getBoundingClientRect();
    const midPoint = bounds.top + window.scrollY + bounds.height / 2;

    // Find index of element where top is between the top and mid point of container
    for (let i = 0; i < options.length; i += 1) {
      const ele = document.getElementById(options[i].value);
      if (ele) {
        const rect = ele.getBoundingClientRect();
        const elemTop = rect.top + window.scrollY;

        // Bounding rectangle relative to the top left corner of the parent.
        if (elemTop >= bounds.top + window.scrollY && elemTop <= midPoint) {
          return i;
        }
      }
    }
    return -1;
  };

  handleListItemClick = (event, id, index) => {
    this.setState({ selectedIndex: index });

    const ele = document.getElementById(id);
    if (ele) {
      ele.scrollIntoView({ behavior: "smooth" });
    }

    const { href, onClick, options } = this.props;
    if (!href && onClick) {
      onClick(event, index);
    } else if (href) {
      window.history.pushState({}, "", `#${options[index].value}`);
    }
  };

  render() {
    const { classes, options, floating } = this.props;
    const { selectedIndex } = this.state;

    return (
      <Drawer
        className={clsx(classes.drawer, classes.dense)}
        variant="persistent"
        anchor="left"
        open
        classes={{
          paper: clsx(classes.drawerPaper, {
            [classes.drawerPaperPositionInherit]: !floating
          })
        }}
      >
        <List
          dense
          classes={{
            root: classes.listRoot,
            dense: classes.listDense
          }}
        >
          {options.map((option, index) => (
            <ListItem
              button
              classes={{
                selected: classes.listItemSelected,
                root: classes.listItemRoot,
                gutters: classes.listItemGutters
              }}
              key={option.key || option.label}
              onClick={event =>
                this.handleListItemClick(event, option.value, index)
              }
              selected={selectedIndex === index}
            >
              <ListItemText
                classes={{
                  primary: clsx({
                    [classes.listItemTextSelected]: selectedIndex === index
                  }),
                  dense: classes.listItemTextDense
                }}
                primary={option.label}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

NavigationAnchors.propTypes = {
  /**
   *  Styles applied to the Drawer Paper element
   */
  classes: PropTypes.instanceOf(Object).isRequired,
  /**
   * An Array of Objects with Label and Value. Label is the displayed Element and Value is the local navigation location applied
   */
  options: PropTypes.arrayOf(
    (propValue, key, componentName, location, propFullName) => {
      if (
        propValue[key].label === undefined ||
        propValue[key].value === undefined
      ) {
        return new Error(
          `Invalid prop "${propFullName}" supplied to "${componentName}". Validation Failed.`
        );
      }
      return null;
    }
  ).isRequired,
  /**
   * True if the href location link should be applied. It will create an a element around every list item
   */
  href: PropTypes.bool,
  /**
   * A callback called on click of every list item, if the href is false
   */
  onClick: PropTypes.func,
  /**
   * Whether the anchors are always in a fixed position
   */
  floating: PropTypes.bool,
  /**
   * Currently selected index passed from the parent.
   */
  selectedIndex: PropTypes.number,
  /**
   * The Id of the scrollable container containing displayed elements
   */
  scrollElementId: PropTypes.string
};

NavigationAnchors.defaultProps = {
  href: true,
  onClick: undefined,
  floating: true,
  selectedIndex: 0,
  scrollElementId: ""
};

export default NavigationAnchors;
