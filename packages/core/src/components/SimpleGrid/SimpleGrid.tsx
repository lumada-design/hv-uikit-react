import StyledSimpleGrid from "./SimpleGrid.styles";

export interface SimpleGridProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * SimpleGrid component
 */
export const SimpleGrid = ({ children, className }: SimpleGridProps) => {
  return <StyledSimpleGrid className={className}>{children}</StyledSimpleGrid>;
};

export default SimpleGrid;

SimpleGrid.displayName = "SimpleGrid";
