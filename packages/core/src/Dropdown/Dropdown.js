import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import deprecatedPropType from "@material-ui/core/utils/deprecatedPropType";
import { DropUpXS as ArrowUp, DropDownXS as ArrowDown } from "@hitachivantara/uikit-react-icons";
import { setId, isKeypress, KeyboardCodes } from "../utils";
import HvTypography from "../Typography";
import withLabels from "../withLabels";
import withId from "../withId";
import List from "./List";
import { getSelected, getSelectionLabel } from "./utils";
import styles from "./styles";

const DEFAULT_LABELS = {
  select: "Select...",
  selectAll: "All",
  cancelLabel: "Cancel",
  applyLabel: "Apply",
  multiSelectionAction: "Selected",
  multiSelectionConjunction: "of",
};

const DEFAULT_STATE = {
  selectionLabel: null,
  anchorEl: null,
  values: [],
};

/**
 * A drop-down list is a graphical control element, similar to a list box, that allows the user to choose one value from a list.
 */
class HvDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();

    const { expanded } = props;

    this.state = {
      isOpen: expanded,
      ...DEFAULT_STATE,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.values !== state.values) {
      return {
        isOpen: props.expanded,
        selectionLabel: getSelectionLabel(props.values, props.labels, props.multiSelect),
        anchorEl: null,
        values: props.values,
      };
    }

    return null;
  }

  /**
   *  Opens and closes the dropdown.
   *
   * @param {Object} event - the event produced by the click action.
   * @returns {undefined}
   * @memberof Dropdown
   */
  handleToggle(event) {
    const { disabled } = this.props;
    const { isOpen } = this.state;
    // we are checking specifically for false because if "iskeypress" returns true or undefined it should continue
    if (
      disabled ||
      (isKeypress(event, KeyboardCodes.Enter) === false &&
        isKeypress(event, KeyboardCodes.Esc) === false &&
        isKeypress(event, KeyboardCodes.ArrowDown) === false) ||
      (isKeypress(event, KeyboardCodes.Esc) && !isOpen) ||
      (isKeypress(event, KeyboardCodes.ArrowDown) && isOpen)
    )
      return;

    const anchor = event ? event.currentTarget.parentElement : null;
    this.setState({
      isOpen: !isOpen,
      anchorEl: anchor,
    });
  }

  /**
   * Applies the selected values to the state
   *
   * @param {Array} selection - An array containing the selected values.
   * @param {Boolean} commitChanges - If `true` the selection if finally committed the dropdown header text should reflect the new selection
   * @param {Boolean} toggle -If `true` the dropdown should toggle it's current state
   * @param {Boolean} notifyChanges -If `true` the dropdown will call onChange.
   * @param {Event} event - mouseUp event.
   * @memberof Dropdown
   */
  handleSelection(selection, commitChanges, toggle, notifyChanges = true, event) {
    const { multiSelect, onChange, labels } = this.props;
    const selected = getSelected(selection);

    if (commitChanges) {
      const selectionLabel = getSelectionLabel(selection, labels, multiSelect);
      this.setState({ selectionLabel });
    }
    if (toggle) this.handleToggle(event);
    if (notifyChanges) onChange(multiSelect ? selected : selected[0]);
  }

  renderLabel() {
    const { id, classes, labels } = this.props;
    return (
      <label id={setId(id, "label")} className={classes.label} htmlFor={setId(id, "header")}>
        {labels.title}
      </label>
    );
  }

  renderHeader(selectionLabelId) {
    const {
      classes,
      disabled,
      values,
      id,
      labels,
      multiSelect,
      showSearch,
      expanded,
      onChange,
      notifyChangesOnFirstRender,
      selectDefault,
      disablePortal,
      hasTooltips,
      singleSelectionToggle,
      // TODO: convert component to functional so we don't to destructure here
      popperProps,
      className,
      ...others
    } = this.props;

    const { isOpen, selectionLabel } = this.state;

    const color = disabled ? "atmo7" : undefined;

    const headerId = setId(id, "header");

    return (
      <div
        id={headerId}
        aria-labelledby={selectionLabelId}
        className={clsx(classes.header, {
          [classes.headerDisabled]: disabled,
        })}
        onKeyDown={(evt) => this.handleToggle(evt)}
        // Used instead of onClick because of OutsideClickHandler used in the List
        onMouseUp={(evt) => this.handleToggle(evt)}
        role="textbox"
        ref={this.ref}
        tabIndex={0}
        style={disabled ? { pointerEvents: "none" } : undefined}
        {...others}
      >
        <HvTypography
          id={selectionLabelId}
          variant="normalText"
          className={clsx(classes.selection, classes.truncate, {
            [classes.selectionDisabled]: disabled,
          })}
        >
          {selectionLabel}
        </HvTypography>
        {isOpen ? (
          <ArrowUp iconSize="XS" className={classes.arrow} />
        ) : (
          <ArrowDown iconSize="XS" className={classes.arrow} color={color} />
        )}
      </div>
    );
  }

  renderList() {
    const {
      id,
      multiSelect,
      showSearch,
      selectDefault,
      notifyChangesOnFirstRender,
      disablePortal,
      hasTooltips,
      labels,
      singleSelectionToggle,
      classes,
      placement,
      // TODO: convert component to functional so we don't to destructure here
      popperProps,
    } = this.props;
    const { isOpen, values, anchorEl } = this.state;

    return (
      <List
        id={setId(id, "values")}
        classes={{
          rootList: classes.rootList,
          list: classes.list,
        }}
        values={values}
        multiSelect={multiSelect}
        showSearch={showSearch}
        onChange={(selected, commitChanges, toggle, notifyChanges, evt) =>
          this.handleSelection(selected, commitChanges, toggle, notifyChanges, evt)
        }
        labels={labels}
        selectDefault={selectDefault}
        notifyChangesOnFirstRender={notifyChangesOnFirstRender}
        hasTooltips={hasTooltips}
        disablePortal={disablePortal}
        isOpen={isOpen}
        anchorEl={anchorEl}
        singleSelectionToggle={singleSelectionToggle}
        aria-labelledby={labels.title ? setId(id, "label") : undefined}
        placement={placement}
        popperProps={popperProps}
        headerRef={this.ref}
      />
    );
  }

  render() {
    const { id, classes, className, labels, disabled } = this.props;
    const { isOpen } = this.state;
    const selectionLabelId = setId(id, "selectionLabel");

    return (
      <>
        {/* TODO: remove label? use composition */}
        {labels.title ? this.renderLabel() : null}
        <div
          id={id}
          role="combobox"
          aria-expanded={isOpen}
          aria-owns={isOpen ? setId(id, "values") : undefined}
          aria-controls={isOpen ? setId(id, "values") : undefined}
          aria-labelledby={selectionLabelId}
          aria-describedby={labels.title ? setId(id, "label") : undefined}
          ref={(el) => {
            this.node = el;
          }}
          className={clsx(classes.root, className, {
            [classes.rootDisabled]: disabled,
            [classes.rootOpen]: isOpen,
          })}
        >
          {this.renderHeader(selectionLabelId)}
          {this.renderList()}
        </div>
      </>
    );
  }
}

