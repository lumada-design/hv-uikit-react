import React, { forwardRef, useContext, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@mui/styles";
import { HvFocus, useForkRef } from "@hitachivantara/uikit-react-core";

import TableContext from "../TableContext";
import TableSectionContext from "../TableSectionContext";
import styles from "./styles";

const tableSectionContext = {
  type: "body",
  filterClassName: "grid",
};

const defaultComponent = "tbody";

/**
 * HvTableBody acts as a `tbody` element.
 * `HvTableCell` and `HvTableRow` elements in it inherit body-specific styles
 */
const HvTableBody = forwardRef(function HvTableBody(props, externalRef) {
  const { classes, className, component, children, withNavigation = false, ...others } = props;

  const tableContext = useContext(TableContext);

  const bodyRef = useRef(null);

  const handleRef = useForkRef(externalRef, bodyRef);

  const Component = component || tableContext?.components?.TBody || defaultComponent;

  return (
    <TableSectionContext.Provider value={tableSectionContext}>
      <Component
        className={clsx(classes.root, className)}
        ref={handleRef}
        role={Component === defaultComponent ? null : "rowgroup"}
        {...others}
      >
        {withNavigation
          ? children.map((element) => {
              return (
                <HvFocus
                  rootRef={bodyRef}
                  key={`row-${element.key}`}
                  strategy="grid"
                  useArrows="true"
                  filterClass={tableSectionContext.filterClassName}
                  navigationJump={1}
                  focusDisabled={false}
                  selected={element.props.selected}
                >
                  {element}
                </HvFocus>
              );
            })
          : children}
      </Component>
    </TableSectionContext.Provider>
  );
});

HvTableBody.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Content to be rendered
   */
  children: PropTypes.node,
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to tbody.
   */
  component: PropTypes.elementType,
  /**
   * Sets whether or not there should be arrow navigation between the table rows
   */
  withNavigation: PropTypes.bool,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles, { name: "HvTableBody" })(HvTableBody);
