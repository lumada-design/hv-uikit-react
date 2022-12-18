import clsx from "clsx";
import { useTheme } from "@mui/material/styles";
import { BaseProps } from "types";

import {
  StyledCopyright,
  StyledName,
  StyledRightContainer,
  StyledRoot,
  StyledSeparator,
} from "./Footer.styles";

export interface FooterProps extends BaseProps<HTMLDivElement> {
  name?: React.ReactNode;
  copyright?: React.ReactNode;
  links?: React.ReactNode;
  /** A Jss Object used to override or extend the styles applied to the empty state component. */
  classes?: {
    root?: string;
    name?: string;
    copyright?: string;
    separator?: string;
  };
}

/**
 * A Footer is a way of providing extra information at the end of a page.
 */
export const Footer = (props: FooterProps) => {
  const {
    name = "Hitachi Vantara",
    copyright = `© Hitachi Vantara Corporation ${new Date().getFullYear()}. All Rights Reserved.`,
    links,
    classes,
    className,
    ...others
  } = props;
  const muiTheme = useTheme();

  return (
    <StyledRoot
      breakpoints={muiTheme.breakpoints}
      className={clsx(className, classes?.root)}
      {...others}
    >
      <StyledName
        breakpoints={muiTheme.breakpoints}
        variant="label"
        className={classes?.name}
      >
        {name}
      </StyledName>
      <StyledRightContainer breakpoints={muiTheme.breakpoints}>
        <StyledCopyright
          breakpoints={muiTheme.breakpoints}
          className={classes?.copyright}
        >
          {copyright}
        </StyledCopyright>
        {links && (
          <StyledSeparator
            breakpoints={muiTheme.breakpoints}
            className={classes?.separator}
          />
        )}
        {links}
      </StyledRightContainer>
    </StyledRoot>
  );
};
