import { memo } from "react";

import { useQueryBuilderContext } from "../../Context";
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
  const context = useQueryBuilderContext();
  const { attributes, initialTouched, renderers } = context;

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
      return (
        <TextValue id={id} value={valueProp} initialTouched={initialTouched} />
      );
    default: {
      if (type && renderers?.[type]) {
        const Renderer = renderers[type];

        return (
          <Renderer
            id={id}
            attribute={attribute}
            operator={operator}
            value={valueProp}
          />
        );
      }

      return (
        <TextValue id={id} value={valueProp} initialTouched={initialTouched} />
      );
    }
  }
};

export default memo(Value);
