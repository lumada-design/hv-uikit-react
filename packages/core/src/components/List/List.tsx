import { forwardRef, isValidElement, useEffect, useMemo, useRef } from "react";
import { clsx } from "clsx";
import { HvBaseProps, HvExtraProps } from "@core/types";
import {
  StyledFixedSizeList,
  StyledSelectAllCheckBox,
  StyledLink,
  StyledMultiSelectCheckBox,
  StyledSingleSelectRadio,
  StyledListItem,
  StyledDropRightXS,
} from "./List.styles";
import listClasses, { HvListClasses } from "./listClasses";
import useSelectableList from "./useSelectableList";
import { parseList } from "./utils";
import { HvListContainer, HvTypography } from "@core/components";
import { setId, wrapperTooltip } from "@core/utils";

export interface HvListValue extends HvExtraProps {
  id?: string | number;
  label: React.ReactNode;
  searchValue?: string;
  selected?: boolean;
  disabled?: boolean;
  isHidden?: boolean;
  icon?:
    | React.ReactNode
    | ((params: {
        isDisabled?: boolean;
        isSelected?: boolean;
      }) => React.ReactNode);
  showNavIcon?: boolean;
  path?: string;
  params?: object;
  tabIndex?: number;
}

export interface HvListLabels {
  /** The label used for the All checkbox action. */
  selectAll?: string;
  /** The label used in the middle of the multi-selection count. */
  selectionConjunction?: string;
}

export interface HvListProps
  extends HvBaseProps<HTMLUListElement, { onChange; onClick }> {
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
  values: HvListValue[];
  /** If true renders a multi select list. */
  multiSelect?: boolean;
  /**
   * If true renders select all option for multi selection lists with selectors.
   * note: It will only be rendered if multiSelect and useSelector props are set to true.
   */
  showSelectAll?: boolean;
  /** An object containing all the labels for the dropdown. */
  labels?: HvListLabels;
  /** If true renders list items with radio or checkbox selectors. */
  useSelector?: boolean;
  /** Call back fired when list item is selected. Returns selection state. */
  onChange?: (value: HvListValue[]) => void;
  /** Call back fired when list item is selected. Returns selected item. */
  onClick?: (
    event: React.ChangeEvent<HTMLLIElement>,
    value: HvListValue
  ) => void;
  /** If `true` the list items will show the selection state. */
  selectable?: boolean;
  /** If `true`, selection can be toggled when single selection. */
  singleSelectionToggle?: boolean;
  /** If `true` the list will be rendered without vertical spacing. */
  condensed?: boolean;
  /** If `true` the dropdown will show tooltips when user mouseenter text in list */
  hasTooltips?: boolean;
  /** Experimental. Height of the dropdown, in case you want to control it from a prop. Styles can also be used through dropdownListContainer class. Required in case virtualized is used */
  height?: number;
  /** Experimental. Uses dropdown in a virtualized form, where not all options are rendered initially. Good for use cases with a lot of options. */
  virtualized?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvListClasses;
}

const DEFAULT_LABELS = {
  selectAll: "Select All",
  selectionConjunction: "/",
};

/**
 * Component used to show a set of related data to the user.
 */
