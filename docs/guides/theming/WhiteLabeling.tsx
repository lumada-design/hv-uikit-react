import { useState } from "react";
import { css } from "@emotion/css";
import {
  createTheme,
  HvButton,
  HvContainer,
  HvGlobalActions,
  HvHeader,
  HvHeaderBrand,
  HvHeaderNavigation,
  HvHeaderNavigationProps,
  HvProvider,
  HvTypography,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { Menu } from "@hitachivantara/uikit-react-icons";

const navigationData = [
  {
    id: "1",
    label: "Overview",
    path: "/overview",
  },
  {
    id: "2",
    label: "Events",
    path: "/events",
  },
  {
    id: "3",
    label: "Work Orders",
    path: "/orders",
  },
  {
    id: "4",
    label: "Assets",
    path: "/assets",
  },
  {
    id: "5",
    label: "Analytics",
    path: "/analytics",
  },
];

const turquoiseTheme = createTheme({
  name: "turquoise",
  base: "ds5",
  inheritColorModes: true,
  colors: {
    modes: {
      dawn: {
        secondary: "#484349",
        primary: "#18A999",
        containerBackgroundHover: "#ecfcfa",
      },
    },
  },
  fontFamily: {
    body: "Gill Sans",
  },
  header: {
    height: "60px",
  },
  components: {
    HvButton: {
      size: "lg",
      radius: "full",
    },
    HvHeaderMenuBarBar: {
      classes: {
        menubar: {
          backgroundColor: theme.colors.primary,
        },
      },
    },
    HvHeaderMenuItem: {
      classes: {
        root: {
          "& span": {
            color: "#F6F8FF",
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&:focus-within": {
            backgroundColor: "transparent",
          },
        },
        menubar: {
          borderBottom: 0,
          "& > * > span": {
            padding: theme.space.xs,
          },
        },
        selected: {
          "&.HvHeader-MenuItem-menubar": {
            borderTop: 0,
            borderBottom: 0,
            "& > * > span": {
              color: "#F6F8FF",
              backgroundColor: theme.colors.secondary,
              borderRadius: theme.radii.full,
            },
          },
        },
      },
    },
    HvHeaderBrand: {
      classes: {
        brandName: {
          color: "#F6F8FF",
        },
      },
    },
  },
});

export const WhiteLabeling = () => {
  const id = "hv-root-white-labeling";

  const { activeTheme } = useTheme();

  const [selected, setSelected] = useState<string>("1");

  const handleChange: HvHeaderNavigationProps["onClick"] = (
    _,
    selectedItem,
  ) => {
    setSelected(selectedItem.id);
  };

  const classes = {
    headerNavigation: css({
      [`@media only screen and (max-width: ${activeTheme?.breakpoints.values.lg}px)`]:
        {
          display: "none",
        },
    }),
    menuButton: css({
      width: 32,
      height: 32,
      display: "none",
      [`@media only screen and (max-width: ${activeTheme?.breakpoints.values.lg}px)`]:
        {
          display: "flex",
        },
    }),
  };

  return (
    <div id={id}>
      <HvProvider
        classNameKey={id}
        rootElementId={id}
        cssTheme="scoped"
        themes={[turquoiseTheme]}
      >
        <HvHeader position="relative">
          <HvButton icon className={classes.menuButton} onClick={() => {}}>
            <Menu />
          </HvButton>
          <HvHeaderBrand name="My App" />
          <HvHeaderNavigation
            className={classes.headerNavigation}
            data={navigationData}
            selected={selected}
            onClick={handleChange}
          />
        </HvHeader>
        <HvContainer style={{ padding: theme.spacing("md") }}>
          <HvGlobalActions
            title={
              navigationData.find((p) => p.id === selected)?.label ||
              "Lorem ipsum"
            }
          />
          <HvTypography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </HvTypography>
          <br />
          <HvButton variant="primaryGhost">Click me!</HvButton>
        </HvContainer>
      </HvProvider>
    </div>
  );
};
