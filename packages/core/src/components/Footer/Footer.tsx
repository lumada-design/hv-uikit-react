import { useTheme } from "@mui/material/styles";

import { clsx } from "clsx";

import { HvBaseProps } from "@core/types/generic";

import footerClasses, { HvFooterClasses } from "./footerClasses";
import {
  StyledCopyright,
  StyledName,
  StyledRightContainer,
  StyledRoot,
  StyledSeparator,
} from "./Footer.styles";

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
    classes,
    className,
    ...others
  } = props;
  const muiTheme = useTheme();

  return (
    <StyledRoot
      $breakpoints={muiTheme.breakpoints}
      className={clsx(className, footerClasses.root, classes?.root)}
      {...others}
    >
      <StyledName
        $breakpoints={muiTheme.breakpoints}
        variant="label"
        className={clsx(footerClasses.name, classes?.name)}
      >
        {name}
      </StyledName>
      <StyledRightContainer
        className={clsx(footerClasses.rightContainer, classes?.rightContainer)}
        $breakpoints={muiTheme.breakpoints}
      >
        <StyledCopyright
          $breakpoints={muiTheme.breakpoints}
          className={clsx(footerClasses.copyright, classes?.copyright)}
        >
          {copyright}
        </StyledCopyright>
        {links && (
          <StyledSeparator
            $breakpoints={muiTheme.breakpoints}
            className={clsx(footerClasses.separator, classes?.separator)}
          />
        )}
        {links}
      </StyledRightContainer>
    </StyledRoot>
  );
};
