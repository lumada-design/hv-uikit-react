import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { withStyles } from "@material-ui/core";

import styles from "./styles";

import Action from "./Action";

const AppSwitcherPanel = (props) => {
  const {
    id,
    classes,
    isOpen = false,
    title = "Apps",
    applications,
    header,
    footer,
    onActionClickedCallback = () => {},
    isActionSelectedCallback = () => false,
  } = props;

  const actionClicked = (event, application) => {
    onActionClickedCallback?.(event, application);
  };

  const panelActions = applications.map((application) => {
    if (application.name && application.url) {
      return (
        <Action
          key={application.url}
          application={application}
          onClickCallback={actionClicked}
          isSelectedCallback={isActionSelectedCallback}
        />
      );
    }

    return undefined;
  });

  return (
    <div id={id} className={clsx(classes.root, { [classes.open]: isOpen })}>
      <div className={classes.headerContainer}>
        {header || (
          <div className={classes.titleContainer}>
            <div className={classes.title} title={title}>
              {title}
            </div>
          </div>
        )}
      </div>
      <div className={classes.actionsContainer}>{panelActions}</div>
      {footer && <div className={classes.footerContainer}>{footer}</div>}
    </div>
  );
};

AppSwitcherPanel.propTypes = {
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    root: PropTypes.string,
    open: PropTypes.string,
    headerContainer: PropTypes.string,
    titleContainer: PropTypes.string,
    title: PropTypes.string,
    actionsContainer: PropTypes.string,
    footerContainer: PropTypes.string,
  }).isRequired,
  /**
   * Flag stating if the panel is opened or closed.
   */
  isOpen: PropTypes.bool,
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
      id: PropTypes.string.isRequired,
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
      url: PropTypes.string.isRequired,
      /**
       * Defines if the application should be opened in the same tab or in a new one.
       */
      target: PropTypes.oneOf(["_top", "_blank"]),
      /**
       * True when the application is selected, false otherwise.
       */
      isSelected: PropTypes.bool,
    })
  ).isRequired,
  /**
   * Element to be added to the header container, if none is provided a label with the title will be added.
   */
  header: PropTypes.element,
  /**
   * Element to be added to the footer container.
   */
  footer: PropTypes.element,
  /**
   * Triggered when an action is clicked.
   */
  onActionClickedCallback: PropTypes.func,
  /**
   * Must return a boolean stating if the action element is selected or not.
   */
  isActionSelectedCallback: PropTypes.func,
};

export default withStyles(styles, { name: "HvAppSwitcherPanel" })(AppSwitcherPanel);
