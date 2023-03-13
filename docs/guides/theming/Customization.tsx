import React from "react";
import {
  HvButton,
  HvSwitch,
  HvButtonProps,
  theme,
} from "@hitachivantara/uikit-react-core";
import { css } from "@emotion/css";
import styled from "@emotion/styled";

// ----- Custom classes -----

const classes = {
  customButton: css({ color: theme.colors.sema6 }),
  label: css({ textTransform: "uppercase" }),
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
  })
);

export const DynamicReusableComponent = (props: HvButtonProps) => (
  <StyledDynamicHvButton {...props} />
);
