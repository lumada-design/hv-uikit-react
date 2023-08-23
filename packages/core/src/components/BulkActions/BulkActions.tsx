import { theme } from "@hitachivantara/uikit-styles";

import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { setId } from "@core/utils/setId";
import { useTheme } from "@core/hooks/useTheme";
import { HvBaseProps } from "@core/types/generic";
import {
  HvButton,
  HvButtonProps,
  HvButtonVariant,
} from "@core/components/Button";
import { HvCheckBox, HvCheckBoxProps } from "@core/components/CheckBox";
import {
  HvActionGeneric,
  HvActionsGeneric,
  HvActionsGenericProps,
} from "@core/components/ActionsGeneric";
import { HvTypography } from "@core/components/Typography";
import { ExtractNames } from "@core/utils/classes";
import { hexToRgbA } from "@core/utils/hexToRgbA";

import { staticClasses, useClasses } from "./BulkActions.styles";

export { staticClasses as bulkActionsClasses };

export type HvBulkActionsClasses = ExtractNames<typeof useClasses>;

export interface HvBulkActionsProps extends HvBaseProps {
  /**
   * Custom label for select all checkbox
   */
  selectAllLabel?: React.ReactNode;
  /**
   * Custom label for select all checkbox conjunction
   */
  selectAllConjunctionLabel?: string;
  /**
   * Custom label for select all pages button
   */
  selectAllPagesLabel?: React.ReactNode;
  /**
   * Whether select all pages element should be visible
   */
  showSelectAllPages?: boolean;
  /**
   * The total number of elements
   */
  numTotal?: number;
  /**
   * The number of elements currently selected
   */
  numSelected?: number;
  /**
   * Function called when the "select all" Checkbox is toggled.
   */
  onSelectAll?: HvCheckBoxProps["onChange"];
  /**
   * Function called when the "select all pages" button is clicked toggled.
   */
  onSelectAllPages?: HvButtonProps["onClick"];
  /**
   * Whether the bulk actions should use the semantic styles when there are selected elements.
   */
  semantic?: boolean;
  /**
   * The renderable content inside the right actions slot,
   * or an Array of actions `{ id, label, icon, disabled, ... }`
   */
  actions?: React.ReactNode | HvActionGeneric[];
  /**
   *  Whether actions should be all disabled
   */
  actionsDisabled?: boolean;
  /**
   *  The callback function ran when an action is triggered, receiving `action` as param
   */
  actionsCallback?: HvActionsGenericProps["actionsCallback"];
  /**
   *  The number of maximum visible actions before they're collapsed into a `DropDownMenu`.
   */
  maxVisibleActions?: number;
  /**
   * Properties to be passed onto the checkbox component, the values of the object are equivalent to the
   * HvCheckbox API.
   */
  checkboxProps?: HvCheckBoxProps;
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes?: HvBulkActionsClasses;
}

/**
 * Bulk Actions allow users to perform an action on a single or multiple items.
 * Also known as "batch production" of multiple items at once, one stage at a time.
 */
export const HvBulkActions = (props: HvBulkActionsProps) => {
  const {
    id,
    className,
    classes: classesProp,
    selectAllPagesLabel,
    actionsDisabled,
    maxVisibleActions,
    checkboxProps,
    actions,
    numTotal = 0,
    numSelected = 0,
    selectAllLabel = "All",
    selectAllConjunctionLabel = "/",
    showSelectAllPages = false,
    semantic = true,
    actionsCallback,
    onSelectAll,
    onSelectAllPages,
    ...others
  } = useDefaultProps("HvBulkActions", props);

  const { classes, cx, css } = useClasses(classesProp);

  const { activeTheme, selectedMode } = useTheme();

  const baseColor =
    activeTheme?.colors?.modes[selectedMode].base_light ||
    theme.colors.base_light;
  const anySelected = numSelected > 0;
  const isSemantic = semantic && anySelected;

  const selectAllLabelComponent = (
    <HvTypography
      component="span"
      disabled={checkboxProps?.disabled}
      variant="body"
    >
      {!anySelected ? (
        <>
          <HvTypography variant="label">{selectAllLabel}</HvTypography>
          {` (${numTotal})`}
        </>
      ) : (
        <>
          <HvTypography variant="label">{numSelected}</HvTypography>
          {` ${selectAllConjunctionLabel} ${numTotal}`}
        </>
      )}
    </HvTypography>
  );

  return (
    <div
      id={id}
      className={cx(
        classes.root,
        { [classes.semantic]: isSemantic },
        isSemantic &&
          css({
            [`& .${staticClasses.selectAll} div`]: {
              color: theme.bulkActions.semanticColor,

              "&:hover:not(:disabled)": {
                backgroundColor: hexToRgbA(baseColor, 0.3),
              },

              "& *": {
                color: theme.bulkActions.semanticColor,
                backgroundColor: "transparent",
              },
            },

            [`& .${staticClasses.selectAll}:focus-within div`]: {
              backgroundColor: hexToRgbA(baseColor, 0.3),
            },
          }),
        className
      )}
      {...others}
    >
      <div className={classes.selectAllContainer}>
        <HvCheckBox
          id={setId(id, "select")}
          className={classes.selectAll}
          checked={numSelected > 0}
          semantic={isSemantic}
          onChange={onSelectAll}
          indeterminate={numSelected > 0 && numSelected < numTotal}
          label={selectAllLabelComponent}
          {...checkboxProps}
        />
        {showSelectAllPages && anySelected && numSelected < numTotal && (
          <>
            <div className={classes.divider} />
            <HvButton
              id={setId(id, "pages")}
              className={classes.selectAllPages}
              variant={
                isSemantic
                  ? (activeTheme?.bulkActions
                      .actionButtonVariant as HvButtonVariant)
                  : "secondaryGhost"
              }
              onClick={onSelectAllPages}
            >
              {selectAllPagesLabel ?? `Select all ${numTotal} items`}
            </HvButton>
          </>
        )}
      </div>
      <HvActionsGeneric
        id={setId(id, "actions")}
        classes={{ root: classes.actions }}
        category={
          isSemantic
            ? (activeTheme?.bulkActions.actionButtonVariant as HvButtonVariant)
            : "secondaryGhost"
        }
        actions={actions}
        disabled={actionsDisabled ?? numSelected === 0}
        actionsCallback={actionsCallback}
        maxVisibleActions={maxVisibleActions}
      />
    </div>
  );
};
