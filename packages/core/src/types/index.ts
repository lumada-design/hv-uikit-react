import { HTMLAttributes } from "react";

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponent<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

export type PolymorphicComponentRef<
  C extends React.ElementType,
  Props = {}
> = PolymorphicComponent<C, Props> & { ref?: PolymorphicRef<C> };

export type HvBaseProps<E = HTMLDivElement, P = {}> = Omit<
  HTMLAttributes<E>,
  keyof P
>;
