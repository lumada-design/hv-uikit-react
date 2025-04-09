import {
  createClasses,
  ExtractNames,
  useDefaultProps,
} from "@hitachivantara/uikit-react-utils";
import { theme } from "@hitachivantara/uikit-styles";

const { useClasses } = createClasses("HvLabelContainer", {
  root: {
    display: "flex",
    alignItems: "center",
    gap: theme.space.xs,
    height: 24,
    marginBottom: theme.space.xxs,
  },
});

export interface HvLabelContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  classes?: ExtractNames<typeof useClasses>;
}

/**
 * A container for the label and description combo of form elements.
 * @internal @private
 */
export const HvLabelContainer = (props: HvLabelContainerProps) => {
  const {
    className,
    classes: classesProp,
    ...others
  } = useDefaultProps("HvLabelContainer", props);
  const { classes, cx } = useClasses(classesProp, false);

  return <div className={cx(classes.root, className)} {...others} />;
};
