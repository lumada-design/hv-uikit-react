import styled from "@emotion/styled";
import { theme } from "@hitachivantara/uikit-styles";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvButton,
  HvCheckBox,
  HvDropdown,
  HvInput,
  HvTypography,
  dropdownClasses,
  HvInputProps,
  HvButtonProps,
} from "~/components";
import { HvLogin, HvLoginProps } from "./Login";
import background from "./resources/background.png";
import customBackground from "./resources/background-custom.jpg";

// #region Styled components

const StyledRoot = styled("div")({
  width: 300,
  margin: "auto",
  paddingTop: 150,
  "& h3": {
    textAlign: "center",
  },
});

const StyledInput = styled((props: HvInputProps) => <HvInput {...props} />)({
  marginTop: 40,
});

const StyledButton = styled((props: HvButtonProps) => <HvButton {...props} />)({
  width: 120,
  float: "right",
  marginTop: theme.spacing(8),
  textTransform: `full-size-kana`,
});

const StyledCheckBox = styled(HvCheckBox)({ marginTop: 60 });

const StyledDropDown = styled(HvDropdown)({
  [`&.${dropdownClasses.root}`]: {
    marginTop: 38,
    width: "100%",
  },
  [`& .${dropdownClasses.dropdown}`]: { width: "100%" },
  [`& .${dropdownClasses.rootList}`]: { width: "100%" },
});

// #endregion

const meta: Meta<typeof HvLogin> = {
  title: "Widgets/Login",
  component: HvLogin,
  decorators: [
    (Story) => (
      <div style={{ display: "flex", height: "100vh" }}>{Story()}</div>
    ),
  ],
};
export default meta;

export const Main: StoryObj<HvLoginProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    return (
      <HvLogin background={background}>
        <StyledRoot>
          <HvTypography variant="title2">Welcome</HvTypography>

          <StyledInput
            name="username"
            label="Username"
            placeholder="Enter text"
          />

          <StyledInput
            name="password"
            label="Password"
            placeholder="Enter text"
            type="password"
          />

          <StyledButton type="submit" variant="primary">
            Login
          </StyledButton>
        </StyledRoot>
      </HvLogin>
    );
  },
};

export const CustomBackground: StoryObj<HvLoginProps> = {
  args: {},
  argTypes: {
    classes: { control: { disable: true } },
  },
  render: () => {
    return (
      <HvLogin background={customBackground}>
        <StyledRoot>
          <HvTypography variant="title2">Welcome</HvTypography>

          <StyledInput
            name="username"
            label="Username"
            placeholder="Enter text"
          />

          <StyledDropDown
            name="domain"
            label="Domain"
            // classes={{
            //   root: classes.dropdown,
            //   dropdown: classes.dropdownWidthFix,
            //   rootList: classes.dropdownWidthFix,
            // }}
            values={[
              { id: "id-1", label: "Domain 1" },
              { id: "id-2", label: "Domain 2" },
              { id: "id-3", label: "Domain 3" },
              { id: "id-4", label: "Domain 4" },
            ]}
          />

          <StyledCheckBox label="Remember me" />

          <StyledButton type="submit" variant="primary">
            Login
          </StyledButton>
        </StyledRoot>
      </HvLogin>
    );
  },
};
