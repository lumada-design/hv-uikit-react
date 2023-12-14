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
  HvQueryBuilderRenderers,
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
  /** Renderers for custom attribute types. */
  renderers?: HvQueryBuilderRenderers;
  /** Whether to opt-out of the confirmation dialogs shown before removing rules and rule groups. Default to `false`. */
  disableConfirmation?: boolean;
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
 *
 * To use this component, you'll need to define your `attributes`. The query builder already has 5 built-in
 * attribute types, `boolean`, `numeric`, `text`, `textarea`, and `dateandtime`, but custom ones can be created.
 *
 * Then, you'll need to define the `operators` for each attribute. This component already has some built-in operators
 * with specific behaviors you should be aware of.
 * For instance, when the `Empty` or `IsNotEmpty` operators are selected, the value renderer is not shown in the
 * query builder.
 * Furthermore, when the `range` operator is selected for the `numeric` or `dateandtime` attributes, the value
 * renderer automatically updates to range inputs.
 *
 * As mentioned, custom attributes can be created if the built-in ones are not enough to cover your use case.
 * In this case, the `renderers` property can be used to define how the values should be rendered.
 * If not defined, a generic text input will be rendered as default for the custom attributes.
 * The `renderers` property can also be used to customize the value renderers for specific operators of an attribute.
 *
 * Please, report to the API table and code samples for more details on how to implement this component.
 */
export const HvQueryBuilder = (props: HvQueryBuilderProps) => {
  const {
    attributes,
    renderers,
    query,
    onChange,
    disableConfirmation = false,
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
      renderers,
      disableConfirmation,
    }),
    [
      attributes,
      operators,
      combinators,
      maxDepth,
      labels,
      readOnly,
      initialState,
      renderers,
      disableConfirmation,
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
