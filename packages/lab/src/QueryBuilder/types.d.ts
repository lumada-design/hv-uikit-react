export interface Attribute extends Record<string, unknown> {
  id?: string;
  label: string;
  type: string;
  value?: unknown;
  order?: number;
}

export interface NumericRange {
  from: number | string;
  to: number | string;
}

export interface DateTimeStrings {
  date?: string;
  time?: string;
}

export interface DateTimeRange {
  start?: DateTimeStrings;
  end?: DateTimeStrings;
}

export type QueryRuleValue =
  | string
  | number
  | boolean
  | NumericRange
  | DateTimeStrings
  | DateTimeRange;

export interface QueryRule {
  id?: number | string;
  attribute?: string;
  operator?: string;
  value?: QueryRuleValue;
}

export interface Query {
  id?: number;
  combinator: string;
  rules: Array<QueryRule>;
}

export interface QueryCombinator {
  operand: string;
  label: string;
}

export interface QueryOperator {
  operator: string;
  label: string;
  combinators: string[];
}

interface DialogLabels {
  dialogTitle: string;
  dialogMessage: string;
  dialogConfirm: string;
  dialogCancel: string;
  dialogCloseTooltip: string;
}

interface ResetQueryAction {
  type: "reset-query";
}

interface ResetGroupAction {
  type: "reset-group";
  id: number;
}

interface AddRemoveAction {
  type: "add-rule" | "add-group" | "remove-node";
  id: number;
}

interface SetCombinatorAction {
  type: "set-combinator";
  id: number;

  combinator: string;
}

interface SetAttributeAction {
  type: "set-attribute";
  id: number;

  attribute: string | null;
  operator?: string | null;
  value?: QueryRuleValue | null;
}

interface SetOperatorAction {
  type: "set-operator";
  id: number;

  operator: string | null;
  value?: QueryRuleValue | null;
}

interface SetValueAction {
  type: "set-value";
  id: number;

  value: QueryRuleValue | null;
}

export type Action =
  | ResetQueryAction
  | ResetGroupAction
  | AddRemoveAction
  | SetCombinatorAction
  | SetAttributeAction
  | SetOperatorAction
  | SetValueAction;

export interface AskAction {
  actions: Action[];
  dialog: DialogLabels;
}

export interface ValueComponentProps {
  id: number;
  initialTouched?: boolean;
  value?: unknown;
}

export interface QueryBuilderLabels {
  query?: {
    delete?: {
      ariaLabel: string;
      tooltip?: string;
    } & DialogLabels;
    addRule?: {
      label: string;
    };
    addGroup?: {
      label: string;
    };
  };
  rule: {
    attribute: {
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
    } & DialogLabels;
  };
  group: {
    delete: {
      ariaLabel: string;
      tooltip?: string;
    } & DialogLabels;
    reset: {
      ariaLabel: string;
      tooltip?: string;
    } & DialogLabels;
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

export interface QueryBuilderContext {
  dispatchAction: React.Dispatch<Action>;
  askAction: React.Dispatch<AskAction>;
  attributes: Record<string, Attribute>;
  operators: Record<string, QueryOperator[]>;
  combinators: QueryCombinator[];
  maxDepth: number;
  labels: QueryBuilderLabels;
  initialTouched: boolean;
}
