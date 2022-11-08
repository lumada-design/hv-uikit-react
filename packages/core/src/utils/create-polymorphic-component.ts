// https://github.com/mantinedev/mantine/blob/84615c5e410758b999015897ec80bae990f253ac/src/mantine-utils/src/create-polymorphic-component/create-polymorphic-component.ts

import React from "react";

// export function createPolymorphicComponent<
//   C extends React.ElementType = "div",
//   Props = {}
// >(component: any) {
//   return component as PolymorphicComponentProp<React.ElementType<C>, Props>;
// }

type ExtendedProps<Props = {}, OverrideProps = {}> = OverrideProps &
  Omit<Props, keyof OverrideProps>;

type ElementType =
  | keyof JSX.IntrinsicElements
  | React.JSXElementConstructor<any>;

type PropsOf<C extends ElementType> = JSX.LibraryManagedAttributes<
  C,
  React.ComponentPropsWithoutRef<C>
>;

type AsProp<C> = {
  as?: C;
};

type InheritedProps<C extends ElementType, Props = {}> = ExtendedProps<
  PropsOf<C>,
  Props
>;

export type PolymorphicRef<C> = C extends React.ElementType
  ? React.ComponentPropsWithRef<C>["ref"]
  : never;

export type PolymorphicComponentProps<
  C,
  Props = {}
> = C extends React.ElementType
  ? InheritedProps<C, Props & AsProp<C>> & { ref?: PolymorphicRef<C> }
  : Props & { component: React.ElementType };

export function createPolymorphicComponent<
  ComponentDefaultType,
  Props,
  StaticComponents = Record<string, never>
>(component: any) {
  type ComponentProps<C> = PolymorphicComponentProps<C, Props>;

  type InternalPolymorphicComponent = <C = ComponentDefaultType>(
    props: ComponentProps<C>
  ) => React.ReactElement;

  type ComponentProperties = Omit<
    React.FunctionComponent<ComponentProps<any>>,
    never
  >;

  type PolymorphicComponent = InternalPolymorphicComponent &
    ComponentProperties &
    StaticComponents;

  return component as PolymorphicComponent;
}
