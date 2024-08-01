import { forwardRef, memo } from "react";
import styled from "@emotion/styled";
import {
  getColor,
  HvColorAny,
  HvSize,
  theme,
} from "@hitachivantara/uikit-styles";

/** sizes for the <svg> icon */
const svgSizeMap = {
  xs: 12,
  sm: 16,
  md: 32,
  lg: 96,
  xl: 112,
} satisfies Record<HvSize, number>;

function getRotation(rotation?: SvgProps["rotation"]) {
  switch (rotation) {
    case "down":
    case true:
      return "180deg";
    case "left":
      return "270deg";
    case "right":
      return "90deg";
    case "up":
    case false:
    default:
      return undefined;
  }
}

export interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: HvSize;
  color?: HvColorAny;
  viewBox?: string;
  compact?: boolean;
  title?: string;
  rotation?: boolean | "up" | "down" | "left" | "right";
}

const Svg = styled("svg")<SvgProps>(({ size, color, compact, rotation }) => ({
  display: "inline-block",
  fill: "currentcolor",
  width: "1em",
  height: "1em",
  flexShrink: 0,
  transition: "rotate 0.2s ease",
  rotate: getRotation(rotation),
  margin: compact ? 0 : size === "xs" ? 10 : 8,
  color: getColor(color) ?? "inherit",
  fontSize: svgSizeMap[size!] ?? svgSizeMap.sm,
}));

function makeIcon(children: React.ReactNode, viewBox = "0 0 16 16") {
  // eslint-disable-next-line react/function-component-definition
  function Icon({ title, ...others }: SvgProps, ref: React.Ref<SVGSVGElement>) {
    return (
      <Svg
        ref={ref}
        viewBox={viewBox}
        focusable={false}
        role={title ? "img" : "none"}
        {...others}
      >
        {title ? <title>{title}</title> : null}
        {children}
      </Svg>
    );
  }

  return memo(forwardRef(Icon));
}

export const Box = makeIcon(
  <path d="m0,0l16,0l0,16l-16,0l0,-16z" />,
  "0 0 14 14",
);

export const Check = makeIcon(
  <path d="m5.03,12.06l-3.76,-3.75l1.42,-1.42l2.24,2.25l6.3,-7.2l1.5,1.31l-7.7,8.81z" />,
  "0 0 14 14",
);

export const Partial = makeIcon(
  <path d="m3,8l8,0l0,-2l-8,0l0,2z" />,
  "0 0 14 14",
);

export const Selected = makeIcon(
  <path d="m7,11a4,4 0 0 1 -4,-4a4,4 0 0 1 4,-4a4,4 0 0 1 4,4a4,4 0 0 1 -4,4" />,
  "0 0 14 14",
);

export const Unselected = makeIcon(null, "0 0 14 14");

export const DropXS = makeIcon(
  <path d="m10.6 7.95-.7.7L6 4.75l-3.9 3.9-.7-.7L6 3.35z" />,
  "0 0 12 12",
);

export const MoreOptionsHorizontal = makeIcon(
  <path d="M9.1 7v2h-2V7zM2 7v2h2V7zm10 0v2h2V7z" />,
);

export const MoreOptionsVertical = makeIcon(
  <path d="M7 6.9h2v2H7zM7 4h2V2H7zm0 10h2v-2H7z" />,
);

export const Info = makeIcon(
  <path d="M8 16a8 8 0 1 1 8-8 8 8 0 0 1-8 8M8 1a6.96 6.96 0 0 0-7 6.91V8a6.96 6.96 0 0 0 6.91 7H8a6.96 6.96 0 0 0 7-6.91V8a6.96 6.96 0 0 0-6.91-7zm-.5 11h1V6h-1zm0-7h1V4h-1z" />,
);

