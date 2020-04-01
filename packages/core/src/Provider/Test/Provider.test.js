/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-env jest */

import React from "react";
import { shallow, mount } from "enzyme";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ConfigProvider } from "../../config/context";
import HvProvider from "../Provider";

describe("Provider", () => {
  let wrapper;
  const mockOverriden = createMuiTheme({
    typography: {
      useNextVariants: true,
      suppressDeprecationWarnings: true,
      h1: {
        fontSize: "4px"
      }
    }
  });

  const mockRouter = {
    router: "/mock"
  };

  beforeEach(async () => {
    wrapper = shallow(
      <HvProvider theme={mockOverriden} router={mockRouter}>
        {" "}
        Mock
        {" "}
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    const mountedWrapper = mount(<HvProvider> Mock </HvProvider>);
    expect(mountedWrapper).toMatchSnapshot();
  });

  it("should wrap the material ui theme provider component", () => {
    const provider = wrapper.find(MuiThemeProvider);
    expect(provider.length).toBe(1);
  });

  it("should wrap the config provider component", () => {
    const provider = wrapper.find(ConfigProvider);
    expect(provider.length).toBe(1);
  });

  it("should override the hv-theme with the app-theme", () => {
    const muiThemeProvider = wrapper.find(MuiThemeProvider);
    expect(muiThemeProvider.props().theme.typography.h1.fontSize).toEqual(
        mockOverriden.typography.h1.fontSize
    );

  });

  it("should not override the hv-theme if there is no app theme defined", () => {

    const wrapperNotOverriden = shallow(<HvProvider> Mock </HvProvider>);
    const muiThemeProvider = wrapperNotOverriden.find(MuiThemeProvider);
    expect(muiThemeProvider.props().theme.typography.h1.fontSize).not.toEqual(
        mockOverriden.typography.h1.fontSize
    );

  });
});
