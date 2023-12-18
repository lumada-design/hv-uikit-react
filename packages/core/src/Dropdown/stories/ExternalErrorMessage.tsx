import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import {
  HvDropdown,
  HvDropdownStatus,
  HvGrid,
  HvListValue,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";

export const ExternalErrorMessage = () => {
  const values1 = useMemo(
    () => [
      { label: "value 1" },
      { label: "value 2" },
      { label: "value 3" },
      { label: "value 4" },
    ],
    []
  );

  const values2 = useMemo(
    () => [
      { label: "value 1" },
      { label: "value 2" },
      { label: "value 3" },
      { label: "value 4" },
    ],
    []
  );

  const [deathValidationState, setDeathValidationState] = useState("invalid");

  const [birthErrorMessage, setBirthErrorMessage] = useState<string | null>(
    null
  );
  const [deathErrorMessage, setDeathErrorMessage] = useState(
    "Dropdown 2 is always invalid."
  );

  return (
    <HvGrid container>
      <HvGrid container item xs={12} md={6}>
        <HvGrid item xs={12}>
          <HvDropdown
            label="Dropdown 1"
            multiSelect
            values={values1}
            required
            aria-errormessage="birth-error"
            onChange={(value) => {
              if ((value as HvListValue[]).length === 0) {
                setBirthErrorMessage(
                  "Select at least one value from dropdown 1."
                );
              } else {
                setBirthErrorMessage(null);
              }
            }}
          />
        </HvGrid>
        <HvGrid item xs={12}>
          <HvDropdown
            label="Dropdown 2"
            multiSelect
            values={values2}
            required
            status={deathValidationState as HvDropdownStatus}
            aria-errormessage="death-error"
            onChange={(value) => {
              setDeathValidationState("invalid");

              if ((value as HvListValue[]).length === 0) {
                setDeathErrorMessage(
                  "Select at least one value from dropdown 2."
                );
              } else {
                setDeathErrorMessage(
                  `Dropdown 2 is always invalid, even with ${
                    (value as HvListValue[]).length
                  } items selected.`
                );
              }
            }}
          />
        </HvGrid>
      </HvGrid>
      <HvGrid item xs={12} md={6}>
        <div
          style={{
            backgroundColor: theme.colors.negative_20,
            color: theme.colors.base_dark,
            padding: theme.space.md,
          }}
        >
          <HvTypography
            component="h4"
            variant="title4"
            style={{
              color: theme.colors.base_dark,
            }}
          >
            Form errors:
          </HvTypography>
          <ul
            className={css({
              margin: theme.spacing("sm", 0),
              paddingLeft: theme.space.md,
            })}
          >
            {birthErrorMessage && (
              <li id="birth-error" aria-live="polite">
                {birthErrorMessage}
              </li>
            )}
            {deathErrorMessage && (
              <li id="death-error" aria-live="polite">
                {deathErrorMessage}
              </li>
            )}
          </ul>
        </div>
      </HvGrid>
    </HvGrid>
  );
};
