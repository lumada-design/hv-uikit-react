import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { withStyles } from "@material-ui/core";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import { DropRightXS as DropRight } from "@hitachivantara/uikit-react-icons";
import { parseList, parseState, wrapperTooltip } from "./utils";
import { HvCheckBox, HvRadio } from "../Selectors";
import { HvLink, HvTypography, setId } from "..";
import Focus from "../Focus";
import styles from "./styles";

const DEFAULT_STATE = {
  list: [],
  values: [],
  hasLeftIcons: false,
  allSelected: false,
  anySelected: false,
  anySelectableSelected: false,
  allSelectableSelected: false,
};

const DEFAULT_LABELS = {
  selectAll: "All",
  selectionConjunction: "of",
};

/**
 * Component used to show a set of related data to the user.
 */
class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...DEFAULT_STATE,
    };
    this.listRef = React.createRef();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.values !== state.values) {
      const { values } = props;

      const parsedList = parseList(values, null, props);
      const parsedState = parseState(parsedList);

      return {
        values,
        ...parsedState,
      };
    }

    return null;
  }

  handleSelect(evt, item) {
    if (!item.path) evt.preventDefault();
    if (item.disabled) return;

    const { list } = this.state;
    const { onChange, onClick } = this.props;

    const parsedList = parseList(list, item, this.props);
    const parsedState = parseState(parsedList);

    this.setState({ ...parsedState });

    onClick(evt, item);
    onChange(parsedList);
  }

  handleSelectAll() {
    const { list, anySelectableSelected } = this.state;
    const { onChange } = this.props;

    const parsedList = parseList(list, null, this.props, !anySelectableSelected);
    const parsedState = parseState(parsedList);

    this.setState({ ...parsedState });

    onChange(parsedList);
  }

  renderSelectAll = () => {
    const { id, classes, labels } = this.props;
    const { list, selection, allSelected, anySelected } = this.state;
    const { selectAll, selectionConjunction } = labels;

    const ofLabel = (
      <>
        {selection.length}
        <HvTypography component="span" variant="normalText">
          {`\xa0${selectionConjunction}\xa0`}
          {list.length}
        </HvTypography>
      </>
    );

    const selectionLabel = anySelected ? ofLabel : selectAll;

    return (
      <HvCheckBox
        id={setId(id, "select-all")}
        label={
          <HvTypography component="span" variant="highlightText">
            {selectionLabel}
          </HvTypography>
        }
        onChange={() => this.handleSelectAll()}
        classes={{ container: classes.selectorContainer }}
        className={classes.selectAll}
        indeterminate={!allSelected && anySelected}
        checked={allSelected}
      />
    );
  };

  renderListItem = (item, i) => {
    const { id, classes, multiSelect, useSelector, selectable, condensed } = this.props;
    const { selection, anySelected } = this.state;

    const itemId = setId(id, "item", i);
    const selected = item.selected || false;
    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
    return (
      <Focus
        key={i}
        rootRef={this.listRef}
        selected={item.selected}
        disabledClass={item.disabled}
        strategy={selectable ? "listbox" : "menu"}
        configuration={{
          tabIndex: selection[0] === item || (!anySelected && i === 0) ? 0 : -1,
        }}
        isDropdown
        classes={{ focus: classes.focus }}
      >
        <li
          id={itemId}
          role={selectable ? "option" : "menuitem"}
          aria-disabled={item.disabled || undefined}
          aria-selected={multiSelect || selected ? selected : undefined}
          onClick={(evt) => this.handleSelect(evt, item)}
          onKeyDown={() => {}}
          className={clsx(classes.listItem, {
            [classes.selected]: item.selected && !useSelector,
            [classes.condensed]: condensed,
            [classes.selector]: useSelector,
            [classes.disabled]: item.disabled,
          })}
        >
          {!useSelector && item.iconCallback && this.renderLeftIcon(item)}

          {multiSelect
            ? this.renderMultiSelectItem(item, itemId)
            : this.renderSingleSelectItem(item, itemId)}

          {item.showNavIcon && this.renderNavIcon(item)}
        </li>
      </Focus>
    );
  };

  renderMultiSelectItem = (item, itemId) => {
    const { classes, useSelector, hasTooltips } = this.props;

    if (useSelector) {
      const Selection = wrapperTooltip(
        hasTooltips,
        <HvCheckBox
          id={setId(itemId, "selector")}
          label={item.label}
          checked={item.selected}
          disabled={item.disabled}
          onChange={(evt) => this.handleSelect(evt, item)}
          classes={{
            container: classes.selectorContainer,
            icon: classes.icon,
          }}
        />,
        item.label
      );

      return <Selection />;
    }
    return this.renderItemText(item);
  };

  renderSingleSelectItem = (item, itemId) => {
    const { classes, useSelector, hasTooltips } = this.props;

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
            icon: classes.icon,
          }}
        />,
        item.label
      );

      return <Selection />;
    }
    return this.renderItemText(item);
  };

  renderItemText = (item) => {
    const { multiSelect, hasTooltips, classes } = this.props;

    const ItemText = wrapperTooltip(hasTooltips, this.renderText(item), item.label);

    return !multiSelect && item.path ? (
      <HvLink key={item.label} route={item.path} classes={{ a: classes.link }}>
        <ItemText />
      </HvLink>
    ) : (
      <ItemText />
    );
  };

  renderText = (item) => {
    const { classes } = this.props;
    const { hasLeftIcons } = this.state;

    return (
      <HvTypography
        variant={item.selected ? "selectedText" : "normalText"}
        className={clsx(classes.label, classes.truncate, {
          [classes.selected]: item.selected,
          [classes.textDisabled]: item.disabled,
          [classes.labelIconLeftPadding]: item.iconCallback,
          [classes.noIconLeftPadding]: !item.iconCallback && hasLeftIcons,
        })}
      >
        {item.label}
      </HvTypography>
    );
  };

  renderNavIcon = () => {
    const { classes } = this.props;

    return <DropRight className={classes.box} iconSize="XS" />;
  };

  renderLeftIcon = (item) => {
    const newIcon = !isNil(item.iconCallback)
      ? item.iconCallback({
          isSelected: item.selected,
          isDisabled: item.disabled,
        })
      : undefined;

    return newIcon;
  };

  render() {
    const {
      id,
      classes,
      className,
      multiSelect,
      useSelector,
      showSelectAll,
      selectable,
      // TODO: convert component to functional so we don't to destructure here
      hasTooltips,
      values,
      labels,
      onChange,
      onClick,
      selectDefault,
      singleSelectionToggle,
      condensed,
      ...others
    } = this.props;
    const { list } = this.state;

    return (
      <div ref={this.listRef} className={clsx(className, classes.root)}>
        {multiSelect && useSelector && showSelectAll && this.renderSelectAll()}

        {list && (
          <ul
            id={id}
            className={classes.list}
            role={selectable ? "listbox" : "menu"}
            aria-multiselectable={multiSelect || undefined}
            {...others}
          >
            {list.map((item, i) => !item.isHidden && this.renderListItem(item, i))}
          </ul>
        )}
      </div>
    );
  }
}

