import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { HvTypography } from "@core/Typography";
import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";

import { staticClasses, useClasses } from "./Footer.styles";

export { staticClasses as footerClasses };

export type HvFooterClasses = ExtractNames<typeof useClasses>;

export interface HvFooterProps extends HvBaseProps {
  /** Footer name. */
  name?: React.ReactNode;
  /** Footer copyright. */
  copyright?: React.ReactNode;
  /** Footer links. */
  links?: React.ReactNode;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvFooterClasses;
}

/**
 * A Footer is a way of providing extra information at the end of a page.
 */
export const HvFooter = (props: HvFooterProps) => {
  const {
    name = "Hitachi Vantara",
    copyright = `© Hitachi Vantara Corporation ${new Date().getFullYear()}. All Rights Reserved.`,
    links,
    classes: classesProp,
    className,
    ...others
  } = useDefaultProps("HvFooter", props);
  const muiTheme = useTheme();
  const { classes, cx } = useClasses(classesProp);

  const isSmDown = useMediaQuery(muiTheme.breakpoints.down("sm"));

  return (
    <footer
      className={cx(classes.root, { [classes.small]: isSmDown }, className)}
      {...others}
    >
      <HvTypography variant="label" className={classes.name}>
        {name}
      </HvTypography>
      <div className={classes.rightContainer}>
        <HvTypography className={classes.copyright}>{copyright}</HvTypography>
        {links && <div className={classes.separator} />}
        {links}
      </div>
    </footer>
  );
};
