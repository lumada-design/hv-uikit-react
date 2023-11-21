import { memo, useContext, useMemo } from "react";

import { HvDropdown } from "@core/components/Dropdown";

import { QueryBuilderContext } from "../../Context";
import { isBigList } from "../../utils";

export interface OperatorProps {
  id: React.Key;
  combinator: string;
  attribute: string;
  operator?: string;
}

export const Operator = ({
  id,
  combinator,
  attribute,
  operator,
}: OperatorProps) => {
  const context = useContext(QueryBuilderContext);

  const { dispatchAction, attributes, operators, labels, readOnly } = context;

  const value = operator ?? null;

  const values = useMemo(() => {
    const attributeSpec =
      attribute && attributes ? attributes[attribute] : null;
    const options = attributeSpec
      ? operators[attributeSpec.type].filter((o) =>
          o.combinators.includes(combinator)
        ) ?? []
      : [];
    return options.map((key) => ({
      id: key.operator,
      label: key.label,
      selected: key.operator === value,
    }));
  }, [attribute, attributes, operators, combinator, value]);

  return (
    <HvDropdown
      required
      status="valid"
      singleSelectionToggle={false}
      label={labels.rule.operator.label}
      placeholder={labels.rule.operator.placeholder}
      values={values}
      disabled={values.length === 0}
      readOnly={readOnly}
      onChange={(selected) => {
        if (selected && !Array.isArray(selected) && selected.id) {
          dispatchAction({
            type: "set-operator",
            id,
            operator: selected.id.toString(),
            value:
              value === "range" || selected.id === "range" ? null : undefined,
          });
        } else {
          dispatchAction({
            type: "set-operator",
            id,
            operator: null,
            value: null,
          });
        }
      }}
      showSearch={isBigList(values)}
      {...(isBigList(values) && { virtualized: true, height: 300 })}
    />
  );
};

export default memo(Operator);
