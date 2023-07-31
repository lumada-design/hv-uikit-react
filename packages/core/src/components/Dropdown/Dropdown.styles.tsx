import styled from "@emotion/styled";

import { theme } from "@hitachivantara/uikit-styles";

import {
  HvFormElement,
  HvFormElementProps,
  HvLabel,
} from "@core/components/Forms";
import {
  HvBaseDropdown,
  HvBaseDropdownProps,
} from "@core/components/BaseDropdown";
import { HvTypography } from "@core/components/Typography";
import { transientOptions } from "@core/utils/transientOptions";

import dropdownClasses from "./dropdownClasses";

export const StyledHvFormElement = styled(
  (props: HvFormElementProps) => <HvFormElement {...props} />,
  transientOptions
)(({ $selectionDisabled }: { $selectionDisabled?: boolean }) => ({
  width: "100%",

  position: "relative",
  display: "inline-block",

  ...($selectionDisabled && {
    color: theme.dropdown.disabledColor,
  }),
}));

export const StyledDropdown = styled(
  (props: HvBaseDropdownProps) => <HvBaseDropdown {...props} />,
  transientOptions
)(
  ({
    $dropdownHeaderInvalid,
    $readOnly,
  }: {
    $dropdownHeaderInvalid?: boolean;
    $readOnly?: boolean;
  }) => ({
    width: "100%",
    borderRadius: theme.radii.base,

    [`& .${dropdownClasses.dropdownHeader}`]: {
      ...($dropdownHeaderInvalid && {
        border: "none",
        "&:hover": {
          border: "none",
        },
      }),
      ...($readOnly && {
        border: theme.dropdown.readOnlyBorder,
        backgroundColor: theme.dropdown.readOnlyBackgroundColor,
      }),
    },

    [`& .${dropdownClasses.dropdownHeaderInvalid}`]: {
      border: theme.dropdown.dropdownHeaderInvalidBorder,
      "&:hover": {
        border: theme.dropdown.dropdownHeaderInvalidBorder,
      },
    },
  })
);

export const StyledLabelContainer = styled("div")({
  display: "flex",
  alignItems: "flex-start",
});

export const StyledLabel = styled(HvLabel)({
  paddingBottom: "6px",
  display: "block",
});

export const StyledTypography = styled(
  HvTypography,
  transientOptions
)(
  ({
    $selectionDisabled,
    $isOpen,
  }: {
    $selectionDisabled?: boolean;
    $isOpen?: boolean;
  }) => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    ...(!$isOpen && {
      color: theme.dropdown.placeholderColor,
    }),
    ...($selectionDisabled && {
      lineHeight: theme.space.md,
      color: theme.dropdown.disabledColor,
    }),
  })
);
