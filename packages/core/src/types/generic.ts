import { forwardRef } from "react";
import type {
  HvExtraDeepProps,
  HvExtraProps,
} from "@hitachivantara/uikit-react-shared";

export type { HvExtraProps, HvExtraDeepProps };

type AsProp<C extends React.ElementType> = {
  /** Custom element type to override the root component */
  component?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

// Workaround to fix the use of Omit with ComponentPropsWithoutRef
// Without this the event handlers return any instead of the type for the chosen element
type FixComponentProps<T> = T extends any ? T : never;

type PolymorphicComponent<
  C extends React.ElementType,
  Props = {},
> = React.PropsWithChildren<Props & AsProp<C>> &
  FixComponentProps<
    Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>
  >;

export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];

export type PolymorphicComponentRef<
  C extends React.ElementType,
  Props = {},
> = PolymorphicComponent<C, Props> & { ref?: PolymorphicRef<C> };

/** HV Base Props. Extends `React.HTMLAttributes` of an element `E`, and filters `K` keys. */
export type HvBaseProps<
  E extends HTMLElement = HTMLDivElement,
  K extends keyof React.HTMLAttributes<E> = never,
> = Omit<React.HTMLAttributes<E>, K>;

/** This type allows to do a deep partial by applying the Partial type to each key recursively */
export type DeepPartial<T> = T extends Object
  ? Partial<{
      [P in keyof T]: DeepPartial<T[P]>;
    }>
  : T;

/** This type combines the HvExtraProps and DeepPartial types */
export type HvExtraDeepPartialProps<T> = Partial<{
  [P in keyof T]: DeepPartial<T[P]> & HvExtraProps;
}> &
  HvExtraProps;

export type Arrayable<T> = T | T[];

/** React.forwardRef with fixed type declarations */
export function fixedForwardRef<T, P = {}>(
  // TODO: change `React.ReactElement | null` to `React.ReactNode` in typescript@5
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null,
): (props: P & React.RefAttributes<T>) => React.ReactElement | null {
  return forwardRef(render) as any;
}

// Source code from: https://github.com/piotrwitek/utility-types/blob/master/src/mapped-types.ts
/**
 * Optional
 * @desc From `T` make a set of properties by key `K` become optional
 * @example
 *    type Props = {
 *      name: string;
 *      age: number;
 *      visible: boolean;
 *    };
 *
 *    // Expect: { name?: string; age?: number; visible?: boolean; }
 *    type Props = Optional<Props>;
 *
 *    // Expect: { name: string; age?: number; visible?: boolean; }
 *    type Props = Optional<Props, 'age' | 'visible'>;
 */
export type HvOptional<T extends object, K extends keyof T = keyof T> = Omit<
  T,
  K
> &
  Partial<Pick<T, K>>;
