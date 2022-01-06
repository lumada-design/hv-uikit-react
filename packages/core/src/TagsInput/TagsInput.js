import React, { useRef, useState, useCallback, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
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
  useUniqueId,
} from "..";
import styles from "./styles";

/**
 * A text area is a multiline text input box, with an optional character counter when there is a length limit.
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

    label: textAreaLabel,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    description,
    "aria-describedby": ariaDescribedBy,

    onChange,

    placeholder,

    hideCounter = false,
    middleCountLabel = "/",
    maxTagsQuantity,

    autoFocus = false,
    resizable = true,

    inputProps = {},
    countCharProps = {},

    multiline = false,

    ...others
  } = props;

  const elementId = useUniqueId(id, "hvTagsInput");

  const hasLabel = textAreaLabel != null;
  const hasDescription = description != null;

  const [value, setValue] = useControlled(valueProp, defaultValue);

  const [tagInput, setTagInput] = useState("");
  const [tagCursorPos, setTagCursorPos] = useState(value.length);

  const isTagSelected = tagCursorPos >= 0 && tagCursorPos < value.length;

  const hasCounter = maxTagsQuantity != null && !hideCounter;

  const isStateInvalid = useMemo(() => {
    return hasCounter && value.length > maxTagsQuantity;
  }, [hasCounter, maxTagsQuantity, value.length]);

  const inputRef = useRef();
  const containerRef = useRef();

  /**
   * Handler for the `onChange` event on the tag input
   */
  const onChangeHandler = useCallback((event, input) => {
    setTagInput(input);
  }, []);

  useEffect(() => {
    // keep scroll focused on the input when the value changes
    if (!multiline) {
      const element = document.getElementById("tag-input");
      const offset = element?.offsetWidth;
      containerRef?.current?.scrollBy?.(offset ?? 0, 0);
    }
  }, [multiline, value]);

  useEffect(() => {
    if (!multiline) {
      const tagId = `tag-${tagCursorPos}`;
      const element = document.getElementById(tagId);
      // this setTimeout is a workaround for Firefox not properly dealing
      // with setting the scrollLeft value.
      setTimeout(() => {
        containerRef.current.scrollLeft = element?.offsetLeft || 0;
      }, 50);

      element?.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagCursorPos]);

  /**
   * Handler for the `onEnter` event on the tag input
   */
  const onEnterHandler = useCallback(
    (event, tag) => {
      if (tag !== "") {
        const newTagsArr = [...value, { label: tag, type: "semantic" }];
        setValue(newTagsArr);
        setTagInput("");
        setTagCursorPos(newTagsArr.length);

        onChange?.(newTagsArr);
      }
    },
    [onChange, setValue, value]
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
              const newTagsArr = [
                ...value.slice(0, tagCursorPos),
                ...value.slice(tagCursorPos + 1),
              ];
              setValue(newTagsArr);
              setTagCursorPos(tagCursorPos > 0 ? tagCursorPos - 1 : 0);
              inputRef.current?.focus();
              onChange?.(newTagsArr);
            } else {
              setTagCursorPos(value.length - 1);
            }
            break;
          case "Delete":
            if (isTagSelected) {
              const newTagsArr = [
                ...value.slice(0, tagCursorPos),
                ...value.slice(tagCursorPos + 1),
              ];
              setValue(newTagsArr);
              setTagCursorPos(tagCursorPos > 0 ? tagCursorPos - 1 : 0);
              inputRef.current?.focus();
              onChange?.(newTagsArr);
            }
            break;
          default:
            break;
        }
      }
    },
    [isTagSelected, onChange, setValue, tagCursorPos, tagInput, value]
  );

  /**
   * Handler for the `onDelete` event on the tag component
   */
  const onDeleteTagHandler = useCallback(
    (i) => {
      const newTagsArr = [...value.slice(0, i), ...value.slice(i + 1)];
      setValue(newTagsArr);
      setTagCursorPos(newTagsArr.length);
      inputRef.current?.focus();
      onChange?.(newTagsArr);
    },
    [value, setValue, onChange]
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
                  type={type}
                  {...(!(readOnly || disabled || type === "categorical") && {
                    onDelete: () => onDeleteTagHandler(i),
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
     * Styles applied to the container when in single line mode§.
     */
    singleLine: PropTypes.string,
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
   * The function that will be executed onChange.
   */
  onChange: PropTypes.func,
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
};

export default withStyles(styles, { name: "HvTagsInput" })(HvTagsInput);
