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
import moment from "moment";
import HvProvider from "../../../../Provider";
import Header from "../Header";
import HeaderWrapper from "../index";

describe("<Header />", () => {
  let wrapper;
  const topText = "Mock text for the top text";
  const inputDate = new Date(Date.UTC(2020, 0, 1, 0));
  const locale = "en-US";
  moment.locale(locale);
  let HeaderInstance;
  let HeaderComponent;

  beforeEach(async () => {
    wrapper = mount(
      <HvProvider>
        <HeaderWrapper
          id="default"
          topText={topText}
          inputDate={inputDate}
          onSelection={() => {}}
          locale={locale}
        />
      </HvProvider>
    );

    HeaderComponent = wrapper.find(Header);
    HeaderInstance = HeaderComponent.instance();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should set the correct state", () => {
    HeaderInstance.checkInputData();

    expect(HeaderInstance.state.value.format("DD-MM-YYYY")).toBe("01-01-2020");
    expect(HeaderInstance.state.showValue).toBe("1 Jan, 2020");
    expect(HeaderInstance.state.weekDay).toBe("Wed");
  });

  it("should set the correct state with different locale", () => {
    wrapper = mount(
      <HvProvider>
        <HeaderWrapper
          id="default"
          topText={topText}
          inputDate={inputDate}
          onSelection={() => {}}
          locale="pt-PT"
        />
      </HvProvider>
    );

    HeaderComponent = wrapper.find(Header);
    HeaderInstance = HeaderComponent.instance();

    HeaderInstance.checkInputData();

    expect(HeaderInstance.state.value.format("DD-MM-YYYY")).toBe("01-01-2020");
    expect(HeaderInstance.state.showValue).toBe("1 Jan, 2020");
    expect(HeaderInstance.state.weekDay).toBe("Qua");
  });

  it("should set as invalid a wrong date", () => {
    wrapper = mount(
      <HvProvider>
        <HeaderWrapper
          id="default"
          topText={topText}
          inputDate={inputDate}
          onSelection={() => {}}
          locale="pt-PT"
        />
      </HvProvider>
    );

    HeaderComponent = wrapper.find(Header);
    HeaderInstance = HeaderComponent.instance();

    const mockEvent = {
      target: {
        value: "01-13-2010"
      }
    };

    HeaderInstance.onChangeHandler(mockEvent);

    HeaderInstance.checkInputData();

    expect(HeaderInstance.state.isInvalid).toBe(true);
  });
});
