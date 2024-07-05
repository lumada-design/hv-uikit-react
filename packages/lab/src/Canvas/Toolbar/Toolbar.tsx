import {
  ExtractNames,
  HvBaseProps,
  HvIconButton,
  HvTypography,
  useDefaultProps,
  useLabels,
} from "@hitachivantara/uikit-react-core";
import { Previous } from "@hitachivantara/uikit-react-icons";

import { staticClasses, useClasses } from "./Toolbar.styles";

export { staticClasses as canvasToolbarClasses };

export type HvCanvasToolbarClasses = ExtractNames<typeof useClasses>;

const DEFAULT_LABELS = {
  back: "Back",
};

export interface HvCanvasToolbarProps
  extends HvBaseProps<HTMLDivElement, "title"> {
  /** Text to display in the component. */
  title: React.ReactNode;
  /** Fully customized button or false for when the back button should not be rendered. */
  backButton?: React.ReactNode;
  /** An object containing all the labels. */
  labels?: Partial<typeof DEFAULT_LABELS>;
  /* The content that will be rendered within the toolbar. */
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
    labels: labelsProp,
    className,
    children,
    classes: classesProp,
    ...others
  } = useDefaultProps("HvCanvasToolbar", props);

  const { classes, cx } = useClasses(classesProp);
  const labels = useLabels(DEFAULT_LABELS, labelsProp);

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
          <HvIconButton title={labels.back} variant="primaryGhost">
            <Previous />
          </HvIconButton>
        )}
      </div>
      <div className={classes.title}>{title}</div>
      {children && <div className={classes.actions}>{children}</div>}
    </div>
  );
};
