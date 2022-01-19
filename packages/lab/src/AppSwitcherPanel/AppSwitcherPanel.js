import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { deprecatedPropType, withStyles } from "@material-ui/core";

import { HvListContainer } from "@hitachivantara/uikit-react-core";

import styles from "./styles";

import TitleWithTooltip from "./TitleWithTooltip";
import Action from "./Action";

const AppSwitcherPanel = (props) => {
  const {
    id,

    className,
    classes,

    layout = "single",

    title,
    applications,

    onActionClickedCallback = () => {},
    isActionSelectedCallback = () => false,

    header,
    footer,

    isOpen,
  } = props;

  const actionClicked = (event, application) => {
    onActionClickedCallback?.(event, application);
  };

  const panelActions = applications.map((application) => {
    if (application.name) {
      return (
        <Action
          key={application.id || `${application.name}_${application.url}`}
          application={application}
          onClickCallback={actionClicked}
          isSelectedCallback={isActionSelectedCallback}
          classes={{
            root: classes.item,
            selected: classes.itemSelected,
            disabled: classes.itemDisabled,
            typography: classes.itemTrigger,
            icon: classes.itemIcon,
            title: classes.itemTitle,
            iconInfo: classes.itemInfoIcon,
          }}
        />
      );
    }

    return undefined;
  });

  return (
    <div
      id={id}
      className={clsx(className, classes.root, classes[layout], {
        [classes.closed]: isOpen === false,
        [classes.open]: isOpen,
      })}
    >
      {(header && <div className={classes.title}>{header}</div>) ||
        (title && <TitleWithTooltip className={classes.title} title={title} />)}
      <HvListContainer disableGutters className={classes.actionsContainer}>
        {panelActions}
      </HvListContainer>
      {footer && <div className={classes.footerContainer}>{footer}</div>}
    </div>
  );
};

AppSwitcherPanel.propTypes = {
  /**
   * Identifier to be applied to the root element.
   */
  id: PropTypes.string,

  /**
   * Class names to be applied to the root element.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    root: PropTypes.string,
    single: PropTypes.string,
    dual: PropTypes.string,
    fluid: PropTypes.string,
    title: PropTypes.string,
    actionsContainer: PropTypes.string,
    footerContainer: PropTypes.string,
    closed: PropTypes.string,
    open: PropTypes.string,

    item: PropTypes.string,
    itemSelected: PropTypes.string,
    itemDisabled: PropTypes.string,
    itemTrigger: PropTypes.string,
    itemIcon: PropTypes.string,
    itemTitle: PropTypes.string,
    itemInfoIcon: PropTypes.string,
  }).isRequired,

  /**
   * Number of columns to render. One, two, or whatever fits the component's width.
   */
  layout: PropTypes.oneOf(["single", "dual", "fluid"]),

  /**
   * Title to be displayed on the header of the component.
   */
  title: PropTypes.string,
  /**
   * The list of applications to be used to render the actions on the component.
   */
  applications: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * Id of the application.
       */
      id: PropTypes.string,
      /**
       * Name of the application, this is the value that will be displayed on the component.
       */
      name: PropTypes.string.isRequired,
      /**
       * URL with the icon location to be used to represent the application.
       * iconUrl will only be used if no iconElement is provided.
       */
      iconUrl: PropTypes.string,
      /**
       * Element to be added as the icon representing the application.
       * The iconElement will be the primary option to be displayed.
       */
      iconElement: PropTypes.element,
      /**
       * Small description of the application.
       */
      description: PropTypes.string,
      /**
       *  URL where the application is accesible.
       */
      url: PropTypes.string,
      /**
       * Defines if the application should be opened in the same tab or in a new one.
       */
      target: PropTypes.oneOf(["_top", "_blank"]),
      /**
       * If true, the item will be disabled.
       */
      disabled: PropTypes.bool,
      /**
       * True when the application is selected, false otherwise.
       */
      isSelected: PropTypes.bool,
    })
  ).isRequired,

  /**
   * Triggered when an action is clicked.
   */
  onActionClickedCallback: PropTypes.func,
  /**
   * Must return a boolean stating if the action element is selected or not.
   */
  isActionSelectedCallback: PropTypes.func,

  /**
   * Element to be added to the header container, if none is provided a label with the title will be added.
   */
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Element to be added to the footer container.
   */
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  /**
   * Flag stating if the panel is opened or closed.
   *
   * @deprecated This logic should be external, i.e. using the HvAppSwitcherPanel inside a Drawer component.
   */
  isOpen: deprecatedPropType(PropTypes.bool),
};

export default withStyles(styles, { name: "HvAppSwitcherPanel" })(AppSwitcherPanel);
