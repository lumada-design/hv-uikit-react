import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import isNil from "lodash/isNil";

import { withStyles } from "@material-ui/core";

import DropRight from "@hv/uikit-react-icons/dist/DropRightXS";
import { parseList, parseState, wrapperTooltip } from "./utils";

import { HvCheckBox, HvListContainer, HvListItem, HvRadio, HvTypography, setId } from "..";

import HvBulkActions from "../BulkActions";
import HvLink from "../Link";

import styles, { linkStyles, selectAllStyles } from "./styles";

const DEFAULT_STATE = {
  list: [],
  values: [],
  hasLeftIcons: false,
  allSelected: false,
  anySelected: false,
  anySelectableSelected: false,
  allSelectableSelected: false
};

const DEFAULT_LABELS = {
  selectAll: "Select All",
  selectionConjunction: "/"
};

const StyledHvBulkActions = withStyles(selectAllStyles)(HvBulkActions);
const StyledHvLink = withStyles(linkStyles)(HvLink);

/**
 * Component used to show a set of related data to the user.
 */
class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...DEFAULT_STATE
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
        ...parsedState
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
    const { id, labels } = this.props;
    const { list, selection, anySelected } = this.state;
    const { selectAll, selectionConjunction } = labels;

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
      <StyledHvBulkActions
        id={setId(id, "select-all")}
        onSelectAll={() => this.handleSelectAll()}
        numTotal={list.length}
        numSelected={selection.length}
        selectAllLabel={selectionLabel}
      />
    );
  };

  renderListItem = (item, i) => {
    const { id, multiSelect, useSelector, selectable } = this.props;

    const itemId = setId(id, "item", i);
    const selected = item.selected || false;

    let startAdornment = null;
    if (!useSelector && item.iconCallback) {
      startAdornment = this.renderLeftIcon(item);
    }

    return (
      <HvListItem
        key={i}
        id={itemId}
        role={selectable ? "option" : "menuitem"}
        disabled={item.disabled || undefined}
        selected={multiSelect || selected ? selected : undefined}
        onClick={evt => this.handleSelect(evt, item)}
        startAdornment={startAdornment}
        endAdornment={item.showNavIcon && this.renderNavIcon(item)}
      >
        {multiSelect
          ? this.renderMultiSelectItem(item, itemId)
          : this.renderSingleSelectItem(item, itemId)}
      </HvListItem>
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
          onChange={evt => this.handleSelect(evt, item)}
          classes={{
            container: classes.selectorContainer,
            labelTypography: classes.truncate,
            icon: classes.icon
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
            labelTypography: classes.truncate,
            icon: classes.icon
          }}
        />,
        item.label
      );
      return <Selection />;
    }
    return this.renderItemText(item);
  };

  renderItemText = item => {
    const { multiSelect, hasTooltips } = this.props;
    const ItemText = wrapperTooltip(hasTooltips, item.label, item.label);

    return !multiSelect && item.path ? (
      <StyledHvLink key={item.label} route={item.path}>
        <ItemText />
      </StyledHvLink>
    ) : (
      <ItemText />
    );
  };

  renderNavIcon = () => {
    const { classes } = this.props;

    return <DropRight className={classes.box} iconSize="XS" />;
  };

  renderLeftIcon = item => {
    const newIcon = !isNil(item.iconCallback)
      ? item.iconCallback({
          isSelected: item.selected,
          isDisabled: item.disabled
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
      ...others
    } = this.props;

    const { list } = this.state;

    return (
      <>
        {multiSelect && useSelector && showSelectAll && this.renderSelectAll()}

        {list && (
          <HvListContainer
            id={id}
            className={clsx(className, classes.root)}
            role={selectable ? "listbox" : "menu"}
            interactive
            selectable={selectable}
            multiSelect={multiSelect}
            disableGutters={useSelector}
            {...others}
          >
            {list.filter(it => !it.isHidden).map((item, i) => this.renderListItem(item, i))}
          </HvListContainer>
        )}
      </>
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
     * Styles applied to the list item selector container.
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
    icon: PropTypes.string
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
      params: PropTypes.instanceOf(Object)
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
    selectionConjunction: PropTypes.string
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
   */
  selectDefault: PropTypes.bool,
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
  hasTooltips: PropTypes.bool
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
  onClick() {}
};

export default withStyles(styles, { name: "HvList" })(List);
