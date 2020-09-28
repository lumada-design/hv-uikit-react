import React, { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core";
import { DropRightXS } from "@hv/uikit-react-icons";

import { parseList, wrapperTooltip } from "./utils";
import useSelectableList from "./useSelectableList";

import { HvLink, HvCheckBox, HvListContainer, HvListItem, HvRadio, HvTypography, setId } from "..";

import styles from "./styles";

const DEFAULT_LABELS = {
  selectAll: "Select All",
  selectionConjunction: "/",
};

/**
 * Component used to show a set of related data to the user.
 */
const HvList = (props) => {
  const {
    id,
    classes,
    className,
    multiSelect = false,
    hasTooltips = false,
    showSelectAll = false,
    labels = DEFAULT_LABELS,
    useSelector = false,
    selectable = true,
    singleSelectionToggle = true,
    condensed = false,
    onChange,
    onClick,
    values: valuesProp = [],
    ...others
  } = props;
  const [list, setList, selection] = useSelectableList(valuesProp);

  useEffect(() => {
    const passedProps = { multiSelect, selectable, singleSelectionToggle };
    const parsedList = parseList(valuesProp, null, passedProps);
    setList(parsedList);
  }, [valuesProp, multiSelect, selectable, singleSelectionToggle, setList]);

  const handleSelect = (evt, item) => {
    if (!item.path) evt.preventDefault();
    if (item.disabled) return;

    const passedProps = { multiSelect, selectable, singleSelectionToggle };
    const parsedList = parseList(list, item, passedProps);
    setList(parsedList);

    onClick?.(evt, item);
    onChange?.(parsedList);
  };

  const handleSelectAll = () => {
    const passedProps = { multiSelect, selectable, singleSelectionToggle };
    const anySelectableSelected = list.some((elem) => elem.selected || elem.disabled);
    const parsedList = parseList(list, null, passedProps, !anySelectableSelected);
    setList(parsedList);

    onChange?.(parsedList);
  };

  const renderLeftIcon = (item) =>
    item.iconCallback?.({
      isSelected: item.selected,
      isDisabled: item.disabled,
    });

  const renderSelectAll = () => {
    const { selectAll, selectionConjunction } = labels;

    const anySelected = !!selection?.length;
    const allSelected = selection.length === list.length;

    const selectionLabel = (
      <HvTypography component="span">
        {!anySelected ? (
          <>
            <b>{selectAll}</b>
            {` (${list.length})`}
          </>
        ) : (
          <>
            <b>{selection.length}</b>
            {`\xa0${selectionConjunction}\xa0`}
            {list.length}
          </>
        )}
      </HvTypography>
    );

    return (
      <HvCheckBox
        id={setId(id, "select-all")}
        label={selectionLabel}
        onChange={handleSelectAll}
        className={classes.selectAllSelector}
        indeterminate={anySelected && !allSelected}
        checked={allSelected}
      />
    );
  };

  const renderItemText = (item) => {
    const ItemText = wrapperTooltip(hasTooltips, item.label, item.label);

    return !multiSelect && item.path ? (
      <HvLink key={item.label} route={item.path} classes={{ a: classes.link }}>
        <ItemText />
      </HvLink>
    ) : (
      <ItemText />
    );
  };

  const renderMultiSelectItem = (item, itemId) => {
    if (useSelector) {
      const Selection = wrapperTooltip(
        hasTooltips,
        <HvCheckBox
          id={setId(itemId, "selector")}
          label={item.label}
          checked={item.selected}
          disabled={item.disabled}
          onChange={(evt) => handleSelect(evt, item)}
          classes={{
            root: classes.selectorRoot,
            container: classes.selectorContainer,
            label: classes.truncate,
          }}
        />,
        item.label
      );
      return <Selection />;
    }

    return renderItemText(item);
  };

  const renderSingleSelectItem = (item, itemId) => {
    if (useSelector) {
      const Selection = wrapperTooltip(
        hasTooltips,
        <HvRadio
          id={setId(itemId, "selector")}
          label={item.label}
          checked={item.selected}
          disabled={item.disabled}
          classes={{
            container: classes.selectorContainer,
            labelTypography: classes.truncate,
            icon: classes.icon,
          }}
        />,
        item.label
      );
      return <Selection />;
    }
    return renderItemText(item);
  };

  const renderListItem = (item, i) => {
    const itemId = setId(id, "item", i);
    const selected = item.selected || false;

    let startAdornment = null;
    if (!useSelector && item.iconCallback) {
      startAdornment = renderLeftIcon(item);
    }

    return (
      <HvListItem
        key={i}
        id={itemId}
        role={selectable ? "option" : "menuitem"}
        disabled={item.disabled || undefined}
        className={classes.item}
        classes={{ selected: useSelector || multiSelect ? classes.itemSelector : "" }}
        selected={multiSelect || selected ? selected : undefined}
        onClick={(evt) => handleSelect(evt, item)}
        startAdornment={startAdornment}
        endAdornment={item.showNavIcon && <DropRightXS className={classes.box} iconSize="XS" />}
      >
        {multiSelect ? renderMultiSelectItem(item, itemId) : renderSingleSelectItem(item, itemId)}
      </HvListItem>
    );
  };

  return (
    <>
      {multiSelect && useSelector && showSelectAll && renderSelectAll()}

      {list && (
        <HvListContainer
          id={id}
          className={clsx(className, classes.root)}
          role={selectable ? "listbox" : "menu"}
          interactive
          condensed={condensed}
          selectable={selectable}
          multiSelect={multiSelect}
          disableGutters={useSelector}
          {...others}
        >
          {list.filter((it) => !it.isHidden).map((item, i) => renderListItem(item, i))}
        </HvListContainer>
      )}
    </>
  );
};

HvList.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the list item selector.
     */
    selectorRoot: PropTypes.string,
    /**
     * Styles applied to the list item selector label container.
     */
    selectorContainer: PropTypes.string,
    /**
     * Style applied to the icon box.
     */
    box: PropTypes.string,
    /**
     * Styles applied when the list item text when truncate.
     */
    truncate: PropTypes.string,
    /**
     * Styles applied to the icon of the selector.
     */
    icon: PropTypes.string,
    /**
     * Styles applied to the list item.
     */
    item: PropTypes.string,
    /**
     * Styles applied to the list item when it has a selector.
     */
    itemSelector: PropTypes.string,
    /**
     * Styles applied to the list item when it has a link path.
     */
    link: PropTypes.string,
    /**
     * Styles applied to the select all selector.
     */
    selectAllSelector: PropTypes.string,
  }).isRequired,
  /**
   * The id of the root element
   */
  id: PropTypes.string,
  /**
   * A list containing the elements to be rendered.
   *
   * - id: The id of the item.
   * - label: The label of the element to be rendered.
   * - selected: The selection state of the element.
   * - disabled: The disabled state of the element.
   * - isHidden: Is item visible.
   * - iconCallback: The icon.
   * - showNavIcon: If true renders the navigation icon on the right.
   * - path: The path to navigate to.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.node.isRequired,
      selected: PropTypes.bool,
      disabled: PropTypes.bool,
      isHidden: PropTypes.bool,
      iconCallback: PropTypes.func,
      showNavIcon: PropTypes.bool,
      path: PropTypes.string,
      params: PropTypes.instanceOf(Object),
    })
  ).isRequired,
  /**
   * If true renders a multi select list.
   */
  multiSelect: PropTypes.bool,
  /**
   * If true renders select all option for multi selection lists with selectors.
   * note: It will only be rendered if multiSelect and useSelector props are set to true.
   */
  showSelectAll: PropTypes.bool,
  /**
   * An object containing all the labels for the dropdown.
   */
  labels: PropTypes.shape({
    /**
     * The label used for the All checkbox action.
     */
    selectAll: PropTypes.string,
    /**
     * The label used in the middle of the multiselection count.
     */
    selectionConjunction: PropTypes.string,
  }),
  /**
   * If true renders list items with radio or checkbox selectors.
   */
  useSelector: PropTypes.bool,
  /**
   * Call back fired when list item is selected. Returns selection state.
   */
  onChange: PropTypes.func,
  /**
   * Call back fired when list item is selected. Returns selected item.
   */
  onClick: PropTypes.func,
  /**
   * If `true` the list items will show the selection state.
   */
  selectable: PropTypes.bool,
  /**
   * If `true`, selection can be toggled when single selection.
   */
  singleSelectionToggle: PropTypes.bool,
  /**
   * If `true` the list will be rendered without vertical spacing.
   */
  condensed: PropTypes.bool,
  /**
   * If `true` the dropdown will show tooltips when user mouseenter text in list
   */
  hasTooltips: PropTypes.bool,
};

export default withStyles(styles, { name: "HvList" })(HvList);
