import React from "react";
import clsx from "clsx";
import { withStyles, WithStyles } from "@material-ui/core";
import { HvTypography, StandardProps } from "..";
import styles from "./styles";

export interface HvFooterProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>>,
    WithStyles<typeof styles> {
  name?: React.ReactNode;
  copyright?: React.ReactNode;
  links?: React.ReactNode;
}

const Footer = React.forwardRef<HTMLDivElement, HvFooterProps>((props: HvFooterProps, ref) => {
  const {
    className,
    classes,
    name = "Hitachi Vantara",
    copyright = `© Hitachi Vantara Corporation ${new Date().getFullYear()}. All Rights Reserved.`,
    links,
    ...others
  } = props;

  return (
    <footer className={clsx(className, classes.root)} {...others} ref={ref}>
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
});

export default withStyles(styles, { name: "HvFooter" })(Footer);
