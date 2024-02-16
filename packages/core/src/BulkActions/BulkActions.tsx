import { useDefaultProps } from "../hooks/useDefaultProps";
import { setId } from "../utils/setId";
import { useTheme } from "../hooks/useTheme";
import { HvBaseProps } from "../types/generic";
import { HvButton, HvButtonProps, HvButtonVariant } from "../Button";
import { HvCheckBox, HvCheckBoxProps } from "../CheckBox";
import { HvActionsGeneric, HvActionsGenericProps } from "../ActionsGeneric";
import { HvTypography } from "../Typography";
import { ExtractNames } from "../utils/classes";
import { staticClasses, useClasses } from "./BulkActions.styles";

export { staticClasses as bulkActionsClasses };

export type HvBulkActionsClasses = ExtractNames<typeof useClasses>;

export interface HvBulkActionsProps extends HvBaseProps {
  /** Custom label for select all checkbox */
  selectAllLabel?: React.ReactNode;
  /** Custom label for select all checkbox conjunction */
  selectAllConjunctionLabel?: string;
  /** Custom label for select all pages button */
  selectAllPagesLabel?: React.ReactNode;
  /** Whether select all pages element should be visible */
  showSelectAllPages?: boolean;
  /** The total number of elements */
  numTotal?: number;
  /** The number of elements currently selected */
  numSelected?: number;
  /** Function called when the "select all" Checkbox is toggled. */
  onSelectAll?: HvCheckBoxProps["onChange"];
  /** Function called when the "select all pages" button is clicked toggled. */
  onSelectAllPages?: HvButtonProps["onClick"];
  /** Whether the bulk actions should use the semantic styles when there are selected elements. */
  semantic?: boolean;
  /** The renderable content inside the right actions slot, or an array of actions `{ id, label, icon, disabled, ... }` */
  actions?: HvActionsGenericProps["actions"];
  /** Whether actions should be all disabled */
  actionsDisabled?: boolean;
  /**
   * The callback function called when an action is triggered, receiving `action` as parameter.
   *
   * @deprecated Use `onAction` instead.
   * */
  actionsCallback?: HvActionsGenericProps["actionsCallback"];
  /** The callback function called when an action is triggered, receiving `action` as parameter. */
  onAction?: HvActionsGenericProps["onAction"];
  /** The number of maximum visible actions before they're collapsed into a `DropDownMenu`. */
  maxVisibleActions?: number;
  /** Properties to be passed onto the checkbox component, the values of the object are equivalent to the HvCheckbox API. */
  checkboxProps?: HvCheckBoxProps;
  /** A Jss Object used to override or extend the styles applied. */
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
    actionsCallback, // TODO - remove in v6
    onAction,
    onSelectAll,
    onSelectAllPages,
    ...others
  } = useDefaultProps("HvBulkActions", props);

  const { classes, cx } = useClasses(classesProp);

  const { activeTheme } = useTheme();

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
        variant={
          isSemantic
            ? (activeTheme?.bulkActions.actionButtonVariant as HvButtonVariant)
            : "secondaryGhost"
        }
        actions={actions}
        disabled={actionsDisabled ?? numSelected === 0}
        actionsCallback={actionsCallback}
        onAction={onAction}
        maxVisibleActions={maxVisibleActions}
      />
    </div>
  );
};
