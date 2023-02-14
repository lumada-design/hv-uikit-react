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

// HV base props
export type HvBaseProps<E = HTMLDivElement, P = {}> = Omit<
  HTMLAttributes<E>,
  keyof P
>;

// This type allows to pass undetermined extra props to components
export type HvExtraProps = { [key: string]: any };

// This type allows to do a deep partial by applying the Partial type to each key recursively
export type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;

// This type combines the HvExtraProps and DeepPartial types
export type HvExtraDeepPartialProps<T> = Partial<{
  [P in keyof T]: DeepPartial<T[P]> & HvExtraProps;
}> &
  HvExtraProps;

// This type allows to pass undetermined extra props to components recursively
export type HvExtraDeepProps<T> = {
  [P in keyof T]: T[P] & HvExtraProps;
} & HvExtraProps;
