import React from "react";

const DSVersion = ({ dsVersion, fill = "#477DBD" }) => {
  const svgTitle = `Design System: ${dsVersion}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="20"
      role="img"
      aria-label="Design System Version: 3.1.0"
    >
      <title>{svgTitle}</title>
      <linearGradient id="s" x2="0" y2="100%">
        <stop offset="0" stopColor="#bbb" stopOpacity=".1" />
        <stop offset="1" stopOpacity=".1" />
      </linearGradient>
      <clipPath id="r">
        <rect width="64" height="20" rx="3" fill="#fff" />
      </clipPath>
      <g clipPath="url(#r)">
        <rect width="25" height="20" fill="#555" />
        <rect x="25" width="39" height="20" fill={fill} />
        <rect width="64" height="20" fill="url(#s)" />
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
          x="135"
          y="150"
          fill="#010101"
          fillOpacity=".3"
          transform="scale(.1)"
          textLength="150"
        >
          DS
        </text>
        <text x="135" y="140" transform="scale(.1)" fill="#fff" textLength="150">
          DS
        </text>
        <text
          aria-hidden="true"
          x="435"
          y="150"
          fill="#010101"
          fillOpacity=".3"
          transform="scale(.1)"
          textLength="290"
        >
          {dsVersion}
        </text>
        <text x="435" y="140" transform="scale(.1)" fill="#fff" textLength="290">
          {dsVersion}
        </text>
      </g>
    </svg>
  );
};

export default DSVersion;
