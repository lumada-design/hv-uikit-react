import StyledStack from "./Stack.styles";

export interface StackProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Stack component
 */
export const Stack = ({ children, className }: StackProps) => {
  return <StyledStack className={className}>{children}</StyledStack>;
};

export default Stack;

Stack.displayName = "Stack";
