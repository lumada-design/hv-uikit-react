// https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/#handling-valid-component-attributes-typescript-generics

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

type PolymorphicComponentRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> };

// Base Props
export type BaseProps<
  E extends keyof JSX.IntrinsicElements = "div",
  P = {}
> = Omit<JSX.IntrinsicElements[E], keyof P>;
