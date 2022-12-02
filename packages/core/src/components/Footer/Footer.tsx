import clsx from "clsx";
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

  return (
    <StyledRoot className={clsx(className, classes?.root)} {...others}>
      <StyledName variant="label" className={classes?.name}>
        {name}
      </StyledName>
      <StyledRightContainer>
        <StyledCopyright className={classes?.copyright}>
          {copyright}
        </StyledCopyright>
        {links && <StyledSeparator className={classes?.separator} />}
        {links}
      </StyledRightContainer>
    </StyledRoot>
  );
};
