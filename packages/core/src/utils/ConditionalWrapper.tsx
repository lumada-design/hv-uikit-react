export const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition?: boolean;
  wrapper: any;
  children: React.ReactNode;
}) => (condition ? wrapper(children) : children);