export const User = makeIcon(
  <path d="M9.6 8.7A4.5 4.5 0 0 0 8.04 0H8a4.5 4.5 0 0 0-4.5 4.46v.04a4.6 4.6 0 0 0 2.9 4.2A7.7 7.7 0 0 0 .5 16h1a6.5 6.5 0 0 1 6.47-6.5H8a6.5 6.5 0 0 1 6.5 6.47V16h1a7.5 7.5 0 0 0-5.9-7.3M4.5 4.5A3.54 3.54 0 0 1 8 1a3.54 3.54 0 0 1 3.5 3.5A3.54 3.54 0 0 1 8 8a3.54 3.54 0 0 1-3.5-3.5" />,
);

export const Close = makeIcon(
  <path d="m8.7 8 5.3 5.3-.7.7L8 8.7 2.7 14l-.7-.7L7.3 8 2 2.7l.7-.7L8 7.3 13.3 2l.7.7z" />,
);

export const Fullscreen = makeIcon(
  <path d="M16 0v4.5h-1V1.7l-4.65 4.65-.7-.7L14.29 1H11.5V0zM4.5 1V0H0v4.5h1V1.7l4.65 4.65.7-.7L1.71 1zM15 14.3l-4.65-4.65-.7.7L14.29 15H11.5v1H16v-4.5h-1zM5.65 9.64 1 14.29V11.5H0V16h4.5v-1H1.7l4.65-4.65z" />,
);

export const ColorPicker = makeIcon(
  <path d="M15.41.57a2.05 2.05 0 0 0-2.82 0l-2.12 2.12-1.42-1.42-.7.71L14 7.64l.7-.7-1.4-1.42 2.1-2.12a2 2 0 0 0 0-2.83zm-.69 2.11L12.59 4.8l-1.42-1.42 2.12-2.12a1 1 0 0 1 1.42 1.42zM0 13v3h3l9-9-3-3zm2.59 2H1v-1.58l8-8L10.59 7z" />,
);

export const Add = makeIcon(
  <path d="M16 8.5H8.5V16h-1V8.5H0v-1h7.5V0h1v7.5H16z" />,
);

export const Calendar = makeIcon(
  <path d="M10.5 2V0h-1v2h-3V0h-1v2H0v14h16V2zM15 15H1V3h14zM3 6h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm-8 4h2v2H3zm4 0h2v2H7zm4 0h2v2h-2z" />,
);

export const CurrentStep = makeIcon(
  <path d="M16 8a8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8" />,
);

export const OtherStep = makeIcon(
  <path d="M12 8a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4" />,
);

export const Doc = makeIcon(
  <path d="M9 0H2v16h12V5zm3.6 5H9V1.4zm.4 10H3V1h5v5h5z" />,
);

export const Fail = makeIcon(
  <path d="M7.5 4h1v6h-1zm0 8h1v-1h-1zM16 8a8 8 0 1 0-8 8 8 8 0 0 0 8-8m-1 0a7 7 0 1 1-7-7 7 7 0 0 1 7 7" />,
);

export const Success = makeIcon(
  <path d="M6.39 12 4 9.61l.7-.7 1.62 1.6 4.65-5.57.77.64zM8 15a7 7 0 0 1-4.94-2.06A7.02 7.02 0 1 1 8 15m8-7a8 8 0 1 0-8 8 8 8 0 0 0 8-8" />,
);

export const Preview = makeIcon(
  <path d="M11 8a3 3 0 1 1-3-3 3 3 0 0 1 3 3m5 0s-3.58 6-8 6-8-6-8-6 4-6 8-6 8 6 8 6m-1.2.03a22 22 0 0 0-2-2.32C11.01 3.94 9.35 3 8 3s-3 .93-4.77 2.68a22 22 0 0 0-2.02 2.35 18 18 0 0 0 1.85 2.28C4.25 11.53 6.08 13 8 13s3.73-1.45 4.91-2.67a18 18 0 0 0 1.88-2.3z" />,
);

