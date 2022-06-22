import React from "react";
import PropTypes from "prop-types";

import Context from "../../Context";
import BooleanValue from "./BooleanValue";
import NumericValue from "./NumericValue";
import TextValue from "./TextValue";
import DateTimeValue from "./DateTimeValue";

const Value = ({ id, attribute, operator, value: valueProp }) => {
  const context = React.useContext(Context);
  const { attributes, initialTouched } = context;
  const { type } = attribute ? { ...attributes[attribute] } : { type: null };

  switch (type) {
    case "boolean": {
      return <BooleanValue id={id} value={!!valueProp} initialTouched={initialTouched} />;
    }
    case "numeric": {
      return (
        <NumericValue
          id={id}
          operator={operator}
          value={valueProp}
          initialTouched={initialTouched}
        />
      );
    }
    case "text":
    case "textarea":
    default: {
      return <TextValue id={id} value={valueProp} initialTouched={initialTouched} />;
    }
    case "dateandtime": {
      return (
        <DateTimeValue
          id={id}
          operator={operator}
          value={valueProp}
          initialTouched={initialTouched}
        />
      );
    }
  }
};

Value.propTypes = {
  id: PropTypes.number,
  attribute: PropTypes.string,
  operator: PropTypes.string,
  value: PropTypes.any,
};

export default React.memo(Value);
