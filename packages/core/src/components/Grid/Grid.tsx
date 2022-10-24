import StyledGrid from "./Grid.styles";

export interface GridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Grid component
 */
export const Grid = ({ children, className }: GridProps) => {
  return <StyledGrid className={className}>{children}</StyledGrid>;
};

export default Grid;

Grid.displayName = "Grid";
