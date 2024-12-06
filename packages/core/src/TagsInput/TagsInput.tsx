import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForkRef } from "@mui/material/utils";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

import { baseInputClasses } from "../BaseInput";
import { DEFAULT_ERROR_MESSAGES } from "../BaseInput/validations";
import {
  HvCharCounter,
  HvCharCounterProps,
  HvFormElement,
  HvFormElementProps,
  HvFormStatus,
  HvInfoMessage,
  HvLabel,
  HvWarningText,
  validationStates,
} from "../FormElement";
import {
  HvSuggestions,
  HvSuggestionsProps,
} from "../FormElement/Suggestions/Suggestions";
import { useControlled } from "../hooks/useControlled";
import { useIsMounted } from "../hooks/useIsMounted";
import { useUniqueId } from "../hooks/useUniqueId";
import { HvInput, HvInputProps, HvInputSuggestion } from "../Input";
import { HvListContainer, HvListItem } from "../ListContainer";
import { HvTag, HvTagProps } from "../Tag";
import { isKey } from "../utils/keyboardUtils";
import { setId } from "../utils/setId";
import { staticClasses, useClasses } from "./TagsInput.styles";

export { staticClasses as tagsInputClasses };

export interface HvTagSuggestion extends HvInputSuggestion {}

export type HvTagsInputClasses = ExtractNames<typeof useClasses>;

export interface HvTagsInputProps
  extends Omit<
    HvInputProps,
    "onChange" | "onBlur" | "onFocus" | "onKeyDown" | "value" | "defaultValue"
  > {
  /** The value of the form element. */
  value?: string[] | HvTagProps[];
  /** When uncontrolled, defines the initial input value. */
  defaultValue?: string[] | HvTagProps[];

  /** The function that will be executed onChange. */
  onChange?: (
    event:
      | React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.MouseEvent
      | React.KeyboardEvent<HTMLUListElement>
      | React.FocusEvent<HTMLDivElement>,
    value: HvTagProps[],
  ) => void;
  /** The function that will be executed when the element is focused. */
  onFocus?: (event: React.FocusEvent<HTMLDivElement>, value: string) => void;
  /** The function that will be executed when the element is blurred. */
  onBlur?: (event: React.FocusEvent<HTMLDivElement>, value: string) => void;
  /** The function that will be executed when a tag is deleted. */
  onDelete?: (
    event:
      | React.KeyboardEvent<HTMLUListElement>
      | React.MouseEvent<HTMLElement>,
    value: HvTagProps,
    index: number,
  ) => void;
  /** The function that will be executed when a tag is added. */
  onAdd?: (
    event:
      | React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.MouseEvent
      | React.KeyboardEvent<HTMLUListElement>
      | React.FocusEvent<HTMLDivElement>,
    value: HvTagProps,
    index: number,
  ) => void;
  /** If `true` the character counter isn't shown even if maxTagsQuantity is set. */
  hideCounter?: boolean;
  /** Text between the current char counter and max value. */
  middleCountLabel?: string;
  /** The maximum allowed length of the characters, if this value is null no check will be performed. */
  maxTagsQuantity?: number;
  /** If `true` the component is resizable. */
  resizable?: boolean;
  /** Props passed to the HvCharCount component. */
  countCharProps?: Partial<HvCharCounterProps>;
  /** If `true` the component is in multiline mode. */
  multiline?: boolean;
  /** An array of strings that represent the character used to input a tag. This character is the string representation of the event.code from the input event. */
  commitTagOn?: string[];
  /** If `true` the tag will be committed when the blur event occurs. */
  commitOnBlur?: boolean;
  /** The function that will be executed to received an array of objects that has a label and id to create list of suggestions. */
  suggestionListCallback?: (value: string) => HvTagSuggestion[] | null;
  /** The validation function that will be executed when adding tags in the suggestions mode. */
  suggestionValidation?: (value: string) => boolean;
  /** When in suggestions mode, this property indicates that tags that are not present on the suggestions list can also be added. */
  suggestionsLoose?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvTagsInputClasses;
}

/**
 * A tags input is a single or multiline control that allows the input of tags.
 */
