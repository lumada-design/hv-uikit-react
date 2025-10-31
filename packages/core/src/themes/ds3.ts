import {
  ds3 as ds3Base,
  mergeTheme,
  theme,
} from "@hitachivantara/uikit-styles";

import type { HvActionBarProps } from "../ActionBar";
import type { HvBaseCheckBoxProps } from "../BaseCheckBox";
import type { HvCheckBoxIconProps } from "../BaseCheckBox/CheckBoxIcon";
import type { HvBaseDropdownProps } from "../BaseDropdown";
import type { HvBaseInputProps } from "../BaseInput";
import type { HvBaseRadioProps } from "../BaseRadio";
import type { HvRadioIconProps } from "../BaseRadio/RadioIcon";
import type { HvBaseSwitchProps } from "../BaseSwitch";
import type { HvBreadCrumbPageProps } from "../BreadCrumb/Page";
import type { HvBulkActionsProps } from "../BulkActions";
import type { HvButtonProps } from "../Button";
import type { HvCalendarHeaderProps } from "../Calendar";
import type { HvCardHeaderProps, HvCardProps } from "../Card";
import type { HvCarouselProps } from "../Carousel";
import type { HvCheckBoxProps } from "../CheckBox";
import type { HvColorPickerProps } from "../ColorPicker";
import type { HvDatePickerProps } from "../DatePicker";
import type {
  HvDialogContentProps,
  HvDialogProps,
  HvDialogTitleProps,
} from "../Dialog";
import type { HvDropdownProps } from "../Dropdown";
import type { HvDropDownMenuProps } from "../DropDownMenu";
import type { HvEmptyStateProps } from "../EmptyState";
import type { HvFileProps, HvFileUploaderPreviewProps } from "../FileUploader";
import type { HvDropZoneProps } from "../FileUploader/DropZone";
import type { HvFilterGroupCounterProps } from "../FilterGroup/Counter";
import type { HvFilterGroupContentProps } from "../FilterGroup/FilterContent";
import type {
  HvInfoMessageProps,
  HvLabelProps,
  HvWarningTextProps,
} from "../FormElement";
import type { HvLabelContainerProps } from "../FormElement/LabelContainer";
import type { HvSuggestionsProps } from "../FormElement/Suggestions";
import type { HvGlobalActionsProps } from "../GlobalActions";
import type { HvHeaderProps } from "../Header";
import { BarProps } from "../Header/Navigation/MenuBar/Bar";
import type { HvHeaderMenuItemProps } from "../Header/Navigation/MenuItem";
import type { HvInlineEditorProps } from "../InlineEditor";
import type { HvListProps } from "../List";
import type { HvListItemProps } from "../ListContainer";
import type { HvMultiButtonProps } from "../MultiButton";
import type { HvPaginationProps } from "../Pagination";
import type { HvPaginationSelectProps } from "../Pagination/Select";
import type { HvQueryBuilderProps } from "../QueryBuilder";
import { RuleProps } from "../QueryBuilder/Rule/Rule";
import type { HvRadioProps } from "../Radio";
import type { HvScrollToHorizontalProps } from "../ScrollToHorizontal";
import type { HvHorizontalScrollListItemProps } from "../ScrollToHorizontal/HorizontalScrollListItem";
import type { HvScrollToVerticalProps } from "../ScrollToVertical";
import type { HvVerticalScrollListItemProps } from "../ScrollToVertical/VerticalScrollListItem";
import type { HvSelectProps } from "../Select";
import type { HvSliderProps } from "../Slider";
import type { HvSnackbarContentProps } from "../Snackbar";
import type { HvStatusIconProps } from "../StatusIcon";
import type { HvSwitchProps } from "../Switch";
import type {
  HvTableCellProps,
  HvTableHeaderProps,
  HvTableRowProps,
} from "../Table";
import type { HvTabProps } from "../Tabs";
import type { HvTagProps } from "../Tag";
import type { HvTagsInputProps } from "../TagsInput";
import type { HvTooltipProps } from "../Tooltip";
import type { HvCalloutProps } from "../utils/Callout";
import type {
  HvVerticalNavigationActionsProps,
  HvVerticalNavigationProps,
  HvVerticalNavigationSliderProps,
  HvVerticalNavigationTreeViewItemProps,
} from "../VerticalNavigation";
import type { CSSClasses } from "./utils";

