import React from "react";

export function createPolymorphicComponent<
  C extends React.ElementType = "div",
  Props = {}
>(component: any) {
  return component as PolymorphicComponentProp<React.ElementType<C>, Props>;
}
