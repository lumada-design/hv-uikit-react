import styled from "@emotion/styled";

import { FixedSizeList } from "react-window";

import { theme } from "@hitachivantara/uikit-styles";
import { DropRightXS } from "@hitachivantara/uikit-react-icons";

import { CSSProperties } from "react";

import { transientOptions } from "@core/utils/transientOptions";
import {
  HvCheckBox,
  checkBoxClasses,
  HvCheckBoxProps,
} from "@core/components/CheckBox";
import { HvLink, HvLinkProps } from "@core/components/Link";
import { HvListItem, listItemClasses } from "@core/components/ListContainer";
import { HvRadio, radioClasses, HvRadioProps } from "@core/components/Radio";

export const StyledFixedSizeList = styled(FixedSizeList)({
  marginBottom: 5,
});

export const StyledSelectAllCheckBox = styled((props: HvCheckBoxProps) => (
  <HvCheckBox {...props} />
))({
  width: "100%",
  margin: "0 0 2px 0",

  position: "relative",
  zIndex: 0,

  // prevent the focus ring to be hidden by sibling hover background
  "&:focus-within": {
    zIndex: 1,
  },
  // IE fallback code (using focus-within-polyfill)
  "&.focus-within": {
    zIndex: 1,
  },
});

export const StyledMultiSelectCheckBox = styled((props: HvCheckBoxProps) => (
  <HvCheckBox {...props} />
))({
  [`& .${checkBoxClasses?.root}`]: {
    width: "100%",
    zIndex: 0,
  },
  [`& .${checkBoxClasses?.container}`]: {
    "&:hover": {
      backgroundColor: "transparent",
    },

    "&:focus-within": {
      backgroundColor: "transparent",
      outline: "none",
      boxShadow: "none",
    },
    // IE fallback code (using focus-within-polyfill)
    "&.focus-within": {
      backgroundColor: "transparent",
      outline: "none",
      boxShadow: "none",
    },
  },
  [`& .${checkBoxClasses?.label}`]: {
    display: "inline-block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export const StyledLink = styled((props: HvLinkProps) => <HvLink {...props} />)(
  {
    ...(theme.typography.body as CSSProperties),
    textDecoration: "none",

    "&:focus": {
      boxShadow: "unset !important",
    },
  }
);

export const StyledSingleSelectRadio = styled((props: HvRadioProps) => (
  <HvRadio {...props} />
))({
  [`& .${radioClasses.root}`]: {
    width: "100%",
    zIndex: 0,
  },
  [`& .${radioClasses.container}`]: {
    "&:hover": {
      backgroundColor: "transparent",
    },

    "&:focus-within": {
      backgroundColor: "transparent",
      outline: "none",
      boxShadow: "none",
    },
    // IE fallback code (using focus-within-polyfill)
    "&.focus-within": {
      backgroundColor: "transparent",
      outline: "none",
      boxShadow: "none",
    },
  },
  [`& .${radioClasses.label}`]: {
    display: "inline-block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export const StyledListItem = styled(
  HvListItem,
  transientOptions
)(({ $applySelected }: { $applySelected: boolean }) => ({
  [`& .${listItemClasses.selected}`]: {
    ...($applySelected && {
      "&:not(:hover):not(.HvIsFocused):not(:focus-within)": {
        backgroundColor: "transparent",
      },
      "&:not(:hover):not(.HvIsFocused):not(.focus-within)": {
        backgroundColor: "transparent",
      },
    }),
  },
}));

export const StyledDropRightXS = styled(DropRightXS)({
  width: "32px",
  height: "32px",
  marginLeft: "auto",
});
