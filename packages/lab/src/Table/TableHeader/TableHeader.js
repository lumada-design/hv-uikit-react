import React, { forwardRef, useContext, useMemo } from "react";
import PropTypes, { object } from "prop-types";
import clsx from "clsx";
import capitalize from "lodash/capitalize";

import { withStyles } from "@material-ui/core";
import { HvButton, HvTypography } from "@hitachivantara/uikit-react-core";
import { getSortIcon, isParagraph } from "./utils";
import styles from "./styles";
import TableContext from "../TableContext";
import TableSectionContext from "../TableSectionContext";

const defaultComponent = "th";

/**
 * `HvTableHeader` acts as a `th` element and inherits styles from its context
 */
const HvTableHeader = forwardRef(function HvTableHeader(props, ref) {
  const {
    children,

    component,

    className,
    style,
    classes,

    scope: scopeProp,

    align = "inherit",
    variant = "default",

    type: typeProp,

    stickyColumn = false,
    stickyColumnMostLeft = false,
    stickyColumnLeastRight = false,

    groupColumnMostLeft = false,
    groupColumnMostRight = false,

    sortDirection = "none",
    sorted,
    sortable,
    headerTextProps,

    resizerProps = {},
    resizable = false,
    resizing = false,

    ...others
  } = props;

  const tableContext = useContext(TableContext);
  const tableSectionContext = useContext(TableSectionContext);

  const type = typeProp || tableSectionContext?.type || "body";
  const isHeadCell = type === "head";

  const scope = scopeProp ?? isHeadCell ? "col" : "row";

  const Sort = useMemo(() => getSortIcon(sorted && sortDirection), [sorted, sortDirection]);

  const Component = component || tableContext?.components?.Th || defaultComponent;

  // eslint-disable-next-line no-nested-ternary
  const role = Component === defaultComponent ? null : isHeadCell ? "columnheader" : "rowheader";
  const paragraph = isParagraph(children);
  return (
    <Component
      ref={ref}
      role={role}
      scope={scope}
      style={style}
      className={clsx(
        classes.root,
        classes[type],
        {
          [classes[`align${capitalize(align)}`]]: align !== "inherit",
          [classes[`variant${capitalize(variant)}`]]: variant !== "default",
          [classes.variantList]: tableContext.variant === "listrow",
          [classes.stickyColumn]: stickyColumn,
          [classes.stickyColumnMostLeft]: stickyColumnMostLeft,
          [classes.stickyColumnLeastRight]: stickyColumnLeastRight,

          [classes.groupColumnMostLeft]: groupColumnMostLeft,
          [classes.groupColumnMostRight]: groupColumnMostRight,

          [classes.sortable]: sortable,
          [classes.sorted]: sorted,
          [classes.resizable]: resizable,
          [classes.resizing]: resizing,
        },
        className
      )}
      aria-sort={sortable ? sortDirection : undefined}
      {...others}
    >
      <div
        className={clsx(classes.headerContent, {
          [classes[`alignFlex${capitalize(align)}`]]: align !== "inherit",
        })}
      >
        {isHeadCell && sortable && (
          <HvButton className={classes.sortButton} icon overrideIconColors={false}>
            <Sort className={classes.sortIcon} />
          </HvButton>
        )}
        <HvTypography
          component="div"
          className={clsx({
            [classes.headerText]: !paragraph,
            [classes.headerParagraph]: paragraph,
            [classes.sortableHeaderText]: sortable,
          })}
          variant="highlightText"
          {...headerTextProps}
        >
          {children}
        </HvTypography>
        {resizable && <div {...resizerProps} className={classes.resizer} />}
      </div>
    </Component>
  );
});

