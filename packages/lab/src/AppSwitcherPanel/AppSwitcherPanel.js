import React, { Component } from "react";
import PropTypes from "prop-types";
import uniqueId from "lodash/uniqueId";

import Action from "./Action";

export default class AppSwitcherPanel extends Component {
  constructor(props) {
    super(props);

    const { id } = this.props;

    this.state = {
      internalId: id || uniqueId("hv-appswitcherpanel-"),
    };
  }

  render() {
    const { internalId } = this.state;
    const {
      classes,
      isOpen,
      title,
      applications,
      header,
      footer,
      onActionClickedCallback,
      isActionSelectedCallback,
    } = this.props;

    const actionClicked = (event, application) => {
      if (onActionClickedCallback) {
        onActionClickedCallback(event, application);
      }
    };

    const panelActions = applications.map((application, index) => {
      if (application.name && application.url) {
        return (
          <Action
            key={index}
            application={application}
            onClickCallback={actionClicked}
            isSelectedCallback={isActionSelectedCallback}
          />
        );
      }
    });

    return (
      <div id={internalId} className={`${classes.root} ${isOpen ? classes.open : ""}`}>
        <div className={classes.headerContainer}>
          {header ? (
            header
          ) : (
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
  }
}

AppSwitcherPanel.propTypes = {
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({}).isRequired,
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
  onActionClickedCallback: PropTypes.element.func,
  /**
   * Must return a boolean stating if the action element is selected or not.
   */
  isActionSelectedCallback: PropTypes.element.func,
};

AppSwitcherPanel.defaultProps = {
  isOpen: false,
  title: "Apps",
  footer: undefined,
  onActionClickedCallback: (event, application) => {},
  isActionSelectedCallback: () => false,
};
