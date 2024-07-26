import {
  ExtractNames,
  fixedForwardRef,
  PolymorphicComponentRef,
  PolymorphicRef,
  useDefaultProps,
} from "@hitachivantara/uikit-react-core";

import { staticClasses, useClasses } from "./Card.styles";

export { staticClasses as cardClasses };

export type HvCardClasses = ExtractNames<typeof useClasses>;

export type HvCardProps<C extends React.ElementType = "div"> =
  PolymorphicComponentRef<
    C,
    {
      /** A Jss Object used to override or extend the styles applied. */
      classes?: HvCardClasses;
    }
  >;

/**
 * The Pentaho Card component.
 */
export const HvCard = fixedForwardRef(function HvCard<
  C extends React.ElementType = "div",
>(props: HvCardProps<C>, ref: PolymorphicRef<C>) {
  const {
    classes: classesProp,
    className,
    component: Component = "div",
    onClick: onClickProp,
    onMouseDown: onMouseDownProp,
    children,
    ...others
  } = useDefaultProps("HvCard", props);

  const { classes, cx } = useClasses(classesProp);

  const handleClick: HvCardProps["onClick"] = (e) => {
    onClickProp?.(e);
  };

  const handleMouseDown: HvCardProps["onMouseDown"] = (e) => {
    onMouseDownProp?.(e);
  };

  return (
    <Component
      ref={ref}
      className={cx(classes.root, className)}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      {...others}
    >
      {children}
    </Component>
  );
});
