import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import uniqueId from "lodash/uniqueId";
import { withStyles } from "@material-ui/core";
import { HvBaseInput, HvTag } from "@hv/uikit-react-core";
import { useControlled } from "@hv/uikit-react-core/dist/utils";
import styles from "./styles";

/**
 * Tag Input description
 */
const HvTagInput = (props) => {
  const {
    className,
    classes,
    value,
    defaultValue = "",
    tags: tagsProp,
    defaultTags = [],
    onChange,
    inputRef,
    ...others
  } = props;

  const [tags, setTags] = useControlled(tagsProp, defaultTags);

  const onChangeHandler = (event) => {
    const { value: newValue } = event.target;

    onChange?.(event, newValue);
  };

  const onKeyPressHandler = (event) => {
    const { value: newValue } = event.target;

    if (event.key === "Enter" && newValue) {
      setTags([...tags, { label: newValue }]);
      onChange?.(event, "");
    }
  };

  const handleDelete = (tag) => {
    setTags((prevTags) => prevTags.filter((prevTag) => prevTag.label !== tag.label));
  };

  return (
    <div className={clsx(className, classes.root)} {...others}>
      <div className={classes.tags}>
        {tags.map((tag) => (
          <HvTag key={uniqueId("tag-")} label={tag.label} onDelete={() => handleDelete(tag)} />
        ))}
      </div>
      <HvBaseInput
        type="text"
        value={value}
        inputRef={inputRef}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        classes={{
          input: classes.input,
          inputRoot: classes.inputRoot,
          inputBorderContainer: classes.inputBorderContainer,
        }}
      />
    </div>
  );
};

HvTagInput.propTypes = {
  /**
   * Class names to be applied.
   */
  className: PropTypes.string,
  /**
   * A Jss Object used to override or extend the styles applied.
   */
  classes: PropTypes.shape({
    /**
     * Styles applied to the component root class.
     */
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles, { name: "HvTagInput" })(HvTagInput);
