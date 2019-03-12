/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import Card from "@material-ui/core/Card";
import Header from "../Header";
import Content from "../Content";
import Footer from "../Footer";
import Media from "../Media";

/**
 * Main Card container that layouts the subcomponents if there are children, the childrens are rendered instead
 *
 * @param {Object} {
 *   classes,
 *   children,
 *   Icon,
 *   HeaderTitle,
 *   Subheader,
 *   InnerCardContent,
 *   Actions,
 *   isSelectable,
 *   variant,
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
const Main = ({
  classes,
  children,
  Icon,
  HeaderTitle,
  Subheader,
  InnerCardContent,
  Actions,
  isSelectable,
  variant,
  onSelect,
  checkboxValue,
  checkboxLabel,
  checkboxSelected,
  checkboxIndeterminate,
  mediaPath,
  mediaTitle,
  mediaHeight,
  ...other
}) => {
  const footerExist = Actions || isSelectable;

  const defaultContent = (
    <>
      <Header
        Icon={Icon}
        HeaderTitle={HeaderTitle}
        Subheader={Subheader}
        needsBorder={!footerExist && !InnerCardContent}
      />
      {!isNil(mediaPath) && mediaPath.length > 0 && (
        <Media
          mediaPath={mediaPath}
          mediaTitle={mediaTitle}
          mediaHeight={mediaHeight}
        />
      )}
      {InnerCardContent && (
        <Content
          InnerCardContent={InnerCardContent}
          needsBorder={!footerExist}
        />
      )}
      {footerExist && (
        <Footer
          checkboxValue={checkboxValue}
          Actions={Actions}
          isSelectable={isSelectable}
          onSelect={onSelect}
          checkboxLabel={checkboxLabel}
          checkboxSelected={checkboxSelected}
          checkboxIndeterminate={checkboxIndeterminate}
        />
      )}
    </>
  );

  return (
    <Card className={classNames(classes.root, classes[variant])} {...other}>
      {children || defaultContent}
    </Card>
  );
};

Main.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied to the button.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the component when the variant is info.
     */
    info: PropTypes.instanceOf(Object),
    /**
     * Style applied to the component when the variant is warning.
     */
    warning: PropTypes.instanceOf(Object),
    /**
     * Style applied to the component when the variant is error.
     */
    error: PropTypes.instanceOf(Object),
    /**
     * Style applied to the component when the variant is none.
     */
    none: PropTypes.instanceOf(Object)
  }).isRequired,
  /**
   * The content inside the card.
   */
  children: PropTypes.node,
  /**
   *  The renderable content inside the title slot of the header.
   */
  HeaderTitle: PropTypes.node,
  /**
   *  The renderable content inside the subheader slot of the header.
   */
  Subheader: PropTypes.node,
  /**
   *  The renderable content inside the icon slot of the header.
   */
  Icon: PropTypes.node,
  /**
   *  The renderable content inside the Actions slot of the footer.
   */
  Actions: PropTypes.node,
  /**
   *  The renderable content inside the body of the card.
   */
  InnerCardContent: PropTypes.node,
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
   *  The border color at the top of the card.
   */
  cardColor: PropTypes.oneOf(["none", "info", "warning", "error", "alert", "neutral", "success"]),
  /**
   *  The function that will be executed when the card is selected.
   */
  onSelect: PropTypes.func,
  /**
   *  ´true´ if the card should have a checkbox in the footer to be selectable ´false´ if it is not required.
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
  checkboxIndeterminate: PropTypes.bool
};

Main.defaultProps = {
  variant: "none",
  HeaderTitle: undefined,
  isSelectable: false,
  children: undefined,
  Icon: undefined,
  Subheader: undefined,
  HeaderTitle: undefined,
  InnerCardContent: undefined,
  onSelect: () => {},
  Actions: null,
  mediaHeight: undefined,
  mediaPath: "",
  mediaTitle: "",
  checkboxValue: "",
  checkboxLabel: "",
  checkboxSelected: undefined,
  checkboxIndeterminate: undefined
};

export default Main;
