import styled from "@emotion/styled";
import {
  HvTag,
  HvCharCounter,
  HvFormElement,
  HvInfoMessage,
  HvInput,
  HvLabel,
  HvListContainer,
  HvListItem,
  HvSuggestions,
  HvWarningText,
} from "components";
import { theme } from "@hitachivantara/uikit-styles";
import { transientOptions } from "utils/transientOptions";
import { baseInputClasses, listItemClasses } from "components";
import { tagsInputClasses } from ".";

export const StyledFormElement = styled(HvFormElement)({
  display: "inline-block",
  maxWidth: "100%",
});

export const StyledLabelContainer = styled("div")({
  float: "left",
  display: "flex",
  alignItems: "flex-start",
});

export const StyledLabel = styled(HvLabel)({
  display: "block",
  float: "left",
  paddingBottom: "6px",
});

export const StyledDescription = styled(HvInfoMessage)({
  display: "block",
  float: "left",
});

export const StyledCharCounter = styled(HvCharCounter)(() => ({
  display: "block",
  float: "right",
  textAlign: "right",
  marginBottom: "6px",
}));

export const StyledTagsList = styled(
  HvListContainer,
  transientOptions
)(
  ({
    $disabled,
    $singleLine,
    $error,
    $resizable,
    $invalid,
    $readOnly,
  }: {
    $disabled: boolean;
    $singleLine: boolean;
    $error: boolean;
    $resizable: boolean;
    $invalid: boolean;
    $readOnly: boolean;
  }) => ({
    display: "flex",
    alignContent: "flex-start",
    float: "left",
    clear: "both",
    width: "100%",
    maxWidth: "100%",
    height: "100%",
    padding: 5,
    overflow: "auto",
    position: "relative",

    flexDirection: "row",
    flexWrap: "wrap",

    backgroundColor: theme.colors.atmo1,
    border: `1px solid ${theme.colors.atmo4}`,
    borderRadius: "2px",

    "&:hover": {
      cursor: "text",
      border: `1px solid ${theme.tagsInput.hoverColor}`,
    },

    [`&& .${baseInputClasses.inputRoot}`]: {
      border: "none",
    },

    "&:focus, &:focus-within, &:focus-visible": {
      outlineColor: "#52A8EC",
      outlineStyle: "solid",
      outlineWidth: "0px",
      outlineOffset: "-1px",
      boxShadow: "0 0 0 1px #52A8EC, 0 0 0 4px rgba(29,155,209,.3)",
    },

    ...($disabled && {
      backgroundColor: theme.tagsInput.disabledBackgroundColor,
      border: `1px solid ${theme.colors.atmo4}`,

      "&:focus-within, &:hover": {
        border: `1px solid ${theme.colors.atmo4}`,
      },
    }),

    ...($readOnly && {
      backgroundColor: theme.tagsInput.readOnlyBackgroundColor,
      border: `1px solid ${theme.tagsInput.readOnlyBorderColor}`,
      "&:hover": {
        border: `1px solid ${theme.tagsInput.readOnlyBorderColor}`,
      },
    }),

    ...($singleLine && {
      overflowX: "hidden",
      overflowY: "hidden",
      height: 32,
      display: "table-row",
      paddingTop: 0,
      paddingLeft: 4,
    }),

    ...($error && {
      border: `1px solid ${theme.colors.sema4}`,
    }),

    ...($resizable && {
      width: "auto",
      resize: "both",
      overflow: "auto",
    }),

    ...($invalid && {
      border: `1px solid ${theme.colors.sema4}!important`,
    }),
  })
);

export const StyledError = styled(HvWarningText)({
  float: "left",
});

export const StyledListItem = styled(HvListItem)(
  ({ $singleLine }: { $singleLine: boolean }) => ({
    marginBottom: 2,
    height: 24,
    lineHeight: "24px",
    "&:not(:last-child)": {
      marginBottom: 2,
    },
    [`&.${listItemClasses.gutters}`]: {
      padding: "0 5px",
    },
    ...($singleLine && {
      display: "table-cell",
      paddingTop: "2px!important",
    }),
  })
);

export const StyledTag = styled((props) => <HvTag {...props} />)(
  ({ $selected }: { $selected: boolean }) => ({
    "& .chipRoot": {
      maxWidth: "none",
    },
    ...($selected && {
      outlineColor: "#52A8EC",
      outlineStyle: "solid",
      outlineWidth: "0px",
      outlineOffset: "-1px",
      boxShadow: "0 0 0 1px #52A8EC, 0 0 0 4px rgba(29,155,209,.3)",
    }),
  })
);

export const StyledInputListItem = styled(HvListItem)(
  ({
    $singleLine,
    $isTagSelected,
  }: {
    $singleLine: boolean;
    $isTagSelected: boolean;
  }) => ({
    display: "flex",
    flexGrow: 1,
    height: 24,
    lineHeight: "24px",
    [`&.${listItemClasses.gutters}`]: {
      padding: "0 5px",
    },
    ...($singleLine && {
      display: "table-cell",
      minWidth: 100,
      width: "100%",
      paddingTop: "3px!important",
      verticalAlign: "middle",
      "&.empty": {
        position: "absolute",
        height: "100%",
        paddingTop: "3px!important",
      },
    }),
    ...($isTagSelected && {
      [`& .${baseInputClasses.inputRoot}`]: {
        backgroundColor: theme.colors.atmo1,
      },
    }),
  })
);

export const StyledInput = styled(HvInput)(
  ({ $singleLine }: { $singleLine: boolean }) => ({
    [`& .${baseInputClasses.root}`]: {
      width: "100%",
      [`&:hover .${tagsInputClasses.tagInputBorderContainer}`]: {
        background: "none",
      },
      [`&:hover .${tagsInputClasses.tagInputBorderContainer}`]: {
        background: "none",
      },
      "&.singleLine": {},
    },
    [`& .${baseInputClasses.inputRoot}`]: {
      marginLeft: 0,
      marginRight: 0,
      width: 0,
      flex: "1 1 auto",
      minWidth: 48,
      height: 24,
      lineHeight: "24px",
      padding: 0,
    },
    [`& .${baseInputClasses.inputBorderContainer}`]: {
      border: "none",
      background: "none",
    },
    [`& .${baseInputClasses.inputRootFocused}`]: {
      outline: "none!important",
      boxShadow: "none!important",
    },
    [`&& .${baseInputClasses.inputRootReadOnly}`]: {
      border: "none",
      "&:hover": {
        border: "none",
      },
    },
    ...($singleLine && {}),
  })
);

export const StyledSuggestions = styled(HvSuggestions)({
  width: "100%",
  position: "relative",
  top: 59,
  "& .root .list &": {
    width: "100%",
  },
});
