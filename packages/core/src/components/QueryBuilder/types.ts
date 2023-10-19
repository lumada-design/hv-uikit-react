export interface HvQueryBuilderAttribute extends Record<string, unknown> {
  id?: string;
  label: string;
  type: string;
  value?: unknown;
  order?: number;
}

export interface HvQueryBuilderNumericRange {
  from: number | string;
  to: number | string;
}

export interface HvQueryBuilderDateTimeStrings {
  date?: string;
  time?: string;
}

export interface HvQueryBuilderDateTimeRange {
  start?: HvQueryBuilderDateTimeStrings;
  end?: HvQueryBuilderDateTimeStrings;
}

export type HvQueryBuilderQueryRuleValue =
  | string
  | number
  | boolean
  | HvQueryBuilderNumericRange
  | HvQueryBuilderDateTimeStrings
  | HvQueryBuilderDateTimeRange;

export interface HvQueryBuilderQueryRule {
  id?: number | string;
  attribute?: string;
  operator?: string;
  value?: HvQueryBuilderQueryRuleValue;
}

export interface HvQueryBuilderQuery {
  id?: number;
  combinator: string;
  rules: Array<HvQueryBuilderQueryRule>;
}

export interface HvQueryBuilderQueryCombinator {
  operand: string;
  label: string;
}

export interface HvQueryBuilderQueryOperator {
  operator: string;
  label: string;
  combinators: string[];
}

interface HvQueryBuilderDialogLabels {
  dialogTitle: string;
  dialogMessage: string;
  dialogConfirm: string;
  dialogCancel: string;
  dialogCloseTooltip: string;
}

interface HvQueryBuilderResetQueryAction {
  type: "reset-query";
}

interface HvQueryBuilderResetGroupAction {
  type: "reset-group";
  id?: number;
}

interface HvQueryBuilderAddRemoveAction {
  type: "add-rule" | "add-group" | "remove-node";
  id?: number;
}

interface HvQueryBuilderSetCombinatorAction {
  type: "set-combinator";
  id?: number;

  combinator: string;
}

interface HvQueryBuilderSetAttributeAction {
  type: "set-attribute";
  id?: number;

  attribute?: string | null;
  operator?: string | null;
  value?: HvQueryBuilderQueryRuleValue | null;
}

interface HvQueryBuilderSetOperatorAction {
  type: "set-operator";
  id?: number;

  operator: string | null;
  value?: HvQueryBuilderQueryRuleValue | null;
}

interface HvQueryBuilderSetValueAction {
  type: "set-value";
  id?: number;

  value: HvQueryBuilderQueryRuleValue | null;
}

export type HvQueryBuilderQueryAction =
  | HvQueryBuilderResetQueryAction
  | HvQueryBuilderResetGroupAction
  | HvQueryBuilderAddRemoveAction
  | HvQueryBuilderSetCombinatorAction
  | HvQueryBuilderSetAttributeAction
  | HvQueryBuilderSetOperatorAction
  | HvQueryBuilderSetValueAction;

export interface HvQueryBuilderAskAction {
  actions: HvQueryBuilderQueryAction[];
  dialog: HvQueryBuilderDialogLabels;
}

export interface ValueComponentProps {
  id: number;
  initialTouched?: boolean;
  value?: unknown;
}

export interface HvQueryBuilderLabels {
  query?: {
    delete?: {
      ariaLabel: string;
      tooltip?: string;
    } & HvQueryBuilderDialogLabels;
    addRule?: {
      label: string;
    };
    addGroup?: {
      label: string;
    };
  };
  rule: {
    attribute: {
      exists: string;
      label: string;
      placeholder: string;
    };
    operator: {
      label: string;
      placeholder: string;
    };
    value: {
      distance: {
        label: string;
        placeholder?: string;
        connectorText: string;
        button: string;
        validation: {
          required: string;
          invalid: string;
        };
      };
      text: {
        label: string;
        placeholder: string;
        validation: {
          required: string;
        };
      };
      boolean: {
        label: string;
        placeholder: string;
        options: Record<string, string>;
      };
      numeric: {
        label: string;
        placeholder: string;
        validation: {
          required: string;
          invalid: string;
          equal: string;
          greaterThan: string;
        };
        range: {
          leftLabel: string;
          rightLabel: string;
        };
      };
      datetime: {
        dateLabel: string;
        datePlaceholder: string;
        timeLabel: string;
        timePlaceholder: string;
        startDateLabel: string;
        startDatePlaceholder: string;
        startTimeLabel: string;
        startTimePlaceholder: string;
        endDateLabel: string;
        endDatePlaceholder: string;
        endTimeLabel: string;
        endTimePlaceholder: string;
        validation: {
          required: string;
          invalidInterval: string;
        };
      };
    };
    delete: {
      ariaLabel: string;
      tooltip?: string;
    } & HvQueryBuilderDialogLabels;
  };
  group: {
    delete: {
      ariaLabel: string;
      tooltip?: string;
    } & HvQueryBuilderDialogLabels;
    reset: {
      ariaLabel: string;
      tooltip?: string;
    } & HvQueryBuilderDialogLabels;
    addRule: {
      label: string;
    };
    addGroup: {
      label: string;
    };
  };
  empty: {
    title: string;
    createCondition: string;
    createGroup: string;
    spacer: string;
  };
}
