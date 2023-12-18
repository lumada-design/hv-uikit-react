const defaultAttributes = [
  "boolean",
  "numeric",
  "dateandtime",
  "text",
  "textarea",
] as const;
type DefaultAttributes = (typeof defaultAttributes)[number];

export interface HvQueryBuilderAttribute extends Record<string, unknown> {
  id?: string;
  label: string;
  type: DefaultAttributes | (string & {});
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
  id: React.Key;
  attribute?: string;
  operator?: string;
  value?: HvQueryBuilderQueryRuleValue;
}

export interface HvQueryBuilderQueryGroup {
  id: React.Key;
  combinator: string;
  rules: Array<HvQueryBuilderQueryRule | HvQueryBuilderQueryGroup>;
}

export type HvQueryBuilderQuery = HvQueryBuilderQueryGroup;

export interface HvQueryBuilderChangedQuery
  extends Omit<HvQueryBuilderQuery, "id" | "rules"> {
  rules: Array<
    Omit<HvQueryBuilderQueryRule, "id"> | HvQueryBuilderChangedQuery
  >;
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

interface DialogLabels {
  dialogTitle: string;
  dialogMessage: string;
  dialogConfirm: string;
  dialogCancel: string;
  dialogCloseTooltip: string;
}

/** @private label structure action icon buttons */
interface ActionIconLabels extends DialogLabels {
  // TODO: remove in v6 - duplicated labels - `tooltip` *is* the aria-label
  /** @deprecated use `tooltip` label instead */
  ariaLabel: string;
  tooltip?: string;
}

export type QueryAction =
  | {
      type: "reset-query";
    }
  | {
      type: "reset-group";
      id: React.Key;
    }
  | {
      type: "add-rule" | "add-group" | "remove-node";
      id: React.Key;
    }
  | {
      type: "set-combinator";
      id: React.Key;
      combinator: string;
    }
  | {
      type: "set-attribute";
      id: React.Key;
      attribute?: string | null;
      operator?: string | null;
      value?: HvQueryBuilderQueryRuleValue | null;
    }
  | {
      type: "set-operator";
      id: React.Key;
      operator: string | null;
      value?: HvQueryBuilderQueryRuleValue | null;
    }
  | {
      type: "set-value";
      id: React.Key;
      value: HvQueryBuilderQueryRuleValue | null | any;
    };

export interface AskAction {
  actions: QueryAction[];
  dialog: DialogLabels;
}

export interface HvQueryBuilderLabels {
  query?: {
    delete?: ActionIconLabels;
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
    delete: ActionIconLabels;
  };
  group: {
    delete: ActionIconLabels;
    reset: ActionIconLabels;
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

export interface HvQueryBuilderRendererProps<V = any> {
  id: React.Key;
  attribute: string;
  operator?: string;
  value?: V;
}

export type HvQueryBuilderRenderers = Record<
  string,
  React.FC<HvQueryBuilderRendererProps>
>;