export const ds3 = mergeTheme(ds3Base, {
  components: {
    HvActionBar: {
      classes: {
        root: {
          borderTop: `3px solid ${theme.colors.atmo2}`,
        },
      },
    } satisfies CSSClasses<HvActionBarProps>,
    HvBaseCheckBox: {
      classes: {
        root: {
          borderRadius: 0,
        },
      },
    } satisfies CSSClasses<HvBaseCheckBoxProps>,
    HvCallout: {
      classes: {
        root: {
          borderRadius: 0,
        },
        messageIcon: {
          color: "inherit !important",
          padding: 0,
        },
      },
    } satisfies CSSClasses<HvCalloutProps>,
    HvCheckBoxIcon: {
      classes: {
        root: {
          borderRadius: 0,
          borderColor: theme.colors.text,
        },
        checked: {
          "--bg-color": theme.colors.text,
          color: theme.colors.atmo1,
        },
        semantic: {
          "&[data-variant=indeterminate]": {
            backgroundColor: theme.colors.textLight,
            color: theme.colors.textDark,
          },
        },
        indeterminate: {
          color: theme.colors.text,
        },
      },
    } satisfies CSSClasses<HvCheckBoxIconProps>,
    HvBaseDropdown: {
      classes: {
        header: {
          borderRadius: 0,
          border: `1px solid ${theme.colors.atmo4}`,
          ":hover,:focus-visible": {
            borderColor: theme.colors.secondary,
          },
        },
        headerOpen: {
          "&,:hover": {
            borderColor: "transparent",
            boxShadow: theme.colors.shadow,
          },
        },
        headerDisabled: {
          background: theme.colors.atmo3,
          "&,:hover": {
            borderColor: theme.colors.atmo4,
          },
        },
        headerReadOnly: {
          background: theme.colors.atmo1,
          "&,:focus-visible": {
            border: "none",
          },
        },
        placeholder: {
          color: theme.colors.secondary_60,
        },
        panel: {
          boxShadow: theme.colors.shadow,
          border: "1px solid transparent",
        },
        inputExtensionOpen: {
          height: theme.space.xs,
          borderRight: "1px solid transparent",
          borderLeft: "1px solid transparent",
        },
      },
    } satisfies CSSClasses<HvBaseDropdownProps>,
    HvLabelContainer: {
      classes: {
        root: {
          height: "auto",
        },
      },
    } satisfies CSSClasses<HvLabelContainerProps>,
    HvBaseInput: {
      classes: {
        root: {
          border: "none",
          borderRadius: 0,

          ":not(.HvBaseInput-disabled,.HvBaseInput-invalid,.HvBaseInput-readOnly)":
            {
              ":hover,:focus-within": {
                borderColor: theme.colors.secondary,
                "::after": {
                  borderBottomColor: theme.colors.secondary,
                },
              },
            },

          "::after": {
            content: '" "',
            position: "absolute",
            inset: "auto 0 0",
            margin: "0 2px",
            borderBottom: `1px solid ${theme.colors.atmo4}`,
          },
        },
        invalid: {
          "::after": {
            borderBottomColor: theme.form.errorColor,
          },
        },
        disabled: {
          backgroundColor: theme.colors.atmo3,

          "&& .HvBaseInput-input": {
            color: theme.colors.secondary_60,
            WebkitTextFillColor: theme.colors.secondary_60,
          },
        },
        multiline: {
          border: `1px solid ${theme.colors.atmo4}`,
          "&::after": {
            display: "none",
          },
          "&.HvBaseInput-disabled": {
            borderColor: theme.colors.atmo4,
          },
        },
        readOnly: {
          borderColor: "transparent",
          backgroundColor: theme.colors.atmo1,

          "::after": {
            borderColor: "transparent",
          },
        },
        focused: {
          "&.HvBaseInput-readOnly": {
            backgroundColor: theme.colors.atmo1,
          },
        },
        input: {
          "&::placeholder": {
            color: theme.colors.secondary_60,
          },
        },
        inputReadOnly: {
          color: theme.colors.secondary,
        },
      },
    } satisfies CSSClasses<HvBaseInputProps>,
    HvBaseRadio: {
      classes: {
        root: {
          "&:hover": {
            borderRadius: 0,
          },
        },
      },
    } satisfies CSSClasses<HvBaseRadioProps>,
    HvRadioIcon: {
      classes: {
        checked: {
          "--bg-color": theme.colors.text,
          color: theme.colors.bgPage,
        },
      },
    } satisfies CSSClasses<HvRadioIconProps>,
    HvBaseSwitch: {
      classes: {
        root: {
          padding: 0,
          "&:hover": {
            backgroundColor: "transparent",
          },
          " .HvBaseSwitch-switchBase.HvBaseSwitch-checked:not(.HvBaseSwitch-disabled) + .HvBaseSwitch-track":
            {
              backgroundColor: theme.colors.text,
            },
        },
        switch: {
          width: "32px",
          height: "16px",
        },
        switchBase: {
          width: "32px",
          height: "16px",
        },
        track: {
          backgroundColor: theme.colors.atmo2,
        },
        thumb: {
          width: 12,
          height: 12,
          left: -9,
        },
      },
    } satisfies CSSClasses<HvBaseSwitchProps>,
    HvBreadCrumbPage: {
      classes: {
        link: {
          ":hover,:focus": {
            backgroundColor: theme.colors.atmo3,
          },
        },
      },
    } satisfies CSSClasses<HvBreadCrumbPageProps>,
    HvBulkActions: {
      classes: {
        root: {
          border: "none",
          backgroundColor: theme.colors.atmo1,
          padding: "0px",
        },
        semantic: {
          backgroundColor: theme.colors.neutral_20,
          "& .HvBulkActions-selectAll div": {
            color: theme.colors.base_dark,

            "& *": {
              color: theme.colors.base_dark,
              backgroundColor: "transparent",
            },
          },
        },
        divider: {
          display: "none",
        },
      },
    } satisfies CSSClasses<HvBulkActionsProps>,
    HvButton: {
      classes: {
        root: {
          padding: theme.spacing(0, "xs"),
          minWidth: "70px",
        },
        icon: {
          minWidth: "unset",
        },
        secondarySubtle: {
          backgroundColor: theme.colors.atmo1,
          borderColor: theme.colors.atmo4,
        },
        secondary: {
          backgroundColor: theme.colors.atmo1,
          borderColor: theme.colors.atmo4,
        },
        ghost: {},
        disabled: {
          "&:not(.HvButton-ghost):not(.HvButton-semantic)": {
            backgroundColor: theme.colors.atmo3,
          },
          "&.HvButton-subtle": {
            borderColor: theme.colors.atmo4,
          },
        },
      },
    } satisfies CSSClasses<HvButtonProps>,
    HvCalendarHeader: {
      classes: {
        root: {
          marginTop: theme.space.xs,
          paddingBottom: 32,
          "& input": {
            height: "27px",
            fontSize: "18px",
            letterSpacing: "0.02em",
            lineHeight: "28px",
            fontWeight: theme.fontWeights.semibold,
          },
        },
        invalid: {
          paddingBottom: 0,
        },
        headerDayOfWeek: {
          color: theme.colors.secondary,
        },
      },
    } satisfies CSSClasses<HvCalendarHeaderProps>,
    HvCard: {
      classes: {
        root: {
          outline: "none",
          borderRadius: 0,
        },
        selectable: {
          "&:hover": {
            outline: `1px solid ${theme.colors.atmo4}`,
          },
        },
        icon: {
          top: `calc(-24px + ${theme.space.xs})`,
          right: `calc(-24px + ${theme.space.xs})`,
        },
      },
    } satisfies CSSClasses<HvCardProps>,
    HvCardHeader: {
      classes: {
        root: {
          padding: theme.spacing("15px", "sm"),
        },
        title: {
          ...theme.typography.title3,
        },
        titleShort: {
          ...theme.typography.title3,
        },
        subheader: {
          ...theme.typography.body,
        },
      },
    } satisfies CSSClasses<HvCardHeaderProps>,
    HvCarousel: {
      classes: {
        xs: {
          "& .HvCarousel-controls": {
            display: "none",
          },
        },
        controls: {
          justifyContent: "space-between",
          backgroundColor: "transparent",
          border: "none",
        },
        counterContainer: {
          display: "block",
        },
        thumbnail: {
          "& img": {
            borderRadius: 0,
          },
        },
        thumbnailSelected: {
          "& img": {
            border: `1px solid ${theme.colors.base_dark}`,
          },
        },
      },
    } satisfies CSSClasses<HvCarouselProps>,
    HvCheckBox: {
      classes: {
        container: {
          "&:hover": {
            borderRadius: 0,
          },
        },
      },
    } satisfies CSSClasses<HvCheckBoxProps>,
    HvColorPicker: {
      classes: {
        panel: {
          minWidth: "240px",
          padding: "20px 15px 20px 20px",
        },
        colorPicker: {
          width: "205px",
        },
        headerColorValue: {
          ...theme.typography.body,
        },
        recommendedColorsRoot: {
          ":not(:only-child)": {
            paddingBottom: "20px",
          },
        },
      },
    } satisfies CSSClasses<HvColorPickerProps>,
    HvColorPickerFields: {
      classes: {
        fields: {
          paddingTop: "10px",
          marginRight: "5px",
        },
        single: {
          maxWidth: "40px",
          paddingLeft: "5px",
        },
        double: {
          maxWidth: "80px",
          paddingRight: "20px",
        },
      },
    } satisfies CSSClasses<any>,
    HvColorPickerPicker: {
      classes: {
        pickers: {
          flexDirection: "row",
        },
        saturation: {
          width: "180px",
          height: "180px",
          marginRight: "5px",

          "& > div": {
            borderRadius: 0,

            "& .saturation-white": {
              borderRadius: 0,

              "& .saturation-black": {
                borderRadius: 0,
              },
            },
          },
        },
        saturationPointer: {
          width: "6px",
          height: "6px",
        },
        hue: {
          height: "180px",
          width: "15px",
          marginTop: "0px",

          "& .hue-horizontal": {
            borderRadius: 0,
          },
        },
        hueSlider: {
          width: "12px",
          height: "6px",
          background: "#fff",
          marginLeft: "1px",
          border: "1px solid #fff",
          borderRadius: "1px",
        },
      },
    } satisfies CSSClasses<any>,
    HvColorPickerPresetColors: {
      classes: {
        root: { width: "205px" },
        colors: {
          width: "calc(100% + 5px)",
          margin: "-5px -3px",
        },
        swatchWrap: {
          width: "16px",
          height: "16px",
          margin: "5px",

          "& > span > div": {
            borderRadius: 0,
          },
        },
      },
    } satisfies CSSClasses<any>,
    HvColorPickerSavedColors: {
      classes: {
        addButton: {
          margin: "5px",
          width: "32px",
          height: "32px",
        },
        root: {
          width: "calc(100% + 5px)",
          margin: "-5px -3px",
        },
        swatchWrap: {
          width: "32px",
          height: "32px",
          margin: "4px",

          "& > span > div": {
            borderRadius: theme.radii.base,
          },
        },
      },
    } satisfies CSSClasses<any>,
    HvDatePicker: {
      classes: {
        inputText: {
          ...theme.typography.body,
          color: theme.colors.secondary_60,
        },
      },
    } satisfies CSSClasses<HvDatePickerProps>,
    HvDialog: {
      classes: {
        paper: {
          borderRadius: 0,
        },
      },
    } satisfies CSSClasses<HvDialogProps>,
    HvDialogTitle: {
      classes: {
        titleText: {
          ...theme.typography.xxsTitle,
        },
        root: {
          "& .HvStatusIcon-root": {
            padding: 0,
          },
          "& .HvIconContainer-root": {
            color: `${theme.colors.secondary}!important`,
          },
        },
      },
    } satisfies CSSClasses<HvDialogTitleProps>,
    HvDialogContent: {
      classes: {
        root: {
          borderTop: "none!important",
          borderBottom: "none!important",
        },
      },
    } satisfies CSSClasses<HvDialogContentProps>,
    HvDropdown: {
      classes: {
        readOnly: {
          "& .HvDropdown-dropdownHeader": {
            border: "none",
            backgroundColor: theme.colors.atmo1,
          },
        },
        placeholderClosed: {
          color: theme.colors.secondary_60,
        },
      },
    } satisfies CSSClasses<HvDropdownProps>,
    HvDropDownMenu: {
      classes: {
        iconSelected: {
          border: "none",
          "&:hover": {
            border: "none",
          },
        },
      },
    } satisfies CSSClasses<HvDropDownMenuProps>,
    HvEmptyState: {
      classes: {
        titleContainer: {
          marginTop: "2px",
          ...theme.typography.xxsTitle,
        },
      },
    } satisfies CSSClasses<HvEmptyStateProps>,
    HvFile: {
      classes: {
        root: {
          border: "none",
          borderRadius: 0,
        },
        progressbarContainer: {
          height: "2px",
        },
        previewContainer: {
          width: "52px",
          height: "52px",
          "& img": {
            width: "100%",
            height: "100%",
          },
        },
      },
    } satisfies CSSClasses<HvFileProps>,
    HvFileUploaderPreview: {
      classes: {
        previewButton: {
          width: "52px",
          height: "52px",
        },
        overlay: {
          backgroundColor: theme.colors.atmo3,
          opacity: "0.75",
          borderRadius: 0,
        },
      },
    } satisfies CSSClasses<HvFileUploaderPreviewProps>,
    HvDropZone: {
      classes: {
        dropZoneContainer: {
          border: `1px dotted ${theme.colors.atmo4}`,
          background: theme.colors.atmo2,
          borderRadius: 0,
          ":hover,:focus-within": {
            borderColor: theme.colors.secondary,
          },
        },
        dragAction: {
          border: `1px dotted ${theme.colors.secondary}`,
        },
        dropZoneContainerDisabled: {
          "&,:hover": {
            borderColor: theme.colors.atmo4,
          },
        },
      },
    } satisfies CSSClasses<HvDropZoneProps>,
    HvFilterGroupCounter: {
      classes: {
        partialCounter: {
          fontWeight: theme.fontWeights.bold,
        },
      },
    } satisfies CSSClasses<HvFilterGroupCounterProps>,
    HvFilterGroupContent: {
      classes: {
        rightSidePanel: {
          boxShadow: `inset 8px 0 8px -6px ${theme.colors.shad1}`,
          borderLeft: "none",
        },
        applyButton: {
          marginRight: "0px",
        },
      },
    } satisfies CSSClasses<HvFilterGroupContentProps>,
    HvGlobalActions: {
      classes: {
        section: {
          "& .HvGlobalActions-wrapper": {
            backgroundColor: "transparent",
            paddingLeft: "0px",
          },
        },
        wrapper: {
          "&&": {
            padding: theme.space.xs,
            borderWidth: 0,
            borderRadius: 0,
          },
        },
        sectionName: {
          ...theme.typography.sectionTitle,
        },
      },
    } satisfies CSSClasses<HvGlobalActionsProps>,
    HvHeader: {
      classes: {
        root: {
          backgroundColor: theme.colors.atmo1,
          borderTop: `4px solid ${theme.colors.brand}`,
        },
      },
    } satisfies CSSClasses<HvHeaderProps>,
    HvHeaderMenuBarBar: {
      classes: {
        active: {
          top: `calc(${theme.header.height} - 4px)`,
        },
        list: {
          "& li:hover > .HvHeader-MenuBar-hidden": {
            top: `calc(${theme.header.height} - 4px)`,
          },
          "& li:focus-within > .HvHeader-MenuBar-hidden": {
            top: `calc(${theme.header.height} - 4px)`,
          },
        },
      },
    } satisfies CSSClasses<BarProps>,
    HvHeaderMenuItem: {
      classes: {
        root: {
          borderTop: "2px solid transparent",
          borderBottom: "none",
          color: theme.colors.secondary,
        },
        selected: {
          borderBottom: "none",
          color: theme.colors.brand,
          "&.HvHeader-MenuItem-menu": {
            borderTop: "2px solid transparent",
          },
          "&.HvHeader-MenuItem-menubar": {
            borderTop: "2px solid currentcolor",
          },
        },
      },
    } satisfies CSSClasses<HvHeaderMenuItemProps>,
    HvHorizontalScrollListItem: {
      classes: {
        root: {
          maxWidth: 180,
        },
        button: {
          height: "32px",
          borderBottom: "2px solid transparent",
          "&:hover": {
            backgroundColor: theme.colors.atmo3,

            "& .HvHorizontalScrollListItem-notSelected": {
              height: "10px",
              width: "10px",
              backgroundColor: theme.colors.atmo4,
            },
          },
        },
        text: {
          height: "32px",
          borderBottom: "2px solid transparent",
          padding: "8px 10px",
          margin: 0,
        },
        selected: {
          borderBottom: `2px solid ${theme.colors.secondary}`,
        },
        bullet: {
          display: "none",
        },
      },
    } satisfies CSSClasses<HvHorizontalScrollListItemProps>,
    HvSelect: {
      classes: {
        select: {
          ".HvButton-endIcon": {
            marginRight: theme.spacing(-1),
          },
        },
        panel: {
          borderColor: theme.colors.atmo4,
        },
      },
    } satisfies CSSClasses<HvSelectProps<any>>,
    HvVerticalScrollListItem: {
      classes: {
        icon: {
          fontSize: "10px",
        },
        notSelected: {
          color: theme.colors.atmo4,
          fontSize: "6px",
        },
        text: {
          height: "32px",
          width: "32px",
        },
        button: {
          height: "32px",
          width: "32px",
          borderRadius: 0,
          cursor: "pointer",
          "&:hover": {
            "& .HvVerticalScrollListItem-notSelected": {
              fontSize: "10px",
              color: theme.colors.atmo4,
            },
          },
        },
      },
    } satisfies CSSClasses<HvVerticalScrollListItemProps>,
    HvInlineEditor: {
      classes: {
        button: {
          "&,:hover": {
            border: "none",
            backgroundColor: "transparent",
          },
          ":focus,:active": {
            border: "none",
          },
        },
      },
    } satisfies CSSClasses<HvInlineEditorProps>,
    HvInfoMessage: {
      classes: {
        root: {
          color: theme.colors.secondary,
        },
      },
    } satisfies CSSClasses<HvInfoMessageProps>,
    HvLabel: {
      classes: {
        root: { fontWeight: theme.fontWeights.semibold },
        childGutter: { paddingBottom: 6 },
      },
    } satisfies CSSClasses<HvLabelProps>,
    HvList: {
      classes: {
        itemSelector: {
          "&:not(:hover):not(.HvIsFocused):not(:focus-within)": {
            backgroundColor: "transparent",
          },
        },
      },
    } satisfies CSSClasses<HvListProps>,
    HvListItem: {
      classes: {
        disabled: {
          backgroundColor: "transparent",
        },
      },
    } satisfies CSSClasses<HvListItemProps>,
    HvPagination: {
      classes: {
        root: {
          ...theme.typography.body,
        },
        pageSizeInput: {
          ...theme.typography.label,
          "&:focus": {
            padding: "unset",
          },
        },
        pageJump: {
          width: 40,
          minWidth: 40,
          height: 32,
        },
        icon: {
          fontSize: 16,
        },
        pageSizeOptions: {
          height: 32,
        },
        pageSizeHeader: {
          height: "unset",
        },
        pageSizeTextContainer: {
          height: 32,
        },
        pageNavigator: {
          alignItems: "stretch",
        },
      },
    } satisfies CSSClasses<HvPaginationProps>,
    HvPaginationSelect: {
      classes: {
        header: {
          borderColor: "transparent",
          "&:hover": {
            borderColor: "transparent",
          },
        },
      },
    } satisfies CSSClasses<HvPaginationSelectProps>,
    HvQueryBuilder: {
      classes: {
        topGroup: {
          paddingBottom: `calc(${theme.space.sm} * 3)`,
        },
        subGroup: {
          "&::before": {
            left: "-42px",
          },
        },
        subRulesContainer: {
          left: "-41px",
        },
        topActionButtonContainer: {
          position: "absolute",
          bottom: `calc(-1 * ${theme.space.md} * 0.5)`,
          right: `calc(${theme.space.sm} * 1.75)`,
        },
        createConditionButton: {
          ...theme.typography.link,
          textDecoration: "underline",
        },
        createGroupButton: {
          ...theme.typography.link,
          textDecoration: "underline",
        },
      },
    } satisfies CSSClasses<HvQueryBuilderProps>,
    HvQueryBuilderRule: {
      classes: {
        root: {
          "&::before": {
            width: "21px",
            height: "36px",

            left: `calc( -1 * 21px)`,
          },
          ":not(.HvQueryBuilder-topRulesContainer)>&:last-child::after": {
            width: "21px",

            left: `calc( -1 * 21px)`,
          },
        },
        actionsContainer: {
          marginTop: "22px",
        },
      },
    } satisfies CSSClasses<RuleProps>,
    HvRadio: {
      classes: {
        container: {
          "&:hover": {
            borderRadius: 0,
          },
        },
      },
    } satisfies CSSClasses<HvRadioProps>,
    HvScrollToHorizontal: {
      classes: {
        root: {
          backgroundColor: theme.alpha("atmo2", 0.8),
        },
      },
    } satisfies CSSClasses<HvScrollToHorizontalProps>,
    HvScrollToVertical: {
      classes: {
        root: {
          backgroundColor: theme.alpha("atmo2", 0.8),
        },
      },
    } satisfies CSSClasses<HvScrollToVerticalProps>,
    HvSlider: {
      classes: {
        trackDragging: {
          "&& .rc-slider-track": {
            "&::before": {
              borderTop: `12px solid ${theme.colors.atmo3}`,
              borderBottom: `12px solid ${theme.colors.atmo3}`,
            },
          },
        },
        trackStandBy: {
          "&& .rc-slider-track": {
            "&:hover": {
              "&::before": {
                borderTop: `12px solid ${theme.colors.atmo3}`,
                borderBottom: `12px solid ${theme.colors.atmo3}`,
              },
            },
          },
        },
        handleContainer: {
          "&& .rc-slider-handle": {
            "&:active": {
              cursor: "grab",
              "&::before": {
                border: `9px solid ${theme.colors.secondary}`,
                opacity: "20%",
              },
            },
            "&:hover": {
              "&::before": {
                border: `9px solid ${theme.colors.secondary}`,
                opacity: "20%",
              },
            },
          },
        },
      },
    } satisfies CSSClasses<HvSliderProps>,
    HvSnackbarContent: {
      classes: {
        action: {
          marginLeft: "inherit",
        },
      },
    } satisfies CSSClasses<HvSnackbarContentProps>,
    HvSwitch: {
      classes: {
        invalidSwitch: {
          paddingBottom: "0px",
        },
      },
    } satisfies CSSClasses<HvSwitchProps>,
    HvSuggestions: {
      classes: {
        list: {
          borderColor: "transparent",
          borderRadius: 0,
        },
      },
    } satisfies CSSClasses<HvSuggestionsProps>,
    HvTab: {
      classes: {
        root: {
          padding: "0 20px",
          "&:hover": {
            backgroundColor: "transparent",
            borderRadius: 0,
            "&::after": {
              height: "1px",
              backgroundColor: theme.colors.secondary_60,
            },
          },
        },
      },
    } satisfies CSSClasses<HvTabProps>,
    HvTag: {
      classes: {
        root: {
          "--tagColor": theme.colors.neutral_20,
        },
        categorical: {
          "--tagColor": theme.alpha("cat1", 0.2),
        },
      },
    } satisfies CSSClasses<HvTagProps>,
    HvTagsInput: {
      classes: {
        disabled: {
          "& .HvTagsInput-tagsList": {
            backgroundColor: theme.colors.atmo1,
          },
        },
        readOnly: {
          "& .HvTagsInput-tagsList": {
            backgroundColor: theme.colors.atmo1,
            borderColor: "transparent",
            "&:hover": {
              borderColor: "transparent",
            },
          },
        },
        tagInputRoot: {
          "&::after": {
            display: "none",
          },
        },
        tagsList: {
          borderColor: theme.colors.atmo4,
          borderRadius: 0,
          "&:hover": {
            borderColor: theme.colors.secondary,
          },
        },
      },
    } satisfies CSSClasses<HvTagsInputProps>,
    HvTableCell: {
      classes: {
        root: {
          padding: `calc(${theme.space.xs} - 2px ) ${theme.space.xs} calc(${
            theme.space.xs
          } - 3px ) ${theme.spacing(4)}`,
        },
        head: {
          borderTop: `1px solid ${theme.colors.atmo4}`,
        },
        body: {
          "&.HvTableCell-sorted": {
            backgroundImage: `linear-gradient(to right, ${theme.alpha(
              "atmo1",
              0.4,
            )}, ${theme.alpha("atmo1", 0.4)})`,
          },
        },
        variantListactions: {
          borderLeft: `solid 2px ${theme.colors.atmo2}`,
        },
        variantListcheckbox: {
          borderRight: `solid 2px ${theme.colors.atmo2}`,
        },
      },
    } satisfies CSSClasses<HvTableCellProps>,
    HvTableHeader: {
      classes: {
        head: {
          "&.HvTableHeader-sortable": {
            "&:hover": {
              backgroundColor: theme.colors.atmo3,

              "& .HvTableHeader-sortIcon": {
                visibility: "visible",
              },
            },
            "&:focus-within": {
              backgroundColor: theme.colors.atmo3,

              "& .HvTableHeader-sortIcon": {
                visibility: "visible",
              },
            },
          },
          "*:first-of-type > &": {
            borderTop: `1px solid ${theme.colors.atmo4}`,
          },
        },
        sortButton: {
          ".HvTableHeader-root.HvTableHeader-sortable &": {
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
        },
      },
    } satisfies CSSClasses<HvTableHeaderProps>,
    HvTableRow: {
      classes: {
        root: {
          backgroundColor: "transparent",
        },
        selected: {
          backgroundColor: theme.colors.atmo1,
        },
        variantList: {
          borderRadius: 0,
          "& td": {
            borderTop: "1px solid transparent",
            borderBottom: "1px solid transparent",
          },
          "& td:first-of-type": {
            borderLeft: "1px solid transparent",
            borderRadius: 0,
          },
          "& td:last-of-type": {
            borderRight: "1px solid transparent",
            borderRadius: 0,
          },
          "&.HvTableRow-selected": {
            "& td": {
              borderTop: `1px solid ${theme.colors.secondary}`,
              borderBottom: `1px solid ${theme.colors.secondary}`,
            },
            "& td:first-of-type": {
              borderLeft: `1px solid ${theme.colors.secondary}`,
              borderRadius: 0,
            },
            "& td:last-of-type": {
              borderRight: `1px solid ${theme.colors.secondary}`,
              borderRadius: 0,
            },

            "&:hover": {
              "& td": {
                borderTop: `1px solid ${theme.colors.atmo4}`,
                borderBottom: `1px solid ${theme.colors.atmo4}`,
              },
              "& td:first-of-type": {
                borderLeft: `1px solid ${theme.colors.atmo4}`,
                borderRadius: 0,
              },
              "& td:last-of-type": {
                borderRight: `1px solid ${theme.colors.atmo4}`,
                borderRadius: 0,
              },
            },
          },

          "&:hover": {
            "& td": {
              borderTop: `1px solid ${theme.colors.atmo4}`,
              borderBottom: `1px solid ${theme.colors.atmo4}`,
            },
            "& td:first-of-type": {
              borderLeft: `1px solid ${theme.colors.atmo4}`,
              borderRadius: 0,
            },
            "& td:last-of-type": {
              borderRight: `1px solid ${theme.colors.atmo4}`,
              borderRadius: 0,
            },
          },
          "&.HvIsFocused": {
            borderRadius: 0,
          },
        },
      },
    } satisfies CSSClasses<HvTableRowProps>,
    HvMultiButton: {
      variant: "secondaryGhost",
      classes: {
        root: {
          "& button&.HvMultiButton-button&.HvMultiButton-selected": {
            height: 32,
          },
        },
      },
    } satisfies CSSClasses<HvMultiButtonProps>,
    HvTooltip: {
      classes: {
        popper: {
          "& .HvTooltip-tooltip": {
            borderRadius: 0,
          },
        },
      },
    } satisfies CSSClasses<HvTooltipProps>,
    HvVerticalNavigation: {
      classes: {
        root: {
          justifyContent: "space-between",
        },
      },
    } satisfies CSSClasses<HvVerticalNavigationProps>,
    HvVerticalNavigationActions: {
      classes: {
        root: {
          marginTop: "none",
        },
      },
    } satisfies CSSClasses<HvVerticalNavigationActionsProps>,
    HvVerticalNavigationSlider: {
      classes: {
        root: {
          borderLeft: `2px solid transparent`,
        },
        listItemSelected: {
          borderLeft: `2px solid ${theme.colors.brand}`,
        },
      },
    } satisfies CSSClasses<HvVerticalNavigationSliderProps>,
    HvVerticalNavigationTreeViewItem: {
      classes: {
        content: {
          borderLeft: `2px solid transparent`,
          ".HvVerticalNavigationTreeViewItem-selected>&": {
            borderLeft: `2px solid ${theme.colors.brand}`,
          },
        },
      },
    } satisfies CSSClasses<HvVerticalNavigationTreeViewItemProps>,
    HvWarningText: {
      classes: {
        warningText: {
          ...theme.typography.body,
          color: "inherit",
        },
        topGutter: { paddingTop: "8px" },
        defaultIcon: {
          fontSize: 16,
          margin: 8,
        },
      },
    } satisfies CSSClasses<HvWarningTextProps>,
    HvWizardContainer: {
      classes: {
        paper: {
          maxHeight: "calc(100% - (2 * 100px))",
        },
      },
    } satisfies CSSClasses<any>,
    HvStatusIcon: {
      type: "simple",
    } satisfies CSSClasses<HvStatusIconProps>,
  },
});
