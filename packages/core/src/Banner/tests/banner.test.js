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

import React from "react";
import { mount } from "enzyme";
import Fail from "@hv/uikit-react-icons/dist/Generic/Fail";
import { Snackbar as MaterialSnackbar } from "@material-ui/core";
import Banner from "../Banner";
import HvBannerContentWrapper from "../BannerWrapper";
import BannerWithStyles from "../index";
import HvProvider from "../../Provider";
import {
  mapSeverityToVariant,
  severityIcon,
  variantIcon
} from "../BannerWrapper/VariantUtils";
import Button from "../../Button";

describe("Banner ", () => {
  const wrapper = mount(
    <HvProvider>
      <BannerWithStyles variant="default" open={false} onClose={() => {}} />
    </HvProvider>
  );

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
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
        <BannerWithStyles variant="default" open onClose={() => {}} />
      </HvProvider>
    ).find(HvBannerContentWrapper);
    expect(bannerComponent.length).toBe(1);
  });

  it("should render the icon in the component", () => {
    const iconComponent = mount(
      <HvProvider>
        <BannerWithStyles variant="error" open showIcon onClose={() => {}} />
      </HvProvider>
    ).find(Fail);
    expect(iconComponent.length).toBe(1);
  });

  it("shouldn't render the icon in the component", () => {
    const iconComponent = mount(
      <HvProvider>
        <BannerWithStyles
          variant="error"
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
        <BannerWithStyles
          variant="default"
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
        <BannerWithStyles
          variant="default"
          open
          actionsOnMessage={<Button>button</Button>}
          onClose={() => {}}
        />
      </HvProvider>
    ).find(Button);
    expect(buttonComponent.length).toBe(1);
  });

  it("should render a action on the action container", () => {
    const buttonComponent = mount(
      <HvProvider>
        <BannerWithStyles
          variant="default"
          open
          action={<Button>button</Button>}
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
        <BannerWithStyles open offset={offset} onClose={() => {}} />
      </HvProvider>
    ).find(MaterialSnackbar);

    expect(component.get(0).props.style).toEqual({ top: `${offset}px` });

    component = mount(
      <HvProvider>
        <BannerWithStyles
          open
          offset={offset}
          anchorOrigin="bottom"
          onClose={() => {}}
        />
      </HvProvider>
    ).find(MaterialSnackbar);

    expect(component.get(0).props.style).toEqual({ bottom: `${offset}px` });
  });

  it("should return the right severity icon", () => {
    const theme = {
      hv: {
        palette: {
          semantic: {
            sema1: "#FFFFF",
            sema5: "#FFFFF",
            sema6: "#FFFFF"
          }
        }
      }
    };

    const error = severityIcon("error", theme);
    expect(error).toEqual(variantIcon.error(theme));

    const test = severityIcon("test", theme);
    expect(test).toEqual(variantIcon.success(theme));
  });

  it("should return the severity variant", () => {
    const error = mapSeverityToVariant("error");
    expect(error).toBe("error");

    const test = mapSeverityToVariant("test");
    expect(test).toBe("default");
  });
});
