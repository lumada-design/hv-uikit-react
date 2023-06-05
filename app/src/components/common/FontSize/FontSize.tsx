import {
  theme,
  HvBox,
  HvSlider,
  HvListValue,
  HvTypography,
  HvDropdown,
} from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";

export interface FontSizeProps extends React.HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  fontSize?: number;
  fontUnit: string;
  onChange?: (val) => void;
  onAfterChange?: (val) => void;
  onUnitChange?: (val) => void;
}

const unitsToShow = ["px", "pt", "em", "rem"];

const getSliderPropsByTypography = (unit: string) => {
  const defaultValue = {
    min: 0,
    max: 100,
    markDigits: 0,
  };

  if (unit === "px") {
    return defaultValue;
  }

  if (unit === "em" || unit === "rem") {
    return {
      min: 0,
      max: 10,
      markDigits: 1,
    };
  }
};

export const FontSize = ({
  fontSize,
  fontUnit,
  onChange,
  onAfterChange,
  onUnitChange,
  disabled = false,
}: FontSizeProps) => {
  const sliderProps = getSliderPropsByTypography(fontUnit);

  const getUnits = () => {
    const units: HvListValue[] = [];
    unitsToShow.map((u) => {
      let selected = false;
      if (fontUnit === u) {
        selected = true;
      }

      units.push({ id: u, label: u, selected });
    });
    return units;
  };

  return (
    <HvBox css={{ position: "relative" }}>
      <HvSlider
        label="Font Size"
        values={[fontSize || 14]}
        hideInput
        disabled={disabled}
        // Allow changing the value and have that info be displayed on the UI ...
        onChange={(val) => onChange?.(val[0])}
        // ... but only change the theme when the user ends the sliding.
        onAfterChange={(val) => onAfterChange?.(val[0])}
        minPointValue={sliderProps?.min}
        maxPointValue={sliderProps?.max}
        markDigits={sliderProps?.markDigits}
        classes={{
          sliderContainer: css({ paddingLeft: 0, paddingRight: 10 }),
          labelContainer: css({ marginLeft: 0, marginRight: 0 }),
        }}
        inputProps={[
          {
            readOnly: true,
            classes: {
              inputRoot: css({ border: "none" }),
              input: css({ textAlign: "end" }),
            },
          },
        ]}
      />
      <HvBox
        css={{
          position: "absolute",
          top: 0,
          right: 0,
          display: "flex",
          gap: theme.space.sm,
        }}
      >
        <HvBox
          css={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <HvTypography>
            {fontSize?.toFixed(fontUnit === "em" || fontUnit === "rem" ? 1 : 0)}
          </HvTypography>
          <HvDropdown
            values={getUnits()}
            classes={{
              dropdownHeader: css({ border: "none!important" }),
              rootList: css({
                width: 60,
                "& > div": { padding: "0px!important" },
              }),
            }}
            onChange={(item) => {
              if (item) onUnitChange?.(item as HvListValue);
            }}
          />
        </HvBox>
      </HvBox>
    </HvBox>
  );
};
