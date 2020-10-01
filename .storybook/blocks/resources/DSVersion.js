import React from "react";
import componentDefinitions from "../../../doc/GetStarted/ComponentVersioningTable/versions";

const DSVersion = (props) => {
  const { dsVersion } = props;
  const version = dsVersion ? dsVersion : componentDefinitions.dsVersion3;
  const svgTitle = `Design System: ${version}`;

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
        <stop offset="0" stop-color="#bbb" stop-opacity=".1" />
        <stop offset="1" stop-opacity=".1" />
      </linearGradient>
      <clipPath id="r">
        <rect width="64" height="20" rx="3" fill="#fff" />
      </clipPath>
      <g clip-path="url(#r)">
        <rect width="25" height="20" fill="#555" />
        <rect x="25" width="39" height="20" fill="#007ec6" />
        <rect width="64" height="20" fill="url(#s)" />
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
          x="135"
          y="150"
          fill="#010101"
          fill-opacity=".3"
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
          fill-opacity=".3"
          transform="scale(.1)"
          textLength="290"
        >
          {version}
        </text>
        <text x="435" y="140" transform="scale(.1)" fill="#fff" textLength="290">
          {version}
        </text>
      </g>
    </svg>
  );
};

export default DSVersion;
