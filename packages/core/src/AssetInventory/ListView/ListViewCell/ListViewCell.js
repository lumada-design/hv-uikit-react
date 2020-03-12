import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { withStyles } from "@material-ui/core";
import { ListViewContextConsumer } from "../ListViewContext/ListViewContext";
import styles from "./styles";

const cell = (
  classes,
  align,
  className,
  id,
  children,
  viewConfiguration,
  columnIndex,
  semantic,
  other
) => {
  const columnConfiguration =
    isNil(viewConfiguration) || isNil(viewConfiguration.columnConfiguration)
      ? null
      : viewConfiguration.columnConfiguration;
  const alignConf =
    !isNil(columnConfiguration) &&
    !isNil(columnIndex) &&
    Array.isArray(columnConfiguration) &&
    !isNil(columnConfiguration[columnIndex].align)
      ? columnConfiguration[columnIndex].align
      : undefined;
  return (
    <td
      className={clsx(className, classes.root, {
        [classes.semanticBar]: semantic,
        [classes[semantic]]: semantic
      })}
      align={align || alignConf}
      id={id}
      {...other}
    >
      {children}
    </td>
  );
};

const ListViewCell = ({
  classes,
  className,
  id,
  children,
  align,
  columnIndex,
  semantic,
  ...other
}) => (
  <ListViewContextConsumer>
    {contextConfiguration =>
      cell(
        classes,
        align,
        className,
        id,
        children,
        contextConfiguration,
        columnIndex,
        semantic,
        other
      )
    }
  </ListViewContextConsumer>
);

ListViewCell.propTypes = {
  /**
   * Alignment of the cell correspond to the htlm attribute.
   */
  align: PropTypes.string,
  /**
   * Used to identify the cell and apply the correct column styling
   * this value is injected by list view row.
   */
  columnIndex: PropTypes.number,
  /**
   * Id to be applied to the root node this value is used to identify the checkbox clicks or actions.
   */
  id: PropTypes.string,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the assetinventorylistview root class.
     */
    root: PropTypes.string
  }).isRequired,
  /**
   *  The border color of the cell. Must be one of palette semantic colors.
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
    "atmo1",
    "atmo2",
    "atmo3",
    "atmo4",
    "atmo5",
    "atmo6"
  ]),
  children: PropTypes.node.isRequired
};

ListViewCell.defaultProps = {
  id: "",
  semantic: undefined,
  align: undefined,
  columnIndex: undefined,
  className: ""
};

export default withStyles(styles, { name: "HvListViewCell" })(ListViewCell);
