import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import uniqueId from "lodash/uniqueId";
import { withStyles } from "@material-ui/core";
import ArrowUp from "@hv/uikit-react-icons/dist/DropUpXS";
import ArrowDown from "@hv/uikit-react-icons/dist/DropDownXS";
import { isKeypress, KeyboardCodes } from "../utils/KeyboardUtils";
import HvTypography from "../Typography";
import List from "./List";
import { getSelected, getSelectionLabel } from "./utils";
import styles from "./styles";

const DEFAULT_LABELS = {
  select: "Select...",
  selectAll: "All",
  cancelLabel: "Cancel",
  applyLabel: "Apply",
  multiSelectionAction: "Selected",
  multiSelectionConjunction: "of"
};

const DEFAULT_STATE = {
  isOpen: false,
  selectionLabel: null,
  anchorEl: null,
  values: [],
  labels: DEFAULT_LABELS
};

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();

    const { id } = props;

    this.state = {
      internalId: id || uniqueId("hv-dropdown-"),
      ...DEFAULT_STATE
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.values !== state.values) {
      const labels = {
        ...DEFAULT_LABELS,
        ...props.labels
      };

      return {
        isOpen: props.expanded,
        selectionLabel: getSelectionLabel(props.values, labels, props.multiSelect),
        anchorEl: null,
        values: props.values,
        labels
      };
    }

    return null;
  }

  /**
   *  Opens and closes the dropdown.
   *
   * @param {Object} evt - the event produced by the click action.
   * @returns {undefined}
   * @memberof Dropdown
   */
  handleToggle(evt) {
    const { disabled } = this.props;
    const { isOpen } = this.state;
    if (evt && !isKeypress(evt, KeyboardCodes.Tab)) {
      evt.stopPropagation();
      evt.preventDefault();
    }
    // we are checking specifically for false because if "iskeypress" returns true or undefined it should continue
    if (
      disabled ||
      (isKeypress(evt, KeyboardCodes.Enter) === false &&
        isKeypress(evt, KeyboardCodes.Esc) === false &&
        isKeypress(evt, KeyboardCodes.ArrowDown) === false) ||
      (isKeypress(evt, KeyboardCodes.Esc) && !isOpen) ||
      (isKeypress(evt, KeyboardCodes.ArrowDown) && isOpen)
    )
      return;

    const anchor = evt ? evt.currentTarget : null;

    this.setState({
      isOpen: !isOpen,
      anchorEl: anchor
    });
  }

  /**
   * Applies the selected values to the state
   *
   * @param {Array} selection - An array containing the selected values.
   * @param {Boolean} commitChanges - If `true` the selection if finally committed the dropdown header text should reflect the new selection
   * @param {Boolean} toggle -If `true` the dropdown should toggle it's current state
   * @param {Boolean} notifyChanges -If `true` the dropdown will call onChange.
   * @memberof Dropdown
   */
  handleSelection(selection, commitChanges, toggle, notifyChanges = true) {
    const { multiSelect, onChange } = this.props;
    const { labels } = this.state;
    const selected = getSelected(selection);

    if (commitChanges) {
      const selectionLabel = getSelectionLabel(selection, labels, multiSelect);
      this.setState({ selectionLabel });
    }
    if (toggle) this.handleToggle();
    if (notifyChanges) onChange(multiSelect ? selected : selected[0]);
  }

  renderLabel() {
    const { internalId } = this.state;
    const { classes, labels } = this.props;
    return (
      // eslint-disable-next-line jsx-a11y/label-has-for
      <label id={`${internalId}-label`} className={classes.label} htmlFor={`${internalId}-header`}>
        {labels.title}
      </label>
    );
  }

  renderHeader() {
    const {
      classes,
      disabled,
      values,
      id,
      labels: propLabels,
      multiSelect,
      showSearch,
      expanded,
      onChange,
      notifyChangesOnFirstRender,
      selectDefault,
      disablePortal,
      hasTooltips,
      singleSelectionToggle,
      ...others
    } = this.props;

    const { isOpen, labels, selectionLabel, internalId } = this.state;

    const color = disabled ? "atmo7" : undefined;

    return (
      <div
        id={`${internalId}-header`}
        aria-labelledby={labels.title ? `${internalId}-label` : undefined}
        className={clsx(classes.header, {
          [classes.headerDisabled]: disabled
        })}
        onKeyDown={evt => this.handleToggle(evt)}
        onClick={evt => this.handleToggle(evt)}
        role="textbox"
        ref={this.ref}
        tabIndex={0}
        {...others}
      >
        <HvTypography
          variant="normalText"
          className={clsx(classes.selection, classes.truncate, {
            [classes.selectionDisabled]: disabled
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
      multiSelect,
      showSearch,
      selectDefault,
      notifyChangesOnFirstRender,
      disablePortal,
      hasTooltips,
      singleSelectionToggle
    } = this.props;
    const { isOpen, values, labels, anchorEl, internalId } = this.state;

    return (
      <List
        id={`${internalId}-values`}
        values={values}
        multiSelect={multiSelect}
        showSearch={showSearch}
        onChange={(selected, commitChanges, toggle, notifyChanges) =>
          this.handleSelection(selected, commitChanges, toggle, notifyChanges)
        }
        labels={labels}
        selectDefault={selectDefault}
        notifyChangesOnFirstRender={notifyChangesOnFirstRender}
        hasTooltips={hasTooltips}
        disablePortal={disablePortal}
        isOpen={isOpen}
        listProps={{
          "aria-labelledby": labels.title ? `${internalId}-label` : undefined
        }}
        anchorEl={anchorEl}
        singleSelectionToggle={singleSelectionToggle}
      />
    );
  }

  render() {
    const { classes, className, labels, disabled } = this.props;
    const { isOpen, internalId } = this.state;

    return (
      <>
        {labels.title ? this.renderLabel() : null}
        <div
          id={internalId}
          role="combobox"
          aria-expanded={isOpen}
          aria-owns={isOpen ? `${internalId}-values` : undefined}
          aria-controls={isOpen ? `${internalId}-values` : undefined}
          aria-labelledby={labels.title ? `${internalId}-label` : undefined}
          ref={el => {
            this.node = el;
          }}
          className={clsx(classes.root, className, {
            [classes.rootDisabled]: disabled,
            [classes.rootActive]: isOpen
          })}
        >
          {this.renderHeader()}
          {this.renderList()}
        </div>
      </>
    );
  }
}

Dropdown.propTypes = {
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
    rootActive: PropTypes.string,
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
    selectionDisabled: PropTypes.string
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
      selected: PropTypes.bool
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
   *
   * - title: Label title for the dropdown.
   * - select: The default when there are no options available.
   * - selectAll: The label used for the All checkbox action.
   * - cancelLabel: The label used for the cancel button.
   * - applyLabel: The label used for the apply button.
   * - multiSelectionAction: The label used preceding the multiselection count.
   * - multiSelectionConjunction: The label used in the middle of the multiselection count.
   */
  labels: PropTypes.shape({
    title: PropTypes.string,
    select: PropTypes.string,
    selectAll: PropTypes.string,
    cancelLabel: PropTypes.string,
    applyLabel: PropTypes.string,
    multiSelectionAction: PropTypes.string,
    multiSelectionConjunction: PropTypes.string
  }),
  /**
   * If ´true´ and none element selected,
   * single select has default (first) label selected.
   */
  selectDefault: PropTypes.bool,
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
  singleSelectionToggle: PropTypes.bool
};

Dropdown.defaultProps = {
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
  singleSelectionToggle: true
};

export default withStyles(styles, { name: "HvDropdown" })(Dropdown);
