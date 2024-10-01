import { useState } from "react";
import { css } from "@emotion/css";
import { HvButton, HvInput, theme } from "@hitachivantara/uikit-react-core";

// eslint-disable-next-line react/function-component-definition
export default function Controlled() {
  const [value, setValue] = useState("Initial value");

  return (
    <>
      <HvInput
        label="Label"
        placeholder="Enter value"
        value={value}
        // to be possible to change the input value by user action
        onChange={(event, newValue) => setValue(newValue)}
      />
      <br />
      <div className={css({ display: "flex", gap: theme.space.xs })}>
        <HvButton
          variant="secondarySubtle"
          onClick={() => setValue("First value")}
        >
          First value
        </HvButton>
        <HvButton
          variant="secondarySubtle"
          onClick={() => setValue("Second value")}
        >
          Second value
        </HvButton>
        <HvButton
          variant="secondarySubtle"
          onClick={() => setValue("Third value")}
        >
          Third value
        </HvButton>
        <HvButton variant="secondarySubtle" onClick={() => setValue("")}>
          Clear value
        </HvButton>
      </div>
    </>
  );
}