export const HvList = ({
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
}: HvListProps) => {
  const [list, setList, selection] = useSelectableList(valuesProp);
  const listRef = useRef<any>(null);

  useEffect(() => {
    const passedProps = { multiSelect, selectable, singleSelectionToggle };
    const parsedList: HvListValue[] = parseList(
      undefined,
      passedProps,
      undefined,
      valuesProp
    );

    setList(parsedList);
  }, [valuesProp, multiSelect, selectable, singleSelectionToggle, setList]);

  const handleSelect = (evt, item) => {
    if (!item.path) evt.preventDefault();
    if (item.disabled) return;

    const passedProps = { multiSelect, selectable, singleSelectionToggle };
    const parsedList = parseList(item, passedProps, undefined, list);
    setList(parsedList);

    onClick?.(evt, item);
    onChange?.(parsedList);
  };

  const handleSelectAll = () => {
    const passedProps = { multiSelect, selectable, singleSelectionToggle };
    const anySelectableSelected = list.some(
      (elem) => elem.selected || elem.disabled
    );
    const parsedList = parseList(
      undefined,
      passedProps,
      !anySelectableSelected,
      list
    );
    setList(parsedList);

    onChange?.(parsedList);
  };

  const renderLeftIcon = (item) => {
    return isValidElement(item.icon)
      ? item.icon
      : item.icon?.({
          isSelected: item.selected,
          isDisabled: item.disabled,
        });
  };

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
      <StyledSelectAllCheckBox
        id={setId(id, "select-all")}
        label={selectionLabel}
        onChange={handleSelectAll}
        className={clsx(
          listClasses.selectAllSelector,
          classes?.selectAllSelector
        )}
        indeterminate={anySelected && !allSelected}
        checked={allSelected}
      />
    );
  };

  const renderItemText = (item) => {
    const ItemText = wrapperTooltip(hasTooltips, item.label, item.label);

    return !multiSelect && item.path ? (
      <StyledLink
        key={item.label}
        route={item.path}
        classes={{ a: clsx(listClasses.link, classes?.link) }}
      >
        <ItemText />
      </StyledLink>
    ) : (
      <ItemText />
    );
  };

  const renderMultiSelectItem = (item, itemId) => {
    if (useSelector) {
      const Selection = wrapperTooltip(
        hasTooltips,
        <StyledMultiSelectCheckBox
          id={setId(itemId, "selector")}
          label={item.label}
          checked={item.selected}
          disabled={item.disabled}
          onChange={(evt) => handleSelect(evt, item)}
          classes={{
            root: clsx(listClasses.selectorRoot, classes?.selectorRoot),
            container: clsx(
              listClasses.selectorContainer,
              classes?.selectorContainer
            ),
            label: clsx(listClasses.truncate, classes?.truncate),
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
        <StyledSingleSelectRadio
          id={setId(itemId, "selector")}
          label={item.label}
          checked={item.selected}
          disabled={item.disabled}
          classes={{
            root: clsx(listClasses.selectorRoot, classes?.selectorRoot),
            container: clsx(
              listClasses.selectorContainer,
              classes?.selectorContainer
            ),
            label: clsx(listClasses.truncate, classes?.truncate),
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
      <StyledListItem
        key={i}
        id={itemId}
        role={selectable ? "option" : "menuitem"}
        disabled={item.disabled || undefined}
        className={clsx(listClasses.item, classes?.item)}
        classes={{
          selected:
            useSelector || multiSelect
              ? clsx(listClasses.itemSelector, classes?.itemSelector)
              : undefined,
        }}
        selected={multiSelect || selected ? selected : undefined}
        onClick={(evt) => handleSelect(evt, item)}
        startAdornment={startAdornment}
        endAdornment={
          item.showNavIcon && (
            <StyledDropRightXS
              className={clsx(listClasses.box, classes?.box)}
              iconSize="XS"
            />
          )
        }
        $applySelected={useSelector || multiSelect}
        {...otherProps}
      >
        {multiSelect
          ? renderMultiSelectItem(item, itemId)
          : renderSingleSelectItem(item, itemId)}
      </StyledListItem>
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
      item.tabIndex ||
      (!anySelected && index === 0) ||
      (item.selected && !item.disabled)
        ? 0
        : -1;

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

  const renderFixedList = useMemo(() => {
    return forwardRef(({ ...rest }, ref) => (
      <HvListContainer
        id={id}
        className={clsx(className, listClasses.root, classes?.root)}
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
          className={clsx(className, listClasses.root, classes?.root)}
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
        <StyledFixedSizeList
          ref={listRef}
          className={clsx(
            listClasses.virtualizedRoot,
            classes?.virtualizedRoot
          )}
          height={(height || 0) + 5}
          width="100%"
          itemCount={filteredList.length}
          itemSize={condensed ? 32 : 40}
          innerElementType={renderFixedList}
          {...others}
        >
          {ListItem}
        </StyledFixedSizeList>
      )}
    </>
  );
};
