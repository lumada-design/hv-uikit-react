/* eslint-disable no-param-reassign */

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as color from "react-color/lib/helpers/color";

import { HvInput } from "@hv/uikit-react-core";

import useStyles from "./styles";

// eslint-disable-next-line react/prop-types
export const Fields = ({ onChange, rgb, hex }) => {
  const classes = useStyles();
  const [internalHex, setInternalHex] = useState(hex);
  const [internalRed, setInternalRed] = useState(rgb.r);
  const [internalGreen, setInternalGreen] = useState(rgb.g);
  const [internalBlue, setInternalBlue] = useState(rgb.b);

  const hexInputRef = useRef();
  const redInputRef = useRef();
  const greenInputRef = useRef();
  const blueInputRef = useRef();

  useEffect(() => {
    if (document.activeElement !== hexInputRef.current) {
      setInternalHex(hex);
    }
  }, [hex]);

  useEffect(() => {
    if (document.activeElement !== redInputRef.current) {
      setInternalRed(rgb.r);
    }

    if (document.activeElement !== greenInputRef.current) {
      setInternalGreen(rgb.g);
    }

    if (document.activeElement !== blueInputRef.current) {
      setInternalBlue(rgb.b);
    }
  }, [rgb]);

  const handleChange = (data, e) => {
    if (data.hex && color.isValidHex(data.hex)) {
      onChange(
        {
          hex: data.hex,
          source: "hex",
        },
        e
      );
    } else if (data.r || data.g || data.b) {
      onChange(
        {
          r: data.r || rgb.r,
          g: data.g || rgb.g,
          b: data.b || rgb.b,
          source: "rgb",
        },
        e
      );
    }
  };

  const onChangeHex = (_evt, value) => {
    setInternalHex(value);
    handleChange({ hex: value }, _evt);
  };

  const onChangeRbg = (_evt, value, colorPart) => {
    if (colorPart === "r") setInternalRed(value);
    if (colorPart === "g") setInternalGreen(value);
    if (colorPart === "b") setInternalBlue(value);
    handleChange(
      {
        r: colorPart === "r" ? value : rgb.r,
        g: colorPart === "g" ? value : rgb.g,
        b: colorPart === "b" ? value : rgb.b,
      },
      _evt
    );
  };

  return (
    <div className={clsx(classes.fields)}>
      <HvInput
        inputRef={hexInputRef}
        className={clsx(classes.double)}
        label="HEX"
        value={internalHex.replace("#", "")}
        onChange={onChangeHex}
        onBlur={() => setInternalHex(hex)}
        disableClear
      />
      <HvInput
        inputRef={redInputRef}
        className={clsx(classes.single)}
        label="R"
        value={`${internalRed}`}
        onChange={(_evt, value) => onChangeRbg(_evt, value, "r")}
        onBlur={() => setInternalRed(rgb.r)}
        disableClear
      />
      <HvInput
        inputRef={greenInputRef}
        className={clsx(classes.single)}
        label="G"
        value={`${internalGreen}`}
        onChange={(_evt, value) => onChangeRbg(_evt, value, "g")}
        onBlur={() => setInternalGreen(rgb.g)}
        disableClear
      />
      <HvInput
        inputRef={blueInputRef}
        className={clsx(classes.single)}
        label="B"
        value={`${internalBlue}`}
        onChange={(_evt, value) => onChangeRbg(_evt, value, "b")}
        onBlur={() => setInternalBlue(rgb.b)}
        disableClear
      />
    </div>
  );
};

Fields.propTypes = {
  rgb: PropTypes.shape({
    r: PropTypes.number,
    g: PropTypes.number,
    b: PropTypes.number,
  }).isRequired,
};

export default Fields;
