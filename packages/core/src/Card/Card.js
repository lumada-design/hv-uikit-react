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
import Card from "@material-ui/core/Card";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Media from "./Media";

/**
 * Main Card container that layouts the subcomponents if there are children, the children are rendered instead.
 *
 * @param {Object} {
 *   classes,
 *   children,
 *   icon,
 *   headerTitle,
 *   subheader,
 *   innerCardContent,
 *   actions,
 *   isSelectable,
 *   semantic,
 *   onChange,
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
const Main = ({
  classes,
  children,
  icon,
  headerTitle,
  subheader,
  innerCardContent,
  actions,
  isSelectable,
  semantic,
  onChange,
  checkboxValue,
  checkboxLabel,
  checkboxSelected,
  checkboxIndeterminate,
  theme,
  mediaPath,
  mediaTitle,
  mediaHeight,
  ...other
}) => {
  const footerExist = actions || isSelectable;

  const defaultContent = (
    <>
      <Header
        icon={icon}
        headerTitle={headerTitle}
        subheader={subheader}
        needsBorder={!footerExist && !innerCardContent}
      />
      {!isNil(mediaPath) && mediaPath.length > 0 && (
        <Media
          mediaPath={mediaPath}
          mediaTitle={mediaTitle}
          mediaHeight={mediaHeight}
        />
      )}
      {innerCardContent && (
        <Content
          innerCardContent={innerCardContent}
          needsBorder={!footerExist}
        />
      )}
      {footerExist && (
        <Footer
          checkboxValue={checkboxValue}
          actions={actions}
          isSelectable={isSelectable}
          onChange={onChange}
          checkboxLabel={checkboxLabel}
          checkboxSelected={checkboxSelected}
          checkboxIndeterminate={checkboxIndeterminate}
        />
      )}
    </>
  );

  return (
    <Card
      className={classNames(classes.root, classes.borderTop)}
      style={{
        borderTopColor: semantic && theme.hv.palette.semantic[semantic],
        borderTopWidth:
          semantic !== null ? "4px" : classes.borderTop.borderTopWidth
      }}
      {...other}
    >
      {children || defaultContent}
    </Card>
  );
};

Main.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the border top.
     */
    borderTop: PropTypes.string
  }).isRequired,
  /**
   * The content inside the card.
   */
  children: PropTypes.node,
  /**
   *  The renderable content inside the title slot of the header.
   */
  headerTitle: PropTypes.node,
  /**
   *  The renderable content inside the subheader slot of the header.
   */
  subheader: PropTypes.node,
  /**
   *  The renderable content inside the icon slot of the header.
   */
  icon: PropTypes.node,
  /**
   *  The renderable content inside the actions slot of the footer.
   */
  actions: PropTypes.node,
  /**
   *  The renderable content inside the body of the card.
   */
  innerCardContent: PropTypes.node,
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
   *  The border color at the top of the card. Must be one of palette semantic colors. To set another color, the borderTop should be override.
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
   *  The function that will be executed when the card is selected.
   */
  onChange: PropTypes.func,
  /**
   * ´true´ if the card should have a checkbox in the footer to be selectable ´false´ if it is not required.
   */
  isSelectable: PropTypes.bool,
  /**
   *  The value the checkbox in the footer will return when selected.
   */
  checkboxValue: PropTypes.string,
  /**
   *  The label for the checkbox in the footer of the card.
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
  checkboxIndeterminate: PropTypes.bool,
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object)
};

Main.defaultProps = {
  headerTitle: undefined,
  semantic: null,
  isSelectable: false,
  children: undefined,
  icon: undefined,
  subheader: undefined,
  innerCardContent: undefined,
  onChange: () => {},
  actions: null,
  mediaHeight: undefined,
  mediaPath: "",
  mediaTitle: "",
  checkboxValue: "",
  checkboxLabel: "",
  checkboxSelected: undefined,
  checkboxIndeterminate: undefined,
  theme: null
};

export default Main;
