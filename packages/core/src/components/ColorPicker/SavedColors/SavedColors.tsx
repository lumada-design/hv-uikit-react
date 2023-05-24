import { ClassNames } from "@emotion/react";
import { HvButton } from "@core/components";
import { CloseXS, Add } from "@hitachivantara/uikit-react-icons";
// @types/react-color seems to be broken
// @ts-ignore
import { Swatch } from "react-color/lib/components/common";
import { styles } from "./SavedColors.styles";

import colorPickerSavedColorsClasses, {
  HvColorPickerSavedColorsClasses,
} from "./savedColorsClasses";

interface SavedColorsProps {
  colors: string[];
  onClickColor: (color: { hex: string; source: string }) => void;
  onAddColor: () => void;
  onRemoveColor: (color: string, index: number) => void;
  deleteButtonArialLabel?: string;
  classes?: HvColorPickerSavedColorsClasses;
}

export const SavedColors = ({
  colors,
  onClickColor,
  onAddColor,
  onRemoveColor,
  deleteButtonArialLabel,
  classes,
}: SavedColorsProps) => {
  const handleClick = (hex: string) => {
    onClickColor({
      hex,
      source: "hex",
    });
  };

  return (
    <ClassNames>
      {({ css, cx }) => (
        <div
          className={cx(
            colorPickerSavedColorsClasses.root,
            css(styles.root),
            classes?.root
          )}
        >
          <HvButton
            className={cx(
              colorPickerSavedColorsClasses.addButton,
              css(styles.addButton),
              classes?.addButton
            )}
            variant="secondarySubtle"
            icon
            onClick={onAddColor}
          >
            <Add />
          </HvButton>
          {colors.map((color, index) => {
            return (
              <div
                key={`saved-color-${color}-${index}`}
                className={cx(
                  colorPickerSavedColorsClasses.swatchRoot,
                  css(styles.swatchRoot),
                  classes?.swatchRoot
                )}
              >
                <div
                  className={cx(
                    colorPickerSavedColorsClasses.swatchWrap,
                    css(styles.swatchWrap),
                    classes?.swatchWrap
                  )}
                >
                  <Swatch
                    color={color}
                    onClick={handleClick}
                    focusStyle={{
                      boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${color}`,
                    }}
                  />
                </div>
                <div
                  className={cx(
                    colorPickerSavedColorsClasses.removeButtonRoot,
                    css(styles.removeButtonRoot),
                    classes?.removeButtonRoot
                  )}
                >
                  <HvButton
                    className={cx(
                      colorPickerSavedColorsClasses.removeButton,
                      css(styles.removeButton),
                      classes?.removeButton
                    )}
                    variant="secondarySubtle"
                    onClick={() => onRemoveColor(color, index)}
                    tabIndex={0}
                    aria-label={deleteButtonArialLabel}
                  >
                    <CloseXS iconSize="XS" />
                  </HvButton>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </ClassNames>
  );
};
