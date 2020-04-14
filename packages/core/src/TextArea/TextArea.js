import React from "react";
import PropTypes from "prop-types";
import isNil from "lodash/isNil";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import HvTypography from "../Typography";
import Input from "../Input";
import styles from "./styles";
import withLabels from "../withLabels";

const DEFAULT_LABELS = {
  inputLabel: "",
  placeholder: "",
  warningText: "",
  maxCharQuantityWarningText: "",
  minCharQuantityWarningText: "",
  requiredWarningText: ""
};

/**
 * A text area component wrapping the input box, it allows the input of paragraph of text.
 * alongside this it can provide a validation for the max character quantity
 */
class HvTextArea extends React.Component {
  constructor(props) {
    super(props);
    const { initialValue, autoScroll } = this.props;

    this.state = {
      currentValueLength: initialValue !== undefined ? this.limitValue(initialValue).length : 0,
      autoScrolling: autoScroll
    };
    this.textInputRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value: nextValue, maxCharQuantity } = nextProps;
    const { currentValueLength: oldLength } = prevState;

    if (nextValue !== undefined) {
      const nextLength = nextValue.length > maxCharQuantity ? maxCharQuantity : nextValue.length;

      if (nextLength !== oldLength) {
        return {
          currentValueLength: nextLength
        };
      }
    }
    return null;
  }

  componentDidMount() {
    const { autoScroll } = this.props;
    if (autoScroll) {
      this.addScrollListener();
      this.scrollDown();
    }
  }

  componentDidUpdate() {
    const { autoScrolling } = this.state;
    if (autoScrolling) {
      this.scrollDown();
    }
  }

  /**
   * Limit the string to the maxCharQuantity length.
   *
   * @param value - string to evaluate
   * @returns {string|*} - string according the limit
   */
  limitValue = value => {
    const { maxCharQuantity } = this.props;

    if (value === undefined) return value;

    return isNil(maxCharQuantity) || value.length < maxCharQuantity
      ? value
      : value.substring(0, maxCharQuantity);
  };

  isScrolledDown = () => {
    const el = this.textInputRef.current;
    return el == null || el.scrollHeight - el.scrollTop === el.clientHeight;
  };

  scrollDown = () => {
    const el = this.textInputRef.current;
    if (el != null) {
      el.scrollTop = el.scrollHeight - el.clientHeight;
    }
  };

  addScrollListener = () => {
    const scrollHandler = {
      handleEvent: () => {
        this.setState({ autoScrolling: this.isScrolledDown() });
      }
    };
    this.textInputRef.current.addEventListener("scroll", scrollHandler);
  };

  /**
   * Updates the length of the string while is being inputted, also executes the user onChange
   * allowing the customization of the input if required.
   *
   * @param {String} value - The value provided by the HvInput
   */
  onChangeHandler = (event, value) => {
    const { onChange } = this.props;

    const newValue = onChange(event, this.limitValue(value));

    const textAreaValue = this.limitValue(!isNil(newValue) ? newValue : value);

    this.setState({
      currentValueLength: textAreaValue.length
    });
    return newValue;
  };

  render() {
    const {
      classes,
      className,
      id,
      labels,
      maxCharQuantity,
      rows,
      initialValue,
      value,
      disabled,
      resizable,
      autoScroll,
      onChange,
      ...others
    } = this.props;

    const { currentValueLength } = this.state;
    const val = initialValue;

    return (
      <div>
        <div className={classes.root}>
          <Input
            classes={{
              root: classes.container,
              input: clsx(classes.input, {
                [classes.resize]: !disabled && resizable,
                [classes.defaultWith]: !resizable
              }),
              inputRoot: classes.inputRoot,
              inputRootDisabled: classes.inputRootDisabled,
              inputRootFocused: classes.inputRootFocused
            }}
            className={className}
            id={id}
            labels={labels}
            initialValue={val && this.limitValue(val)}
            value={this.limitValue(value)}
            onChange={this.onChangeHandler}
            multiline
            rows={rows}
            disabled={disabled}
            showInfo={false}
            validationIconVisible={false}
            disableClear
            inputRef={this.textInputRef}
            {...others}
          />
          {maxCharQuantity ? (
            <div className={classes.characterCounter}>
              <HvTypography
                className={clsx(classes.inline, {
                  [classes.currentCounter]: !disabled,
                  [classes.disabled]: disabled
                })}
                variant="labelText"
              >
                {currentValueLength}
              </HvTypography>
              <HvTypography
                className={clsx(classes.inline, classes.separator, {
                  [classes.maxCharacter]: !disabled,
                  [classes.disabled]: disabled
                })}
                variant="infoText"
              >
                /
              </HvTypography>
              <HvTypography
                className={clsx(classes.inline, {
                  [classes.maxCharacter]: !disabled,
                  [classes.disabled]: disabled
                })}
                variant="infoText"
              >
                {maxCharQuantity}
              </HvTypography>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

HvTextArea.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   *  Styles applied to the Drawer Paper element.
   */
  classes: PropTypes.PropTypes.shape({
    /**
     * Style applied on the text area input box.
     */
    input: PropTypes.string,
    /**
     * Style applied when resizable is `true`. Can be used to set max/min width.
     */
    resize: PropTypes.string,
    /**
     * Styles applied to input root which is comprising of everything but the labels and descriptions.
     */
    inputRoot: PropTypes.string,
    /**
     * Styles applied to input root when it is disabled.
     */
    inputRootDisabled: PropTypes.string,
    /**
     * Styles applied to input root when it is focused.
     */
    inputRootFocused: PropTypes.string,
    /**
     * Style applied defining the width when resizable is `false`.
     */
    defaultWith: PropTypes.string,
    /**
     * Style applied on the character counter.
     */
    characterCounter: PropTypes.string,
    /**
     * Style controlling the layout of the counter.
     */
    inline: PropTypes.string,
    /**
     * Style applied to the separator element of the character counter.
     */
    separator: PropTypes.string,
    /**
     * Style applied to the max counter element of the character counter.
     */
    maxCharacter: PropTypes.string,
    /**
     * Style applied to the current counter element of the character counter.
     */
    currentCounter: PropTypes.string,
    /**
     * Style applied to the character counter when it is disabled.
     */
    disabled: PropTypes.string,
    /**
     * Style applied to the input container.
     */
    container: PropTypes.string,
    /**
     * Style applied container of the text area component.
     */
    root: PropTypes.string
  }).isRequired,
  /**
   * An Object containing the various text associated with the text area.
   *
   * -inputLabel: the label on top of the input.
   * -placeholder: the placeholder value of the input.
   * -infoText: the default value of the info text below the input.
   * -warningText: the value when a validation fails.
   * -maxCharQuantityWarningText: the message that appears when there are too many characters.
   * -minCharQuantityWarningText: the message that appears when there are too few characters.
   * -requiredWarningText: the message that appears when the input is empty and required.
   */
  labels: PropTypes.shape({
    inputLabel: PropTypes.string,
    placeholder: PropTypes.string,
    infoText: PropTypes.string,
    warningText: PropTypes.string,
    maxCharQuantityWarningText: PropTypes.string,
    minCharQuantityWarningText: PropTypes.string,
    requiredWarningText: PropTypes.string
  }),
  /**
   * The maximum allowed length of the characters, if this value is null or undefined no check
   * will be performed.
   */
  maxCharQuantity: PropTypes.number,
  /**
   * The number of rows of the text area
   */
  rows: PropTypes.number,
  /**
   * The input value to be set. If used it is the responsibility of the caller to maintain the state.
   */
  value: PropTypes.string,
  /**
   * The initial value of the input.
   */
  initialValue: PropTypes.string,
  /**
   * The function that will be executed onChange, allows modification of the input,
   * it receives the value. If a new value should be presented it must returned it.
   */
  onChange: PropTypes.func,
  /**
   * If ´true´ the text area is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * If ´true´ the component is resizable.
   */
  resizable: PropTypes.bool,
  /**
   * Auto-scroll: automatically scroll to the end on value changes.
   * Will stop if the user scrolls up and resume if scrolled to the bottom.
   */
  autoScroll: PropTypes.bool
};

HvTextArea.defaultProps = {
  className: "",
  id: undefined,
  rows: 1,
  disabled: false,
  value: undefined,
  initialValue: undefined,
  maxCharQuantity: undefined,
  onChange: (event, value) => value,
  autoScroll: false,
  resizable: false
};

export default withStyles(styles, { name: "HvTextArea" })(withLabels(DEFAULT_LABELS)(HvTextArea));
