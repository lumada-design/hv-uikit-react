import React from "react";
import { mount } from "enzyme";
import { Fail } from "@hitachivantara/uikit-react-icons";
import { Snackbar as MaterialSnackbar } from "@mui/material";
import { HvButton, HvBanner, HvProvider } from "../..";

import Banner, { HvBannerContent } from "..";
import iconVariant from "../../utils/iconVariant";

describe("Banner ", () => {
  const wrapper = mount(
    <HvProvider cssBaseline={false}>
      <HvBanner id="banner" variant="default" open={false} onClose={() => {}} />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper.find(Banner)).toMatchSnapshot();
  });

  it("should render the Banner component", () => {
    const bannerComponent = wrapper.find(Banner);
    expect(bannerComponent.length).toBe(1);
  });

  it("shouldn't render the BannerContentWrapper component", () => {
    const bannerComponent = wrapper.find(HvBannerContent);
    expect(bannerComponent.length).toBe(0);
  });

  it("should render the BannerContentWrapper component", () => {
    const bannerComponent = mount(
      <HvProvider cssBaseline={false}>
        <HvBanner id="banner" variant="default" label="label" open onClose={() => {}} />
      </HvProvider>
    ).find(HvBannerContent);
    expect(bannerComponent.length).toBe(1);
  });

  it("should render the icon in the component", () => {
    const iconComponent = mount(
      <HvProvider cssBaseline={false}>
        <HvBanner id="banner" variant="error" label="label" open showIcon onClose={() => {}} />
      </HvProvider>
    ).find(Fail);
    expect(iconComponent.length).toBe(1);
  });

  it("shouldn't render the icon in the component", () => {
    const iconComponent = mount(
      <HvProvider cssBaseline={false}>
        <HvBanner
          id="banner"
          variant="error"
          label="label"
          open
          showIcon={false}
          onClose={() => {}}
        />
      </HvProvider>
    ).find(Fail);
    expect(iconComponent.length).toBe(0);
  });

  it("should render a custom icon in the component", () => {
    const iconComponent = mount(
      <HvProvider cssBaseline={false}>
        <HvBanner
          id="banner"
          variant="default"
          label="label"
          open
          customIcon={<Fail />}
          onClose={() => {}}
        />
      </HvProvider>
    ).find(Fail);
    expect(iconComponent.length).toBe(1);
  });

  it("should render a action on the message", () => {
    const myButton = (
      <div id="buttonWrapper">
        <HvButton id="myActionButton">button</HvButton>
      </div>
    );
    const buttonComponent = mount(
      <HvProvider cssBaseline={false}>
        <HvBanner
          id="banner"
          label="label"
          variant="default"
          open
          actions={myButton}
          actionsPosition="inline"
          onClose={() => {}}
        />
      </HvProvider>
    ).find("#buttonWrapper");
    expect(buttonComponent.length).toBe(1);
  });

  it("should render a action by passing a structure on the message", () => {
    const buttonComponent = mount(
      <HvProvider cssBaseline={false}>
        <HvBanner
          id="banner1"
          variant="default"
          open
          label="label"
          actions={[
            {
              id: "testButton",
              label: "test",
            },
          ]}
          actionsPosition="inline"
          onClose={() => {}}
        />
      </HvProvider>
    );
    expect(buttonComponent.length).toBe(1);
  });

  it("should render a action on the action container", () => {
    const myButton = (
      <div id="buttonWrapper">
        <HvButton id="myActionButton">button</HvButton>
      </div>
    );
    const buttonComponent = mount(
      <HvProvider cssBaseline={false}>
        <HvBanner
          id="banner"
          variant="default"
          open
          label="label"
          actions={myButton}
          actionsPosition="bottom-right"
          onClose={() => {}}
        />
      </HvProvider>
    ).find(HvButton);
    expect(buttonComponent.find("button").find("#myActionButton").length).toBe(1);
  });

  it("should render a action by passing a structure on the action container", () => {
    const buttonComponent = mount(
      <HvProvider cssBaseline={false}>
        <HvBanner
          id="Snackbar"
          variant="default"
          open
          label="label"
          actions={[
            {
              id: "testButton",
              label: "test",
            },
          ]}
          actionsPosition="bottom-right"
          onClose={() => {}}
        />
      </HvProvider>
    ).find(HvButton);
    expect(buttonComponent.find("button").find("#testButton").length).toBe(1);
  });

  it("should render with the correct offset", () => {
    const offset = 10;
    let component = mount(
      <HvProvider cssBaseline={false}>
        <HvBanner open offset={offset} onClose={() => {}} label="label" />
      </HvProvider>
    ).find(MaterialSnackbar);

    expect(component.get(0).props.style).toEqual({ top: `${offset}px` });

    component = mount(
      <HvProvider cssBaseline={false}>
        <HvBanner open offset={offset} anchorOrigin="bottom" label="label" onClose={() => {}} />
      </HvProvider>
    ).find(MaterialSnackbar);

    expect(component.get(0).props.style).toEqual({ bottom: `${offset}px` });
  });

  it("should return the severity variant", () => {
    const error = mount(<HvProvider cssBaseline={false}>{iconVariant("error")}</HvProvider>).find(
      Fail
    );
    expect(error.length).toBe(1);
    const invalid = iconVariant("test");
    expect(invalid).toBe(null);
  });
});
