import { useEffect, useRef, useState } from "react";
import { HSLColor, HSVColor, RGBColor } from "react-color";
// @ts-ignore
import * as color from "react-color/lib/helpers/color";
import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvInput } from "../../Input";
import { useClasses } from "./Fields.styles";

interface FieldsProps {
  className?: string;
  rgb?: RGBColor;
  hex?: string;
  onChange: (
    data:
      | HSLColor
      | HSVColor
      | RGBColor
      | {
          source?: string;
          hex?: string;
        },
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  classes?: ExtractNames<typeof useClasses>;
}

export const Fields = (props: FieldsProps) => {
  const {
    className,
    onChange,
    rgb,
    hex,
    classes: classesProp,
  } = useDefaultProps("HvColorPickerFields", props);
  const { classes, cx } = useClasses(classesProp);
  const [internalHex, setInternalHex] = useState(hex);
  const [internalRed, setInternalRed] = useState(rgb?.r);
  const [internalGreen, setInternalGreen] = useState(rgb?.g);
  const [internalBlue, setInternalBlue] = useState(rgb?.b);

  const hexInputRef = useRef<HTMLInputElement>(null);
  const redInputRef = useRef<HTMLInputElement>(null);
  const greenInputRef = useRef<HTMLInputElement>(null);
  const blueInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (document.activeElement !== hexInputRef.current) {
      setInternalHex(hex);
    }
  }, [hex]);

  useEffect(() => {
    if (document.activeElement !== redInputRef.current) {
      setInternalRed(rgb?.r);
    }

    if (document.activeElement !== greenInputRef.current) {
      setInternalGreen(rgb?.g);
    }

    if (document.activeElement !== blueInputRef.current) {
      setInternalBlue(rgb?.b);
    }
  }, [rgb]);

  const handleChange = (
    data: {
      hex?: string;
      r?: number;
      g?: number;
      b?: number;
    },
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (data.hex && color.isValidHex(data.hex)) {
      onChange(
        {
          hex: data.hex,
          source: "hex",
        },
        event,
      );
    } else if (
      data.r !== undefined ||
      data.g !== undefined ||
      data.b !== undefined
    ) {
      onChange(
        {
          r: data.r ?? rgb?.r,
          g: data.g ?? rgb?.g,
          b: data.b ?? rgb?.b,
          source: "rgb",
        },
        event,
      );
    }
  };

  const onChangeHex = (event: React.ChangeEvent<any>, value: string) => {
    setInternalHex(value);
    handleChange({ hex: value }, event);
  };

  const onChangeRbg = (
    event: React.ChangeEvent<any>,
    value: string,
    colorPart: "r" | "g" | "b",
  ) => {
    if (colorPart === "r") setInternalRed(Number(value));
    if (colorPart === "g") setInternalGreen(Number(value));
    if (colorPart === "b") setInternalBlue(Number(value));

    handleChange(
      {
        r: colorPart === "r" ? Number(value) : rgb?.r,
        g: colorPart === "g" ? Number(value) : rgb?.g,
        b: colorPart === "b" ? Number(value) : rgb?.b,
      },
      event,
    );
  };

  return (
    <div className={cx(classes.fields, className)}>
      <HvInput
        ref={hexInputRef}
        className={classes.double}
        label="HEX"
        value={internalHex?.replace("#", "")}
        onChange={onChangeHex}
        onBlur={() => setInternalHex(hex)}
        disableClear
      />
      <HvInput
        ref={redInputRef}
        className={classes.single}
        label="R"
        value={internalRed}
        onChange={(event, value) => onChangeRbg(event, value, "r")}
        onBlur={() => setInternalRed(rgb?.r)}
        inputProps={{ type: "number", min: 0, max: 255 }}
        disableClear
      />
      <HvInput
        ref={greenInputRef}
        className={classes.single}
        label="G"
        value={internalGreen}
        onChange={(event, value) => onChangeRbg(event, value, "g")}
        onBlur={() => setInternalGreen(rgb?.g)}
        inputProps={{ type: "number", min: 0, max: 255 }}
        disableClear
      />
      <HvInput
        ref={blueInputRef}
        className={classes.single}
        label="B"
        value={internalBlue}
        onChange={(event, value) => onChangeRbg(event, value, "b")}
        onBlur={() => setInternalBlue(rgb?.b)}
        inputProps={{ type: "number", min: 0, max: 255 }}
        disableClear
      />
    </div>
  );
};
