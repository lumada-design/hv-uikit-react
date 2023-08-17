import {
  theme,
  HvBox,
  HvSlider,
  HvListValue,
  HvTypography,
  HvDropdown,
} from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";

export interface ScaleProps {
  minMax: [number, number];
  markDigits?: number;
}

export interface UnitSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?: string;
  disabled?: boolean;
  defaultSize?: number;
  unit: string;
  scaleProps?: ScaleProps;
  unitsToShow?: string[];
  hideUnits?: boolean;
  onChange?: (val: number) => void;
  onAfterChange?: (val: number) => void;
  onUnitChange?: (val: HvListValue) => void;
}

export const UnitSlider = ({
  label = "Size",
  defaultSize = 14,
  unit,
  scaleProps = { minMax: [0, 100], markDigits: 0 },
  unitsToShow = ["px", "pt", "em", "rem"],
  hideUnits = false,
  onChange,
  onAfterChange,
  onUnitChange,
  disabled = false,
}: UnitSliderProps) => {
  const getUnits = () => {
    const units: HvListValue[] = [];
    unitsToShow.forEach((u) => {
      let selected = false;
      if (unit === u) {
        selected = true;
      }

      units.push({ id: u, label: u, selected });
    });
    return units;
  };

  return (
    <HvBox css={{ position: "relative", width: "100%" }}>
      <HvSlider
        label={label}
        values={[defaultSize]}
        hideInput
        disabled={disabled}
        // Allow changing the value and have that info be displayed on the UI ...
        onChange={(val) => onChange?.(val[0])}
        // ... but only change the theme when the user ends the sliding.
        onAfterChange={(val) => onAfterChange?.(val[0])}
        minPointValue={scaleProps.minMax[0]}
        maxPointValue={scaleProps.minMax[1]}
        markDigits={scaleProps.markDigits}
        classes={{
          sliderRoot: css({ zIndex: theme.zIndices.overlay }),
          sliderContainer: css({ paddingLeft: 0, paddingRight: 10 }),
          labelContainer: css({
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 12,
          }),
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
            {defaultSize?.toFixed(unit === "em" || unit === "rem" ? 1 : 0)}
          </HvTypography>
          {hideUnits ? (
            <HvTypography>{unit}</HvTypography>
          ) : (
            <HvDropdown
              values={getUnits()}
              disabled={disabled}
              classes={{
                dropdownHeader: css({ border: "none!important", width: 60 }),
                rootList: css({
                  "& > div": { padding: "0px!important" },
                }),
              }}
              onChange={(item) => {
                if (item) onUnitChange?.(item as HvListValue);
              }}
            />
          )}
        </HvBox>
      </HvBox>
    </HvBox>
  );
};
