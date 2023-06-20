import { HTMLAttributes } from "react";

import type {
  HvExtraProps,
  HvExtraDeepProps,
} from "@hitachivantara/uikit-react-shared";

export type { HvExtraProps, HvExtraDeepProps };

type AsProp<C extends React.ElementType> = {
  component?: C;
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

/** HV Base Props. Extends `HTMLAttributes` of an element `E`, and filters `K` keys. */
export type HvBaseProps<
  E extends HTMLElement = HTMLDivElement,
  K extends keyof HTMLAttributes<E> = never
> = Omit<HTMLAttributes<E>, K>;

/** This type allows to do a deep partial by applying the Partial type to each key recursively */
type DeepPartial<T> = Partial<{ [P in keyof T]: DeepPartial<T[P]> }>;

/** This type combines the HvExtraProps and DeepPartial types */
export type HvExtraDeepPartialProps<T> = Partial<{
  [P in keyof T]: DeepPartial<T[P]> & HvExtraProps;
}> &
  HvExtraProps;

export type NonEmptyArray<T> = [T, ...T[]];

export type Arrayable<T> = T | NonEmptyArray<T>;
