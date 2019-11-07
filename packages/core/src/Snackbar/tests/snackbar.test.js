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
import { mount } from "enzyme";
import "jest-canvas-mock";
import AddIcon from "@hv/uikit-react-icons/dist/Generic/Add";
import Snackbar from "../Snackbar";
import SnackBarWithStyles from "../index";
import SnackBarContent from "../SnackbarContentWrapper/SnackbarContentWrapper";
import HvProvider from "../../Provider";

describe("Snackbar ", () => {
  const wrapper = mount(
    <HvProvider>
      <SnackBarWithStyles />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Snackbar component", () => {
    const sliderComponent = wrapper.find(Snackbar);
    expect(sliderComponent.length).toBe(1);
  });

  it("shouldn't render the SnackbarComponent component as the snackbar isn't open", () => {
    const sliderComponent = wrapper.find(SnackBarContent);
    expect(sliderComponent.length).toBe(0);
  });

  it("should render the SnackbarComponent component as the snackbar is open", () => {
    const sliderComponent = mount(
      <HvProvider>
        <SnackBarWithStyles open transitionDirection="right" />
      </HvProvider>
    ).find(SnackBarContent);
    expect(sliderComponent.length).toBe(1);
  });

  it("shouldn't render icon when default", () => {
    const sliderComponent = mount(
      <HvProvider>
        <SnackBarWithStyles open showIcon transitionDirection="up" />
      </HvProvider>
    )
      .find(SnackBarContent)
      .find("svg");

    expect(sliderComponent.length).toBe(0);
  });

  it("shouldn't render the success icon", () => {
    const sliderComponent = mount(
      <HvProvider>
        <SnackBarWithStyles
          open
          variant="success"
          showIcon={false}
          transitionDirection="down"
        />
      </HvProvider>
    )
      .find(SnackBarContent)
      .find("svg");

    expect(sliderComponent.length).toBe(0);
  });

  it("should render the success icon", () => {
    const sliderComponent = mount(
      <HvProvider>
        <SnackBarWithStyles open variant="success" showIcon />
      </HvProvider>
    )
      .find(SnackBarContent)
      .find("svg");

    expect(sliderComponent.length).toBe(1);
  });

  it("should render the error icon", () => {
    const sliderComponent = mount(
      <HvProvider>
        <SnackBarWithStyles open variant="error" showIcon />
      </HvProvider>
    )
      .find(SnackBarContent)
      .find("svg");

    expect(sliderComponent.length).toBe(1);
  });

  it("should render the custom icon", () => {
    const sliderComponent = mount(
      <HvProvider>
        <SnackBarWithStyles open customIcon={<AddIcon />} />
      </HvProvider>
    )
      .find(SnackBarContent)
      .find("svg");

    expect(sliderComponent.length).toBe(1);
  });

  it("should render the action", () => {
    const sliderComponent = mount(
      <HvProvider>
        <SnackBarWithStyles
          open
          variant="success"
          action={<a href=" ">Event</a>}
        />
      </HvProvider>
    )
      .find(SnackBarContent)
      .find("a");

    expect(sliderComponent.length).toBe(1);
  });
});
