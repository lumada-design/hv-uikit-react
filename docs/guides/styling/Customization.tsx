import {
  HvButton,
  HvSwitch,
  HvButtonProps,
  HvTabs,
  HvTab,
  tabsClasses,
  theme,
  HvProvider,
  HvCard,
  HvCardHeader,
  HvCardContent,
  HvTypography,
  createTheme,
} from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useState } from "react";

// ----- Inline styles -----

export const InlineStyles = () => (
  <HvButton
    id="inline-styles-button-id"
    variant="secondaryGhost"
    onClick={() => {}}
    style={{ backgroundColor: theme.colors.sema3 }}
  >
    Click me!
  </HvButton>
);

// ----- Custom classes -----

const classes = {
  customButton: css({ color: theme.colors.sema6 }),
  label: css({ textTransform: "uppercase" }),
  tabsIndicator: css({
    [`& .${tabsClasses.indicator}`]: {
      "& > div": {
        backgroundColor: theme.colors.sema1,
      },
    },
  }),
};

export const OverrideClassName = () => (
  <HvButton
    id="override-classname-button-id"
    variant="secondaryGhost"
    onClick={() => {}}
    className={classes.customButton}
  >
    Click me!
  </HvButton>
);

export const OverrideClasses = () => (
  <HvSwitch
    id="override-classes-switch-id"
    label="Switch"
    classes={{
      label: classes.label,
    }}
  />
);

export const NestedClasses = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <HvTabs
      value={value}
      onChange={handleChange}
      className={classes.tabsIndicator}
    >
      <HvTab label="Tab 1" />
      <HvTab label="Tab 2" />
    </HvTabs>
  );
};

// ----- Reusable components -----

const StyledHvButton = styled(HvButton)({
  textTransform: "uppercase",
});

export const ReusableComponent = (props: HvButtonProps) => (
  <StyledHvButton {...props} />
);

const StyledDynamicHvButton = styled(HvButton)(
  ({ variant }: HvButtonProps) => ({
    color:
      variant === "secondaryGhost" ? theme.colors.sema1 : theme.colors.sema4,
    marginLeft: theme.space.xs,
  })
);

export const DynamicReusableComponent = (props: HvButtonProps) => (
  <StyledDynamicHvButton {...props} />
);

// ----- Theme override -----

const themeOverride = createTheme({
  name: "themeOverride",
  base: "ds5",
  inheritColorModes: true,
  colors: {
    modes: {
      dawn: { backgroundColor: "transparent" },
    },
  },
  card: {
    borderRadius: "0px 0px 20px 20px",
    hoverColor: "#635f59",
    backgroundColor: "#fbfaf8",
  },
});

export const ThemeOverride = () => {
  const id = "hv-root-theme-override";
  return (
    <div id={id}>
      <HvProvider rootElementId={id} themes={[themeOverride]}>
        <HvCard id={id} selectable>
          <HvCardHeader title="NEXT UI Kit" subheader="React UI library" />
          <HvCardContent>
            <HvTypography>Hello from the team!</HvTypography>
          </HvCardContent>
        </HvCard>
      </HvProvider>
    </div>
  );
};

// ----- Global override -----

const globalTheme = createTheme({
  name: "globalTheme",
  base: "ds5",
  inheritColorModes: true,
  colors: {
    modes: {
      dawn: { acce1: "#bf6060" },
    },
  },
  fontFamily: {
    body: "Courier New",
  },
});

export const GlobalOverride = () => {
  const id = "hv-root-global-override";
  return (
    <div id={id}>
      <HvProvider rootElementId={id} themes={[globalTheme]}>
        <div
          style={{
            padding: "15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <HvTypography>Hello from the UI Kit team.</HvTypography>
          <HvButton variant="secondaryGhost">Click me!</HvButton>
        </div>
      </HvProvider>
    </div>
  );
};
