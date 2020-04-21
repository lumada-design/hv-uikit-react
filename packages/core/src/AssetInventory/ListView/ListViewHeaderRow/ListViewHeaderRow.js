import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { withStyles } from "@material-ui/core";
import HvTypography from "../../../Typography";
import styles from "./styles";

const HeaderCells = (classes, columnConfiguration) =>
  columnConfiguration.map((configuration, index) => {
    const alignConf =
      !isNil(configuration) && !isNil(configuration.align) ? configuration.align : undefined;

    const keyIndex = `th${index}`;

    return (
      <div
        className={clsx(classes.headCell, {
          [classes[configuration.spacing]]: configuration.spacing
        })}
        style={{ ...configuration.style }}
        align={alignConf}
        id={index}
        key={keyIndex}
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
      {HeaderCells(classes, columnConfiguration)}
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
    headCell: PropTypes.string
  }).isRequired
};

export default withStyles(styles, { name: "HvListViewHeaderRow" })(ListViewHeaderRow);
