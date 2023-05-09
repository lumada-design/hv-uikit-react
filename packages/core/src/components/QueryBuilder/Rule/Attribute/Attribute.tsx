import { useMemo, useContext, memo } from "react";

import { HvDropdown } from "../../..";
import { QueryBuilderContext } from "../../Context";
import { isBigList } from "../../utils";

export interface AttributeProps {
  id: number;
  attribute: string;
  disabled: boolean;
  isInvalid: boolean;
}

export const Attribute = ({
  id,
  attribute,
  disabled,
  isInvalid,
}: AttributeProps) => {
  const context = useContext(QueryBuilderContext);
  const { dispatchAction, attributes, operators, labels, readOnly } = context;

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
      readOnly={readOnly}
      status={isInvalid ? "invalid" : "valid"}
      statusMessage={labels.rule.attribute.exists}
      onChange={(selected) => {
        if (selected && !Array.isArray(selected)) {
          const attributeId = selected.id;

          const { type } = attributeId ? attributes[attributeId] : undefined;
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

export default memo(Attribute);
