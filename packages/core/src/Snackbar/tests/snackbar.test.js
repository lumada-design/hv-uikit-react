/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import "jest-canvas-mock";
import { Snackbar as MaterialSnackbar } from "@material-ui/core";

import AddIcon from "@hv/uikit-react-icons/dist/Add";
import Snackbar from "..";
import SnackbarContent from "../SnackbarContentWrapper/SnackbarContentWrapper";
import HvProvider from "../../Provider";
import Button from "../../Button";

describe("Snackbar ", () => {
  const wrapper = mount(
    <HvProvider>
      <Snackbar id="Snackbar" />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(Snackbar)).toMatchSnapshot();
  });

  it("should render the Snackbar component", () => {
    const sliderComponent = wrapper.find(Snackbar);
    expect(sliderComponent.length).toBe(1);
  });

  it("shouldn't render the SnackbarComponent component as the Snackbar isn't open", () => {
    const sliderComponent = wrapper.find(SnackbarContent);
    expect(sliderComponent.length).toBe(0);
  });

  it("should render the SnackbarComponent component as the Snackbar is open", () => {
    const sliderComponent = mount(
      <HvProvider>
        <Snackbar open transitionDirection="right" />
      </HvProvider>
    ).find(SnackbarContent);
    expect(sliderComponent.length).toBe(1);
  });

  it("shouldn't render icon when default", () => {
    const sliderComponent = mount(
      <HvProvider>
        <Snackbar open showIcon transitionDirection="up" />
      </HvProvider>
    )
      .find(SnackbarContent)
      .find("svg");

    expect(sliderComponent.length).toBe(0);
  });

  it("shouldn't render the success icon", () => {
    const sliderComponent = mount(
      <HvProvider>
        <Snackbar open variant="success" showIcon={false} transitionDirection="down" />
      </HvProvider>
    )
      .find(SnackbarContent)
      .find("svg");

    expect(sliderComponent.length).toBe(0);
  });

  it("should render the success icon", () => {
    const sliderComponent = mount(
      <HvProvider>
        <Snackbar open variant="success" showIcon />
      </HvProvider>
    )
      .find(SnackbarContent)
      .find("svg");

    expect(sliderComponent.length).toBe(1);
  });

  it("should render the error icon", () => {
    const sliderComponent = mount(
      <HvProvider>
        <Snackbar open variant="error" showIcon />
      </HvProvider>
    )
      .find(SnackbarContent)
      .find("svg");

    expect(sliderComponent.length).toBe(1);
  });

  it("should render the custom icon", () => {
    const sliderComponent = mount(
      <HvProvider>
        <Snackbar open customIcon={<AddIcon />} />
      </HvProvider>
    )
      .find(SnackbarContent)
      .find("svg");

    expect(sliderComponent.length).toBe(1);
  });

  it("should render the action when a component is passed", () => {
    const sliderComponent = mount(
      <HvProvider>
        <Snackbar open variant="success" action={<a href=" ">Event</a>} />
      </HvProvider>
    )
      .find(SnackbarContent)
      .find("a");

    expect(sliderComponent.length).toBe(1);
  });

  it("should render with the correct offset", () => {
    const offset = 10;
    let component = mount(
      <HvProvider>
        <Snackbar open offset={offset} />
      </HvProvider>
    ).find(MaterialSnackbar);

    expect(component.get(0).props.style).toEqual({ top: `${offset}px` });

    component = mount(
      <HvProvider>
        <Snackbar
          open
          offset={offset}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
        />
      </HvProvider>
    ).find(MaterialSnackbar);

    expect(component.get(0).props.style).toEqual({ bottom: `${offset}px` });
  });

  it("should render the action when a structure is passed", () => {
    const sliderComponent = mount(
      <HvProvider>
        <Snackbar
          id="Snackbar"
          open
          variant="success"
          action={{
            id: "testButton",
            label: "test"
          }}
        />
      </HvProvider>
    )
      .find(SnackbarContent)
      .find(Button);

    expect(sliderComponent.length).toBe(1);
    expect(sliderComponent.prop("category")).toBe("semantic");
  });
});
