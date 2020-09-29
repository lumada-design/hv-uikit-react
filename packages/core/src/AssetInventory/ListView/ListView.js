import React, { useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import { ListViewContextProvider } from "./ListViewContext/ListViewContext";
import ListViewHeaderRow from "./ListViewHeaderRow";
import Grid from "../../Grid";
import styles from "./styles";

const Rows = ({ renderer, values, selectedValues, viewConfiguration, metadata }) =>
  values.map((value, index) => {
    // eslint-disable-next-line no-param-reassign
    value.checked = selectedValues && selectedValues.includes(value.id);
    return renderer(value, index, viewConfiguration, metadata);
  });

const ListView = ({
  className,
  id,
  viewConfiguration,
  classes,
  renderer,
  values,
  selectedValues,
  metadata,
  emptyComponent,
  ...others
}) => {
  const hasValues = values.length > 0;

  const GridDisplay = (containerRef) => {
    const enhancedViewConfiguration = {
      containerRef,
      ...viewConfiguration,
    };

    return (
      <Grid container justify="center" alignContent="stretch">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <div
            id={id}
            aria-rowcount={values.length}
            className={clsx(className, classes.root)}
            {...others}
          >
            {viewConfiguration?.columnConfiguration?.length > 0 && hasValues && (
              <div className={classes.tableHead}>
                <ListViewHeaderRow viewConfiguration={enhancedViewConfiguration} />
              </div>
            )}
            <ul className={classes.tableBody}>
              <ListViewContextProvider value={enhancedViewConfiguration}>
                <Rows
                  classes={classes}
                  renderer={renderer}
                  values={values}
                  selectedValues={selectedValues}
                  metadata={metadata}
                  viewConfiguration={enhancedViewConfiguration}
                  containerRef={containerRef}
                />
              </ListViewContextProvider>
            </ul>
          </div>
        </Grid>
      </Grid>
    );
  };
  const containerRef = useRef(null);
  return (
    <>
      {!hasValues && emptyComponent}
      {hasValues && (
        <div className={classes.root} ref={containerRef}>
          <div className={classes.elements}>{GridDisplay(containerRef)}</div>
        </div>
      )}
    </>
  );
};

ListView.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * Component to the present when no data is available.
   */
  emptyComponent: PropTypes.node,
  /**
   * Configuration used to setup various properties of the view.
   * This configuration is propagated to the known childs of the asset inventory through context.
   */
  viewConfiguration: PropTypes.shape({
    onSelection: PropTypes.func,
    isSelectable: PropTypes.bool,
    columnConfiguration: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.String,
        style: PropTypes.instanceOf(Object),
      })
    ),
    maxVisibleActions: PropTypes.number,
    actions: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          icon: PropTypes.func,
        })
      ),
    ]),
    actionsCallback: PropTypes.func,
  }),
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component that contains the elements class.
     */
    elements: PropTypes.string,
    /**
     * Styles applied to the table header.
     */
    tableHead: PropTypes.string,
    /**
     * Styles applied to the table body.
     */
    tableBody: PropTypes.string,
  }).isRequired,
  /**
   * The function that will be used to render the list,
   * it receives the values one bye one, is recommended to use
   * the list View cell and list view Row to construct the renderer
   */
  renderer: PropTypes.func.isRequired,
  /**
   * The values that will be passed to the renderer one by one
   */
  values: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  /**
   * Selected values.
   */
  selectedValues: PropTypes.arrayOf(PropTypes.string),
  /**
   * Metadata associated with the values.
   */
  metadata: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      accessor: PropTypes.string,
      cellType: PropTypes.oneOf(["alpha-numeric", "numeric", "date", "node"]),
      sortable: PropTypes.bool,
      sortFunction: PropTypes.func,
      searchable: PropTypes.bool,
      searchFunction: PropTypes.func,
    })
  ),
};

export default withStyles(styles, { name: "HvListView" })(ListView);