HvTableHeader.propTypes = {
  /**
   * The component used for the root node. Either a string to use a HTML element or a component.
   * Defaults to th.
   */
  component: PropTypes.elementType,

  /**
   * Content to be rendered
   */
  children: PropTypes.node,

  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Inline styles to be applied to the root element.
   */
  style: PropTypes.instanceOf(Object),

  /**
   * The scope of cells that the header element relates to.
   */
  scope: PropTypes.oneOf(["col", "row", "colgroup", "rowgroup"]),

  /**
   * Set the text-align on the table cell content.
   */
  align: PropTypes.oneOf(["center", "inherit", "justify", "left", "right"]),
  /**
   * Sets the cell's variant.
   */
  variant: PropTypes.oneOf(["checkbox", "expand", "actions", "default", "none"]),

  /**
   * Specify the cell type.
   * The prop defaults to the value inherited from the parent TableHead, TableBody, or TableFooter components.
   */
  type: PropTypes.oneOf(["body", "footer", "head"]),

  /**
   * The cell is part of a sticky column.
   */
  stickyColumn: PropTypes.bool,
  /**
   * The cell is part of the last sticky to the left column.
   */
  stickyColumnMostLeft: PropTypes.bool,
  /**
   * The cell is part of the first sticky to the right column.
   */
  stickyColumnLeastRight: PropTypes.bool,

  /**
   * The cell is part of the first column in the group.
   */
  groupColumnMostLeft: PropTypes.bool,
  /**
   * The cell is part of the last column in the group.
   */
  groupColumnMostRight: PropTypes.bool,

  /**
   * Whether or not the cell is sorted
   */
  sorted: PropTypes.bool,
  /**
   * Whether or not the cell is sortable
   */
  sortable: PropTypes.bool,
  /**
   * Set sort direction icon and aria-sort.
   */
  sortDirection: PropTypes.oneOf(["ascending", "descending", false]),
  /**
   * Extra props to be passed onto the text in the header.
   */
  headerTextProps: PropTypes.instanceOf(object),

  /**
   * Whether or not the cell is resizable
   */
  resizable: PropTypes.bool,
  /**
   * Whether or not the cell is being resized
   */
  resizing: PropTypes.bool,

  /**
   * The resize props injected in the resize handler
   */
  resizerProps: PropTypes.instanceOf(object),

  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,

    /**
     * Styles applied to the cell when it's in the table head.
     */
    head: PropTypes.string,
    /**
     * Styles applied to the cell when it's in the table body.
     */
    body: PropTypes.string,
    /**
     * Styles applied to the cell when it's in the table footer.
     */
    footer: PropTypes.string,

    /**
     * Styles applied to the cell when it's part of a sticky column.
     */
    stickyColumn: PropTypes.string,
    /**
     * Styles applied to the cell when it's part of the last sticky to the left column.
     */
    stickyColumnMostLeft: PropTypes.string,
    /**
     * Styles applied to the cell when it's part of the first right sticky column.
     */
    stickyColumnLeastRight: PropTypes.string,

    /**
     * Styles applied to the cell when it's part of the first column in the group.
     */
    groupColumnMostLeft: PropTypes.string,
    /**
     * Styles applied to the cell when it's part of the last column in the group.
     */
    groupColumnMostRight: PropTypes.string,

    /**
     * Styles applied to the container of the header cell content.
     */
    headerContent: PropTypes.string,
    /**
     * Styles applied to the text of the header cell.
     */
    headerText: PropTypes.string,
    /**
     * Styles applied to the text of the header cell when it is a paragraph.
     */
    headerParagraph: PropTypes.string,
    /**
     * Styles applied to the text of the header cell when it is sorted.
     */
    sortableHeaderText: PropTypes.string,

    /**
     * Styles applied to the component root when it is sorted.
     */
    sorted: PropTypes.string,
    /**
     * Styles applied to the component root when it is sortable.
     */
    sortable: PropTypes.string,
    /**
     * Styles applied to the sort button component.
     */
    sortButton: PropTypes.string,
    /**
     * Styles applied to the sort icon component.
     */
    sortIcon: PropTypes.string,

    /**
     * Styles applied to the component root when it is left aligned
     */
    alignLeft: PropTypes.string,
    /**
     * Styles applied to the component root when it is right aligned
     */
    alignRight: PropTypes.string,
    /**
     * Styles applied to the component root when it is center aligned
     */
    alignCenter: PropTypes.string,
    /**
     * Styles applied to the component root when it is justified
     */
    alignJustify: PropTypes.string,
    /**
     * Styles applied to the header content when it is left aligned
     */
    alignFlexLeft: PropTypes.string,
    /**
     * Styles applied to the header content when it is right aligned
     */
    alignFlexRight: PropTypes.string,
    /**
     * Styles applied to the header content when it is center aligned
     */
    alignFlexCenter: PropTypes.string,
    /**
     * Styles applied to the header content when it is justified
     */
    alignFlexJustify: PropTypes.string,
    /**
     * Styles applied to the component root when its variant is checkbox
     */
    variantCheckbox: PropTypes.string,
    /**
     * Styles applied to the component root when its variant is expand
     */
    variantExpand: PropTypes.string,
    /**
     * Styles applied to the component root when its variant is actions
     */
    variantActions: PropTypes.string,
    /**
     * Styles applied to the component root when its variant is none
     */
    variantNone: PropTypes.string,
    /**
     * Styles applied to the component root when its variant is list row
     */
    variantList: PropTypes.string,
    /**
     * Styles applied to the cell when it's part of a resizable column.
     */
    resizable: PropTypes.string,
    /**
     * Styles applied to the cell when it's part of a resizing column.
     */
    resizing: PropTypes.string,
    /**
     * Styles applied to the resizer object when column is resizable.
     */
    resizer: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles, { name: "HvTableHeader" })(HvTableHeader);
