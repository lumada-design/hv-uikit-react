import { HvFormStatus, HvInput } from "@core/components";
import { ClassNames } from "@emotion/react";
import { clsx } from "clsx";
import { memo, useContext, useState } from "react";

import { QueryBuilderContext } from "../../../Context";
import { styles } from "./TextValue.styles";
import textValueClasses from "./textValueClasses";

export interface TextValueProps {
  id?: number;
  value?: any;
  initialTouched?: boolean;
}

const TextValue = ({
  id,
  value = "",
  initialTouched = false,
}: TextValueProps) => {
  const context = useContext(QueryBuilderContext);
  const { labels, dispatchAction, readOnly } = context;
  const [touched, setTouched] = useState(initialTouched);
  const isValid = value != null && value.toString().trim() !== "";

  let status: HvFormStatus = isValid ? "valid" : "invalid";
  status = !touched ? "standBy" : status;

  return (
    <ClassNames>
      {({ css }) => (
        <HvInput
          className={clsx(textValueClasses.location, css(styles.location))}
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
          onKeyDown={(e: any) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          placeholder="—"
          readOnly={readOnly}
        />
      )}
    </ClassNames>
  );
};

export default memo(TextValue);