export const PreviewOff = makeIcon(
  <>
    <path d="M8 5a3 3 0 1 0 3 3 3 3 0 0 0-3-3m0 5a2 2 0 1 1 2-2 2 2 0 0 1-2 2m0-8C4 2 0 8 0 8s3.58 6 8 6 8-6 8-6-4-6-8-6m4.91 8.33C11.73 11.55 9.92 13 8 13s-3.75-1.47-4.94-2.7a18 18 0 0 1-1.85-2.27 22 22 0 0 1 2.02-2.35C4.99 3.93 6.64 3 8 3s3.02.94 4.8 2.7a22 22 0 0 1 2 2.33 18 18 0 0 1-1.89 2.3" />
    <path d="m.64 15 14-14 .71.7-14 14z" />
  </>,
);

export const Search = makeIcon(
  <path d="M15.07 14.52 10.5 9.95a5.96 5.96 0 1 0-.72.7l4.58 4.58zM5.9 11A4.95 4.95 0 0 1 1 6v-.1A4.95 4.95 0 0 1 6 1h.1A4.95 4.95 0 0 1 11 6v.1A4.95 4.95 0 0 1 6 11z" />,
);

export const Filters = makeIcon(
  <path d="M1 2v1.6l6 6.1V14h2V9.7l6-6.1V2zM0 1h16v3l-6 6v5H6v-4.9L0 4z" />,
);

export const Edit = makeIcon(
  <path d="M13.17 7.07 8.93 2.83 11.76 0 16 4.24zm-2.83-4.24 2.83 2.83 1.42-1.42-2.83-2.83zm-2.7 2.7L1 12.16V15h2.83l6.65-6.65-2.83-2.83m-.01-1.4 4.24 4.24L4.24 16H0v-4.24z" />,
);

export const Delete = makeIcon(
  <path d="M12 1H4V0h8zm4 1v1h-2.1L13 16H3L2.1 3H0V2zm-3 1H3.1L4 15h8.1z" />,
);

export const SortXS = makeIcon(
  <path d="M10.24 7 6 11.24 1.76 7zM1.76 5 6 .76 10.24 5z" />,
);

export const SortAscendingXS = makeIcon(
  <>
    <path d="M.08 6.07 6.5.01l6.42 6.06Zm0 0" />
    <path fill={theme.colors.atmo4} d="M12.92 8.93 6.5 14.99.08 8.93Zm0 0" />
  </>,
);

export const SortDescendingXS = makeIcon(
  <>
    <path d="M1.76 5 6 .76 10.24 5z" />
    <path fill={theme.colors.atmo4} d="M10.24 7 6 11.24 1.76 7z" />
  </>,
);

export const Time = makeIcon(
  <path d="M8 15a7.02 7.02 0 1 0-4.94-2.06A7 7 0 0 0 8 15m0 1a8 8 0 1 1 8-8 8 8 0 0 1-8 8m2.65-4.65L7.5 8.21V3h1v4.8l2.85 2.85z" />,
);

export const Backwards = makeIcon(
  <path d="M11.3 15.5 4 8 11.3.5l.7.8L5.38 8 12 14.8z" />,
);
export const End = makeIcon(
  <path d="M13 0h1v16h-1zM2.58.58l-.7.7L8.57 8l-6.7 6.71.7.71L10 8z" />,
);
export const Forwards = makeIcon(
  <path d="M4.79 15.5 4 14.8 10.62 8 4 1.3l.79-.8L12 8z" />,
);
export const Start = makeIcon(
  <path d="M2.99 16.05H2v-16h.99zm2.97-8 7.34 7.41.7-.7-6.64-6.71L14 1.33l-.7-.7z" />,
);

export const Menu = makeIcon(
  <path d="M0 7.4h16v1H0zM0 3h16V2H0zm0 11h16v-1H0z" />,
);

export const Caution = makeIcon(
  <path d="M7.5 6h1v4h-1zm0 7h1v-1h-1zm8.5 2H0L8 1zM1.72 14h12.56L8 3.02z" />,
);
