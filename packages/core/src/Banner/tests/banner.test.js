import React from "react";
import { mount } from "enzyme";
import Fail from "@hv/uikit-react-icons/dist/Fail";
import { Snackbar as MaterialSnackbar } from "@material-ui/core";
import { toHaveNoViolations } from "jest-axe";
import Banner from "..";
import HvBannerContentWrapper from "../BannerWrapper";
import HvProvider from "../../Provider";
import iconVariants from "../../utils/iconVariants";
import Button from "../../Button";

import axe from "../../../config/axe-config";

expect.extend(toHaveNoViolations);

describe("Banner ", () => {
  const wrapper = mount(
    <HvProvider>
      <Banner id="banner" variant="default" open={false} onClose={() => {}} />
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
    const bannerComponent = wrapper.find(HvBannerContentWrapper);
    expect(bannerComponent.length).toBe(0);
  });

  it("should render the BannerContentWrapper component", () => {
    const bannerComponent = mount(
      <HvProvider>
        <Banner id="banner" variant="default" label="label" open onClose={() => {}} />
      </HvProvider>
    ).find(HvBannerContentWrapper);
    expect(bannerComponent.length).toBe(1);
  });

  it("should render the icon in the component", () => {
    const iconComponent = mount(
      <HvProvider>
        <Banner id="banner" variant="error" label="label" open showIcon onClose={() => {}} />
      </HvProvider>
    ).find(Fail);
    expect(iconComponent.length).toBe(1);
  });

  it("shouldn't render the icon in the component", () => {
    const iconComponent = mount(
      <HvProvider>
        <Banner
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
      <HvProvider>
        <Banner
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
    const buttonComponent = mount(
      <HvProvider>
        <Banner
          id="banner"
          label="label"
          variant="default"
          open
          actions={<Button>button</Button>}
          actionsPosition="inline"
          onClose={() => {}}
        />
      </HvProvider>
    ).find(Button);
    expect(buttonComponent.length).toBe(1);
  });

  it("should render a action by passing a structure on the message", () => {
    const buttonComponent = mount(
      <HvProvider>
        <Banner
          id="banner1"
          variant="default"
          open
          label="label"
          actions={[
            {
              id: "testButton",
              label: "test"
            }
          ]}
          actionsPosition="inline"
          onClose={() => {}}
        />
      </HvProvider>
    ).find(Button);
    expect(buttonComponent.length).toBe(1);
  });

  it("should render a action on the action container", () => {
    const buttonComponent = mount(
      <HvProvider>
        <Banner
          id="banner"
          variant="default"
          open
          label="label"
          actions={<Button>button</Button>}
          actionsPosition="bottom-right"
          onClose={() => {}}
        />
      </HvProvider>
    ).find(Button);
    expect(buttonComponent.length).toBe(1);
  });

  it("should render a action by passing a structure on the action container", () => {
    const buttonComponent = mount(
      <HvProvider>
        <Banner
          id="Snackbar"
          variant="default"
          open
          label="label"
          actions={[
            {
              id: "testButton",
              label: "test"
            }
          ]}
          actionsPosition="bottom-right"
          onClose={() => {}}
        />
      </HvProvider>
    ).find(Button);
    expect(buttonComponent.length).toBe(1);
  });

  it("should render with the correct offset", () => {
    const offset = 10;
    let component = mount(
      <HvProvider>
        <Banner open offset={offset} onClose={() => {}} label="label" />
      </HvProvider>
    ).find(MaterialSnackbar);

    expect(component.get(0).props.style).toEqual({ top: `${offset}px` });

    component = mount(
      <HvProvider>
        <Banner open offset={offset} anchorOrigin="bottom" label="label" onClose={() => {}} />
      </HvProvider>
    ).find(MaterialSnackbar);

    expect(component.get(0).props.style).toEqual({ bottom: `${offset}px` });
  });

  it("should return the severity variant", () => {
    const error = mount(iconVariants("error")).find("Fail");
    expect(error.length).toBe(1);
    expect(iconVariants("test")).toBe(null);
  });
});

describe("BannerA11Y", () => {
  const bannerContentProps = {
    actionProps: {
      "aria-label": "Close Button Label"
    }
  };

  it("simple banner should have no errors", async () => {
    const wrapper = mount(
      <HvProvider>
        <Banner
          variant="default"
          open
          showIcon
          label="Label"
          onClose={() => {}}
          bannerContentProps={bannerContentProps}
        />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });

  it("banner with actions should have no errors", async () => {
    const wrapper = mount(
      <HvProvider>
        <Banner
          id="banner"
          variant="default"
          open
          actions={[
            {
              id: "testButton",
              label: "test"
            }
          ]}
          showIcon
          label="Label"
          onClose={() => {}}
          bannerContentProps={bannerContentProps}
        />
      </HvProvider>
    );

    const results = await axe(wrapper.html());

    expect(results).toHaveNoViolations();
  });
});
