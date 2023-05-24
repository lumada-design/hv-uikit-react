import {
  HvBaseDropdown,
  HvFormElement,
  HvInfoMessage,
  HvLabel,
  HvPanel,
  HvTypography,
} from "@core/components";
import { ClassNames } from "@emotion/react";
import { Checkbox, ColorPicker } from "@hitachivantara/uikit-react-icons";
import { ColorState } from "react-color";
import { useControlled, useLabels, useTheme, useUniqueId } from "@core/hooks";
import { setId } from "@core/utils";
import { Picker } from "./Picker";
import { styles } from "./ColorPicker.styles";
import colorPickerClasses, { HvColorPickerClasses } from "./colorPickerClasses";
import { PresetColors } from "./PresetColors";
import { SavedColors } from "./SavedColors";

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
export const HvColorPicker = ({
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
  classes,
  value,
  onChange,
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
}: HvColorPickerProps) => {
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

  const handleToggle = (_, open: boolean) => {
    setIsOpen(open);
  };

  const handleSelect = (val: ColorState | { hex: string; source: string }) => {
    onChange?.(val.hex);
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
    <ClassNames>
      {({ css, cx }) => (
        <HvFormElement
          id={id}
          name={name}
          disabled={disabled}
          required={required}
          className={cx(colorPickerClasses.root, className, classes?.root)}
        >
          {(hasLabel || hasDescription) && (
            <div
              className={cx(
                colorPickerClasses.labelContainer,
                css(styles.labelContainer),
                classes?.labelContainer
              )}
            >
              {hasLabel && (
                <HvLabel
                  id={setId(elementId, "label")}
                  label={label}
                  className={cx(
                    colorPickerClasses.label,
                    css(styles.label),
                    classes?.label
                  )}
                />
              )}

              {hasDescription && (
                <HvInfoMessage
                  id={setId(elementId, "description")}
                  className={cx(
                    colorPickerClasses.description,
                    classes?.description
                  )}
                >
                  {description}
                </HvInfoMessage>
              )}
            </div>
          )}
          <HvBaseDropdown
            className={className}
            expanded={isOpen}
            onToggle={handleToggle}
            onContainerCreation={setFocusToContent}
            classes={{
              root: iconOnly
                ? cx(
                    colorPickerClasses.dropdownRootIconOnly,
                    css(styles.dropdownRootIconOnly),
                    classes?.dropdownRootIconOnly
                  )
                : undefined,
            }}
            adornment={
              iconOnly && color ? (
                <Checkbox
                  className={cx(
                    colorPickerClasses.headerColorIconOnly,
                    css(styles.headerColorIconOnly),
                    css({
                      "& svg:last-child": {
                        fill: color,
                      },
                    }),
                    classes?.headerColorIconOnly
                  )}
                  color={[color]}
                />
              ) : dropdownIcon === "colorPicker" ? (
                <ColorPicker
                  className={cx(
                    colorPickerClasses.colorPickerIcon,
                    css(styles.colorPickerIcon),
                    classes?.colorPickerIcon
                  )}
                />
              ) : undefined
            }
            placeholder={
              iconOnly ? undefined : color ? (
                <>
                  <Checkbox
                    className={cx(
                      colorPickerClasses.headerColorIcon,
                      css(styles.headerColorIcon),
                      css({
                        "& svg:last-child": {
                          fill: color,
                        },
                      }),
                      classes?.headerColorIcon
                    )}
                    color={[color]}
                  />
                  <HvTypography
                    className={cx(
                      colorPickerClasses.headerColorValue,
                      css(styles.headerColorValue),
                      classes?.headerColorValue
                    )}
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
            <HvPanel
              className={cx(
                colorPickerClasses.panel,
                css(styles.panel),
                classes?.panel
              )}
            >
              <div
                className={cx(
                  colorPickerClasses.colorPicker,
                  css(styles.colorPicker),
                  classes?.colorPicker
                )}
              >
                {recommendedColorsPosition === "top" && (
                  <PresetColors
                    className={cx(
                      colorPickerClasses.recommendedColorsRoot,
                      (showCustomColors || showSavedColors) &&
                        css({
                          paddingBottom:
                            activeTheme?.colorPicker
                              .recommendedColorsBottomPadding,
                        }),
                      classes?.recommendedColorsRoot
                    )}
                    colors={recommendedColors}
                    onClick={handleSelect}
                    title={
                      showLabels ? labels?.recommendedColorsLabel : undefined
                    }
                  />
                )}
                {showCustomColors && (
                  <Picker
                    classes={{
                      fields:
                        recommendedColorsPosition === "bottom" ||
                        showSavedColors
                          ? cx(
                              colorPickerClasses.pickerFields,
                              css(styles.pickerFields),
                              classes?.pickerFields
                            )
                          : undefined,
                    }}
                    title={showLabels ? labels?.customColorsLabel : undefined}
                    color={color}
                    onChange={handleSelect}
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
                    title={
                      showLabels ? labels?.recommendedColorsLabel : undefined
                    }
                  />
                )}
              </div>
            </HvPanel>
          </HvBaseDropdown>
        </HvFormElement>
      )}
    </ClassNames>
  );
};
