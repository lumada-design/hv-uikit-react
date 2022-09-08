/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import ConfigContext from "../context";
import HvProvider from "../Provider";
import useLocale from "../useLocale";

describe("Provider", () => {
  let wrapper;
  const mockOverriden = createTheme({
    typography: {
      useNextVariants: true,
      suppressDeprecationWarnings: true,
      h1: {
        fontSize: "4px",
      },
    },
  });

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider cssBaseline="none" theme={mockOverriden}>
        Mock
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    const mountedWrapper = mount(<HvProvider cssBaseline="none"> Mock </HvProvider>);
    expect(mountedWrapper).toMatchSnapshot();
  });

  it("should wrap the material ui theme provider component", () => {
    const provider = wrapper.find(MuiThemeProvider);
    expect(provider.length).toBe(1);
  });

  it("should wrap the config provider component", () => {
    const provider = wrapper.find(ConfigContext.Provider);
    expect(provider.length).toBe(1);
  });

  it("should override the hv-theme with the app-theme", () => {
    const muiThemeProvider = wrapper.find(MuiThemeProvider);
    expect(muiThemeProvider.props().theme.typography.h1.fontSize).toEqual(
      mockOverriden.typography.h1.fontSize
    );
  });

  it("should not override the hv-theme if there is no app theme defined", () => {
    const wrapperNotOverriden = shallow(<HvProvider cssBaseline="none"> Mock </HvProvider>);
    const muiThemeProvider = wrapperNotOverriden.find(MuiThemeProvider);
    expect(muiThemeProvider.props().theme.typography.h1.fontSize).not.toEqual(
      mockOverriden.typography.h1.fontSize
    );
  });
});

describe("Provider with locale", () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider cssBaseline="none" locale="en-UK">
        Mock
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should pick up the configured locale", () => {
    const provider = wrapper.find(ConfigContext.Provider);
    expect(provider.props().value.locale).toBeDefined();
    expect(provider.props().value.locale).toBe("en-UK");
  });

  it("should apply en-US fallback, when locale is not configured", () => {
    wrapper = shallow(<HvProvider cssBaseline="none">Mock</HvProvider>);
    const provider = wrapper.find(ConfigContext.Provider);
    expect(provider.props().value.locale).toBeDefined();
    expect(provider.props().value.locale).toBe("en-US");
  });

  it("should pick up default locale configured in the HvProvider", () => {
    const MockComponent = () => {
      const locale = useLocale();
      return <div>{locale}</div>;
    };
    wrapper = mount(
      <HvProvider cssBaseline="none">
        <MockComponent />
      </HvProvider>
    );

    expect(wrapper.find("div").text()).toBe("en-US");
  });

  it("should pick up specified locale via the HvProvider", () => {
    const MockComponent = () => {
      const locale = useLocale();
      return <div>{locale}</div>;
    };
    wrapper = mount(
      <HvProvider cssBaseline="none" locale="fr_CA">
        <MockComponent />
      </HvProvider>
    );

    expect(wrapper.find("div").text()).toBe("fr_CA");
  });
});