HvDropdown.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
    /**
     * Styles applied to the component when is open.
     */
    rootOpen: PropTypes.string,
    /**
     * Styles applied to the component when is disable.
     */
    rootDisabled: PropTypes.string,
    /**
     * Styles applied to the label.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the header.
     */
    header: PropTypes.string,
    /**
     * Styles applied to the selection
     */
    selection: PropTypes.string,
    /**
     * Styles applied to the arrow
     */
    arrow: PropTypes.string,
    /**
     * Styles applied when the header is disable.
     */
    headerDisabled: PropTypes.string,
    /**
     * Styles applied to the icon.
     */
    icon: PropTypes.string,
    /**
     * Styles applied for truncating the list elements.
     */
    truncate: PropTypes.string,
    /**
     * Styles applied when the selection is disabled.
     */
    selectionDisabled: PropTypes.string,
    /**
     * Styles applied when the selection is disabled.
     */
    list: PropTypes.string,
    /**
     * Styles applied when the selection is disabled.
     */
    rootList: PropTypes.string,
  }).isRequired,
  /**
   * The list to be rendered by the dropdown.
   */
  // needed to disable eslint because:
  // https://github.com/yannickcr/eslint-plugin-react/issues/1751
  // https://github.com/yannickcr/eslint-plugin-react/issues/2028
  // eslint-disable-next-line react/no-unused-prop-types
  values: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string.isRequired,
      selected: PropTypes.bool,
    })
  ),
  /**
   * If ´true´ the dropdown is multiselect, if ´false´ the dropdown is single select.
   */
  multiSelect: PropTypes.bool,
  /**
   * If ´true´ the dropdown is rendered with a search bar, if ´false´ there won't be a search bar.
   */
  showSearch: PropTypes.bool,
  /**
   * If ´true´ the dropdown is disabled unable to be interacted, if ´false´ it is enabled.
   */
  disabled: PropTypes.bool,
  /**
   * If ´true´ the dropdown starts opened if ´false´ it starts closed.
   */
  // needed to disable eslint because:
  // https://github.com/yannickcr/eslint-plugin-react/issues/1751
  // https://github.com/yannickcr/eslint-plugin-react/issues/2028
  // eslint-disable-next-line react/no-unused-prop-types
  expanded: PropTypes.bool,
  /**
   * A function to be executed whenever a item is selected in the dropdown, the function receives the selected item(s).
   */
  onChange: PropTypes.func,
  /**
   * If 'true' the dropdown will notify on the first render.
   */
  notifyChangesOnFirstRender: PropTypes.bool,
  /**
   * An object containing all the labels for the dropdown.
   */
  labels: PropTypes.shape({
    /**
     * Title for the dropdown.
     */
    title: PropTypes.string,
    /**
     * The placeholder value of the dropdown, when no value is selected.
     */
    select: PropTypes.string,
    /**
     * Label used for the All checkbox action.
     */
    selectAll: PropTypes.string,
    /**
     * Cancel button label.
     */
    cancelLabel: PropTypes.string,
    /**
     * Apply button label.
     */
    applyLabel: PropTypes.string,
    /**
     * The label used preceding the multiselection count.
     */
    multiSelectionAction: PropTypes.string,
    /**
     * The label used in the middle of the multiselection count.
     */
    multiSelectionConjunction: PropTypes.string,
  }),
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
   * If ´true´ the dropdown will show tooltips when user mouseenter text in list
   */
  hasTooltips: PropTypes.bool,
  /**
   * Disable the portal behavior.
   * The children stay within it's parent DOM hierarchy.
   */
  disablePortal: PropTypes.bool,
  /**
   * If ´true´, selection can be toggled when single selection.
   */
  singleSelectionToggle: PropTypes.bool,
  /**
   * Placement of the dropdown.
   */
  placement: PropTypes.oneOf(["left", "right"]),
  /**
   * An object containing props to be wired to the popper component.
   */
  popperProps: PropTypes.shape(),
};

HvDropdown.defaultProps = {
  className: "",
  id: undefined,
  values: null,
  multiSelect: false,
  showSearch: false,
  disabled: false,
  expanded: false,
  onChange() {},
  notifyChangesOnFirstRender: false,
  labels: {},
  selectDefault: true,
  disablePortal: false,
  hasTooltips: false,
  singleSelectionToggle: true,
  placement: undefined,
  popperProps: {},
};

export default withStyles(styles, { name: "HvDropdown" })(
  withLabels(DEFAULT_LABELS)(withId(HvDropdown))
);
