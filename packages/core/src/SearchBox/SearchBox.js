import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import { CloseXS, Search } from "@hv/uikit-react-icons";
import { HvAdornment, HvFormElement, HvLabel, HvBaseInput, HvSuggestions } from "../..";
import withLabels from "../withLabels";
import { isKeypress, KeyboardCodes } from "../utils/KeyboardUtils";
import styles from "./styles";

const DEFAULT_LABELS = {
  inputLabel: "",
  placeholder: "Search"
};

const { Enter, Esc, Tab } = KeyboardCodes;

const HvSearchBox = props => {
  const {
    classes,
    id,
    className,
    labels,
    initialValue,
    value: valueProp,
    onChange,
    disabled = false,
    suggestionListCallback,
    suggestionSelectedCallback,
    onBlur,
    onFocus,
    onKeyDown,
    onSubmit,
    autoFocus = false,
    ...others
  } = props;
  const [open, setOpen] = useState(false);
  const [suggestionList, setSuggestionList] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    setValue(valueProp || "");
  }, [valueProp]);

  const changeValue = (evt, val) => {
    setValue(val);
    onChange?.(evt, val);
  };

  const handleChange = (evt, val) => {
    const newList = (val.length >= 1 && suggestionListCallback?.(val)) || [];
    setSuggestionList(newList);
    setOpen(newList.length > 0);
    changeValue(evt, val);
  };

  const handleSuggestionsKey = evt => {
    if (isKeypress(evt, Esc)) {
      inputRef?.current?.focus();
      setOpen(false);
    } else if (isKeypress(evt, Tab)) {
      if (evt.shiftKey) {
        setTimeout(() => inputRef?.current?.focus());
      } else {
        setOpen(false);
      }
    }
  };

  const handleSelection = (evt, val) => {
    setOpen(false);
    suggestionSelectedCallback?.(val);
    setValue(val.label);
    inputRef?.current?.focus();
  };

  const adornment = (
    <>
      <HvAdornment
        isVisible={value?.length > 0}
        onClick={evt => {
          changeValue(evt, "");
          setTimeout(() => {
            inputRef.current?.focus();
          });
        }}
        icon={<CloseXS />}
        aria-label="clear button"
      />
      <HvAdornment
        isVisible={value?.length === 0}
        icon={<Search color={disabled ? "atmo5" : undefined} />}
      />
    </>
  );

  const handleKeyDown = evt => {
    if (isKeypress(evt, Enter)) {
      onSubmit?.(evt, value);
    }
  };

  return (
    <HvFormElement id={id} value={value} disabled={disabled} className={classes.root}>
      <HvLabel label={labels.inputLabel}>
        <HvBaseInput
          inputRef={inputRef}
          defaultValue={initialValue}
          placeholder={labels.placeholder}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          endAdornment={adornment}
          {...others}
        />
        <HvSuggestions
          expanded={open}
          anchorEl={inputRef.current?.parentElement}
          onClose={() => setOpen(false)}
          onKeyDown={handleSuggestionsKey}
          onSuggestionSelected={handleSelection}
          suggestionValues={suggestionList.map((el, i) => ({ id: String(i), ...el }))}
        />
      </HvLabel>
    </HvFormElement>
  );
};

HvSearchBox.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied to the search box.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to searchbox root.
     */
    root: PropTypes.string
  }).isRequired,
  /**
   * Id to be applied to the root node.
   */
  id: PropTypes.string,
  /**
   * An Object containing the various text associated with the searchbox.
   */
  labels: PropTypes.shape({
    /**
     * Label on top of the searchbox.
     */
    inputLabel: PropTypes.string,
    /**
     * Placeholder value.
     */
    placeholder: PropTypes.string
  }),
  /**
   * The initial value of the searchbox
   */
  value: PropTypes.string,
  /**
   * The function that will be executed when the searchbox changes,
   * it receives the searchbox value
   */
  onChange: PropTypes.func,
  /**
   * The function that will be executed to received an array of objects that has a label and id to create list of suggestion
   */
  suggestionListCallback: PropTypes.func,
  /**
   * The function that will be executed after selecting a value in the suggestion list
   */
  suggestionSelectedCallback: PropTypes.func,
  /**
   * The function that will be executed onBlur, allows checking the validation state,
   * it receives the value and the validation state (´empty´, ´filled´, ´invalid´, ´valid´).
   */
  onBlur: PropTypes.func,
  /**
   * The function that will be executed onFocus, allows checking the value state,
   * it receives the value.
   */
  onFocus: PropTypes.func,
  /**
   * The function that will be executed onKeyDown, allows checking the value state,
   * it receives the value.
   */
  onKeyDown: PropTypes.func,
  /**
   * The function that will be executed on Enter, allows checking the value state,
   * it receives the value or event+value. On evocation we check for the number
   * of arguments associated with the function. Note that in the future rather
   * than accepting a value as argument, this will change to an event as argument
   */
  onSubmit: PropTypes.func,
  /**
   * If `true` it should autofocus.
   */
  autoFocus: PropTypes.bool,
  /**
   * If ´true´ the searchBox is disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The initial value of the searchBox.
   */
  initialValue: PropTypes.string
};

export default withStyles(styles, { name: "HvSearchBox" })(withLabels(DEFAULT_LABELS)(HvSearchBox));
