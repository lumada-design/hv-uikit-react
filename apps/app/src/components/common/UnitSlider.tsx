import {
  HvDropdown,
  HvListValue,
  HvSlider,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

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
    <div className="relative w-full">
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
          sliderRoot: "z-overlay",
          sliderContainer: "pl-0 pr-[10px]",
          labelContainer: "mx-0 mb-[12px]",
        }}
        inputProps={[
          {
            readOnly: true,
            classes: {
              inputRoot: "border-none",
              input: "text-right",
            },
          },
        ]}
      />
      <div className="absolute top-0 right-0 flex gap-sm">
        <div className="flex items-center">
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
                dropdownHeader: "!border-none w-60px",
                rootList: "[&>div]:!p-0",
              }}
              onChange={(item) => {
                if (item) onUnitChange?.(item);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
