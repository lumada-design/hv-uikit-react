import React, { useRef, useState, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import isNil from "lodash/isNil";
import { withStyles } from "@material-ui/core";
import { setId, useControlled } from "../utils";
import {
  HvFormElement,
  HvListContainer,
  HvListItem,
  HvTag,
  HvInput,
  HvLabel,
  HvInfoMessage,
  HvCharCounter,
  HvWarningText,
  useUniqueId,
} from "..";
import validationStates from "../Forms/FormElement/validationStates";
import { DEFAULT_ERROR_MESSAGES } from "../BaseInput/validations";
import styles from "./styles";

/**
 * A tags input is a single or multiline control that allows the input of tags.
 */
const HvTagsInput = (props) => {
  const {
    classes,
    className,

    id,
    name,

    value: valueProp,
    defaultValue = [],

    readOnly = false,
    disabled = false,
    required = false,

    label: textAreaLabel,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    description,
    "aria-describedby": ariaDescribedBy,

    onChange,
    onAdd,
    onDelete,

    placeholder,

    hideCounter = false,
    middleCountLabel = "/",
    maxTagsQuantity,

    autoFocus = false,
    resizable = true,

    inputProps = {},
    countCharProps = {},

    multiline = false,

    status,
    statusMessage,

    validationMessages,

    ...others
  } = props;
  const elementId = useUniqueId(id, "hvTagsInput");

  const hasLabel = textAreaLabel != null;
  const hasDescription = description != null;

  const [value, setValue] = useControlled(valueProp, defaultValue);
  const [validationState, setValidationState] = useControlled(status, validationStates.standBy);
  const [validationMessage, setValidationMessage] = useControlled(statusMessage, "");

  const [tagInput, setTagInput] = useState("");
  const [tagCursorPos, setTagCursorPos] = useState(value.length);
  const [stateValid, setStateValid] = useState(true);

  const inputRef = useRef();
  const containerRef = useRef();
  const resetInput = useRef(false);

  const isTagSelected = tagCursorPos >= 0 && tagCursorPos < value.length;
  const hasCounter = maxTagsQuantity != null && !hideCounter;

  const isStateInvalid = useMemo(() => {
    return hasCounter && value.length > maxTagsQuantity;
  }, [hasCounter, maxTagsQuantity, value.length]);

  const errorMessages = useMemo(
    () => ({ ...DEFAULT_ERROR_MESSAGES, ...validationMessages }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      validationMessages?.error,
      validationMessages?.requiredError,
      validationMessages?.minCharError,
      validationMessages?.maxCharError,
    ]
  );

  const performValidation = useCallback(
    (currValue) => {
      if (maxTagsQuantity !== null && currValue.length > maxTagsQuantity) {
        setValidationState(validationStates.invalid);
        setValidationMessage(errorMessages.maxCharError);
        setStateValid(false);
      } else {
        setValidationState(validationStates.valid);
        setValidationMessage("");
        setStateValid(true);
      }
    },
    [errorMessages.maxCharError, maxTagsQuantity, setValidationMessage, setValidationState]
  );

  /**
   * Deletes a Tag from the array of tags and sets the new position for the tag cursor.
   * Also executes the user provided onDelete and onChange events.
   *
   * @param {number}  tagPos - the position at which to remove the tag
   * @param {Event}   event  - the event associated with the delete
   * @param {boolean} end    - whether or not to set the cursor at the end of the array
   */
  const deleteTag = useCallback(
    (tagPos, event, end) => {
      const newTagsArr = [...value.slice(0, tagPos), ...value.slice(tagPos + 1)];
      setValue(newTagsArr);
      // eslint-disable-next-line no-nested-ternary
      setTagCursorPos(end ? newTagsArr.length : tagCursorPos > 0 ? tagCursorPos - 1 : 0);
      inputRef.current?.focus();
      performValidation(newTagsArr);
      onDelete?.(event, value[tagPos], tagPos);
      onChange?.(event, newTagsArr);
    },
    [onChange, onDelete, performValidation, setValue, tagCursorPos, value]
  );

  const canShowError =
    (status !== undefined && status === "invalid" && statusMessage !== undefined) || !stateValid;

  /**
   * Handler for the `onChange` event on the tag input
   */
  const onChangeHandler = useCallback((event, input) => {
    setTagInput(input);
  }, []);

  useEffect(() => {
    if (!multiline) {
      const element = containerRef?.current?.children[tagCursorPos];
      // this setTimeout is a workaround for Firefox not properly dealing
      // with setting the scrollLeft value.
      setTimeout(() => {
        const container = containerRef.current;
        if (isNil(container)) return;
        container.scrollLeft = element
          ? element.offsetLeft -
            container.getBoundingClientRect().width / 2 +
            element.getBoundingClientRect().width / 2
          : 0;
      }, 50);

      element?.focus();
    }
  }, [multiline, tagCursorPos]);

  useEffect(() => {
    if (resetInput.current) {
      setTagInput("");
      setTagCursorPos(value.length);
      resetInput.current = false;
    }
  }, [value]);

  /**
   * Handler for the `onEnter` event on the tag input
   */
  const onEnterHandler = useCallback(
    (event, tag) => {
      event.preventDefault();
      if (tag !== "") {
        const newTag = { label: tag, type: "semantic" };
        const newTagsArr = [...value, newTag];
        setValue(newTagsArr);
        resetInput.current = true;
        performValidation(newTagsArr);
        onAdd?.(event, newTag, newTagsArr.length - 1);
        onChange?.(event, newTagsArr);
      }
    },
    [onAdd, onChange, performValidation, setValue, value]
  );

  /**
   * Handler for the `onKeyDown` event on the list container.
   */
  const onKeyDownHandler = useCallback(
    (event) => {
      if (tagInput === "") {
        switch (event.code) {
          case "ArrowLeft":
            setTagCursorPos(tagCursorPos > 0 ? tagCursorPos - 1 : 0);
            break;
          case "ArrowRight":
            setTagCursorPos(tagCursorPos < value.length ? tagCursorPos + 1 : value.length);
            break;
          case "Backspace":
            if (isTagSelected) {
              deleteTag(tagCursorPos, event, false);
            } else {
              setTagCursorPos(value.length - 1);
            }
            break;
          case "Delete":
            if (isTagSelected) {
              deleteTag(tagCursorPos, event, false);
            }
            break;
          default:
            break;
        }
      }
    },
    [deleteTag, isTagSelected, tagCursorPos, tagInput, value.length]
  );

  /**
   * Handler for the `onDelete` event on the tag component
   */
  const onDeleteTagHandler = useCallback(
    (event, i) => {
      deleteTag(i, event, true);
      setValidationState(validationStates.standBy);
    },
    [deleteTag, setValidationState]
  );

  /**
   * Handler for the `onClick` event on the list container
   */
  const onContainerClickHandler = useCallback(() => {
    inputRef.current?.focus();
    setTagCursorPos(value.length);
  }, [value.length]);

  return (
    <HvFormElement
      id={id}
      name={name}
      disabled={disabled}
      readOnly={readOnly}
      status={validationState}
      required={required}
      className={clsx(classes.root, className, {
        [classes.disabled]: disabled,
      })}
    >
      {(hasLabel || hasDescription) && (
        <div className={classes.labelContainer}>
          {hasLabel && (
            <HvLabel
              className={classes.label}
              id={setId(id, "label")}
              htmlFor={setId(elementId, "input")}
              label={textAreaLabel}
            />
          )}

          {hasDescription && (
            <HvInfoMessage className={classes.description} id={setId(elementId, "description")}>
              {description}
            </HvInfoMessage>
          )}
        </div>
      )}

      {hasCounter && (
        <HvCharCounter
          id={setId(elementId, "charCounter")}
          className={classes.characterCounter}
          separator={middleCountLabel}
          currentCharQuantity={value.length}
          maxCharQuantity={maxTagsQuantity}
          {...countCharProps}
        />
      )}

      <HvListContainer
        className={clsx(
          classes.tagsList,
          canShowError && classes.error,
          resizable && multiline && classes.resizable,
          isStateInvalid && classes.invalid,
          !multiline && classes.singleLine
        )}
        onKeyDown={onKeyDownHandler}
        onClick={onContainerClickHandler}
        ref={containerRef}
      >
        {value &&
          value.map((t, i) => {
            const tag =
              typeof t === "string"
                ? {
                    label: t,
                    type: "semantic",
                  }
                : t;
            const { label, type, ...otherProps } = tag;
            return (
              <HvListItem
                // eslint-disable-next-line react/no-array-index-key
                key={`${tag.label}-${i}`}
                tabIndex={-1}
                className={clsx(!multiline && classes.singleLine)}
                classes={{
                  gutters: classes.listItemGutters,
                  root: classes.listItemRoot,
                }}
                id={`tag-${i}`}
              >
                <HvTag
                  label={label}
                  className={clsx(i === tagCursorPos && classes.tagSelected)}
                  classes={{
                    chipRoot: classes.chipRoot,
                  }}
                  type={type}
                  {...(!(readOnly || disabled || type === "categorical") && {
                    onDelete: (event) => onDeleteTagHandler(event, i),
                  })}
                  deleteButtonProps={{
                    tabIndex: -1,
                  }}
                  {...otherProps}
                />
              </HvListItem>
            );
          })}
        {!(disabled || readOnly) && (
          <HvListItem
            className={clsx(!multiline && classes.singleLine)}
            classes={{
              root: classes.tagInputContainerRoot,
              gutters: classes.listItemGutters,
            }}
            id={`tag-${value.length}`}
          >
            <HvInput
              value={tagInput}
              disableClear
              onChange={onChangeHandler}
              onEnter={onEnterHandler}
              placeholder={value.length === 0 ? placeholder : ""}
              autoFocus={autoFocus}
              className={clsx(!multiline && classes.singleLine)}
              classes={{
                root: classes.tagInputRoot,
                input: classes.input,
                inputBorderContainer: classes.tagInputBorderContainer,
                inputRootFocused: classes.tagInputRootFocused,
              }}
              disabled={disabled}
              readOnly={readOnly || isTagSelected}
              inputProps={{
                "aria-label": ariaLabel,
                "aria-labelledby": ariaLabelledBy,
                "aria-describedby":
                  ariaDescribedBy != null
                    ? ariaDescribedBy
                    : description && setId(elementId, "description"),

                ...inputProps,
              }}
              inputRef={inputRef}
              {...others}
            />
          </HvListItem>
        )}
      </HvListContainer>
      {canShowError && (
        <HvWarningText id={setId(elementId, "error")} disableBorder className={classes.error}>
          {validationMessage}
        </HvWarningText>
      )}
    </HvFormElement>
  );
};

HvTagsInput.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the component styles applied.
   */
  classes: PropTypes.PropTypes.shape({
    /**
     * Styles applied to the input element.
     */
    input: PropTypes.string,
    /**
     * Styles applied to the list item gutters.
     */
    listItemGutters: PropTypes.string,
    /**
     * Styles applied to the list item element.
     */
    listItemRoot: PropTypes.string,
    /**
     * Styles applied to the root container of the textarea.
     */
    root: PropTypes.string,
    /**
     *
     */
    chipRoot: PropTypes.string,
    /**
     * Style applied to the root when resizable is `true`.
     */
    disabled: PropTypes.string,
    /**
     * Style applied to the root when resizable is `true`.
     */
    resizable: PropTypes.string,
    /**
     * Style applied to the root when invalid.
     */
    invalid: PropTypes.string,
    /**
     * Styles applied to text area container that holds the label, description and counter.
     */
    labelContainer: PropTypes.string,
    /**
     * Styles applied to the label element.
     */
    label: PropTypes.string,
    /**
     * Styles applied to the label element.
     */
    description: PropTypes.string,
    /**
     * Style applied on the character counter.
     */
    characterCounter: PropTypes.string,
    /**
     * Styles applied to the tags list container element.
     */
    tagsList: PropTypes.string,
    /**
     * Styles applied to the tag input container element.
     */
    tagInputContainerRoot: PropTypes.string,
    /**
     * Styles applied to the tag input element.
     */
    tagInputRoot: PropTypes.string,
    /**
     * Styles applied to a tag element when selected
     */
    tagSelected: PropTypes.string,
    /**
     * Styles applied to the input element border.
     */
    tagInputBorderContainer: PropTypes.string,
    /**
     * Styles applied to the input element when focused.
     */
    tagInputRootFocused: PropTypes.string,
    /**
     * Styles applied to the container when in single line mode.
     */
    singleLine: PropTypes.string,
    /**
     * Styles applied to the tags list when an error occurred.
     */
    error: PropTypes.string,
  }).isRequired,
  /**
   * Id to be applied to the form element root node.
   */
  id: PropTypes.string,
  /**
   * The form element name.
   */
  name: PropTypes.string,
  /**
   * The value of the form element.
   */
  value: PropTypes.array,
  /**
   * When uncontrolled, defines the initial input value.
   */
  defaultValue: PropTypes.array,
  /**
   * The label of the form element.
   *
   * The form element must be labeled for accessibility reasons.
   * If not provided, an aria-label or aria-labelledby must be inputted via inputProps.
   */
  label: PropTypes.node,
  /**
   * @ignore
   */
  "aria-label": PropTypes.string,
  /**
   * @ignore
   */
  "aria-labelledby": PropTypes.string,
  /**
   * Provide additional descriptive text for the form element.
   */
  description: PropTypes.node,
  /**
   * @ignore
   */
  "aria-describedby": PropTypes.string,
  /**
   * Indicates that the form element is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates that the form element is not editable.
   */
  readOnly: PropTypes.bool,
  /**
   * Indicates that the form element is required.
   */
  required: PropTypes.bool,
  /**
   * The function that will be executed onChange.
   */
  onChange: PropTypes.func,
  /**
   * The function that will be executed when a tag is deleted.
   */
  onDelete: PropTypes.func,
  /**
   * The function that will be executed when a tag is added.
   */
  onAdd: PropTypes.func,
  /**
   * The placeholder value of the input.
   */
  placeholder: PropTypes.string,
  /**
   * If `true` the character counter isn't shown even if maxTagsQuantity is set.
   */
  hideCounter: PropTypes.bool,
  /**
   * Text between the current char counter and max value.
   */
  middleCountLabel: PropTypes.string,
  /**
   * The maximum allowed length of the characters, if this value is null no check
   * will be performed.
   */
  maxTagsQuantity: PropTypes.number,
  /**
   * Attributes applied to the input element.
   */
  inputProps: PropTypes.instanceOf(Object),
  /**
   * If `true` it should autofocus.
   */
  autoFocus: PropTypes.bool,
  /**
   * If `true` the component is resizable.
   */
  resizable: PropTypes.bool,
  /**
   * Props passed to the HvCharCount component.
   */
  countCharProps: PropTypes.instanceOf(Object),
  /**
   * If `true` the component is in multiline mode.
   */
  multiline: PropTypes.bool,
  /**
   * The status of the form element.
   */
  status: PropTypes.string,
  /**
   * The error message to show when `status` is "invalid".
   */
  statusMessage: PropTypes.string,

  /**
   * An Object containing the various texts associated with the input.
   */
  validationMessages: PropTypes.shape({
    /**
     * The value when a validation fails.
     */
    error: PropTypes.string,
    /**
     * The message that appears when there are too many characters.
     */
    maxCharError: PropTypes.string,
    /**
     * The message that appears when there are too few characters.
     */
    minCharError: PropTypes.string,
    /**
     * The message that appears when the input is empty and required.
     */
    requiredError: PropTypes.string,
  }),
};

export default withStyles(styles, { name: "HvTagsInput" })(HvTagsInput);
