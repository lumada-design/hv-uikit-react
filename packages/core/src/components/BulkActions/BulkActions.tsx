import { HvCheckBox, HvCheckBoxProps } from "../CheckBox";
import { HvBaseProps } from "../../types";
import { HvAction, HvActionsGenericProps } from "../ActionsGeneric";
import bulkActionsClasses, { HvBulkActionsClasses } from "./bulkActionsClasses";
import { HvButton, HvButtonProps } from "../Button";
import { useContext, useEffect, useState } from "react";
import { HvTypography } from "components";
import {
  StyledGenericActions,
  StyledRoot,
  StyledSelectAllContainer,
  StyledDivider,
} from "./BulkActions.styles";
import clsx from "clsx";
import { setId } from "utils";
import { ThemeContext } from "providers";
import { theme } from "@hitachivantara/uikit-styles";

export type HvBulkActionsProps = HvBaseProps & {
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
  actions?: React.ReactNode | HvAction[];
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
};

/**
 * Bulk Actions allow users to perform an action on a single or multiple items.
 * Also known as "batch production" of multiple items at once, one stage at a time.
 */
export const HvBulkActions = ({
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
}: HvBulkActionsProps) => {
  const { activeTheme, selectedMode } = useContext(ThemeContext);

  const [anySelected, setAnySelected] = useState<boolean>(false);

  const isSemantic = semantic && anySelected;

  useEffect(() => {
    setAnySelected(numSelected > 0);
  }, [numSelected]);

  const selectAllLabelComponent = (
    <HvTypography as="span" disabled={checkboxProps?.disabled} variant="body">
      {!anySelected ? (
        <>
          <b>{selectAllLabel}</b>
          {` (${numTotal})`}
        </>
      ) : (
        <>
          <b>{numSelected}</b>
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
        activeTheme?.colors?.modes[selectedMode].base1 || theme.colors.base1
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
              size={activeTheme?.bulkActions?.buttonSize || "md"}
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
