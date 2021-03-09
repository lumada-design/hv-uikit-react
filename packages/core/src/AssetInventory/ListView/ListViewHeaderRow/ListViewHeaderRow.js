import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { HvTypography } from "../../..";
import styles from "./styles";

const renderHeaderCells = (classes, columnConfiguration) =>
  columnConfiguration.map((configuration, index) => {
    const keyIndex = `th${index}`;

    return (
      <div
        className={clsx(classes.headCell, {
          [classes[configuration.spacing]]: configuration.spacing,
        })}
        style={{ textAlign: configuration.align, ...configuration.style }}
        id={index}
        key={keyIndex}
        title={configuration.tooltip}
        aria-label={configuration.tooltip}
      >
        <HvTypography variant="labelText">{configuration.title || ""}</HvTypography>
      </div>
    );
  });

const ListViewHeaderRow = ({ viewConfiguration, classes, id, className, ...others }) => {
  const { columnConfiguration } = viewConfiguration;

  return (
    <div className={clsx(className, classes.root)} id={id} {...others}>
      {viewConfiguration.isSelectable && <div aria-label="selectable" />}
      {renderHeaderCells(classes, columnConfiguration)}
    </div>
  );
};

ListViewHeaderRow.propTypes = {
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * This value is provided by the asset inventory list view and contains the styling from the.
   */
  viewConfiguration: PropTypes.instanceOf(Object),
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component.
     */
    root: PropTypes.string,
    /**
     * TODO: add description
     */
    headCell: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles, { name: "HvListViewHeaderRow" })(ListViewHeaderRow);
