import { memo } from "react";

import { useQueryBuilderContext } from "../../Context";
import { HvQueryBuilderRendererProps } from "../../types";
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
  const { attributes, initialTouched, renderers } = useQueryBuilderContext();

  const type = attribute && attributes ? attributes[attribute].type : undefined;

  // Custom renderer
  if (type && renderers?.[type]) {
    const Renderer: React.FC<HvQueryBuilderRendererProps> | undefined =
      (typeof renderers[type] === "object" &&
        operator &&
        renderers[type][operator]) ||
      (typeof renderers[type] === "function" && renderers[type]) ||
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
    default:
      return (
        <TextValue id={id} value={valueProp} initialTouched={initialTouched} />
      );
  }
};

export default memo(Value);
