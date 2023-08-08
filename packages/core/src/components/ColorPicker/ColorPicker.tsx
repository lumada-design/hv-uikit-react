import { Checkbox, ColorPicker } from "@hitachivantara/uikit-react-icons";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { ColorState } from "react-color";

import { useControlled } from "@core/hooks/useControlled";
import { useUniqueId } from "@core/hooks/useUniqueId";
import { useLabels } from "@core/hooks/useLabels";
import { useTheme } from "@core/hooks/useTheme";
import { ExtractNames } from "@core/utils/classes";
import { setId } from "@core/utils/setId";
import { HvTypography } from "@core/components/Typography";
import { HvPanel } from "@core/components/Panel";
import { HvFormElement, HvInfoMessage, HvLabel } from "@core/components/Forms";
import { HvBaseDropdown } from "@core/components/BaseDropdown";
import { HvDropdownProps } from "@core/components/Dropdown";

import { Picker } from "./Picker";
import { staticClasses, useClasses } from "./ColorPicker.styles";
import { PresetColors } from "./PresetColors";
import { SavedColors } from "./SavedColors";

export { staticClasses as colorPickerClasses };

export type HvColorPickerClasses = ExtractNames<typeof useClasses>;

export interface HvColorPickerProps {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
  /** Class names to be applied. */
  className?: string;
  /** Id to be applied to the form element root node. */
  id?: string;
  /** The form element name. */
  name?: string;
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be provided instead.
   */
  label?: React.ReactNode;
  /** Provide additional descriptive text for the form element. */
  description?: React.ReactNode;
  /** Indicates that user input is required on the form element. */
  required?: boolean;
  /** The value color, in HEX format. */
  value?: string;
  /** The default value color, in HEX format. */
  defaultValue?: string;
  /** If `true` the dropdown is disabled unable to be interacted, if `false` it is enabled. */
  disabled?: boolean;
  /** If `true` the dropdown starts opened if `false` it starts closed. */
  expanded?: boolean;
  /** When uncontrolled, defines the initial expanded state. */
  defaultExpanded?: boolean;
  /** A function to be executed whenever the color changes. */
  onChange?: (color: string) => void;
  /** A function to be executed whenever the color change is complete. */
  onChangeComplete?: (color: string) => void;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvColorPickerClasses;
  /** The placeholder value when nothing is selected. */
  placeholder?: string;
  /** Recommended colors. The colors are HEX values. */
  recommendedColors?: string[];
  /** Recommended colors position. */
  recommendedColorsPosition?: "top" | "bottom";
  /** If `true`, the labels are shown. If `false`, they are not shown. */
  showLabels?: boolean;
  /** An object containing all the labels. */
  labels?: {
    recommendedColorsLabel?: string;
    customColorsLabel?: string;
  };
  /** Icon type for the input's end adornment. */
  dropdownIcon?: "arrow" | "colorPicker";
  /** If `true`, the input only shows an icon. If `false`, the input shows text and icons. */
  iconOnly?: boolean;
  /** If `true`, the saved colors area is shown. If `false`, it is not shown. */
  showSavedColors?: boolean;
  /** If `true`, the custom colors area is shown. If `false`, it is not shown. */
  showCustomColors?: boolean;
  /** The saved colors. The colors are HEX values. */
  savedColorsValue?: string[];
  /** The default saved colors. The colors are HEX values. */
  defaultSavedColorsValue?: string[];
  /** Callback fired when a new saved color is added. */
  onSavedColorAdded?: (color?: string) => void;
  /** Callback fired when a new saved color is removed. */
  onSavedColorRemoved?: (color?: string) => void;
  /** Aria label to apply to delete saved color button. */
  deleteSavedColorButtonArialLabel?: string;
}

const DEFAULT_LABELS: HvColorPickerProps["labels"] = {
  recommendedColorsLabel: "Recommended colors:",
  customColorsLabel: "Custom colors:",
};

/**
 * A color picker component which allows the user to select a color from a list of pre-defined colors or freely select one color via the Hue and Saturation.
 * It receives a color string in HEX format and outputs an HEX formatted color.
 */
