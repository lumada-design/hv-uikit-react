import React, { useRef, forwardRef, useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";

import TableContext from "./TableContext";
import styles from "./styles";

const defaultComponent = "table";

const computeTablePartComponents = (rootComponent) => {
  if (rootComponent === "table") {
    return {
      Table: "table",
      THead: "thead",
      TBody: "tbody",
      Tr: "tr",
      Th: "th",
      Td: "td",
    };
  }

  return {
    Table: rootComponent,
    THead: rootComponent,
    TBody: rootComponent,
    Tr: rootComponent,
    Th: rootComponent,
    Td: rootComponent,
  };
};

/**
 * A Table gathers relational data, it displays values arranged to allow quick numerical analysis
 * like comparison and sorting.
 *
 * **HvTable** component offers a set of HTML-equivalent elements, **styled to Design System's specification**,
 * for building tables.
 * You can rely on these **elements** when your table doesn’t have many interactions or you need it to be very lightweight.
 *
 * For better data handling and **advanced features** we recommend the use of the utility hooks collection .
 * See the <a href="?id=lab-table-hooks--main&viewMode=docs" target="_self">Table Hooks documentation</a> for more details.
 *
 * **PLEASE NOTE**: This Table implementation is still a WIP. There might be breaking changes.
 */
const HvTable = forwardRef(function HvTable(props, ref) {
  const {
    classes,
    className,
    component = defaultComponent,
    stickyHeader = false,
    stickyColumns = false,
    variant = "default",
    ...others
  } = props;

  const containerRef = useRef(ref);

  const components = useMemo(() => computeTablePartComponents(component), [component]);

  const tableContext = useMemo(
    () => ({ components, variant, containerRef }),
    [components, variant, containerRef]
  );

  return (
    <TableContext.Provider value={tableContext}>
      <components.Table
        ref={ref}
        role={component === defaultComponent ? null : "table"}
        className={clsx(
          classes.root,
          {
            [classes.stickyHeader]: stickyHeader,
            [classes.stickyColumns]: stickyColumns,
            [classes.listRow]: variant === "listrow",
          },
          className
        )}
        {...others}
      />
    </TableContext.Provider>
  );
});

HvTable.propTypes = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to `table`.
   *
   * When using non-table elements, layout is up to the developer using the component.
   */
  component: PropTypes.elementType,
  /**
   * Content to be rendered
   */
  children: PropTypes.node.isRequired,
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Whether the `HvTable` has a sticky header row.
   */
  stickyHeader: PropTypes.bool,
  /**
   * Whether the `HvTable` has sticky columns.
   */
  stickyColumns: PropTypes.bool,
  /**
   * Whether the `HvTable` has the list row styles or the default.
   */
  variant: PropTypes.oneOf(["listrow", "default"]),
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component root class when it has a sticky header.
     */
    stickyHeader: PropTypes.string,
    /**
     * Styles applied to the component root class when it has sticky columns.
     */
    stickyColumns: PropTypes.string,
    /**
     * Styles applied to the component root class when it has sticky columns.
     */
    listRow: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles, { name: "HvTable" })(HvTable);
