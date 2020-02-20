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
import classNames from "classnames";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import { Card, Grid, useTheme } from "@material-ui/core";
import LeftContent from "./LeftContent";
import Content from "./Content";
import RightContent from "./RightContent";
import Media from "./Media";

/**
 * Main List Item container that layouts the subcomponents if there are children, the childrens are rendered instead
 *
 * @param {Object} {
 *   classes,
 *   children,
 *   avatar,
 *   title,
 *   subtitle,
 *   innerItemContent,
 *   actions,
 *   isSelectable,
 *   semantic,
 *   onSelect,
 *   checkboxValue,
 *   checkboxLabel,
 *   checkboxSelected,
 *   checkboxIndeterminate,
 *   mediaPath,
 *   mediaTitle,
 *   mediaHeight,
 *   ...other
 * }
 * @returns
 */
const ListItem = ({
  classes,
  children,
  avatar,
  title,
  subtitle,
  innerItemContent,
  actions,
  isSelectable,
  semantic,
  onSelect,
  checkboxValue,
  checkboxLabel,
  checkboxSelected,
  checkboxIndeterminate,
  mediaPath,
  mediaTitle,
  mediaHeight,
  mediaWidth,
  ...other
}) => {
  const theme = useTheme();
  const footerExist = actions || isSelectable;
  // calculate grid item size (as more content the smaller the grid items sizes should be)
  const gridItemSize =
    12 /
    (1 +
      (innerItemContent ? 1 : 0) +
      (!isNil(mediaPath) && mediaPath.length > 0 ? 1 : 0) +
      (footerExist ? 1 : 0));

  const defaultContent = (
    <>
      <Grid
        container
        spacing={24}
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid
          item
          xs={gridItemSize}
          sm={gridItemSize}
          md={gridItemSize}
          lg={gridItemSize}
          xl={gridItemSize}
        >
          <LeftContent avatar={avatar} title={title} subtitle={subtitle} />
        </Grid>
        {innerItemContent && (
          <Grid item>
            <Content
              innerListItemContent={innerItemContent}
              needsBorder={!footerExist}
            />
          </Grid>
        )}
        {!isNil(mediaPath) && mediaPath.length > 0 && (
          <Grid item>
            <Media
              mediaPath={mediaPath}
              mediaTitle={mediaTitle}
              mediaHeight={mediaHeight}
              mediaWidth={mediaWidth}
            />
          </Grid>
        )}
        {footerExist && (
          <Grid item>
            <RightContent
              checkboxValue={checkboxValue}
              actions={actions}
              isSelectable={isSelectable}
              onSelect={onSelect}
              checkboxLabel={checkboxLabel}
              checkboxSelected={checkboxSelected}
              checkboxIndeterminate={checkboxIndeterminate}
            />
          </Grid>
        )}
      </Grid>
    </>
  );

  return (
    <Card
      className={classNames(classes.content, classes.borderLeft)}
      style={{
        borderLeftColor: semantic && theme.hv.palette.semantic[semantic],
        borderLeftWidth:
          semantic !== null ? "4px" : classes.borderLeft.borderLeftWidth
      }}
      {...other}
    >
      {children || defaultContent}
    </Card>
  );
};

ListItem.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the item.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the entire content.
     */
    content: PropTypes.string,
    /**
     * Style applied to the border top.
     */
    borderLeft: PropTypes.string
  }).isRequired,
  /**
   * The content inside the item.
   */
  children: PropTypes.node,
  /**
   *  The renderable content inside the title slot of the left content.
   */
  title: PropTypes.node,
  /**
   *  The renderable content inside the subtitle slot of the left content.
   */
  subtitle: PropTypes.node,
  /**
   *  The renderable content inside the avatar slot of the left content.
   */
  avatar: PropTypes.node,
  /**
   *  The renderable content inside the Actions slot of the right content.
   */
  actions: PropTypes.node,
  /**
   *  The renderable content inside the body of the item.
   */
  innerItemContent: PropTypes.node,
  /**
   *  The path to the image to show in the media slot.
   */
  mediaPath: PropTypes.string,
  /**
   *  The title of the media.
   */
  mediaTitle: PropTypes.string,
  /**
   *  The height necessary to adjust the media container to the image.
   */
  mediaHeight: PropTypes.number,
  /**
   *  The width necessary to adjust the media container to the image.
   */
  mediaWidth: PropTypes.number,
  /**
   *  The border color at the left of the item. Must be one of palette semantic colors. You want to set another color, the borderLeft should be override.
   */
  semantic: PropTypes.oneOf([
    "sema1",
    "sema2",
    "sema3",
    "sema4",
    "sema5",
    "sema6",
    "sema7",
    "sema8",
    "sema9"
  ]),
  /**
   *  The function that will be executed when the left is selected.
   */
  onSelect: PropTypes.func,
  /**
   *  ´true´ if the item should have a checkbox in the footer to be selectable ´false´ if it is not required.
   */
  isSelectable: PropTypes.bool,
  /**
   *  The value the checkbox in the footer will return when selected.
   */
  checkboxValue: PropTypes.string,
  /**
   *  The label for the checkbox in the footer of the item.
   */
  checkboxLabel: PropTypes.string,
  /**
   *  ´true´ if the checkbox is selected or ´false´ if not selected.
   *
   *  Note: if this value is specified the checkbox becomes a controlled component and it's state should be set from outside.
   */
  checkboxSelected: PropTypes.bool,
  /**
   *  ´true´ if the checkbox should use the intermediate state when selected ´false´ if not.
   */
  checkboxIndeterminate: PropTypes.bool
};

ListItem.defaultProps = {
  semantic: null,
  isSelectable: false,
  children: undefined,
  avatar: undefined,
  title: undefined,
  subtitle: undefined,
  innerItemContent: undefined,
  onSelect: () => {},
  actions: null,
  mediaHeight: undefined,
  mediaWidth: undefined,
  mediaPath: "",
  mediaTitle: "",
  checkboxValue: "",
  checkboxLabel: "",
  checkboxSelected: undefined,
  checkboxIndeterminate: undefined
};

export default ListItem;
