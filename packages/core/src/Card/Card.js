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
import classNames from "classnames";
import PropTypes, { oneOfType } from "prop-types";
import isNil from "lodash/isNil";
import { KeyboardCodes, isKeypress } from "@hv/uikit-common-utils/dist";
import uniqueId from "lodash/uniqueId";
import Card from "@material-ui/core/Card";
import Focus from "../Focus";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Media from "./Media";

const DEFAULT_ID_PREFIX = "hv-card-";
/**
 * Main Card container that layouts the subcomponents if there are children, the children are rendered instead.
 *
 * @param {Object} {
 *   classes,
 *   className,
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
  className,
  id,
  defaultCardAriaLabel,
  defaultCardAriaLabelledBy,
  defaultCardAriaDescribedBy,
  children,
  icon,
  headerTitle,
  subheader,
  innerCardContent,
  actions,
  actionsCallback,
  maxVisibleActions,
  actionsAlignment,
  isSelectable,
  semantic,
  onChange,
  checkboxValue,
  checkboxLabel,
  checkboxSelected,
  checkboxIndeterminate,
  checkboxAriaLabel,
  checkboxAriaLabelledBy,
  checkboxAriaDescribedBy,
  theme,
  mediaPath,
  mediaTitle,
  mediaHeight,
  mediaAriaLabel,
  mediaAriaLabelledBy,
  mediaAriaDescribedBy,
  onClickAction,
  noHeader,
  noFooter,
  selectOnClickAction,
  actionItemWidth,
  ...other
}) => {
  const [selected, setSelected] = useState(checkboxSelected);

  const footerExist = (actions || isSelectable) && !noFooter;
  const internalId = id || uniqueId(DEFAULT_ID_PREFIX);
  const defaultFooterId = `${internalId}-footer`;
  const defaultHeaderId = `${internalId}-header`;
  const defaultContentId = `${internalId}-content`;
  const defaultMediaId = `${internalId}-media`;
  
  const isFunction = value => typeof value === "function";

  const clickActionHandler = evt => {
    if (isSelectable && selectOnClickAction) {
      onChange(evt);
      setSelected(!selected);
    }
    if(isFunction(onClickAction)) onClickAction(evt, !selected);
  };

  const getRole = (fSelectable, fselectOnClickAction) => {
    if (!isFunction(onClickAction)) {
      if (!fSelectable || !fselectOnClickAction) {
        return undefined;
      }
    }
    if (fSelectable) {
      return "checkbox";
    }
    return "button";
  };

  const KeyUpHandler = evt => {
    if (
      (isKeypress(evt, KeyboardCodes.Enter) && getRole(isSelectable, selectOnClickAction) !== "checkbox") ||
      isKeypress(evt, KeyboardCodes.SpaceBar)
    ) {
      if (isSelectable && selectOnClickAction) {
        onChange(evt);
        setSelected(!selected);
      }
      if(isFunction(onClickAction)) onClickAction(evt, !selected);
    }
  };

  const cardButtonProps = {
    id: `${internalId}-upper-area`,
    role: getRole(isSelectable, selectOnClickAction),
    tabIndex: getRole(isSelectable, selectOnClickAction)
      ? "0"
      : undefined,
    onClick: clickActionHandler,
    onKeyUp: KeyUpHandler,
    "aria-label": defaultCardAriaLabel,
    "aria-labelledby": defaultCardAriaLabelledBy,
    "aria-describedby": defaultCardAriaDescribedBy,
    "aria-checked": isSelectable ? selected : undefined
  };

  const defaultContent = (
    <>
      <Focus strategy="card" useFalseFocus>
        <div
          className={classNames(classes.upperArea, {
            [classes.upperAreaSelectable]: cardButtonProps.tabIndex
          })}
          {...cardButtonProps}
        >
          {!noHeader && (
            <Header
              id={defaultHeaderId}
              icon={icon}
              headerTitle={headerTitle}
              subheader={subheader}
              aria-label={defaultCardAriaLabel || headerTitle}
              aria-labelledby={defaultCardAriaLabelledBy}
              aria-describedby={defaultCardAriaDescribedBy}
            />
          )}
          {!isNil(mediaPath) && mediaPath.length > 0 && (
            <Media
              id={defaultMediaId}
              mediaPath={mediaPath}
              mediaTitle={mediaTitle}
              mediaHeight={mediaHeight}
              aria-label={mediaAriaLabel || headerTitle}
              aria-labelledby={mediaAriaLabelledBy}
              aria-describedby={mediaAriaDescribedBy}
            />
          )}
          {innerCardContent && (
            <Content
              id={defaultContentId}
              innerCardContent={innerCardContent}
            />
          )}
        </div>
      </Focus>
      {footerExist && (
        <Footer
          disableActionSpacing // disableSpacing Mui v4
          checkboxValue={checkboxValue}
          actions={actions}
          id={defaultFooterId}
          actionsCallback={actionsCallback}
          maxVisibleActions={maxVisibleActions}
          actionsAlignment={actionsAlignment}
          isSelectable={isSelectable}
          onChange={event => {
            setSelected(event.target.checked);
            onChange(event);
          }}
          checkboxAriaLabel={checkboxAriaLabel}
          checkboxAriaLabelledBy={checkboxAriaLabelledBy || defaultHeaderId}
          checkboxAriaDescribedBy={checkboxAriaDescribedBy || defaultHeaderId}
          checkboxLabel={checkboxLabel}
          checkboxSelected={selected}
          checkboxIndeterminate={checkboxIndeterminate}
          actionItemWidth={actionItemWidth}
        />
      )}
    </>
  );

  return (
    <>
      <div className={classes.semanticContainer}>
        <div
          className={classNames({
            [classes[semantic]]: semantic,
            [classes.semanticSelected]: selected
          })}
        />
      </div>
      <Card
        className={classNames(classes.root, classes.borderTop, className, {
          [classes.selectable]: isSelectable,
          [classes.rootSelected]: selected,
          [classes.selected]: selected
        })}
        aria-label={defaultCardAriaLabel}
        aria-labelledby={defaultCardAriaLabelledBy}
        aria-describedby={defaultCardAriaDescribedBy}
        id={internalId}
        {...other}
      >
        {children || defaultContent}
      </Card>
    </>
  );
};

Main.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   *  Used to define a string that labels the current element.
   */
  defaultCardAriaLabel: PropTypes.string,
  /**
   *  Establishes relationships between objects and their label(s), and its value should be one or more element IDs.
   */
  defaultCardAriaLabelledBy: PropTypes.string,
  /**
   *  Used to indicate the IDs of the elements that describe the object.
   */
  defaultCardAriaDescribedBy: PropTypes.string,
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
   * The renderable content inside the actions slot of the footer,
   * or an Array of actions ´{id, label, icon}´
   */
  actions: oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.func
      })
    )
  ]),
  /**
   *  The callback function ran when an action is triggered, receiving ´action´ as param
   */
  actionsCallback: PropTypes.func,
  /**
   * The alignment applied to the action elements
   */
  actionsAlignment: PropTypes.oneOf(["left", "right"]),
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
   *  Used to define a string that labels the media element.
   */
  mediaAriaLabel: PropTypes.string,
  /**
   *  Establishes relationships between the media and it's label(s), its value should be one or more element IDs.
   */
  mediaAriaLabelledBy: PropTypes.string,
  /**
   *  Used to indicate the IDs of the elements that describe the media element.
   */
  mediaAriaDescribedBy: PropTypes.string,
  /**
   *  The border color at the top of the card. Must be one of palette semantic colors. To set another color, the borderTop should be override.
   */
  semantic: PropTypes.oneOf([
    "sema0",
    "sema1",
    "sema2",
    "sema3",
    "sema4",
    "sema5",
    "sema6",
    "sema7",
    "sema8",
    "sema9",
    "sema10",
    "sema11",
    "sema12",
    "sema13",
    "sema14",
    "sema15",
    "sema16",
    "sema17",
    "sema18",
    "sema19"
  ]),
  /**
   *  The function that will be executed when the upper part of the card is clicked.
   *  only works for the default card.
   */
  onClickAction: PropTypes.func,
  /**
   *  Removes the header for the default card.
   */
  noHeader: PropTypes.bool,
  /**
   *  Removes the footer for the default card.
   */
  noFooter: PropTypes.bool,
  /**
   *  allows selecting on click action.
   *  only works for the default card.
   */
  selectOnClickAction: PropTypes.bool,
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
   *  Used to define a string that labels the checkbox element.
   */
  checkboxAriaLabel: PropTypes.string,
  /**
   *  Establishes relationships between checkbox and it's label(s), its value should be one or more element IDs.
   */
  checkboxAriaLabelledBy: PropTypes.string,
  /**
   *  Used to indicate the IDs of the elements that describe the checkbox.
   */
  checkboxAriaDescribedBy: PropTypes.string,
  /**
   * The theme passed by the provider.
   */
  theme: PropTypes.instanceOf(Object),
  /**
   *  The number of maximum visible actions before they're collapsed into a ´DropDownMenu´.
   */
  maxVisibleActions: PropTypes.number,
  /**
   *  Width applicable to the action container, to handle an issue Safari has when using css flex:
   *  It resizes descendant divs, unless a width is forced
   *     */
  actionItemWidth: PropTypes.number
};

Main.defaultProps = {
  className: "",
  id: undefined,
  defaultCardAriaLabel: undefined,
  defaultCardAriaLabelledBy: undefined,
  defaultCardAriaDescribedBy: undefined,
  headerTitle: undefined,
  semantic: "sema0",
  isSelectable: false,
  children: undefined,
  icon: undefined,
  subheader: undefined,
  innerCardContent: undefined,
  onChange: () => {},
  onClickAction: null,
  selectOnClickAction: false,
  noHeader: false,
  noFooter: false,
  actions: null,
  actionsCallback: () => {},
  actionsAlignment: "left",
  mediaHeight: undefined,
  mediaPath: "",
  mediaTitle: "",
  mediaAriaLabel: undefined,
  mediaAriaLabelledBy: undefined,
  mediaAriaDescribedBy: undefined,
  checkboxValue: "",
  checkboxLabel: "",
  checkboxSelected: false,
  checkboxIndeterminate: undefined,
  checkboxAriaLabel: undefined,
  checkboxAriaLabelledBy: undefined,
  checkboxAriaDescribedBy: undefined,
  theme: null,
  maxVisibleActions: 1,
  actionItemWidth: undefined
};

export default Main;
