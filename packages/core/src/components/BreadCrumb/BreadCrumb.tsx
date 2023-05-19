import { clsx } from "clsx";
import isNil from "lodash/isNil";
import startCase from "lodash/startCase";
import { isValidElement, MouseEventHandler } from "react";
import { HvBaseProps } from "@core/types/generic";
import { HvDropDownMenuProps } from "@core/components";
import breadCrumbClasses, { HvBreadCrumbClasses } from "./breadCrumbClasses";
import { HvPathElement } from "./PathElement";
import { HvPage } from "./Page";
import {
  StyledOrderedList,
  StyledRoot,
  StyledTypography,
} from "./BreadCrumb.styles";
import { pathWithSubMenu, removeExtension } from "./utils";

export interface HvBreadCrumbPathElement {
  label: string;
  path: string;
}

export interface HvBreadCrumbProps
  extends HvBaseProps<HTMLDivElement, "onClick"> {
  /** List of breadcrumb. */
  listRoute?: HvBreadCrumbPathElement[];
  /** URL to build the breadcrumb. */
  url?: string;
  /** Number of pages visible. */
  maxVisible?: number;
  /** The component used for the link node. Either a string to use a DOM element or a component. */
  component?: React.ElementType;
  /** Function passed to the component. If defined the component prop is used as the link node. */
  onClick?: (
    event: MouseEventHandler<HTMLAnchorElement>,
    data: any
  ) => void | undefined;
  /** Props passed down to the DropDownMenu sub-menu component. */
  dropDownMenuProps?: HvDropDownMenuProps;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvBreadCrumbClasses;
}

/**
 * A breadcrumb is a graphical control element frequently used as a navigational aid.
 */
export const HvBreadCrumb = ({
  classes,
  className,
  id,
  listRoute = [],
  maxVisible,
  url,
  onClick,
  component = "div",
  dropDownMenuProps,
  ...others
}: HvBreadCrumbProps) => {
  const maxVisibleElem = maxVisible && maxVisible < 2 ? 2 : maxVisible;
  let listPath = listRoute.slice();

  // build the listPath object list
  if (!isNil(url)) {
    listPath = [];

    // get the domain
    const baseUrl = url.match(/^.*\/\/[^/]+/);

    // get url without domain
    const urlWithoutDomain = url.replace(/^.*\/\/[^/]+/, "");

    const pathNames = urlWithoutDomain.split("/").filter((x) => x);

    pathNames.map((elem, index) =>
      listPath.push({
        label: decodeURI(elem),
        path: `${baseUrl}/${pathNames.slice(0, index + 1).join("/")}`,
      })
    );
  }

  const breadcrumbPath =
    maxVisibleElem && listPath.length > maxVisibleElem
      ? pathWithSubMenu(
          id,
          onClick,
          listPath,
          maxVisibleElem,
          dropDownMenuProps
        )
      : listPath;

  return (
    <StyledRoot
      id={id}
      className={clsx(breadCrumbClasses.root, classes?.root, className)}
      {...others}
    >
      <StyledOrderedList
        className={clsx(breadCrumbClasses.orderedList, classes?.orderedList)}
      >
        {listPath.map((elem, index) => {
          const key = `key_${index}`;
          const isLast = index === breadcrumbPath.length - 1;

          return (
            <HvPathElement
              classes={{
                centerContainer: clsx(
                  breadCrumbClasses.centerContainer,
                  classes?.centerContainer
                ),
                separatorContainer: clsx(
                  breadCrumbClasses.separatorContainer,
                  classes?.separatorContainer
                ),
              }}
              key={key}
              last={isLast}
            >
              {(isValidElement(elem) && elem) ||
                (isLast && (
                  <StyledTypography
                    className={clsx(
                      breadCrumbClasses.currentPage,
                      classes?.currentPage
                    )}
                    variant="body"
                  >
                    {startCase(removeExtension(elem.label))}
                  </StyledTypography>
                )) || (
                  <HvPage
                    key={key}
                    elem={elem}
                    classes={{
                      a: clsx(breadCrumbClasses.a, classes?.a),
                      link: clsx(breadCrumbClasses.link, classes?.link),
                    }}
                    Component={onClick ? component : undefined}
                    onClick={onClick}
                  />
                )}
            </HvPathElement>
          );
        })}
      </StyledOrderedList>
    </StyledRoot>
  );
};
