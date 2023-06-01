import { ClassNames } from "@emotion/react";
import {
  HvBreadCrumbPathElement,
  HvOverflowTooltip,
  HvTypography,
} from "@core/components";
import startCase from "lodash/startCase";
import { MouseEvent } from "react";
import pageClasses, { HvPageClasses } from "./pageClasses";
import { styles } from "./Page.styles";

export interface HvPageProps {
  component?: React.ElementType;
  onClick?: (event: MouseEvent<HTMLElement>, data: any) => void;
  elem: HvBreadCrumbPathElement;
  classes?: HvPageClasses;
}

export const HvPage = ({ component, onClick, elem, classes }: HvPageProps) => {
  const { label, path, ...others } = elem;
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onClick?.(event, elem);
  };

  return (
    <ClassNames>
      {({ css, cx }) => (
        <HvTypography
          noWrap
          variant="label"
          component={component || "a"}
          href={elem.path}
          onClick={onClick && handleClick}
          className={cx(
            css(styles.link),
            pageClasses.link,
            classes?.link,
            pageClasses.label,
            classes?.label,
            pageClasses.a,
            classes?.a
          )}
          {...others}
        >
          <HvOverflowTooltip data={startCase(elem.label)} />
        </HvTypography>
      )}
    </ClassNames>
  );
};