List.propTypes = {
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
     * Styles applied to the list element.
     */
    list: PropTypes.string,
    /**
     * Styles applied to the list item.
     */
    listItem: PropTypes.string,
    /**
     * Styles applied to the list item when condensed.
     */
    condensed: PropTypes.string,
    /**
     * Styles applied to the list item when disabled.
     */
    disabled: PropTypes.string,
    /**
     * Styles applied to the list item selector, when it is enabled.
     */
    selector: PropTypes.string,
    /**
     * Styles applied to the list item selector container.
     */
    selectorContainer: PropTypes.string,
    /**
     * Styles applied to the selected list item.
     */
    selected: PropTypes.string,
    /**
     * Styles applied to the select all option when multiselect.
     */
    selectAll: PropTypes.string,
    /**
     * Style applied to the text of a disabled item.
     */
    textDisabled: PropTypes.string,
    /**
     * Style applied to the label of the checkbox.
     */
    label: PropTypes.string,
    /**
     * Style applied to the icon box.
     */
    box: PropTypes.string,
    /**
     * Styles applied to the list item icon left padding
     */
    labelIconLeftPadding: PropTypes.string,
    /**
     * Styles applied to the list item padding when no left icon
     */
    noIconLeftPadding: PropTypes.string,
    /**
     * Styles applied when the list item text when truncate.
     */
    truncate: PropTypes.string,
    /**
     * Styles applied to the icon of the selector.
     */
    icon: PropTypes.string,
    /**
     * Styles applied when focus .
     */
    focus: PropTypes.string,
    /**
     * Styles applied to the link.
     */
    link: PropTypes.string,
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
      label: PropTypes.string.isRequired,
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
   * If ´true´ the list items will show the selection state.
   */
  selectable: PropTypes.bool,
  /**
   * If ´true´ and none element selected,
   * single select has default (first) label selected.
   *
   * @deprecated
   */
  selectDefault: deprecatedPropType(
    PropTypes.bool,
    "instead pass the default as a preselected value"
  ),
  /**
   * If ´true´, selection can be toggled when single selection.
   */
  singleSelectionToggle: PropTypes.bool,
  /**
   * If ´true´ the list will be rendered without vertical spacing.
   */
  condensed: PropTypes.bool,
  /**
   * If ´true´ the dropdown will show tooltips when user mouseenter text in list
   */
  hasTooltips: PropTypes.bool,
};

List.defaultProps = {
  id: undefined,
  multiSelect: false,
  hasTooltips: false,
  showSelectAll: false,
  labels: DEFAULT_LABELS,
  useSelector: false,
  selectable: true,
  selectDefault: false,
  singleSelectionToggle: true,
  condensed: false,
  onChange() {},
  onClick() {},
};

export default withStyles(styles, { name: "HvList" })(List);
