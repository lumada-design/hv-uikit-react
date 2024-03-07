import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import isEqual from "lodash/isEqual";

import { useDefaultProps } from "../hooks/useDefaultProps";
import { ExtractNames } from "../utils/classes";

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
  defaultRendererKey,
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
  /**
   * Operators that should use the empty value renderer when selected.
   *
   * When one of the listed operators is selected, the rule value is reset and an empty component is rendered.
   * This property takes priority over `renderers`.
   *
   * @default ["Empty", "IsNotEmpty"]
   * */
  emptyRenderer?: string[];
  /** Custom renderers for the rules' value. */
  renderers?: HvQueryBuilderRenderers;
  /** Whether to opt-out of the confirmation dialogs shown before removing rules and rule groups. @default false. */
  disableConfirmation?: boolean;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvQueryBuilderClasses;
}

// TODO - v6
// - uncontrolled vs controlled: users should be able to control the state
// - "query" renamed to "initialQuery" and "query" used to control the state
// - "query" provided with ids by the user but removed through "onChange"
// - "range", "Empty", and "IsNotEmpty" operators with internal/built-in logic

/**
 * This component allows you to create conditions and group them using logical operators.
 * It outputs a structured set of rules which can be easily parsed to create SQL/NoSQL/whatever queries.
 *
 * Take a look at the [usage page](https://lumada-design.github.io/uikit/master/?path=/docs/widgets-query-builder-usage--docs) to learn more about this component.
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
    emptyRenderer = ["Empty", "IsNotEmpty"],
    classes: classesProp,
  } = useDefaultProps("HvQueryBuilder", props);

  if (
    import.meta.env.DEV &&
    [
      Object.values(attributes || {}).map(({ type }) => type),
      Object.values(operators || {})
        .map((ops) => ops.map(({ operator }) => operator))
        .flat(),
    ]
      .flat()
      ?.find((key) => key === defaultRendererKey)
  ) {
    // eslint-disable-next-line no-console
    console.error(
      `${defaultRendererKey} is a restricted key and shouldn't be used as an attribute or operator type. Update the key to avoid unexpected behaviors.`
    );
  }

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
    structuredClone(initialQuery.current)
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
      emptyRenderer,
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
      emptyRenderer,
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
      setPrevState(structuredClone(state));
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
