import { forwardRef, AllHTMLAttributes, Ref } from "react";

import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";
import { useTheme } from "@core/hooks/useTheme";
import { useDefaultProps } from "@core/hooks/useDefaultProps";

import {
  HvTypographyLegacyVariants,
  HvTypographyVariants,
  mapVariant,
} from "./utils";
import { staticClasses, useClasses } from "./Typography.styles";

export { staticClasses as typographyClasses };

export type HvTypographyClasses = ExtractNames<typeof useClasses>;

const HvTypographyMap = {
  display: "h1",
  title1: "h1",
  title2: "h2",
  title3: "h3",
  title4: "h4",
  body: "p",
  label: "span",
  caption1: "p",
  caption2: "p",
  // LEGACY
  "5xlTitle": "h1",
  "4xlTitle": "h1",
  xxlTitle: "h1",
  lTitle: "h2",
  sTitle: "h4",
  xxsTitle: "h6",
  sectionTitle: "p",
  placeholderText: "p",
  link: "p",
  disabledText: "p",
  selectedNavText: "p",
  vizTextDisabled: "p",
  xsInlineLink: "p",
} as const;

export interface HvTypographyProps
  extends Omit<AllHTMLAttributes<HTMLElement>, "disabled">,
    HvBaseProps<HTMLElement> {
  component?: React.ElementType;
  /** Use the variant prop to change the visual style of the Typography. */
  variant?: HvTypographyVariants | HvTypographyLegacyVariants;
  /** If `true` the typography will display the look of a link. */
  link?: boolean;
  /** If `true` the typography will display the look of a disabled state. */
  disabled?: boolean;
  /** If `true`, the text will have a bottom margin. */
  paragraph?: boolean;
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   */
  noWrap?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvTypographyClasses;
}

/**
 * Typography component is used to render text and paragraphs within an interface.
 */
export const HvTypography = forwardRef(
  (props: HvTypographyProps, ref: Ref<HTMLElement>) => {
    const {
      className,
      component: ComponentProp,
      classes: classesProp,
      variant: variantProp = "body",
      link = false,
      disabled = false,
      noWrap = false,
      paragraph = false,
      ...others
    } = useDefaultProps("HvTypography", props);
    const { classes, cx } = useClasses(classesProp);
    const { activeTheme } = useTheme();

    const variant = mapVariant(variantProp, activeTheme?.name);

    const Component =
      ComponentProp || (paragraph && "p") || HvTypographyMap[variant] || "span";

    return (
      <Component
        ref={ref}
        className={cx(classes.root, classes[variant], className, {
          [classes.isLink]: link,
          [classes.noWrap]: noWrap,
          [classes.disabled]: disabled,
        })}
        {...others}
      />
    );
  }
);
