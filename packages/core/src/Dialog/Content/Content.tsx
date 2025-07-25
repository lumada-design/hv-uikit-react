import { useEffect, useRef, useState } from "react";
import MuiDialogContent, {
  DialogContentProps as MuiDialogContentProps,
} from "@mui/material/DialogContent";
import {
  mergeStyles,
  useDefaultProps,
  type ExtractNames,
} from "@hitachivantara/uikit-react-utils";

import { HvTypography } from "../../Typography";
import { staticClasses, useClasses } from "./Content.styles";

export { staticClasses as dialogContentClasses };

export type HvDialogContentClasses = ExtractNames<typeof useClasses>;

export interface HvDialogContentProps
  extends Omit<MuiDialogContentProps, "classes"> {
  /** Content should be indented in relationship to the Dialog title. */
  indentContent?: boolean;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvDialogContentClasses;
}

export const HvDialogContent = (props: HvDialogContentProps) => {
  const {
    classes: classesProp,
    className,
    children,
    indentContent = false,
    style,
    ...others
  } = useDefaultProps("HvDialogContent", props);

  const { classes, cx } = useClasses(classesProp);
  const [hasBorder, setHasBorder] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(() => {
        const el = elRef.current as HTMLElement | null;
        if (el) {
          const hasOverflow = el.scrollHeight > el.clientHeight;
          setHasBorder(hasOverflow);
        }
      });

      if (elRef.current) {
        resizeObserver.observe(elRef.current as HTMLElement);
      }

      return () => {
        resizeObserver.disconnect();
      };
    }
    return undefined;
  }, []);

  return (
    <HvTypography
      ref={elRef}
      component={MuiDialogContent}
      className={cx(
        classes.root,
        { [classes.textContent]: !!indentContent },
        className,
      )}
      style={mergeStyles(style, {
        "--borderW": hasBorder ? "1px" : "0px",
      })}
      {...others}
    >
      {children}
    </HvTypography>
  );
};
