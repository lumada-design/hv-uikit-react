/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import "jest-canvas-mock";
import { Snackbar as MaterialSnackbar } from "@mui/material";

import { Add } from "@hitachivantara/uikit-react-icons";
import { HvButton, HvProvider, HvSnackbar, HvSnackbarContent } from "../..";

describe("Snackbar ", () => {
  const wrapper = mount(
    <HvProvider cssBaseline="none">
      <HvSnackbar id="Snackbar" />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(HvSnackbar)).toMatchSnapshot();
  });

  it("should render the Snackbar component", () => {
    const component = wrapper.find(HvSnackbar);
    expect(component.length).toBe(1);
  });

  it("shouldn't render the SnackbarComponent component as the Snackbar isn't open", () => {
    const component = wrapper.find(HvSnackbarContent);
    expect(component.length).toBe(0);
  });

  it("should render the SnackbarComponent component as the Snackbar is open", () => {
    const component = mount(
      <HvProvider cssBaseline="none">
        <HvSnackbar open transitionDirection="right" />
      </HvProvider>
    ).find(HvSnackbarContent);
    expect(component.length).toBe(1);
  });

  it("shouldn't render icon when default", () => {
    const component = mount(
      <HvProvider cssBaseline="none">
        <HvSnackbar open showIcon transitionDirection="up" />
      </HvProvider>
    )
      .find(HvSnackbarContent)
      .find("svg");

    expect(component.length).toBe(0);
  });

  it("shouldn't render the success icon", () => {
    const component = mount(
      <HvProvider cssBaseline="none">
        <HvSnackbar open variant="success" showIcon={false} transitionDirection="down" />
      </HvProvider>
    )
      .find(HvSnackbarContent)
      .find("svg");

    expect(component.length).toBe(0);
  });

  it("should render the success icon", () => {
    const component = mount(
      <HvProvider cssBaseline="none">
        <HvSnackbar open variant="success" showIcon />
      </HvProvider>
    )
      .find(HvSnackbarContent)
      .find("svg");

    expect(component.length).toBe(1);
  });

  it("should render the error icon", () => {
    const component = mount(
      <HvProvider cssBaseline="none">
        <HvSnackbar open variant="error" showIcon />
      </HvProvider>
    )
      .find(HvSnackbarContent)
      .find("svg");

    expect(component.length).toBe(1);
  });

  it("should render the custom icon", () => {
    const component = mount(
      <HvProvider cssBaseline="none">
        <HvSnackbar open customIcon={<Add />} />
      </HvProvider>
    )
      .find(HvSnackbarContent)
      .find("svg");

    expect(component.length).toBe(1);
  });

  it("should render the action when a component is passed", () => {
    const component = mount(
      <HvProvider cssBaseline="none">
        <HvSnackbar open variant="success" action={<a href=" ">Event</a>} />
      </HvProvider>
    )
      .find(HvSnackbarContent)
      .find("a");

    expect(component.length).toBe(1);
  });

  it("should render with the correct offset", () => {
    const offset = 10;
    let component = mount(
      <HvProvider cssBaseline="none">
        <HvSnackbar open offset={offset} />
      </HvProvider>
    ).find(MaterialSnackbar);

    expect(component.get(0).props.style).toEqual({ top: `${offset}px` });

    component = mount(
      <HvProvider cssBaseline="none">
        <HvSnackbar
          open
          offset={offset}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        />
      </HvProvider>
    ).find(MaterialSnackbar);

    expect(component.get(0).props.style).toEqual({ bottom: `${offset}px` });
  });

  it("should render the action when a structure is passed", () => {
    const component = mount(
      <HvProvider cssBaseline="none">
        <HvSnackbar
          id="Snackbar"
          open
          variant="success"
          action={{
            id: "testButton",
            label: "test",
          }}
        />
      </HvProvider>
    )
      .find(HvSnackbarContent)
      .find(HvButton);

    expect(component.length).toBe(1);
    expect(component.prop("category")).toBe("semantic");
  });
});
