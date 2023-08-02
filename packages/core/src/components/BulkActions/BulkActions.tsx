import { clsx } from "clsx";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import { theme } from "@hitachivantara/uikit-styles";

import { setId } from "@core/utils/setId";
import { useTheme } from "@core/hooks/useTheme";
import { HvBaseProps } from "@core/types/generic";
import { HvButton, HvButtonProps } from "@core/components/Button";
import { HvCheckBox, HvCheckBoxProps } from "@core/components/CheckBox";
import {
  HvActionGeneric,
  HvActionsGenericProps,
} from "@core/components/ActionsGeneric";
import { HvTypography } from "@core/components/Typography";

import {
  StyledGenericActions,
  StyledRoot,
  StyledSelectAllContainer,
  StyledDivider,
} from "./BulkActions.styles";
import bulkActionsClasses, { HvBulkActionsClasses } from "./bulkActionsClasses";

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
    classes,
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

  const { activeTheme, selectedMode } = useTheme();

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
    <StyledRoot
      id={id}
      className={clsx(
        className,
        classes?.root,
        bulkActionsClasses.root,
        isSemantic && clsx(classes?.semantic, bulkActionsClasses.semantic)
      )}
      $isSemantic={isSemantic}
      $baseColor={
        activeTheme?.colors?.modes[selectedMode].base_light ||
        theme.colors.base_light
      }
      {...others}
    >
      <StyledSelectAllContainer
        className={clsx(
          classes?.selectAllContainer,
          bulkActionsClasses.selectAllContainer
        )}
      >
        <HvCheckBox
          id={setId(id, "select")}
          className={clsx(classes?.selectAll, bulkActionsClasses.selectAll)}
          checked={numSelected > 0}
          semantic={isSemantic}
          onChange={onSelectAll}
          indeterminate={numSelected > 0 && numSelected < numTotal}
          label={selectAllLabelComponent}
          {...checkboxProps}
        />
        {showSelectAllPages && anySelected && numSelected < numTotal && (
          <>
            <StyledDivider />
            <HvButton
              id={setId(id, "pages")}
              className={clsx(
                classes?.selectAllPages,
                bulkActionsClasses.selectAllPages
              )}
              variant={isSemantic ? "semantic" : "secondaryGhost"}
              onClick={onSelectAllPages}
            >
              {selectAllPagesLabel ??
                `Select all ${numTotal} items across all pages`}
            </HvButton>
          </>
        )}
      </StyledSelectAllContainer>
      <StyledGenericActions
        id={setId(id, "actions")}
        classes={{ root: clsx(classes?.actions, bulkActionsClasses.actions) }}
        category={isSemantic ? "semantic" : "secondaryGhost"}
        actions={actions}
        disabled={actionsDisabled ?? numSelected === 0}
        actionsCallback={actionsCallback}
        maxVisibleActions={maxVisibleActions}
      />
    </StyledRoot>
  );
};
