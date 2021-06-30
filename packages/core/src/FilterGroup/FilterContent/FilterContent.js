import React, { useMemo, useState, useRef, useContext } from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";
import { Filters } from "@hv/uikit-react-icons";
import { FilterGroupContext } from "../FilterGroupContext";
import LeftPanel from "../LeftPanel";
import RightPanel from "../RightPanel";
import Counter from "../Counter";

import useStyles from "./styles";

import { setId, HvBaseDropdown, HvTypography, HvButton, HvActionBar } from "../..";

const FilterContent = ({
  id,

  status,
  value,

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

  ...others
}) => {
  const classes = useStyles();
  const [filterGroupOpen, setFilterGroupOpen] = useState(false);

  const { filterValues, setFilterValues, rollbackFilterValues } = useContext(FilterGroupContext);

  const focusTarget = useRef();

  const focusOnContainer = () => {
    focusTarget.current?.focus();
  };

  const onApplyHandler = (evt) => {
    onChange?.(evt, filterValues);
    setFilterGroupOpen(false);
  };

  const onCancelHandler = (evt) => {
    rollbackFilterValues();
    onCancel?.(evt);
    setFilterGroupOpen(false);
  };

  const onClearHandler = (evt) => {
    setFilterValues([]);
    onClear?.(evt);
  };

  const handleToggle = (evt, open) => {
    /* 
     If evt is null this toggle wasn't triggered by the user.
     instead it was triggered by the baseDropdown useEffect after
     the datepicker changed the expanded value this baseDropdown behavior needs a review
    */
    if (evt === null) return;
    setFilterGroupOpen(open);
    if (!open) onCancelHandler?.(evt);
  };

  const Header = useMemo(
    () => (
      <>
        <Filters />
        <HvTypography variant="highlightText">{labels.placeholder}</HvTypography>
      </>
    ),
    [labels.placeholder]
  );

  return (
    <HvBaseDropdown
      id={setId(id, "dropdown")}
      role="combobox"
      classes={{
        root: classes.dropdown,
        panel: classes.panel,
        selection: classes.baseDropdownSelection,
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
      adornment={<Counter value={value} />}
      popperProps={{ modifiers: [{ name: "preventOverflow", enabled: escapeWithReference }] }}
      aria-haspopup="dialog"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-invalid={status === "invalid" ? true : undefined}
      aria-errormessage={status === "invalid" ? setId(id, "error") : undefined}
      aria-describedby={
        [description && setId(id, "description"), ariaDescribedBy].join(" ").trim() || undefined
      }
      {...others}
    >
      <div ref={focusTarget} tabIndex={-1} />
      <div className={classes.root} style={{ height }}>
        <LeftPanel id={id} className={classes.leftSidePanel} />
        <RightPanel id={id} className={classes.rightSidePanel} labels={labels} />
      </div>
      <HvActionBar className={classes.actionBar}>
        <HvButton
          id={setId(id, "clearFilters-button")}
          disabled={filterValues.length === 0}
          category="ghost"
          onClick={onClearHandler}
        >
          {labels.clearLabel}
        </HvButton>
        <div aria-hidden="true" className={classes.space}>
          &nbsp;
        </div>
        <HvButton
          id={setId(id, "apply-button")}
          disabled={isEqual(value?.sort(), filterValues?.sort())}
          category="ghost"
          onClick={onApplyHandler}
        >
          {labels.applyLabel}
        </HvButton>
        <HvButton id={setId(id, "cancel-button")} category="ghost" onClick={onCancelHandler}>
          {labels.cancelLabel}
        </HvButton>
      </HvActionBar>
    </HvBaseDropdown>
  );
};

FilterContent.propTypes = {
  id: PropTypes.string,

  "aria-label": PropTypes.string,
  "aria-labelledby": PropTypes.string,
  description: PropTypes.node,
  "aria-describedby": PropTypes.string,
  disabled: PropTypes.bool,
  status: PropTypes.oneOf(["standBy", "valid", "invalid"]),

  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  onClear: PropTypes.func,

  labels: PropTypes.shape({
    applyLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    clearLabel: PropTypes.string,
    placeholder: PropTypes.string,
    searchBoxPlaceholder: PropTypes.string,
    selectAll: PropTypes.string,
    multiSelectionConjunction: PropTypes.string,
  }),

  value: PropTypes.arrayOf(PropTypes.string),

  horizontalPlacement: PropTypes.oneOf(["left", "right"]),
  disablePortal: PropTypes.bool,
  escapeWithReference: PropTypes.bool,
  height: PropTypes.any,
};

export default FilterContent;
