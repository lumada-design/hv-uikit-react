import { memo } from "react";

import { useQueryBuilderContext } from "../../Context";
import { BooleanValue } from "./BooleanValue";
import { NumericValue } from "./NumericValue";
import { TextValue } from "./TextValue";
import { DateTimeValue } from "./DateTimeValue";
import { HvQueryBuilderRendererProps } from "../../types";
import { EmptyValue } from "./EmptyValue";

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
  const { attributes, initialTouched, renderers } = useQueryBuilderContext();

  const attrType =
    attribute && attributes ? attributes[attribute].type : undefined;

  // Custom renderer
  if (attrType && renderers?.[attrType]) {
    const Renderer: React.FC<HvQueryBuilderRendererProps> | undefined =
      (typeof renderers[attrType] === "object" &&
        operator &&
        renderers[attrType][operator]) ||
      (typeof renderers[attrType] === "function" && renderers[attrType]) ||
      undefined;

    if (Renderer) {
      return (
        <Renderer
          id={id}
          attribute={attribute}
          operator={operator}
          value={valueProp}
        />
      );
    }
  }

  // Built-in behavior for "Empty" and "IsNotEmpty" operators
  if (operator === "Empty" || operator === "IsNotEmpty") {
    return <EmptyValue id={id} />;
  }

  // Built-in attributes
  switch (attrType) {
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
    default:
      return (
        <TextValue id={id} value={valueProp} initialTouched={initialTouched} />
      );
  }
};

export default memo(Value);
