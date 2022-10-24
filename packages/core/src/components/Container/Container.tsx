import { StyledContainer } from "./Container.styles";

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container component
 */
export const Container = ({ children, className }: ContainerProps) => {
  return <StyledContainer className={className}>{children}</StyledContainer>;
};

export default Container;

Container.displayName = "Container";
