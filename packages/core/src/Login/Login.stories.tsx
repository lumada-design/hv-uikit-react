import { FormEventHandler, forwardRef } from "react";
import styled from "@emotion/styled";
import { Meta, StoryObj } from "@storybook/react";
import {
  dropdownClasses,
  HvButton,
  HvButtonProps,
  HvCheckBox,
  HvDropdown,
  HvInput,
  HvInputProps,
  HvLogin,
  HvLoginProps,
  HvTypography,
  PolymorphicRef,
  theme,
} from "@hitachivantara/uikit-react-core";

import { setupChromatic } from ".storybook/setupChromatic";

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
  marginTop: 20,
  height: 90,
});

const StyledButton = styled(
  forwardRef((props: HvButtonProps, ref?: PolymorphicRef<"button">) => {
    return <HvButton {...props} ref={ref} />;
  }),
)({
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
  parameters: {
    ...setupChromatic(["DS5 dawn"], 5000),
  },
  render: () => {
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());

      alert(JSON.stringify(data, null, 2));
    };

    return (
      <HvLogin background="https://lumada-design.github.io/assets/login-bg1.png">
        <StyledRoot>
          <HvTypography variant="title2">Welcome</HvTypography>

          <form onSubmit={handleSubmit}>
            <StyledInput
              required
              name="username"
              label="Username"
              placeholder="Enter text"
            />

            <StyledInput
              required
              name="password"
              label="Password"
              placeholder="Enter text"
              type="password"
            />

            <StyledButton type="submit" variant="primary">
              Login
            </StyledButton>
          </form>
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
    const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = Object.fromEntries(formData.entries());

      alert(JSON.stringify(data, null, 2));
    };

    return (
      <HvLogin background="https://lumada-design.github.io/assets/login-bg2.jpg">
        <StyledRoot>
          <HvTypography variant="title2">Welcome</HvTypography>

          <form onSubmit={handleSubmit}>
            <StyledInput
              required
              name="username"
              label="Username"
              placeholder="Enter text"
            />

            <StyledDropDown
              name="domain"
              label="Domain"
              values={[
                { id: "id-1", label: "Domain 1" },
                { id: "id-2", label: "Domain 2" },
                { id: "id-3", label: "Domain 3" },
                { id: "id-4", label: "Domain 4" },
              ]}
            />

            <StyledCheckBox
              name="remember"
              value="remember"
              label="Remember me"
            />

            <StyledButton type="submit" variant="primary">
              Login
            </StyledButton>
          </form>
        </StyledRoot>
      </HvLogin>
    );
  },
};
