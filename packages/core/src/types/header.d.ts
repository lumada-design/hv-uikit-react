// type HeaderPosition = "fixed" | "absolute" | "sticky" | "static" | "relative";

interface NavigationItemProp {
  id: string;
  label: string;
  path?: string;
  href?: string;
  target?: string;
  data?: NavigationItemProp[];
}

type WithoutOnClick<T> = Omit<T, "onClick">;

type DivProps = JSX.IntrinsicElements["div"];

type BaseProps<E = "div", P = {}> = JSX.IntrinsicElements[E] & Omit<P>;

// interface HeaderProps extends DivProps {
//   /** The position of the header bar */
//   position?: HeaderPosition;
// }

interface HeaderActionsProps extends BaseProps {}

// interface HeaderBrandProps extends DivProps {
//   logo?: React.ReactNode;
//   name?: string;
// }

interface HeaderNavigationProps extends BaseProps<_, { onClick }> {
  data: NavigationItemProp[];
  selected?: string;
  onClick?: (event: MouseEvent, selection: NavigationItemProp) => void;
  classes?: {
    root?: string;
  };
}

interface MenuBarProps extends WithoutOnClick<DivProps> {
  data: NavigationItemProp[];
  type: string;
  onClick?: (event: MouseEvent, selection: NavigationItemProp) => void;
}

interface MenuItemProps extends WithoutOnClick<DivProps> {
  item: NavigationItemProp;
  type?: string;
  onClick?: (event: MouseEvent, selection: NavigationItemProp) => void;
}
