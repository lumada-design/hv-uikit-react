import { memo, useContext } from "react";

import { HvDropdown } from "@core/components/Dropdown";

import { QueryBuilderContext } from "../../../Context";
import { isBigList } from "../../../utils";

export interface BooleanValueProps {
  id: React.Key;
  value?: boolean;
}

export const BooleanValue = ({ id, value = true }: BooleanValueProps) => {
  const context = useContext(QueryBuilderContext);
  const { labels, dispatchAction, readOnly } = context;

  const values = ["true", "false"].map((v) => ({
    id: v,
    label: labels.rule.value.boolean.options[v],
    selected: value === (v === "true"),
  }));

  return (
    <HvDropdown
      required
      status="valid"
      singleSelectionToggle={false}
      label={labels.rule.value.boolean.label}
      placeholder={labels.rule.value.boolean.placeholder}
      values={values}
      readOnly={readOnly}
      onChange={(selected) => {
        if (selected && !Array.isArray(selected) && selected.id) {
          dispatchAction({
            type: "set-value",
            id,
            value: selected.id === "true",
          });
        } else {
          dispatchAction({ type: "set-value", id, value: null });
        }
      }}
      showSearch={isBigList(values)}
      {...(isBigList(values) && { virtualized: true, height: 300 })}
    />
  );
};

export default memo(BooleanValue);
