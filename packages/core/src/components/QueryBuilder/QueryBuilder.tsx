import {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";

import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { ExtractNames } from "@core/utils/classes";

import { ConfirmationDialog } from "./ConfirmationDialog";
import { QueryBuilderContext } from "./Context";
import { RuleGroup } from "./RuleGroup";
import {
  AskAction,
  HvQueryBuilderAttribute,
  HvQueryBuilderQuery,
  HvQueryBuilderLabels,
  HvQueryBuilderQueryCombinator,
  HvQueryBuilderQueryOperator,
} from "./types";
import { clearNodeIds, emptyGroup } from "./utils";
import reducer from "./utils/reducer";
import { useClasses, staticClasses } from "./QueryBuilder.styles";

export { staticClasses as queryBuilderClasses };

export type HvQueryBuilderClasses = ExtractNames<typeof useClasses>;

export interface HvQueryBuilderProps {
  attributes?: Record<string, HvQueryBuilderAttribute>;
  /**
   * The query rules operators by attribute type and combinator.
   */
  operators?: Record<string, HvQueryBuilderQueryOperator[]>;
  /**
   * The query combinators operands.
   */
  combinators?: HvQueryBuilderQueryCombinator[];
  /**
   * The initial query representation.
   */
  query?: HvQueryBuilderQuery;
  /**
   * Callback fired when query changes.
   * @param  value - the query representation.
   */
  onChange?: (value: HvQueryBuilderQuery) => void;
  /**
   * Max depth of nested query groups.
   */
  maxDepth?: number;
  /**
   * An object containing all the labels.
   */
  labels?: HvQueryBuilderLabels;
  /**
   * A flag indicating if the Query Builder is in read only mode.
   */
  readOnly?: boolean;
  /**
   * Override or extend the styles applied to the component.
   * See CSS API tab for more details.
   */
  classes?: HvQueryBuilderClasses;
}

/**
 * **HvQueryBuilder** component allows you to create conditions and group them using logical operators.
 * It outputs a structured set of rules which can be easily parsed to create SQL/NoSQL/whatever queries.
 */
export const HvQueryBuilder = (props: HvQueryBuilderProps) => {
  const {
    attributes,
    query,
    onChange,
    operators,
    combinators,
    maxDepth = 1,
    labels,
    readOnly = false,
    classes: classesProp,
  } = useDefaultProps("HvQueryBuilder", props);
  const { classes } = useClasses(classesProp);

  const [pendingAction, askAction] = useState<AskAction>();
  const currentAttributes = useRef<
    Record<string, HvQueryBuilderAttribute> | undefined | null
  >(null);
  const [state, dispatchAction] = useReducer(
    reducer,
    query,
    (initialState) => initialState || emptyGroup()
  );

  const initialState = query === state;
  const [prevState, setPrevState] = useState();

  const defaultContext = useContext(QueryBuilderContext);

  const context = useMemo(
    () => ({
      dispatchAction,
      askAction,
      attributes,
      /* eslint-disable react/destructuring-assignment */
      operators: operators ?? defaultContext.operators,
      combinators: combinators ?? defaultContext.combinators,
      maxDepth: maxDepth ?? defaultContext.maxDepth,
      labels: labels ?? defaultContext.labels,
      initialTouched: initialState,
      readOnly,
    }),
    [
      attributes,
      operators,
      defaultContext.operators,
      defaultContext.combinators,
      defaultContext.maxDepth,
      defaultContext.labels,
      combinators,
      maxDepth,
      labels,
      readOnly,
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
    <QueryBuilderContext.Provider value={context}>
      <RuleGroup
        level={0}
        id={state.id}
        combinator={state.combinator}
        rules={state.rules}
        classes={classes}
      />
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
    </QueryBuilderContext.Provider>
  );
};
