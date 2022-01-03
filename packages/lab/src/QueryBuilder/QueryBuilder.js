import React, { useEffect, useMemo, useReducer, useRef, useState, useContext } from "react";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import cloneDeep from "lodash/cloneDeep";
import { withStyles } from "@material-ui/core";

import Context from "./Context";
import RuleGroup from "./RuleGroup";
import ConfirmationDialog from "./ConfirmationDialog";
import { emptyGroup, clearNodeIds } from "./utils";
import reducer from "./utils/reducer";
import styles from "./styles";

/**
 * **HvQueryBuilder** component allows you to create conditions and group them using logical operators.
 * It outputs a structured set of rules which can be easily parsed to create SQL/NoSQL/whatever queries.
 *
 * **PLEASE NOTE**: This component implementation is still a WIP. There might be breaking changes.
 */
const HvQueryBuilder = ({
  attributes = [],
  query,
  onChange,
  operators,
  combinators,
  maxDepth = 1,
  labels,
}) => {
  const [pendingAction, askAction] = useState();
  const currentAttributes = useRef();
  const [state, dispatchAction] = useReducer(
    reducer,
    query,
    (initialState) => initialState || emptyGroup()
  );

  const initialState = query === state;
  const [prevState, setPrevState] = useState();

  const defaultcontext = useContext(Context);

  const context = useMemo(
    () => ({
      dispatchAction,
      askAction,
      attributes,
      operators: operators ?? defaultcontext.operators,
      combinators: combinators ?? defaultcontext.combinators,
      maxDepth: maxDepth ?? defaultcontext.maxDepth,
      labels: labels ?? defaultcontext.labels,
      initialTouched: initialState,
    }),
    [
      attributes,
      operators,
      defaultcontext.operators,
      defaultcontext.combinators,
      defaultcontext.maxDepth,
      defaultcontext.labels,
      combinators,
      maxDepth,
      labels,
      initialState,
    ]
  );

  useEffect(() => {
    if (currentAttributes.current == null) {
      // first run, nothing to do
      currentAttributes.current = attributes;
    } else if (currentAttributes.current !== attributes) {
      // attributes changed, the existing query is almost certain invalid, so reset it
      currentAttributes.current = attributes;
      dispatchAction({ type: "reset-query" });
    }
  }, [attributes]);

  // Propagate the change if the query is modified.
  useEffect(() => {
    if (!initialState && !isEqual(state, prevState)) {
      onChange?.(clearNodeIds(state));
      setPrevState(cloneDeep(state));
    }
  }, [state, prevState, initialState, onChange]);

  const onConfirmHandler = () => {
    if (pendingAction) {
      askAction(undefined);
      pendingAction.actions.forEach((action) => dispatchAction(action));
    }
  };

  const onCancelHandler = () => {
    askAction(undefined);
  };

  return (
    <Context.Provider value={context}>
      <RuleGroup level={0} id={state.id} combinator={state.combinator} rules={state.rules} />
      <ConfirmationDialog
        isOpen={pendingAction != null}
        onConfirm={onConfirmHandler}
        onCancel={onCancelHandler}
        title={pendingAction?.dialog.dialogTitle || ""}
        message={pendingAction?.dialog.dialogMessage || ""}
        confirmButtonLabel={pendingAction?.dialog.dialogConfirm || ""}
        cancelButtonLabel={pendingAction?.dialog.dialogCancel || ""}
        closeButtonTooltip={pendingAction?.dialog.dialogCloseTooltip || ""}
      />
    </Context.Provider>
  );
};

HvQueryBuilder.propTypes = {
  /**
   * The query rules attributes.
   */
  attributes: PropTypes.shape({
    key: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.any,
      order: PropTypes.number,
    }),
  }).isRequired,
  /**
   * The query rules operators by attribute type and combinator.
   */
  operators: PropTypes.shape({
    type: PropTypes.arrayOf(
      PropTypes.shape({
        operator: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        combinators: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ),
  }),
  /**
   * The query combinators operands.
   */
  combinators: PropTypes.arrayOf(
    PropTypes.shape({
      operand: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  /**
   * The initial query representation.
   */
  query: PropTypes.shape({
    id: PropTypes.number,
    combinator: PropTypes.string.isRequired,
    rules: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        attribute: PropTypes.string,
        operator: PropTypes.string,
        value: PropTypes.any,
      })
    ).isRequired,
  }),
  /**
   * Callback fired when query changes.
   */
  onChange: PropTypes.func,
  /**
   * Max depth of nested query groups.
   */
  maxDepth: PropTypes.number,
  /**
   * An object containing all the labels.
   */
  labels: PropTypes.instanceOf(Object),
};

export default withStyles(styles, { name: "HvQueryBuilder" })(HvQueryBuilder);