export const HvTagsInput = forwardRef<HTMLUListElement, HvTagsInputProps>(
  function HvTagsInput(props, ref) {
    const {
      classes: classesProp,
      className,
      id,
      name,
      value: valueProp,
      defaultValue = [],
      readOnly,
      disabled,
      required,
      label: textAreaLabel,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      description,
      "aria-describedby": ariaDescribedBy,
      onChange,
      onAdd,
      onDelete,
      onBlur,
      onFocus,
      placeholder,
      hideCounter,
      middleCountLabel = "/",
      maxTagsQuantity,
      resizable = true,
      inputProps,
      countCharProps,
      multiline,
      status,
      statusMessage,
      validationMessages,
      commitTagOn = ["Enter"],
      commitOnBlur,
      suggestionListCallback,
      suggestionValidation,
      suggestionsLoose,
      ...others
    } = useDefaultProps("HvTagsInput", props);

    const { classes, cx, css } = useClasses(classesProp);

    const elementId = useUniqueId(id);

    const hasLabel = textAreaLabel != null;
    const hasDescription = description != null;

    const [value, setValue] = useControlled(valueProp, defaultValue);

    const [validationState, setValidationState] = useControlled<HvFormStatus>(
      status,
      "standBy",
    );
    const [validationMessage, setValidationMessage] = useControlled(
      statusMessage,
      "",
    );

    const [tagInput, setTagInput] = useState("");
    const [tagCursorPos, setTagCursorPos] = useState(value.length);
    const [stateValid, setStateValid] = useState(true);

    const inputRef = useRef<any>();
    const containerRef = useRef<any>();
    const skipReset = useRef(false);
    const blurTimeout = useRef<any>();
    const materialInputRef = useRef<any>(null);

    const forkedContainerRef = useForkRef(ref, containerRef);

    const isTagSelected = tagCursorPos >= 0 && tagCursorPos < value.length;
    const hasCounter = maxTagsQuantity != null && !hideCounter;

    // suggestions related state
    const [suggestionValues, setSuggestionValues] = useState<
      HvTagSuggestion[] | null
    >(null);

    const isStateInvalid = useMemo(() => {
      return hasCounter && value.length > maxTagsQuantity;
    }, [hasCounter, maxTagsQuantity, value.length]);

    const canShowSuggestions = suggestionListCallback != null;
    const hasSuggestions = !!suggestionValues;

    const errorMessages = useMemo(
      () => ({ ...DEFAULT_ERROR_MESSAGES, ...validationMessages }),
      [validationMessages],
    );

    const performValidation = useCallback(
      (currValue: HvTagProps[]) => {
        if (
          maxTagsQuantity !== null &&
          maxTagsQuantity !== undefined &&
          currValue.length > maxTagsQuantity
        ) {
          setValidationState(validationStates.invalid);
          setValidationMessage(errorMessages.maxCharError);
          setStateValid(false);
        } else {
          setValidationState(validationStates.valid);
          setValidationMessage("");
          setStateValid(true);
        }
      },
      [
        errorMessages.maxCharError,
        maxTagsQuantity,
        setValidationMessage,
        setValidationState,
      ],
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
      (
        tagPos: number,
        event:
          | React.KeyboardEvent<HTMLUListElement>
          | React.MouseEvent<HTMLElement>,
        end: boolean,
      ) => {
        const newTagsArr = [
          ...value.slice(0, tagPos),
          ...value.slice(tagPos + 1),
        ] as HvTagProps[];
        setValue(newTagsArr);
        setTagCursorPos(
          end ? newTagsArr.length : tagCursorPos > 0 ? tagCursorPos - 1 : 0,
        );
        inputRef.current?.focus();
        performValidation(newTagsArr);
        onDelete?.(event, value[tagPos] as HvTagProps, tagPos);
        onChange?.(event, newTagsArr);
        skipReset.current = true;
      },
      [onChange, onDelete, performValidation, setValue, tagCursorPos, value],
    );

    /**
     * Adds a Tag to the array of tags.
     * Also executes the user provided onAdd and onDelete events.
     *
     * @param {Event}   event  - whatever event triggered adding a tag
     * @param {string}  tag    - the string for the tag
     */
    const addTag = useCallback(
      (
        event:
          | React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
          | React.MouseEvent
          | React.KeyboardEvent<HTMLUListElement>
          | React.FocusEvent<HTMLDivElement>,
        tag: React.ReactNode,
      ) => {
        event.preventDefault();
        if (tag !== "") {
          const newTag: HvTagProps = { label: tag, type: "semantic" };
          const newTagsArr = [...value, newTag] as HvTagProps[];
          setValue(newTagsArr);
          performValidation(newTagsArr);
          onAdd?.(event, newTag, newTagsArr.length - 1);
          onChange?.(event, newTagsArr);
        }
      },
      [onAdd, onChange, performValidation, setValue, value],
    );

    const canShowError =
      (status !== undefined &&
        status === "invalid" &&
        statusMessage !== undefined) ||
      !stateValid;

    useEffect(() => {
      if (!multiline) {
        const element = containerRef?.current?.children[tagCursorPos];
        // this setTimeout is a workaround for Firefox not properly dealing
        // with setting the scrollLeft value.
        setTimeout(() => {
          const container = containerRef.current;
          if (container == null) return;
          container.scrollLeft = element
            ? element.offsetLeft -
              container.getBoundingClientRect().width / 2 +
              element.getBoundingClientRect().width / 2
            : 0;
        }, 10);

        element?.focus();
      }
    }, [multiline, tagCursorPos]);

    useEffect(() => {
      if (!skipReset.current) {
        setTagInput("");
        setTagCursorPos(value.length);
      }
      skipReset.current = false;
    }, [value]);

    const isMounted = useIsMounted();

    /**
     * Looks for the node that represent the input inside the material tree and focus it.
     */
    const focusInput = () => {
      materialInputRef.current.focus();
    };

    const getSuggestions = useCallback(
      (li: number) => {
        // TODO Replace with ref
        const listEl = document.getElementById(
          setId(elementId, "suggestions-list") || "",
        );
        return li != null ? listEl?.getElementsByTagName("li")?.[li] : listEl;
      },
      [elementId],
    );

    /**
     * Clears the suggestion array.
     */
    const suggestionClearHandler = useCallback(() => {
      if (isMounted.current) {
        setSuggestionValues(null);
      }
    }, [isMounted]);

    /**
     * Fills of the suggestion array.
     */
    const suggestionHandler = useCallback(
      (val: string) => {
        const suggestionsArray = suggestionListCallback?.(val);
        if (suggestionsArray?.[0]?.label) {
          setSuggestionValues(suggestionsArray);
        } else {
          suggestionClearHandler();
        }
      },
      [suggestionClearHandler, suggestionListCallback],
    );

    /**
     * Executes the user callback adds the selection to the state and clears the suggestions.
     */
    const suggestionSelectedHandler: HvSuggestionsProps["onSuggestionSelected"] =
      (event, item) => {
        addTag(event, item.value || item.label);

        // set the input value (only when value is uncontrolled)
        setTagInput((item.value || item.label) as string); // TODO - in v6 review all types: this is not a string but a React.ReactNode

        focusInput();
        suggestionClearHandler();
      };

    /**
     * Handler for the `onKeyDown` event on the suggestions component
     */
    const onSuggestionKeyDown = (
      event: React.KeyboardEvent<HTMLDivElement>,
    ) => {
      if (isKey(event, "Esc")) {
        suggestionClearHandler();
        focusInput();
      } else if (isKey(event, "Tab")) {
        suggestionClearHandler();
      }
    };

    /**
     * Handler for the `onChange` event on the tag input
     */
    const onChangeHandler = useCallback(
      (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        input: string,
      ) => {
        setTagInput(input);

        if (canShowSuggestions) {
          // an edge case might be a controlled input whose onChange callback
          // doesn't change the value (or sets another): the suggestionListCallback
          // callback will still receive the original rejected value.
          // a refactor is needed so the suggestionListCallback might be called only
          // when the input is uncontrolled, providing a way to externally control
          // the suggestion values.
          suggestionHandler(input);
        }
      },
      [canShowSuggestions, suggestionHandler],
    );

    /**
     * Handler for the `onKeyDown` event on the form element
     */
    const onInputKeyDownHandler = useCallback(
      (
        event:
          | React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
          | React.MouseEvent,
      ) => {
        if (!canShowSuggestions && commitTagOn.includes((event as any).code)) {
          addTag(event, tagInput);
        }
      },
      [addTag, canShowSuggestions, commitTagOn, tagInput],
    );

    /**
     * Handler for the `onKeyDown` event on the list container.
     */
    const onKeyDownHandler = useCallback(
      (event: React.KeyboardEvent<HTMLUListElement>) => {
        if (tagInput === "") {
          switch (event.code) {
            case "ArrowLeft":
              setTagCursorPos(tagCursorPos > 0 ? tagCursorPos - 1 : 0);
              break;
            case "ArrowRight":
              setTagCursorPos(
                tagCursorPos < value.length ? tagCursorPos + 1 : value.length,
              );
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
        } else {
          switch (event.code) {
            case "ArrowDown":
              getSuggestions(0)?.focus();
              break;
            case "Enter":
              if (
                canShowSuggestions &&
                suggestionsLoose &&
                (suggestionValidation?.(tagInput) || !suggestionValidation)
              ) {
                addTag(event, tagInput);

                // set the input value (only when value is uncontrolled)
                setTagInput(tagInput);

                focusInput();
                suggestionClearHandler();
              }
              break;
            default:
              break;
          }
        }
      },
      [
        addTag,
        canShowSuggestions,
        deleteTag,
        getSuggestions,
        isTagSelected,
        suggestionClearHandler,
        suggestionValidation,
        suggestionsLoose,
        tagCursorPos,
        tagInput,
        value.length,
      ],
    );

    /**
     * Handler for the `onDelete` event on the tag component
     */
    const onDeleteTagHandler = useCallback(
      (event: React.MouseEvent<HTMLElement>, i: number) => {
        deleteTag(i, event, true);
        setValidationState(validationStates.standBy);
      },
      [deleteTag, setValidationState],
    );

    /**
     * Handler for the `onClick` event on the list container
     */
    const onContainerClickHandler = useCallback(() => {
      inputRef.current?.focus();
      clearTimeout(blurTimeout.current);
      setTagCursorPos(value.length);
    }, [value.length]);

    const onBlurHandler: HvFormElementProps["onBlur"] = (evt) => {
      blurTimeout.current = setTimeout(() => {
        if (commitOnBlur) {
          addTag(evt, tagInput);
        }
        onBlur?.(evt, tagInput);
      }, 10);
    };

    const onFocusHandler: HvFormElementProps["onFocus"] = (evt) => {
      clearTimeout(blurTimeout.current);
      onFocus?.(evt, tagInput);
    };

    return (
      <HvFormElement
        id={id}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        status={validationState}
        required={required}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        className={cx(
          classes.root,
          { [classes.disabled]: disabled, [classes.readOnly]: readOnly },
          className,
        )}
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
              <HvInfoMessage
                className={classes.description}
                id={setId(elementId, "description")}
              >
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
          className={cx(classes.tagsList, {
            [classes.error]: canShowError,
            [classes.resizable]: resizable && multiline,
            [classes.invalid]: isStateInvalid,
            [classes.singleLine]: !multiline,
          })}
          onKeyDown={onKeyDownHandler}
          onClick={onContainerClickHandler}
          ref={forkedContainerRef}
        >
          {value?.map((t, i) => {
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
                key={`${tag.label}-${i}`}
                tabIndex={-1}
                className={cx({ [classes.singleLine]: !multiline })}
                classes={{
                  gutters: classes.listItemGutters,
                  root: classes.listItemRoot,
                }}
                id={setId(elementId, `tag-${i}`)}
              >
                <HvTag
                  label={label}
                  className={cx(classes.chipRoot, {
                    [classes.tagSelected]: i === tagCursorPos,
                  })}
                  type={type as HvTagProps["type"]}
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
              className={cx(
                {
                  [classes.singleLine]: !multiline,
                  [classes.tagInputRootEmpty]: value.length === 0,
                },
                !!isTagSelected &&
                  css({
                    [`& .${baseInputClasses.inputRoot}`]: {
                      backgroundColor: theme.colors.atmo1,
                    },
                  }),
              )}
              classes={{
                root: classes.tagInputContainerRoot,
                gutters: classes.listItemGutters,
              }}
              id={setId(elementId, `tag-${value.length}`)}
            >
              <HvInput
                value={tagInput}
                disableClear
                onChange={onChangeHandler}
                onKeyDown={onInputKeyDownHandler}
                placeholder={value.length === 0 ? placeholder : ""}
                className={cx({
                  [classes.singleLine]: !multiline,
                })}
                classes={{
                  root: classes.tagInputRoot,
                  input: classes.input,
                  inputBorderContainer: classes.tagInputBorderContainer,
                  inputRootFocused: classes.tagInputRootFocused,
                }}
                disabled={disabled}
                readOnly={readOnly || isTagSelected}
                inputProps={{
                  ref: materialInputRef,
                  "aria-label": ariaLabel,
                  "aria-labelledby": ariaLabelledBy,
                  "aria-describedby":
                    ariaDescribedBy != null
                      ? ariaDescribedBy
                      : (description && setId(elementId, "description")) ||
                        undefined,

                  ...inputProps,
                }}
                ref={inputRef}
                {...others}
              />
            </HvListItem>
          )}
        </HvListContainer>
        {canShowSuggestions && (
          <>
            {hasSuggestions && (
              <div role="presentation" className={classes.inputExtension} />
            )}
            <HvSuggestions
              id={setId(elementId, "suggestions")}
              classes={{
                root: classes.suggestionsContainer,
                list: classes.suggestionList,
              }}
              expanded={hasSuggestions}
              anchorEl={containerRef?.current?.parentElement}
              onClose={suggestionClearHandler}
              onKeyDown={onSuggestionKeyDown}
              onSuggestionSelected={suggestionSelectedHandler}
              suggestionValues={suggestionValues}
            />
          </>
        )}
        {canShowError && (
          <HvWarningText
            id={setId(elementId, "error")}
            disableBorder
            className={classes.error}
          >
            {validationMessage}
          </HvWarningText>
        )}
      </HvFormElement>
    );
  },
);
