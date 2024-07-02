import {
  ExtractNames,
  HvBaseProps,
  HvGlobalActionsProps,
  HvIconButton,
  HvTypography,
  useDefaultProps,
} from "@hitachivantara/uikit-react-core";
import { Previous } from "@hitachivantara/uikit-react-icons";

import { staticClasses, useClasses } from "./CanvasToolbar.styles";

export { staticClasses as canvasToolbarClasses };

export type HvCanvasToolbarClasses = ExtractNames<typeof useClasses>;

export interface HvCanvasToolbarProps
  extends HvBaseProps<HTMLDivElement, "title"> {
  /** Text to display in the component. */
  title: HvGlobalActionsProps["title"];
  /** User can pass in a fully customized button or false for when the back button should not be rendered. */
  backButton?: HvGlobalActionsProps["backButton"];
  /* The content that will be rendered within the blade. */
  children: React.ReactNode;
  /** A Jss Object used to override or extend the styles applied. */
  classes?: HvCanvasToolbarClasses;
}

/**
 * A toolbar component to use in a canvas context.
 */
export const HvCanvasToolbar = (props: HvCanvasToolbarProps) => {
  const {
    title: titleProp,
    backButton,
    className,
    children,
    classes: classesProp,
    ...others
  } = useDefaultProps("HvCanvasToolbar", props);

  const { classes, cx } = useClasses(classesProp);

  const title =
    typeof titleProp === "string" ? (
      <HvTypography variant="title4">{titleProp}</HvTypography>
    ) : (
      titleProp
    );

  return (
    <div className={cx(classes.root, className)} {...others}>
      <div className={classes.back}>
        {backButton ?? (
          <HvIconButton title="Back" variant="primaryGhost">
            <Previous />
          </HvIconButton>
        )}
      </div>
      <div className={classes.title}>{title}</div>
      {children && <div className={classes.actions}>{children}</div>}
    </div>
  );
};
