import {
  StyledRoot,
  StyledContainer,
  StyledLinearProgress,
} from "./ProgressColumnCell.styles";

export interface HvProgressColumnCellProp {
  /** Current value of the bar. */
  partial: number;
  /** Maximum value of the bar. */
  total: number;
  /** The color of the bar. */
  color?: "primary" | "secondary";
}

export const normalizeProgressBar = (value: number, max: number) => {
  return max > 0 ? Math.floor((value * 100) / max) : 0;
};

const HvProgressColumnCell = ({
  partial,
  total,
  color = "primary",
}: HvProgressColumnCellProp): JSX.Element => {
  const percentage = normalizeProgressBar(partial, total);

  return (
    <StyledRoot>
      <StyledContainer>
        <StyledLinearProgress
          color={color}
          variant="determinate"
          value={percentage}
        />
      </StyledContainer>
    </StyledRoot>
  );
};

export default HvProgressColumnCell;
