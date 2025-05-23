import {
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";
import { HvSize } from "@hitachivantara/uikit-styles";

import { HvIconContainer } from "../IconContainer";
import { HvIcon } from "../icons";
import { HvBaseProps } from "../types/generic";
import { HvCalloutVariant } from "../types/tokens";
import { staticClasses, useClasses } from "./StatusIcon.styles";

export { staticClasses as statusIconClasses };

export type HvStatusIconClasses = ExtractNames<typeof useClasses>;

export type HvStatusIconVariant = HvCalloutVariant;

export type HvStatusIconType = "full" | "simple";

export interface HvStatusIconProps extends HvBaseProps {
  /** Variant of the snackbar. */
  variant?: HvStatusIconVariant;
  /** Custom icon to replace the variant default. */
  customIcon?: React.ReactNode;
  /** The size of the icon. */
  size?: HvSize;
  /** The type of status icon. */
  type?: HvStatusIconType;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvStatusIconClasses;
}

const variantIconMap = {
  success: "Success",
  warning: "Caution",
  error: "Fail",
  info: "Info",
} as const;

/**
 * A status icon represents the status of a process or an entity.
 *
 * @experimental
 * This component is experimental and its API might change in future releases.
 */
export const HvStatusIcon = (props: HvStatusIconProps) => {
  const {
    classes: classesProp,
    className,
    variant = "info",
    customIcon,
    size = "xs",
    type = "full",
  } = useDefaultProps("HvStatusIcon", props);
  const { classes, cx } = useClasses(classesProp);

  return (
    <div
      className={cx(classes.root, classes[variant], classes[type], className)}
    >
      <HvIconContainer size={size}>
        {customIcon || (
          <HvIcon
            className={classes.icon}
            name={variantIconMap[variant as keyof typeof variantIconMap]}
          />
        )}
      </HvIconContainer>
    </div>
  );
};
