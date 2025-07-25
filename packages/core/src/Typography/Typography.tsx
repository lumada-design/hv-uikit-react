import {
  useDefaultProps,
  useTheme,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import {
  fixedForwardRef,
  PolymorphicComponentRef,
  PolymorphicRef,
} from "../types/generic";
import { staticClasses, useClasses } from "./Typography.styles";
import {
  HvTypographyLegacyVariants,
  HvTypographyVariants,
  mapVariant,
} from "./utils";

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
  captionLabel: "div",
  caption1: "div",
  caption2: "div",
  // LEGACY
  "5xlTitle": "h1",
  "4xlTitle": "h1",
  "3xlTitle": "h1",
  xxlTitle: "h1",
  xlTitle: "h1",
  lTitle: "h2",
  mTitle: "h3",
  sTitle: "h4",
  xsTitle: "h5",
  xxsTitle: "h6",
  sectionTitle: "p",
  highlightText: "p",
  normalText: "p",
  placeholderText: "p",
  link: "p",
  disabledText: "p",
  selectedNavText: "p",
  vizText: "p",
  vizTextDisabled: "p",
  xsInlineLink: "p",
} satisfies Record<
  HvTypographyVariants | HvTypographyLegacyVariants,
  React.ElementType
>;

export type HvTypographyProps<C extends React.ElementType = "p"> =
  PolymorphicComponentRef<
    C,
    {
      /** Use the variant prop to change the visual style of the Typography. */
      variant?: HvTypographyVariants | HvTypographyLegacyVariants;
      /** If `true` the typography will display the look of a link. */
      link?: boolean;
      /** If `true` the typography will display the look of a disabled state. */
      disabled?: boolean;
      /**
       * If `true`, the typography will render a "p" element
       * @deprecated use `component="p"` instead
       * */
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
  >;

/**
 * Typography component is used to render text and paragraphs within an interface.
 */
export const HvTypography = fixedForwardRef(function HvTypography<
  C extends React.ElementType = "p",
>(props: HvTypographyProps<C>, ref: PolymorphicRef<C>) {
  const {
    className,
    component: ComponentProp,
    classes: classesProp,
    variant: variantProp = "body",
    link = false,
    noWrap = false,
    paragraph = false,
    disabled = false,
    ...others
  } = useDefaultProps("HvTypography", props);
  const { classes, css, cx } = useClasses(classesProp);
  const { activeTheme } = useTheme();

  const variant = mapVariant(variantProp, activeTheme?.base);

  const Component =
    ComponentProp || (paragraph && "p") || HvTypographyMap[variant] || "span";

  return (
    <Component
      ref={ref}
      className={cx(
        css({ ...activeTheme?.typography[variant] }),
        classes.root,
        classes[variant],
        {
          [classes.isLink]: link,
          [classes.noWrap]: noWrap,
          [classes.disabled]: disabled,
        },
        className,
      )}
      disabled={disabled}
      {...others}
    />
  );
});
