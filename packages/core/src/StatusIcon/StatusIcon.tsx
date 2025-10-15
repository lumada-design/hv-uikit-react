import { forwardRef } from "react";
import { IconWeight } from "@phosphor-icons/react";
import { CheckCircle } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { Question } from "@phosphor-icons/react/dist/csr/Question";
import { Warning } from "@phosphor-icons/react/dist/csr/Warning";
import { WarningDiamond } from "@phosphor-icons/react/dist/csr/WarningDiamond";
import {
  useDefaultProps,
  useTheme,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";
import { HvSize } from "@hitachivantara/uikit-styles";

import { HvIconContainer } from "../IconContainer";
import { HvIcon } from "../icons";
import { HvBaseProps } from "../types/generic";
import type { HvCalloutVariant } from "../utils/Callout";
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
  /** Icon style */
  weight?: IconWeight;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvStatusIconClasses;
}

const variantIconMap = {
  success: "Success",
  warning: "Caution",
  error: "Fail",
  info: "Info",
} as const;

const pentahoIconsMap = {
  success: (props: any) => <CheckCircle {...props} />,
  warning: (props: any) => <Warning {...props} />,
  error: (props: any) => <WarningDiamond {...props} />,
  info: (props: any) => <Question {...props} />,
};

/**
 * A status icon represents the status of a process or an entity.
 *
 * @experimental
 * This component is experimental and its API might change in future releases.
 */
export const HvStatusIcon = forwardRef<
  // no-indent
  React.ComponentRef<"div">,
  HvStatusIconProps
>(function HvStatusIcon(props, ref) {
  const {
    classes: classesProp,
    className,
    variant = "default",
    customIcon,
    size = "sm",
    type = "full",
    weight = "regular",
  } = useDefaultProps("HvStatusIcon", props);
  const { classes, cx } = useClasses(classesProp);
  const { activeTheme } = useTheme();

  return (
    <div
      ref={ref}
      data-variant={variant}
      data-type={type}
      data-size={size}
      className={cx(classes.root, className)}
    >
      {activeTheme?.name === "pentaho" && !customIcon ? (
        <HvIconContainer size={size}>
          {pentahoIconsMap[variant as keyof typeof pentahoIconsMap]?.({
            weight,
          })}
        </HvIconContainer>
      ) : (
        <HvIconContainer size={size}>
          {customIcon || (
            <HvIcon
              compact
              className={classes.icon}
              name={variantIconMap[variant as keyof typeof variantIconMap]}
            />
          )}
        </HvIconContainer>
      )}
    </div>
  );
});
