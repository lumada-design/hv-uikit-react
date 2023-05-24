import {
  HvActionBar,
  HvBaseDropdown,
  HvBaseDropdownProps,
  HvButton,
  HvButtonVariant,
  HvFormStatus,
  HvTypography,
} from "@core/components";
import { setId } from "@core/utils";
import { useContext, useMemo, useRef, useState } from "react";
import { Filters } from "@hitachivantara/uikit-react-icons";
import { ClassNames } from "@emotion/react";
import { useTheme } from "@core/hooks";
import {
  HvFilterGroupLabels,
  HvFilterGroupValue,
  HvFilterGroupHorizontalPlacement,
} from "../FilterGroup";
import { styles } from "./FilterContent.styles";
import filterGroupContentClasses, {
  HvFilterGroupContentClasses,
} from "./filterContentClasses";
import { HvFilterGroupContext } from "../FilterGroupContext";
import { HvFilterGroupCounter } from "../Counter";
import { HvFilterGroupLeftPanel } from "../LeftPanel";
import { HvFilterGroupRightPanel } from "../RightPanel";

export interface HvFilterGroupContentProps
  extends Omit<HvBaseDropdownProps, "onChange"> {
  description?: React.ReactNode;
  status?: HvFormStatus;
  onChange?: (
    event: React.MouseEvent<HTMLButtonElement>,
    value?: HvFilterGroupValue
  ) => void;
  onCancel?: (event: React.MouseEvent<HTMLButtonElement> | Event) => void;
  onClear?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  labels?: HvFilterGroupLabels;
  horizontalPlacement?: HvFilterGroupHorizontalPlacement;
  disablePortal?: boolean;
  escapeWithReference?: boolean;
  height?: string | number;
  leftEmptyElement?: React.ReactNode;
  rightEmptyElement?: React.ReactNode;
  disabled?: boolean;
  classes?: HvFilterGroupContentClasses;
}

export const HvFilterGroupContent = ({
  id,
  status,
  disabled = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  description,
  "aria-describedby": ariaDescribedBy,
  onChange,
  onCancel,
  onClear,
  labels,
  horizontalPlacement = "right",
  disablePortal = true,
  escapeWithReference = true,
  height,
  leftEmptyElement,
  rightEmptyElement,
  classes,
  ...others
}: HvFilterGroupContentProps) => {
  const { activeTheme } = useTheme();

  const [filterGroupOpen, setFilterGroupOpen] = useState<boolean>(false);

  const {
    defaultValue,
    filterValues,
    rollbackFilters,
    clearFilters,
    applyFilters,
    applyDisabled,
  } = useContext(HvFilterGroupContext);

  const focusTarget = useRef<HTMLDivElement>(null);

  const focusOnContainer = () => {
    focusTarget.current?.focus();
  };

  const onApplyHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    applyFilters();
    onChange?.(event, filterValues);
    setFilterGroupOpen(false);
  };

  const onCancelHandler = (
    event: React.MouseEvent<HTMLButtonElement> | Event
  ) => {
    rollbackFilters();
    onCancel?.(event);
    setFilterGroupOpen(false);
  };

  const onClearHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    clearFilters();
    onClear?.(event);
  };

  const handleToggle = (event: Event, open: boolean) => {
    /* 
     If evt is null this toggle wasn't triggered by the user.
     instead it was triggered by the baseDropdown useEffect after
     the datepicker changed the expanded value this baseDropdown behavior needs a review
    */
    if (event === null) return;
    setFilterGroupOpen(open);
    if (!open) onCancelHandler?.(event);
  };

  const Header = useMemo(
    () => (
      <>
        <Filters />
        <HvTypography variant="label">{labels?.placeholder}</HvTypography>
      </>
    ),
    [labels?.placeholder]
  );

  return (
    <ClassNames>
      {({ css, cx }) => (
        <HvBaseDropdown
          id={setId(id, "dropdown")}
          role="combobox"
          classes={{
            root: cx(filterGroupContentClasses.dropdown, classes?.dropdown),
            panel: cx(
              filterGroupContentClasses.panel,
              css(styles.panel),
              classes?.panel
            ),
            selection: cx(
              filterGroupContentClasses.baseDropdownSelection,
              css(styles.baseDropdownSelection),
              classes?.baseDropdownSelection
            ),
            header: cx(
              filterGroupContentClasses.header,
              css(styles.header),
              classes?.header
            ),
          }}
          disabled={disabled}
          disablePortal={disablePortal}
          variableWidth
          placement={horizontalPlacement}
          expanded={filterGroupOpen}
          onToggle={handleToggle}
          onClickOutside={onCancelHandler}
          onContainerCreation={focusOnContainer}
          placeholder={Header}
          adornment={<HvFilterGroupCounter />}
          popperProps={{
            modifiers: [
              { name: "preventOverflow", enabled: escapeWithReference },
            ],
          }}
          aria-haspopup="dialog"
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-invalid={status === "invalid" ? true : undefined}
          aria-errormessage={
            status === "invalid" ? setId(id, "error") : undefined
          }
          aria-describedby={
            [description && setId(id, "description"), ariaDescribedBy]
              .join(" ")
              .trim() || undefined
          }
          {...others}
        >
          <div ref={focusTarget} tabIndex={-1} />
          <div
            className={cx(
              filterGroupContentClasses.root,
              css(styles.root),
              classes?.root
            )}
            style={{ height }}
          >
            <HvFilterGroupLeftPanel
              id={id}
              className={cx(
                filterGroupContentClasses.leftSidePanel,
                css(styles.leftSidePanel),
                classes?.leftSidePanel
              )}
              emptyElement={leftEmptyElement}
            />
            <HvFilterGroupRightPanel
              id={id}
              className={cx(
                filterGroupContentClasses.rightSidePanel,
                css(styles.rightSidePanel),
                classes?.rightSidePanel
              )}
              emptyElement={rightEmptyElement}
              labels={labels}
            />
          </div>
          <HvActionBar
            className={cx(
              filterGroupContentClasses.actionBar,
              css(styles.actionBar),
              classes?.actionBar
            )}
          >
            <HvButton
              id={setId(id, "clearFilters-button")}
              disabled={
                defaultValue
                  ? defaultValue?.flat().length === filterValues?.flat().length
                  : filterValues?.flat().length === 0
              }
              variant="secondaryGhost"
              onClick={onClearHandler}
            >
              {labels?.clearLabel}
            </HvButton>
            <div
              aria-hidden="true"
              className={cx(
                filterGroupContentClasses.space,
                css(styles.space),
                classes?.space
              )}
            >
              &nbsp;
            </div>
            <HvButton
              id={setId(id, "apply-button")}
              disabled={applyDisabled}
              variant={
                activeTheme?.filterGroup.applyButtonVariant as HvButtonVariant
              }
              onClick={onApplyHandler}
              className={cx(
                filterGroupContentClasses.applyButton,
                css(styles.applyButton),
                classes?.applyButton
              )}
            >
              {labels?.applyLabel}
            </HvButton>
            <HvButton
              id={setId(id, "cancel-button")}
              variant={
                activeTheme?.filterGroup.cancelButtonVariant as HvButtonVariant
              }
              onClick={onCancelHandler}
            >
              {labels?.cancelLabel}
            </HvButton>
          </HvActionBar>
        </HvBaseDropdown>
      )}
    </ClassNames>
  );
};
