// @ts-expect-error: @types/react-color seems to be broken
import { Swatch } from "react-color/lib/components/common";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvIconButton } from "../../IconButton";
import { HvIcon } from "../../icons";
import { staticClasses, useClasses } from "./SavedColors.styles";

export { staticClasses as colorPickerSavedColorsClasses };

export type HvColorPickerSavedColorsClasses = ExtractNames<typeof useClasses>;

interface SavedColorsProps {
  colors: string[];
  onClickColor: (color: { hex: string; source: string }) => void;
  onAddColor: () => void;
  onRemoveColor: (color: string, index: number) => void;
  deleteButtonAriaLabel?: string;
  addButtonAriaLabel?: string;
  classes?: HvColorPickerSavedColorsClasses;
}

export const SavedColors = (props: SavedColorsProps) => {
  const {
    colors,
    onClickColor,
    onAddColor,
    onRemoveColor,
    deleteButtonAriaLabel,
    addButtonAriaLabel,
    classes: classesProp,
  } = useDefaultProps("HvColorPickerSavedColors", props);
  const { classes } = useClasses(classesProp);

  const handleClick = (hex: string) => {
    onClickColor({
      hex,
      source: "hex",
    });
  };

  return (
    <div className={classes.root}>
      <HvIconButton
        className={classes.addButton}
        variant="secondarySubtle"
        onClick={onAddColor}
        title={addButtonAriaLabel}
      >
        <HvIcon name="Add" compact />
      </HvIconButton>
      {colors.map((color, index) => (
        <div
          key={`saved-color-${color}-${index}`}
          className={classes.swatchRoot}
        >
          <div className={classes.swatchWrap}>
            <Swatch
              color={color}
              onClick={handleClick}
              focusStyle={{
                boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${color}`,
              }}
            />
          </div>
          <div className={classes.removeButtonRoot}>
            <HvIconButton
              className={classes.removeButton}
              variant="secondarySubtle"
              onClick={() => onRemoveColor(color, index)}
              title={deleteButtonAriaLabel}
            >
              <HvIcon name="Close" compact size="xs" />
            </HvIconButton>
          </div>
        </div>
      ))}
    </div>
  );
};
