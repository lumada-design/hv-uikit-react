import React, { isValidElement, useEffect, useCallback, forwardRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { FixedSizeList } from "react-window";

import { withStyles } from "@material-ui/core";
import { DropRightXS } from "@hitachivantara/uikit-react-icons";

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
    height,
    virtualized = false,
    ...others
  } = props;
  const [list, setList, selection] = useSelectableList(valuesProp);
  const listRef = React.useRef(null);

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
    isValidElement(item.icon)
      ? item.icon
      : item.icon?.({
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

  const renderListItem = (item, i, otherProps = {}) => {
    const itemId = setId(id, "item", i);
    const selected = item.selected || false;

    let startAdornment = null;
    if (!useSelector && item.icon) {
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
        {...otherProps}
      >
        {multiSelect ? renderMultiSelectItem(item, itemId) : renderSingleSelectItem(item, itemId)}
      </HvListItem>
    );
  };

  const filteredList = list.filter((it) => !it.isHidden);
  const anySelected = list
    .map((item) => item.selected && !item.disabled)
    .reduce((result, selected) => result || selected, false);

  const selectedItemIndex = list.findIndex((item) => item.selected);
  useEffect(() => {
    if (selectedItemIndex >= 0 && listRef.current !== null) {
      listRef.current.scrollToItem(selectedItemIndex);
    }
  }, [listRef, selectedItemIndex]);

  const ListItem = ({ index, style }) => {
    const item = filteredList[index];
    const tabIndex =
      item.tabIndex || (!anySelected && index === 0) || (item.selected && !item.disabled) ? 0 : -1;

    return renderListItem(item, index, {
      style: {
        ...style,
        top: `${parseFloat(style.top) + 5}px`,
        left: `${parseFloat(style.left) + 5}px`,
        width: `calc(${parseFloat(style.width)}% - 10px)`,
      },
      tabIndex,
      interactive: true,
      condensed,
      disableGutters: useSelector,
    });
  };

  ListItem.propTypes = {
    style: PropTypes.shape({
      top: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }).isRequired,
  };

  const renderFixedList = useCallback(() => {
    return forwardRef(({ ...rest }, ref) => (
      <HvListContainer
        id={id}
        className={clsx(className, classes.root)}
        role={selectable ? "listbox" : "menu"}
        interactive
        condensed={condensed}
        disableGutters={useSelector}
        aria-multiselectable={(selectable && multiSelect) || undefined}
        ref={ref}
        {...rest}
      />
    ));
  }, [id, useSelector, className, classes, condensed, selectable, multiSelect]);

  return (
    <>
      {multiSelect && useSelector && showSelectAll && renderSelectAll()}

      {filteredList.length > 0 && !virtualized && (
        <HvListContainer
          id={id}
          className={clsx(className, classes.root)}
          role={selectable ? "listbox" : "menu"}
          interactive
          condensed={condensed}
          disableGutters={useSelector}
          aria-multiselectable={(selectable && multiSelect) || undefined}
          {...others}
        >
          {filteredList.map((item, i) => renderListItem(item, i))}
        </HvListContainer>
      )}
      {filteredList.length > 0 && virtualized && (
        <FixedSizeList
          ref={listRef}
          className={classes.virtualizedRoot}
          height={height + 5}
          width="100%"
          itemCount={filteredList.length}
          itemSize={condensed ? 32 : 40}
          innerElementType={renderFixedList}
          {...others}
        >
          {ListItem}
        </FixedSizeList>
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
     * Styles applied to the component root class in virtualized form.
     */
    virtualizedRoot: PropTypes.string,
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
   * - icon: The icon.
   * - showNavIcon: If true renders the navigation icon on the right.
   * - path: The path to navigate to.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.node.isRequired,
      selected: PropTypes.bool,
      disabled: PropTypes.bool,
      isHidden: PropTypes.bool,
      icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
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
  /**
   * Experimental. Height of the dropdown, in case you want to control it from a prop. Styles can also be used through dropdownListContainer class. Required in case virtualized is used
   */
  height: PropTypes.number,
  /**
   * Experimental. Uses dropdown in a virtualized form, where not all options are rendered initially. Good for use cases with a lot of options.
   */
  virtualized: PropTypes.bool,
};

export default withStyles(styles, { name: "HvList" })(HvList);
