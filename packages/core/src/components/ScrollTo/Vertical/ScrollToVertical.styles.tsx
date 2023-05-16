import { theme } from "@hitachivantara/uikit-styles";
import { CSSInterpolation } from "@emotion/serialize";
import { HvScrollToVerticalClasses } from "./scrollToVerticalClasses";

export const styles: Partial<
  Record<keyof HvScrollToVerticalClasses, CSSInterpolation>
> = {
  root: {
    display: "flex",
    width: "32px",
    padding: "0",
    margin: 0,
    listStyleType: "none",
    flexWrap: "wrap",
    flexDirection: "column",
    backdropFilter: `blur(${theme.scrollTo.backgroundColorBlur})`,
  },
};

const calculateOffset = (quantityOfOptions: number) => {
  const itemSize = 32;
  const halfOptions = Math.round(quantityOfOptions * 0.5);

  return halfOptions * itemSize;
};

export const generateDynamicStyles = (quantityOfOptions: number) => {
  const positionOffset = calculateOffset(quantityOfOptions);

  const generatedStyles: Partial<
    Record<keyof HvScrollToVerticalClasses, CSSInterpolation>
  > = {
    positionAbsolute: {
      width: "32px",
      position: "absolute",
      zIndex: `calc(${theme.zIndices.banner} - 2)`,
      right: "0",
      top: `calc(50% - ${positionOffset}px)`,
    },
    positionFixed: {
      width: "32px",
      position: "fixed",
      zIndex: `calc(${theme.zIndices.banner} - 2)`,
      right: "0",
      top: `calc(50% - ${positionOffset}px)`,
    },
  };

  return generatedStyles;
};
