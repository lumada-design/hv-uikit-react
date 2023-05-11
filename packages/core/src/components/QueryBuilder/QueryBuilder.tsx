import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { QueryBuilderContext } from "./Context";
import { HvQueryBuilderClasses } from "./queryBuilderClasses";
import { RuleGroup } from "./RuleGroup";
import {
  AskAction,
  Attribute,
  Query,
  QueryBuilderLabels,
  QueryCombinator,
  QueryOperator,
} from "./types";
import { clearNodeIds, emptyGroup } from "./utils";
import reducer from "./utils/reducer";

export interface HvQueryBuilderProps {
  /**
   * Override or extend the styles applied to the component.
   * See CSS API tab for more details.
   */
  classes?: HvQueryBuilderClasses;
  attributes?: Record<string, Attribute>;
  /**
   * The query rules operators by attribute type and combinator.
   */
  operators?: Record<string, QueryOperator[]>;
  /**
   * The query combinators operands.
   */
  combinators?: QueryCombinator[];
  /**
   * The initial query representation.
   */
  query?: Query;
  /**
   * Callback fired when query changes.
   * @param {Query} value - the query representation.
   */
  onChange?: (value: Query) => void;
  /**
   * Max depth of nested query groups.
   */
  maxDepth?: number;
  /**
   * An object containing all the labels.
   */
  labels?: QueryBuilderLabels;
  /**
   * A flag indicating if the Query Builder is in read only mode.
   */
  readOnly?: boolean;
}

/**
 * **HvQueryBuilder** component allows you to create conditions and group them using logical operators.
 * It outputs a structured set of rules which can be easily parsed to create SQL/NoSQL/whatever queries.
 *
 * **PLEASE NOTE**: This component implementation is still a WIP. There might be breaking changes.
 */
export const HvQueryBuilder = ({
  attributes,
  query,
  onChange,
  operators,
  combinators,
  maxDepth = 1,
  labels,
  readOnly = false,
  classes,
}: HvQueryBuilderProps) => {
  const [pendingAction, askAction] = useState<AskAction>();
  const currentAttributes = useRef<
    Record<string, Attribute> | undefined | null
  >(null);
  const [state, dispatchAction] = useReducer(
    reducer,
    query,
    (initialState) => initialState || emptyGroup()
  );

  const initialState = query === state;
  const [prevState, setPrevState] = useState();

  const defaultcontext = useContext(QueryBuilderContext);

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
      readOnly,
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
