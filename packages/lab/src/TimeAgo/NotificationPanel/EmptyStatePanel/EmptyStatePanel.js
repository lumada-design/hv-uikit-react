import React from "react";
import PropTypes from "prop-types";

import { HvEmptyState } from "@hitachivantara/uikit-react-core";
import { Alert } from "@hitachivantara/uikit-react-icons";

import { withStyles } from "@mui/styles";
import styles from "./styles";

const EmptyStatePanel = ({ id, classes, className, title, message, icon }) => {
  return (
    <HvEmptyState
      id={id}
      title={title}
      message={message}
      icon={icon || <Alert />}
      className={className}
      classes={{
        root: classes.emptyStateRoot,
        container: classes.emptyStateContainer,
        iconContainer: classes.emptyStateIconContainer,
        titleContainer: classes.emptyStateTitleContainer,
      }}
    />
  );
};

EmptyStatePanel.propTypes = {
  /**
   * Id of the EmptyStatePanel
   */
  id: PropTypes.string.isRequired,
  /**
   * A Jss Object used to override or extend the component styles.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root of the panel.
     */
    emptyStateRoot: PropTypes.string,
    /**
     * Styles applied to the EmptyStatePanel container.
     */
    emptyStateContainer: PropTypes.string,

    /**
     * Styles applied to the empty state container icon.
     */
    emptyStateIconContainer: PropTypes.string,

    /**
     * Styles applied to the EmptyStatePanel title.
     */
    emptyStateTitleContainer: PropTypes.string,
  }).isRequired,

  /**
   * Class names to be applied to the accordion.
   */
  className: PropTypes.string,
  /**
   * Title of the EmptyStatePanel
   */
  title: PropTypes.string.isRequired,
  /**
   * Message of the EmptyStatePanel
   */
  message: PropTypes.string.isRequired,
  /**
   * Empty Panel Icon
   */
  icon: PropTypes.element,
};
export default withStyles(styles, { name: "HvEmptyStatePanel" })(EmptyStatePanel);
