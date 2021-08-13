import React from "react";
import PropTypes from "prop-types";

import { Swatch } from "react-color/lib/components/common";

import useStyles from "./styles";

export const SketchPresetColors = ({ colors, onClick = () => {} }) => {
  const classes = useStyles();

  const handleClick = (hex, e) => {
    onClick(
      {
        hex,
        source: "hex",
      },
      e
    );
  };

  return (
    <div className={classes.colors}>
      {colors.map((colorObjOrString) => {
        const c =
          typeof colorObjOrString === "string" ? { color: colorObjOrString } : colorObjOrString;
        const key = `${c.color}${c.title || ""}`;
        return (
          <div key={key} className={classes.swatchWrap}>
            <Swatch
              {...c}
              className={classes.swatch}
              onClick={handleClick}
              focusStyle={{
                boxShadow: `inset 0 0 0 1px rgba(0,0,0,.15), 0 0 4px ${c.color}`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

SketchPresetColors.propTypes = {
  colors: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        color: PropTypes.string,
        title: PropTypes.string,
      }),
    ])
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SketchPresetColors;
