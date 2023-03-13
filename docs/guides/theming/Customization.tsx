import {
  HvButton,
  HvSwitch,
  HvButtonProps,
  HvTabs,
  HvTab,
  tabsClasses,
  theme,
} from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { useState } from "react";

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
