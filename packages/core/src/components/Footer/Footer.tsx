import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { HvTypography } from "@core/components/Typography";
import { HvBaseProps } from "@core/types/generic";
import { ExtractNames } from "@core/utils/classes";
import { staticClasses, useClasses } from "./Footer.styles";

export { staticClasses as footerClasses };

export type HvFooterClasses = ExtractNames<typeof useClasses>;

export interface HvFooterProps extends HvBaseProps {
  name?: React.ReactNode;
  copyright?: React.ReactNode;
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
      className={cx(classes.root, className, { [classes.small]: isSmDown })}
      {...others}
    >
      <HvTypography variant="highlightText" className={classes.name}>
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