export const HvColorPicker = (props: HvColorPickerProps) => {
  const {
    id,
    name,
    required = false,
    disabled = false,
    label,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    description,
    "aria-describedby": ariaDescribedBy,
    className,
    classes: classesProp,
    value,
    onChange,
    onChangeComplete,
    defaultValue = "",
    expanded,
    defaultExpanded = false,
    recommendedColorsPosition = "top",
    recommendedColors = [
      "#95AFE8",
      "#E89E5D",
      "#83B8A6",
      "#70759C",
      "#C57E7E",
      "#FADA95",
      "#ADBFE8",
      "#E3B386",
      "#9AC6B7",
      "#8B90AF",
      "#CF9797",
      "#FAE1AA",
    ],
    showLabels = true,
    labels: labelsProp,
    dropdownIcon = "colorPicker",
    placeholder = "Select color...",
    iconOnly = false,
    showSavedColors = true,
    showCustomColors = true,
    savedColorsValue,
    defaultSavedColorsValue = [],
    onSavedColorAdded,
    onSavedColorRemoved,
    deleteSavedColorButtonArialLabel = "Delete saved color",
  } = useDefaultProps("HvColorPicker", props);

  const { classes, css, cx } = useClasses(classesProp);
  const { activeTheme } = useTheme();

  const labels = useLabels(DEFAULT_LABELS, labelsProp);

  const [isOpen, setIsOpen] = useControlled(expanded, Boolean(defaultExpanded));
  const [color, setColor] = useControlled(value, defaultValue);
  const [savedColors, setSavedColors] = useControlled(
    savedColorsValue,
    defaultSavedColorsValue
  );
  const elementId = useUniqueId(id, "hvdropdown");
  const hasLabel = label != null;
  const hasDescription = description != null;

  const handleToggle: HvDropdownProps["onToggle"] = (_, open) => {
    setIsOpen(open);
  };

  const handleSelect = (val: ColorState | { hex: string; source: string }) => {
    onChange?.(val.hex);
    onChangeComplete?.(val.hex);
    setColor(val.hex);
  };

  const handleOnChange = (
    val: ColorState | { hex: string; source: string }
  ) => {
    onChange?.(val.hex);
    setColor(val.hex);
  };

  const handleOnChangeComplete = (
    val: ColorState | { hex: string; source: string }
  ) => {
    onChangeComplete?.(val.hex);
    setColor(val.hex);
  };

  const handleAddColor = () => {
    // When no color is provided, react-color sets the picker to #000000.
    // This is the color that should be added in this case.
    const colorToAdd = color || "#000000";

    onSavedColorAdded?.(colorToAdd);
    setSavedColors([...savedColors, colorToAdd]);
  };

  const handleRemoveColor = (val: string, position: number) => {
    if (savedColors[position] === val) {
      const sColors = [...savedColors];
      sColors.splice(position, 1);
      onSavedColorRemoved?.(val);
      setSavedColors(sColors);
    }
  };

  const setFocusToContent = (containerRef: HTMLElement | null) => {
    const inputs = containerRef?.getElementsByTagName("input");
    if (inputs && inputs.length > 0) {
      inputs[0].focus();
    }
  };

  return (
    <HvFormElement
      id={id}
      name={name}
      disabled={disabled}
      required={required}
      className={cx(classes.root, className)}
    >
      {(hasLabel || hasDescription) && (
        <div className={classes.labelContainer}>
          {hasLabel && (
            <HvLabel
              id={setId(elementId, "label")}
              label={label}
              className={classes.label}
            />
          )}

          {hasDescription && (
            <HvInfoMessage
              id={setId(elementId, "description")}
              className={classes.description}
            >
              {description}
            </HvInfoMessage>
          )}
        </div>
      )}
      <HvBaseDropdown
        variableWidth
        className={className}
        expanded={isOpen}
        onToggle={handleToggle}
        onContainerCreation={setFocusToContent}
        classes={{
          root: cx({ [classes.dropdownRootIconOnly]: iconOnly }),
          selection: cx(iconOnly && css({ padding: 0 })),
        }}
        adornment={
          iconOnly && color ? (
            <Checkbox
              className={classes.headerColorIconOnly}
              color={[color, "transparent"]}
            />
          ) : dropdownIcon === "colorPicker" ? (
            <ColorPicker className={classes.colorPickerIcon} />
          ) : undefined
        }
        placeholder={
          iconOnly ? undefined : color ? (
            <>
              <Checkbox
                className={classes.headerColorIcon}
                color={[color, "transparent"]}
              />
              <HvTypography
                className={classes.headerColorValue}
                variant={activeTheme?.colorPicker.inputValueVariant}
              >
                {color}
              </HvTypography>
            </>
          ) : (
            placeholder
          )
        }
        aria-label={ariaLabel}
        aria-labelledby={
          [label && setId(elementId, "label"), ariaLabelledBy]
            .join(" ")
            .trim() || undefined
        }
        aria-describedby={
          [description && setId(elementId, "description"), ariaDescribedBy]
            .join(" ")
            .trim() || undefined
        }
      >
        <HvPanel className={classes.panel}>
          <div className={classes.colorPicker}>
            {recommendedColorsPosition === "top" && (
              <PresetColors
                className={cx(
                  (showCustomColors || showSavedColors) &&
                    css({
                      paddingBottom:
                        activeTheme?.colorPicker.recommendedColorsBottomPadding,
                    }),
                  classes.recommendedColorsRoot
                )}
                colors={recommendedColors}
                onClick={handleSelect}
                title={showLabels ? labels?.recommendedColorsLabel : undefined}
              />
            )}
            {showCustomColors && (
              <Picker
                classes={{
                  fields: cx({
                    [classes.pickerFields]:
                      recommendedColorsPosition === "bottom" || showSavedColors,
                  }),
                }}
                title={showLabels ? labels?.customColorsLabel : undefined}
                color={color}
                onChange={handleOnChange}
                onChangeComplete={handleOnChangeComplete}
              />
            )}
            {showSavedColors && (
              <SavedColors
                colors={savedColors}
                onAddColor={handleAddColor}
                onClickColor={handleSelect}
                onRemoveColor={handleRemoveColor}
                deleteButtonArialLabel={deleteSavedColorButtonArialLabel}
              />
            )}
            {recommendedColorsPosition === "bottom" && (
              <PresetColors
                colors={recommendedColors}
                onClick={handleSelect}
                title={showLabels ? labels?.recommendedColorsLabel : undefined}
              />
            )}
          </div>
        </HvPanel>
      </HvBaseDropdown>
    </HvFormElement>
  );
};
