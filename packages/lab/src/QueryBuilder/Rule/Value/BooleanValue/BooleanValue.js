import React from "react";
import PropTypes from "prop-types";
import { HvDropdown } from "@hitachivantara/uikit-react-core";

import Context from "../../../Context";
import { isBigList } from "../../../utils";

const BooleanValue = ({ id, value = true }) => {
  const context = React.useContext(Context);
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

BooleanValue.propTypes = {
  id: PropTypes.number,
  value: PropTypes.bool,
};

export default React.memo(BooleanValue);
