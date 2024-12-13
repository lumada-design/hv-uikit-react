import { forwardRef, memo, useMemo } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@hitachivantara/uikit-react-utils";
import { getColor, HvColorAny, HvSize } from "@hitachivantara/uikit-styles";

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
    case "left":
    case true:
      return "180deg";
    case "up":
      return "-90deg";
    case "down":
      return "90deg";
    case "right":
    case false:
    default:
      return undefined;
  }
}

export interface SvgProps extends React.SVGProps<SVGSVGElement> {
  size?: HvSize | number;
  color?: HvColorAny;
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
  fontSize: svgSizeMap[size as HvSize] ?? size ?? svgSizeMap.sm,
}));

const defaultIconPathMap = {
  Add: "M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z",
  Box: "m0,0l16,0l0,16l-16,0l0,-16z", // "0 0 14 14,
  Calendar:
    "M10.5 2V0h-1v2h-3V0h-1v2H0v14h16V2zM15 15H1V3h14zM3 6h2v2H3zm4 0h2v2H7zm4 0h2v2h-2zm-8 4h2v2H3zm4 0h2v2H7zm4 0h2v2h-2z",
  Caution:
    "M8 16a8 8 0 1 1 8-8 8 8 0 0 1-8 8m-1 0a7 7 0 1 0-7-7 7 7 0 0 0 7 7m-1-8h2v2H7zm0 4h2v2H7z",
  Check:
    "m5.03,12.06l-3.76,-3.75l1.42,-1.42l2.24,2.25l6.3,-7.2l1.5,1.31l-7.7,8.81z", // "0 0 14 14,
  Chevron: "m5.39 14.15-.94-.94L9.67 8 4.45 2.79l.94-.94L11.55 8Z",
  Close:
    "m8.7 8 5.3 5.3-.7.7L8 8.7 2.7 14l-.7-.7L7.3 8 2 2.7l.7-.7L8 7.3 13.3 2l.7.7z",
  ColorPicker:
    "M15.41.57a2.05 2.05 0 0 0-2.82 0l-2.12 2.12-1.42-1.42-.7.71L14 7.64l.7-.7-1.4-1.42 2.1-2.12a2 2 0 0 0 0-2.83zm-.69 2.11L12.59 4.8l-1.42-1.42 2.12-2.12a1 1 0 0 1 1.42 1.42zM0 13v3h3l9-9-3-3zm2.59 2H1v-1.58l8-8L10.59 7z",
  CurrentStep: "M16 8a8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8 8 8 0 0 1 8 8",
  Delete: "M12 1H4V0h8zm4 1v1h-2.1L13 16H3L2.1 3H0V2zm-3 1H3.1L4 15h8.1z",
  Doc: "M9 0H2v16h12V5zm3.6 5H9V1.4zm.4 10H3V1h5v5h5z",
  Edit: "m13.17 7.07 3.24-3.24-2.83-2.83-3.24 3.24zm-2.83-4.24 2.83 2.83 1.42-1.42-2.83-2.83zm-2.7 2.7L1 12.16V15h2.83l6.65-6.65-2.83-2.83m-.01-1.4 4.24 4.24L4.24 16H0v-4.24z",
  End: "M13 0h1v16h-1zM2.58.58l-.7.7L8.57 8l-6.7 6.71.7.71L10 8z",
  Fail: "M7.5 4h1v6h-1zm0 8h1v-1h-1zM16 8a8 8 0 1 0-8 8 8 8 0 0 0 8-8m-1 0a7 7 0 1 1-7-7 7 7 0 0 1 7 7",
  Filters: "M1 2v1.6l6 6.1V14h2V9.7l6-6.1V2zM0 1h16v3l-6 6v5H6v-4.9L0 4z",
  Fullscreen:
    "M16 0v4.5h-1V1.7l-4.65 4.65-.7-.7L14.29 1H11.5V0zM4.5 1V0H0v4.5h1V1.7l4.65 4.65.7-.7L1.71 1zM15 14.3l-4.65-4.65-.7.7L14.29 15H11.5v1H16v-4.5h-1zM5.65 9.64 1 14.29V11.5H0V16h4.5v-1H1.7l4.65-4.65z",
  Info: "M8 16a8 8 0 1 1 8-8 8 8 0 0 1-8 8M8 1a6.96 6.96 0 0 0-7 6.91V8a6.96 6.96 0 0 0 6.91 7H8a6.96 6.96 0 0 0 7-6.91zm-.5 11h1V6h-1zm0-7h1V4h-1z",
  Menu: "M1 2v1.6l6 6.1V14h2V9.7l6-6.1V2zM0 1h16v3l-6 6v5H6v-4.9L0 4z",
  MoreOptionsHorizontal: "M9.1 7v2h-2V7zM2 7v2h2V7zm10 0v2h2V7z",
  MoreOptionsVertical: "M7 6.9h2v2H7zM7 4h2V2H7zm0 10h2v-2H7z",
  OtherStep: "M12 8a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4",
  Partial: "m3,8l8,0l0,-2l-8,0l0,2z", // "0 0 14 14,
  Preview:
    "M11 8a3 3 0 1 1-3-3 3 3 0 0 1 3 3m5 0s-3.58 6-8 6-8-6-8-6 4-6 8-6 8 6 8 6m-1.2.03a22 22 0 0 0-2-2.32C11.01 3.94 9.35 3 8 3s-3 .93-4.77 2.68a22 22 0 0 0-2.02 2.35 18 18 0 0 0 1.85 2.28C4.25 11.53 6.08 13 8 13s3.73-1.45 4.91-2.67a18 18 0 0 0 1.88-2.3z",
  PreviewOff:
    "M 14.640625 1 L 11.984375 3.65625 C 10.766498 2.7173979 9.3833195 2 8 2 C 4.000004 2 0 8 0 8 C 0 8 1.4017192 10.349034 3.5332031 12.107422 L 0.640625 15 L 1.3496094 15.699219 L 4.3359375 12.712891 C 5.4336512 13.464298 6.6791283 14 8 14 C 12.419996 14 16 8 16 8 C 16 8 14.657289 5.9904508 12.751953 4.296875 L 15.349609 1.6992188 L 14.640625 1 z M 8 3 C 8.961645 3 10.073487 3.471603 11.271484 4.3691406 L 9.9335938 5.7070312 A 3 3 0 0 0 8 5 A 3 3 0 0 0 5.7109375 9.9296875 L 4.25 11.390625 C 3.8087779 11.03413 3.4068988 10.658775 3.0605469 10.300781 A 18 18 0 0 1 1.2109375 8.0292969 A 22 22 0 0 1 3.2304688 5.6796875 C 4.990467 3.9296892 6.6400014 3 8 3 z M 12.048828 5 C 12.296705 5.2168644 12.547527 5.4488104 12.800781 5.6992188 A 22 22 0 0 1 14.800781 8.0292969 A 18 18 0 0 1 12.910156 10.330078 C 11.730157 11.550077 9.9199981 13 8 13 C 6.965871 13 5.9584733 12.572033 5.0625 11.986328 L 6.4824219 10.566406 A 3 3 0 0 0 11 8 A 3 3 0 0 0 10.578125 6.4707031 L 12.048828 5 z M 8 6 A 2 2 0 0 1 9.1601562 6.4804688 L 6.4804688 9.1601562 A 2 2 0 0 1 8 6 z M 9.7207031 7.328125 A 2 2 0 0 1 10 8 A 2 2 0 0 1 8 10 A 2 2 0 0 1 7.328125 9.7207031 L 9.7207031 7.328125 z",
  Search:
    "M15.07 14.52 10.5 9.95a5.96 5.96 0 1 0-.72.7l4.58 4.58zM5.9 11A4.95 4.95 0 0 1 1 6v-.1A4.95 4.95 0 0 1 6 1h.1A4.95 4.95 0 0 1 11 6v.1A4.95 4.95 0 0 1 6 11z",
  Selected: "m7,11a4,4 0 0 1 -4,-4a4,4 0 0 1 4,-4a4,4 0 0 1 4,4a4,4 0 0 1 -4,4", // "0 0 14 14",
  SortAscendingXS: "M.08 6.07 6.5.01l6.42 6.06Zm0 0",
  SortDescendingXS: "M1.76 5 6 .76 10.24 5z",
  SortXS: "M10.24 7 6 11.24 1.76 7zM1.76 5 6 .76 10.24 5z",
  Start:
    "M2.99 16.05H2v-16h.99zm2.97-8 7.34 7.41.7-.7-6.64-6.71L14 1.33l-.7-.7z",
  Success:
    "M6.39 12 4 9.61l.7-.7 1.62 1.6 4.65-5.57.77.64zM8 15a7 7 0 0 1-4.94-2.06A7.02 7.02 0 1 1 8 15m8-7a8 8 0 1 1 8-8 8 8 0 0 1-8 8",
  Time: "M8 15a7.02 7.02 0 1 0-4.94-2.06A7 7 0 0 0 8 15m0 1a8 8 0 1 1 8-8 8 8 0 0 1-8 8m2.65-4.65L7.5 8.21V3h1v4.8l2.85 2.85z",
  Unselected: "",
  User: "M9.6 8.7A4.5 4.5 0 0 0 8.04 0H8a4.5 4.5 0 0 0-4.5 4.46v.04a4.6 4.6 0 0 0 2.9 4.2A7.7 7.7 0 0 0 .5 16h1a6.5 6.5 0 0 1 6.47-6.5H8a6.5 6.5 0 0 1 6.5 6.47V16h1a7.5 7.5 0 0 0-5.9-7.3M4.5 4.5A3.54 3.54 0 0 1 8 1a3.54 3.54 0 0 1 3.5 3.5A3.54 3.54 0 0 1 8 8a3.54 3.54 0 0 1-3.5-3.5",
} satisfies Record<string, string>;

type IconName = keyof typeof defaultIconPathMap;

function HvIconInternal(
  props: SvgProps & { name: IconName },
  ref: React.Ref<SVGSVGElement>,
) {
  const { name, title, children, ...others } = props;
  const { activeTheme } = useTheme();

  const iconsPathMap = useMemo(
    () => ({ ...defaultIconPathMap, ...activeTheme?.icons }),
    [activeTheme?.icons],
  );

  return (
    <Svg
      ref={ref}
      data-name={name}
      viewBox={activeTheme?.icons?.viewbox ?? "0 0 16 16"}
      focusable={false}
      role={title ? "img" : "none"}
      {...others}
    >
      {title ? <title>{title}</title> : null}
      <path d={iconsPathMap[name]} />
    </Svg>
  );
}

export const HvIcon = memo(forwardRef(HvIconInternal));
