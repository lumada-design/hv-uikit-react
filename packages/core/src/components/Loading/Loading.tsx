import { theme } from "@hitachivantara/uikit-styles";
import clsx from "clsx";
import range from "lodash/range";
import { HvBaseProps } from "../../types";
import {
  StyledBar,
  StyledBarContainer,
  StyledLabel,
  StyledRoot,
} from "./Loading.styles";

export type HvLoadingProps = HvBaseProps<HTMLDivElement> & {
  /** Indicates if the component should be render in a small size. */
  small?: boolean;
  /** The label to be displayed.  */
  label?: string | React.ReactNode;
  /** Whether the loading animation is hidden. */
  hidden?: boolean;
  /** Color applied to the bars. */
  color?: string;
  classes?: {
    root?: string;
    barContainer?: string;
    loadingBar?: string;
    label?: string;
    overlay?: string;
    blur?: string;
    hidden?: string;
  };
};

/**
 * Loading provides feedback about a process that is taking place in the application.
 */
export const HvLoading = (props: HvLoadingProps) => {
  const { color, hidden, small, label, classes, className, ...others } = props;

  const getColor = (colorName) => {
    return color ? theme.colors[color] || color : theme.colors[colorName];
  };

  const size = small ? "small" : "regular";
  const colorVariant = color ? "Color" : "";
  const variant = `${size}${colorVariant}`;

  const inline = { backgroundColor: getColor(small ? "acce1" : "acce3") };
  return (
    <StyledRoot
      hidden={!!hidden}
      className={clsx(className, classes?.root, "hidden")}
      {...others}
    >
      <StyledBarContainer>
        {range(0, 3).map((e) => (
          <StyledBar
            key={e}
            style={inline}
            className={clsx(classes?.loadingBar, variant)}
            variant={variant}
          ></StyledBar>
        ))}
      </StyledBarContainer>
      {label && <StyledLabel variant="caption1">{label}</StyledLabel>}
    </StyledRoot>
  );
};
