import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";

import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { ExtractNames } from "@core/utils/classes";

import { ConfirmationDialog } from "./ConfirmationDialog";
import {
  HvQueryBuilderProvider,
  defaultCombinators,
  defaultLabels,
  defaultOperators,
} from "./Context";
import { RuleGroup } from "./RuleGroup";
import {
  AskAction,
  HvQueryBuilderAttribute,
  HvQueryBuilderQuery,
  HvQueryBuilderLabels,
  HvQueryBuilderQueryCombinator,
  HvQueryBuilderQueryOperator,
  HvQueryBuilderChangedQuery,
} from "./types";
import { clearNodeIds, emptyGroup } from "./utils";
import reducer from "./utils/reducer";
import { useClasses, staticClasses } from "./QueryBuilder.styles";

export { staticClasses as queryBuilderClasses };

export type HvQueryBuilderClasses = ExtractNames<typeof useClasses>;

export interface HvQueryBuilderProps {
  /** The query attribute types. */
  attributes?: Record<string, HvQueryBuilderAttribute>;
  /** The query rules operators by attribute type and combinator. */
  operators?: Record<string, HvQueryBuilderQueryOperator[]>;
  /** The query combinators operands. */
  combinators?: HvQueryBuilderQueryCombinator[];
  /** The initial query representation. */
  query?: HvQueryBuilderQuery;
  /** Callback fired when query changes. */
  onChange?: (value: HvQueryBuilderChangedQuery) => void;
  /** Max depth of nested query groups. */
  maxDepth?: number;
  /** Object containing all the labels. */
  labels?: HvQueryBuilderLabels;
  /** Whether the query builder is in read-only mode. */
  readOnly?: boolean;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvQueryBuilderClasses;
}

// TODO - v6
// - uncontrolled vs controlled: users should be able to control the state
// - "query" renamed to "initialQuery" and "query" used to control the state
// - "query" provided with ids by the user but removed through "onChange"

/**
 * This component allows you to create conditions and group them using logical operators.
 * It outputs a structured set of rules which can be easily parsed to create SQL/NoSQL/whatever queries.
 */
export const HvQueryBuilder = (props: HvQueryBuilderProps) => {
  const {
    attributes,
    query,
    onChange,
    operators = defaultOperators,
    combinators = defaultCombinators,
    maxDepth = 1,
    labels = defaultLabels,
    readOnly = false,
    classes: classesProp,
  } = useDefaultProps("HvQueryBuilder", props);

  const { classes } = useClasses(classesProp);

  const currentAttributes = useRef<HvQueryBuilderProps["attributes"] | null>(
    null
  );

  const initialQuery = useRef(query ?? emptyGroup());

  const [pendingAction, setPendingAction] = useState<AskAction>();
  const [prevState, setPrevState] = useState(initialQuery.current);
  const [initialState, setInitialState] = useState(true);

  const [state, dispatchAction] = useReducer(
    reducer,
    // Deep clone is needed to make sure that the "query" prop and "initialQuery" are not mutated
    cloneDeep(initialQuery.current)
  );

  const value = useMemo(
    () => ({
      dispatchAction,
      askAction: setPendingAction,
      attributes,
      operators,
      combinators,
      maxDepth,
      labels,
      initialTouched: initialState,
      readOnly,
    }),
    [
      attributes,
      operators,
      combinators,
      maxDepth,
      labels,
      readOnly,
      initialState,
    ]
  );

  // Keep track of attributes
  useEffect(() => {
    if (currentAttributes.current == null) {
      // First run, nothing to do
      currentAttributes.current = attributes;
    } else if (currentAttributes.current !== attributes) {
      // Attributes changed. The existing query is almost certainly invalid, so reset it
      currentAttributes.current = attributes;
      dispatchAction({ type: "reset-query" });
    }
  }, [attributes]);

  // Propagate the change if the query is modified
  useEffect(() => {
    if (!isEqual(state, prevState)) {
      if (initialState) {
        setInitialState(false);
      }

      onChange?.(clearNodeIds(state) as HvQueryBuilderChangedQuery);
      setPrevState(cloneDeep(state));
    }
  }, [initialState, onChange, prevState, state]);

  const handleConfirm = () => {
    if (pendingAction) {
      setPendingAction(undefined);
      pendingAction.actions.forEach((action) => dispatchAction(action));
    }
  };

  const handleCancel = () => {
    setPendingAction(undefined);
  };

  return (
    <HvQueryBuilderProvider value={value}>
      <RuleGroup
        level={0}
        id={state.id}
        combinator={state.combinator}
        rules={state.rules}
        classes={classes}
      />
      <ConfirmationDialog
        isOpen={pendingAction != null}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title={pendingAction?.dialog.dialogTitle || ""}
        message={pendingAction?.dialog.dialogMessage || ""}
        confirmButtonLabel={pendingAction?.dialog.dialogConfirm || ""}
        cancelButtonLabel={pendingAction?.dialog.dialogCancel || ""}
        closeButtonTooltip={pendingAction?.dialog.dialogCloseTooltip || ""}
      />
    </HvQueryBuilderProvider>
  );
};
