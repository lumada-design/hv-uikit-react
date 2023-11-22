import { memo, useContext } from "react";

import { HvQueryBuilderContext } from "../../Context";
import { BooleanValue } from "./BooleanValue";
import { NumericValue } from "./NumericValue";
import { TextValue } from "./TextValue";
import { DateTimeValue } from "./DateTimeValue";

export interface ValueProps {
  id: React.Key;
  attribute: string;
  operator?: string;
  value?: any;
}

export const Value = ({
  id,
  attribute,
  operator,
  value: valueProp,
}: ValueProps) => {
  const context = useContext(HvQueryBuilderContext);
  const { attributes, initialTouched } = context;
  const value =
    attribute && attributes ? { ...attributes[attribute] } : { type: null };
  const { type } = value;

  switch (type) {
    case "boolean": {
      return <BooleanValue id={id} value={!!valueProp} />;
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
    case "text":
    case "textarea":
    default: {
      return (
        <TextValue id={id} value={valueProp} initialTouched={initialTouched} />
      );
    }
  }
};

export default memo(Value);
