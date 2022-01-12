import React from "react";

import { HvProvider, HvTooltip, HvTypography } from "@hitachivantara/uikit-react-core";

const Stable = ({}) => {
  const data = (
    <HvTypography>
      A Design System Stable pattern is tested and accepted in multiple design use cases. These
      patterns have a high degree of maturity hence updates will be frozen. Declared stable in June
      2020.
    </HvTypography>
  );

  return (
    <HvTooltip title={data}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="41"
        height="20"
        role="img"
        overflow="visible"
        aria-label="Mature"
      >
        <title>Design System Stable</title>
        <linearGradient id="a" x2="0" y2="100%">
          <stop offset="0" stopColor="#bbb" stopOpacity=".1" />
          <stop offset="1" stopOpacity=".1" />
        </linearGradient>
        <clipPath id="b">
          <rect width="50" height="20" rx="3" fill="#fff" />
        </clipPath>
        <g clipPath="url(#b)">
          <rect width="0" height="20" fill="#97ca00" />
          <rect x="0" width="50" height="20" fill="#97ca00" />
          <rect width="50" height="20" fill="url(#a)" />
        </g>
        <g
          fill="#fff"
          textAnchor="middle"
          fontFamily="Verdana,Geneva,DejaVu Sans,sans-serif"
          textRendering="geometricPrecision"
          fontSize="110"
        >
          <text
            aria-hidden="true"
            x="245"
            y="150"
            fill="#010101"
            fillOpacity=".3"
            transform="scale(.1)"
            textLength="390"
          >
            Stable
          </text>
          <text x="245" y="140" transform="scale(.1)" fill="#fff" textLength="390">
            Stable
          </text>
        </g>
      </svg>
    </HvTooltip>
  );
};
export default Stable;
