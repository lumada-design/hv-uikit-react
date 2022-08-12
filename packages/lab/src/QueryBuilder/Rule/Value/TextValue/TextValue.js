import React, { useState } from "react";
import PropTypes from "prop-types";
import { HvInput } from "@hitachivantara/uikit-react-core";

import Context from "../../../Context";
import useStyles from "./styles";

const TextValue = ({ id, value = "", initialTouched = false }) => {
  const classes = useStyles();
  const context = React.useContext(Context);
  const { labels, dispatchAction, readOnly } = context;
  const [touched, setTouched] = useState(initialTouched);
  const isValid = value != null && value.toString().trim() !== "";

  let status = isValid ? "valid" : "invalid";
  status = !touched ? "standBy" : status;

  return (
    <HvInput
      className={classes.location}
      label={labels.rule.value.text.label}
      required
      status={status}
      statusMessage={labels.rule.value.text.validation.required}
      value={value}
      inputProps={{
        autoComplete: "off",
      }}
      onChange={(t, v) => {
        dispatchAction({
          type: "set-value",
          id,
          value: v,
        });
      }}
      onBlur={() => {
        setTouched(true);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      placeholder="—"
      readOnly={readOnly}
    />
  );
};

TextValue.propTypes = {
  id: PropTypes.number,
  value: PropTypes.any,
  initialTouched: PropTypes.bool,
};

export default React.memo(TextValue);
