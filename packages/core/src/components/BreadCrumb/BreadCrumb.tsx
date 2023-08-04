import { isValidElement, MouseEvent } from "react";

import isNil from "lodash/isNil";

import { useDefaultProps } from "@core/hooks/useDefaultProps";
import { HvBaseProps } from "@core/types/generic";
import { HvDropDownMenuProps } from "@core/components/DropDownMenu";
import { ExtractNames } from "@core/utils/classes";
import { HvTypography } from "@core/components/Typography";

import { HvPathElement } from "./PathElement";
import { HvPage } from "./Page";
import { staticClasses, useClasses } from "./BreadCrumb.styles";
import { pathWithSubMenu, removeExtension } from "./utils";
import { HvBreadCrumbPathElement } from "./types";

export { staticClasses as breadCrumbClasses };

export type HvBreadCrumbClasses = ExtractNames<typeof useClasses>;

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
  onClick?: (event: MouseEvent<HTMLElement>, data: any) => void;
  /** Props passed down to the DropDownMenu sub-menu component. */
  dropDownMenuProps?: Partial<HvDropDownMenuProps>;
  /** A Jss Object used to override or extend the styles applied to the component. */
  classes?: HvBreadCrumbClasses;
}

/**
 * A breadcrumb is a graphical control element frequently used as a navigational aid.
 */
export const HvBreadCrumb = (props: HvBreadCrumbProps) => {
  const {
    classes: classesProp,
    className,
    id,
    listRoute = [],
    maxVisible,
    url,
    onClick,
    component,
    dropDownMenuProps,
    ...others
  } = useDefaultProps("HvBreadCrumb", props);

  const { classes, cx } = useClasses(classesProp);

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
          listPath,
          maxVisibleElem,
          onClick,
          dropDownMenuProps
        )
      : listPath;

  return (
    <nav id={id} className={cx(classes.root, className)} {...others}>
      <ol className={classes.orderedList}>
        {listPath.map((elem, index) => {
          const key = `key_${index}`;
          const isLast = index === breadcrumbPath.length - 1;

          return (
            <HvPathElement
              classes={{
                centerContainer: classes.centerContainer,
                separatorContainer: classes.separatorContainer,
              }}
              key={key}
              last={isLast}
            >
              {(isValidElement(elem) && elem) ||
                (isLast && (
                  <HvTypography className={classes.currentPage} variant="body">
                    {removeExtension(elem.label)}
                  </HvTypography>
                )) || (
                  <HvPage
                    elem={elem}
                    classes={{
                      a: classes.a,
                      link: classes.link,
                    }}
                    component={component}
                    onClick={onClick}
                  />
                )}
            </HvPathElement>
          );
        })}
      </ol>
    </nav>
  );
};
