import React from "react";
import { HvProvider, HvTooltip, HvTypography } from "../../../packages/core";

const Stable = ({}) => {
  const data = (
    <HvTypography>
      A Design System Stable pattern is tested and accepted in multiple design use cases. These
      patterns have a high degree of maturity hence updates will be frozen. Declared stable in June
      2020.
    </HvTypography>
  );

  return (
    <HvProvider>
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
            <stop offset="0" stop-color="#bbb" stop-opacity=".1" />
            <stop offset="1" stop-opacity=".1" />
          </linearGradient>
          <clipPath id="b">
            <rect width="50" height="20" rx="3" fill="#fff" />
          </clipPath>
          <g clip-path="url(#b)">
            <rect width="0" height="20" fill="#97ca00" />
            <rect x="0" width="50" height="20" fill="#97ca00" />
            <rect width="50" height="20" fill="url(#a)" />
          </g>
          <g
            fill="#fff"
            text-anchor="middle"
            font-family="Verdana,Geneva,DejaVu Sans,sans-serif"
            text-rendering="geometricPrecision"
            font-size="110"
          >
            <text
              aria-hidden="true"
              x="245"
              y="150"
              fill="#010101"
              fill-opacity=".3"
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
    </HvProvider>
  );
};
export default Stable;
