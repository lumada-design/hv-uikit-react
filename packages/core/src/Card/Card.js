import React, { useState, useEffect } from "react";
import PropTypes, { oneOfType } from "prop-types";
import clsx from "clsx";
import { Card, withStyles } from "@material-ui/core";
import { setId, KeyboardCodes, isKeypress } from "../utils";
import Focus from "../Focus";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import Media from "./Media";
import styles from "./styles";

/**
 * A card container to be used for short and related of information.
 */
const HvCard = ({
  classes,
  className,
  id,
  cardButtonProps = {},
  headerProps = {},
  footerProps = {},
  contentProps = {},
  mediaProps = {},
  children,
  icon,
  headerTitle,
  subheader,
  innerCardContent,
  actions,
  actionsCallback,
  maxVisibleActions = 1,
  actionsAlignment = "left",
  isSelectable = false,
  semantic = "sema0",
  onChange,
  checked = false,
  checkboxProps,
  mediaPath,
  mediaTitle,
  mediaHeight,
  onClick,
  noHeader = false,
  noFooter = false,
  selectOnClickAction = false,
  ...others
}) => {
  const [selected, setSelected] = useState(checked);
  const footerExist = (actions || isSelectable) && !noFooter;

  useEffect(() => {
    setSelected(checked);
  }, [checked]);

  const clickActionHandler = (evt) => {
    if (isSelectable && selectOnClickAction) {
      onChange?.(evt);
      setSelected(!selected);
    }
    onClick?.(evt, !selected);
  };

  const getRole = (fSelectable, fselectOnClickAction) => {
    if (!onClick && (!fSelectable || !fselectOnClickAction)) {
      return undefined;
    }
    return fSelectable ? "checkbox" : "button";
  };

  const KeyUpHandler = (evt) => {
    if (
      (isKeypress(evt, KeyboardCodes.Enter) &&
        getRole(isSelectable, selectOnClickAction) !== "checkbox") ||
      isKeypress(evt, KeyboardCodes.SpaceBar)
    ) {
      if (isSelectable && selectOnClickAction) {
        onChange?.(evt);
        setSelected(!selected);
      }
      onClick?.(evt, !selected);
    }
  };

  const internalCardButtonProps = {
    id: setId(id, "upper-area"),
    role: getRole(isSelectable, selectOnClickAction),
    tabIndex: getRole(isSelectable, selectOnClickAction) ? "0" : undefined,
    onClick: clickActionHandler,
    onKeyUp: KeyUpHandler,
    "aria-checked": isSelectable ? selected : undefined,
    ...cardButtonProps,
  };

  const defaultContent = (
    <>
      <Focus strategy="card" useFalseFocus disabled={internalCardButtonProps.tabIndex !== "0"}>
        <div
          className={clsx({
            [classes.upperAreaSelectable]: internalCardButtonProps.tabIndex,
          })}
          {...internalCardButtonProps}
        >
          {!noHeader && (
            <Header
              id={setId(id, "header")}
              icon={icon}
              headerTitle={headerTitle}
              subheader={subheader}
              {...headerProps}
            />
          )}
          {mediaPath && mediaPath.length > 0 && (
            <Media
              id={setId(id, "media")}
              mediaPath={mediaPath}
              title={mediaTitle}
              mediaHeight={mediaHeight}
              {...mediaProps}
            />
          )}
          {innerCardContent && (
            <Content id={setId(id, "content")} {...contentProps}>
              {innerCardContent}
            </Content>
          )}
        </div>
      </Focus>
      {footerExist && (
        <Footer
          disableSpacing
          checkboxProps={checkboxProps}
          actions={actions}
          id={id}
          actionsCallback={actionsCallback}
          maxVisibleActions={maxVisibleActions}
          actionsAlignment={actionsAlignment}
          isSelectable={isSelectable}
          onChange={(event) => {
            setSelected(event.target.checked);
            onChange?.(event);
          }}
          checked={selected}
          {...footerProps}
        />
      )}
    </>
  );

  return (
    <div className={clsx(classes.root)}>
      <div id={setId(id, "cardContentWrapper")} className={classes.cardContentWrapper}>
        <div
          className={clsx(classes.semanticContainer, {
            [classes[semantic]]: semantic,
            [classes.semanticSelected]: selected,
          })}
        />
        <Card
          id={id}
          className={clsx(classes.cardContainer, className, {
            [classes.selectable]: isSelectable,
            [classes.cardContainerSelected]: selected,
            [classes.selected]: selected,
          })}
          {...others}
        >
          {children || defaultContent}
        </Card>
      </div>
    </div>
  );
};

HvCard.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the cardContainer node.
   */
  id: PropTypes.string,
  /**
   * Extra properties to be passed element used to represent the clickable default card.
   */
  cardButtonProps: PropTypes.instanceOf(Object),
  /**
   * Extra properties to be passed element used to represent the default header card.
   */
  headerProps: PropTypes.instanceOf(Object),
  /**
   * Extra properties to be passed element used to represent the default media element.
   */
  mediaProps: PropTypes.instanceOf(Object),
  /**
   * Extra properties to be passed element used to represent the default footer card.
   */
  footerProps: PropTypes.instanceOf(Object),
  /**
   * Extra properties to be passed element used to represent the default content card.
   */
  contentProps: PropTypes.instanceOf(Object),
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Style applied to the root.
     */
    root: PropTypes.string,
    /**
     * Style applied to the card wrapper.
     */
    cardContentWrapper: PropTypes.string,
    /**
     * Style applied to the cardContainer.
     */
    cardContainer: PropTypes.string,
    /**
     * Style applied to the cardContainer when component is selected.
     */
    cardContainerSelected: PropTypes.string,
    /**
     * Style applied to the upper area when the component is selectable.
     */
    upperAreaSelectable: PropTypes.string,
    /**
     * Style applied to the container of the semantic bar on top.
     */
    semanticContainer: PropTypes.string,
    /**
     * Style applied to the container of the semantic bar on top when the component is selectable.
     */
    semanticSelected: PropTypes.string,
    /**
     * Style applied to the component when it is selectable.
     */
    selectable: PropTypes.string,
    /**
     * Style applied to the component when it is selected.
     */
    selected: PropTypes.string,
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
        icon: PropTypes.func,
      })
    ),
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
    "sema19",
  ]),
  /**
   *  The function that will be executed when the upper part of the card is clicked.
   *  only works for the default card.
   */
  onClick: PropTypes.func,
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
   * If `true` the checkbox is selected, if set to `false` the checkbox is not selected.
   * note: if this value is specified the state of the checkbox must be managed
   */
  checked: PropTypes.bool,
  /**
   * Properties to be passed onto the checkbox component, the values of the object are equivalent to the
   * HvCheckbox API.
   */
  checkboxProps: PropTypes.instanceOf(Object),
  /**
   *  The number of maximum visible actions before they're collapsed into a ´DropDownMenu´.
   */
  maxVisibleActions: PropTypes.number,
};

export default withStyles(styles, { name: "HvCard" })(HvCard);
