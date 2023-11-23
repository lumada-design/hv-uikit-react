import { FC } from "react";

export interface HvQueryBuilderAttribute extends Record<string, unknown> {
  id?: string;
  label: string;
  type: string;
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
    Omit<HvQueryBuilderQueryRule, "id"> | Omit<HvQueryBuilderQueryGroup, "id">
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

export interface HvQueryBuilderRendererProps<V = any> {
  id: React.Key;
  attribute: string;
  operator?: string;
  value?: V;
}

export type HvQueryBuilderRenderers = Record<
  string,
  FC<HvQueryBuilderRendererProps>
>;
