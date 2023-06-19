import { useEffect, useRef, useState } from "react";
import { HSLColor, HSVColor, RGBColor } from "react-color";
import * as color from "react-color/lib/helpers/color";
import { HvInput } from "@core/components";
import { ExtractNames } from "@core/utils";
import { staticClasses, useClasses } from "./Fields.styles";

export { staticClasses as colorPickerFieldsClasses };

export type HvColorPickerFieldsClasses = ExtractNames<typeof useClasses>;

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
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  classes?: HvColorPickerFieldsClasses;
}

export const Fields = ({
  className,
  onChange,
  rgb,
  hex,
  classes: classesProp,
}: FieldsProps) => {
  const { classes, cx } = useClasses(classesProp);
  const [internalHex, setInternalHex] = useState<string | undefined>(hex);
  const [internalRed, setInternalRed] = useState<number | undefined>(rgb?.r);
  const [internalGreen, setInternalGreen] = useState<number | undefined>(
    rgb?.g
  );
  const [internalBlue, setInternalBlue] = useState<number | undefined>(rgb?.b);

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
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (data.hex && color.isValidHex(data.hex)) {
      onChange(
        {
          hex: data.hex,
          source: "hex",
        },
        event
      );
    } else if (data.r || data.g || data.b) {
      onChange(
        {
          r: data.r || rgb?.r,
          g: data.g || rgb?.g,
          b: data.b || rgb?.b,
          source: "rgb",
        },
        event
      );
    }
  };

  const onChangeHex = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setInternalHex(value);
    handleChange({ hex: value }, event);
  };

  const onChangeRbg = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
    colorPart: "r" | "g" | "b"
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
      event
    );
  };

  return (
    <div className={cx(className, classes.fields)}>
      <HvInput
        inputRef={hexInputRef}
        className={classes.double}
        label="HEX"
        value={internalHex?.replace("#", "")}
        onChange={onChangeHex}
        onBlur={() => setInternalHex(hex)}
        disableClear
      />
      <HvInput
        inputRef={redInputRef}
        className={classes.single}
        label="R"
        value={`${internalRed}`}
        onChange={(event, value) => onChangeRbg(event, value, "r")}
        onBlur={() => setInternalRed(rgb?.r)}
        disableClear
      />
      <HvInput
        inputRef={greenInputRef}
        className={classes.single}
        label="G"
        value={`${internalGreen}`}
        onChange={(event, value) => onChangeRbg(event, value, "g")}
        onBlur={() => setInternalGreen(rgb?.g)}
        disableClear
      />
      <HvInput
        inputRef={blueInputRef}
        className={classes.single}
        label="B"
        value={`${internalBlue}`}
        onChange={(event, value) => onChangeRbg(event, value, "b")}
        onBlur={() => setInternalBlue(rgb?.b)}
        disableClear
      />
    </div>
  );
};
