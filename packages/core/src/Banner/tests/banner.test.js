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
import Level5Unsuccess16Color from "@hv/uikit-react-icons/dist/Level5.S";
import Banner from "../Banner";
import HvBannerContentWrapper from "../BannerWrapper";
import BannerWithStyles from "../index";
import HvProvider from "../../Provider";
import { mapSeverityToVariant, severityIcon, variantIcon } from "../BannerWrapper/VariantUtils";
import Button from "../../Button";

describe("Banner ", () => {
  const wrapper = mount(
    <HvProvider>
      <BannerWithStyles variant="default" onClose={() => {}} />
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
    ).find(Level5Unsuccess16Color);
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
    ).find(Level5Unsuccess16Color);
    expect(iconComponent.length).toBe(0);
  });

  it("should render a custom icon in the component", () => {
    const iconComponent = mount(
      <HvProvider>
        <BannerWithStyles
          variant="default"
          open
          customIcon={<Level5Unsuccess16Color />}
          onClose={() => {}}
        />
      </HvProvider>
    ).find(Level5Unsuccess16Color);
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

  it("should return the right severity icon", () => {
    const error = severityIcon("error");
    expect(error).toBe(variantIcon.error);

    const warning = severityIcon("warning");
    expect(warning).toBe(variantIcon.warning);

    const info = severityIcon("info");
    expect(info).toBe(variantIcon.info);

    const test = severityIcon("test");
    expect(test).toBe(variantIcon.success);
  });

  it("should return the severity variant", () => {
    const catastrophic = mapSeverityToVariant("catastrophic");
    expect(catastrophic).toBe("error");

    const critical = mapSeverityToVariant("critical");
    expect(critical).toBe("warning");

    const warning = mapSeverityToVariant("warning");
    expect(warning).toBe("warning");

    const info = mapSeverityToVariant("info");
    expect(info).toBe("info");

    const marginal = mapSeverityToVariant("marginal");
    expect(marginal).toBe("info");

    const test = mapSeverityToVariant("test");
    expect(test).toBe("default");
  });
});
