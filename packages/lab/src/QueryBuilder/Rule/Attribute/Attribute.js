import React, { useMemo, useContext } from "react";
import PropTypes from "prop-types";
import { HvDropdown } from "@hv/uikit-react-core";

import Context from "../../Context";
import { isBigList } from "../../utils";

const Attribute = ({ id, attribute, disabled, isInvalid }) => {
  const context = useContext(Context);
  const { dispatchAction, attributes, operators, labels } = context;

  const values = useMemo(
    () =>
      Object.keys(attributes).map((key) => ({
        id: key,
        label: attributes[key].label,
        selected: key === attribute,
      })),
    [attributes, attribute]
  );

  const currentType = attribute != null ? attributes[attribute]?.type : null;

  return (
    <HvDropdown
      singleSelectionToggle={false}
      label={labels.rule.attribute.label}
      placeholder={labels.rule.attribute.placeholder}
      values={values}
      disabled={disabled}
      status={isInvalid ? "invalid" : "valid"}
      statusMessage={labels.rule.attribute.exists}
      onChange={(selected) => {
        if (selected && !Array.isArray(selected)) {
          const attributeId = selected.id;

          const { type } = attributes[attributeId];
          const typeOperators = operators[type];

          let operator;
          if (currentType === type) {
            operator = undefined;
          } else if (typeOperators?.length === 1) {
            operator = typeOperators[0].operator;
          } else {
            operator = null;
          }

          // default boolean attributes to true
          const value = type === "boolean" ? true : undefined;

          dispatchAction({
            type: "set-attribute",
            id,
            attribute: attributeId,
            operator,
            value,
          });
        } else {
          dispatchAction({ type: "set-attribute", id, attribute: null });
        }
      }}
      showSearch={isBigList(values)}
      {...(isBigList(values) && { virtualized: true, height: 300 })}
    />
  );
};

Attribute.propTypes = {
  id: PropTypes.number,
  attribute: PropTypes.string,
  disabled: PropTypes.bool,
  isInvalid: PropTypes.bool,
};

export default React.memo(Attribute);
