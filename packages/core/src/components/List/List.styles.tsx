import styled from "@emotion/styled";
import { FixedSizeList } from "react-window";
import { HvCheckBox, HvLink, HvListItem, HvRadio } from "components";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "utils/transientOptions";
import { DropRightXS } from "@hitachivantara/uikit-icons";
import checkBoxClasses from "../CheckBox/checkBoxClasses";
import radioClasses from "../Radio/radioClasses";
import listItemClasses from "../ListContainer/ListItem/listItemClasses";

export const StyledFixedSizeList = styled(FixedSizeList)({
  marginBottom: 5,
});

export const StyledSelectAllCheckBox = styled((props) => (
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

export const StyledMultiSelectCheckBox = styled((props) => (
  <HvCheckBox {...props} />
))({
  [`& .${checkBoxClasses.root}`]: {
    width: "100%",
    zIndex: 0,
  },
  [`& .${checkBoxClasses.container}`]: {
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
  [`& .${checkBoxClasses.label}`]: {
    display: "inline-block",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export const StyledLink = styled((props) => <HvLink {...props} />)({
  ...theme.typography.body,
  textDecoration: "none",

  "&:focus": {
    boxShadow: "unset !important",
  },
});

export const StyledSingleSelectRadio = styled((props) => (
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
