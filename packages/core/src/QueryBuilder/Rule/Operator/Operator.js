import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { HvDropdown } from "../../..";
import Context from "../../Context";
import { isBigList } from "../../utils";

const Operator = ({ id, combinator, attribute, operator }) => {
  const context = React.useContext(Context);

  const { dispatchAction, attributes, operators, labels, readOnly } = context;

  const value = operator ?? null;

  const values = useMemo(() => {
    const attributeSpec = attribute ? attributes[attribute] : null;
    const options = attributeSpec
      ? operators[attributeSpec.type].filter((o) => o.combinators.includes(combinator)) ?? []
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
            operator: selected.id,
            value: value === "range" || selected.id === "range" ? null : undefined,
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

Operator.propTypes = {
  id: PropTypes.number,
  combinator: PropTypes.string,
  attribute: PropTypes.string,
  operator: PropTypes.string,
};

export default React.memo(Operator);
