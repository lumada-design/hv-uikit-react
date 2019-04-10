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
import HvProvider from "@hv/uikit-react-core/dist/Provider";
import Slider from "../Slider";
import SliderWithStyles from "../index";

describe("Slider ", () => {
  const knobProperties = [
    {
      color: "#72cccb",
      dragColor: "#96d9d8"
    },
    {
      color: "#f9dc37",
      dragColor: "#fbe56a"
    },
    {
      color: "#ff9100",
      dragColor: "#ffa733"
    },
    {
      color: "#cc0000",
      dragColor: "#ff0000"
    },
    {
      color: "#cc0000",
      fixed: true,
      hidden: true
    }
  ];

  const knobPropertiesDefaults = [10, 20, 30, 40, 100];

  const knobPropertiesScaled = [
    {
      color: "#72cccb",
      dragColor: "#96d9d8"
    },
    {
      color: "#f9dc37",
      dragColor: "#fbe56a"
    },
    {
      color: "#ff9100",
      dragColor: "#ffa733"
    },
    {
      color: "#cc0000",
      dragColor: "#ff0000"
    },
    {
      color: "#cc0000",
      fixed: true,
      hidden: true
    }
  ];

  const knobPropertiesScaledDefaults = [0.1, 0.2, 0.3, 0.4, 1];

  const wrapper = mount(
    <HvProvider>
      <SliderWithStyles
        knobProperties={knobProperties}
        defaultValues={knobPropertiesDefaults}
      />
    </HvProvider>
  );

  let myMock;

  beforeEach(async () => {
    myMock = jest.fn(() => "mock");
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render the Slider component", () => {
    const sliderComponent = wrapper.find(Slider);
    expect(sliderComponent.length).toBe(1);
  });

  it("should call the format mark function", () => {
    mount(
      <HvProvider>
        <SliderWithStyles
          knobProperties={knobProperties}
          defaultValues={knobPropertiesDefaults}
          formatMark={myMock}
        />
      </HvProvider>
    );

    expect(myMock.mock.calls.length).not.toBe(0);
  });

  // TODO: Review test on calling formatMark function
  it("shouldn't call the format mark function more than one time for each knob when the markProps exist", () => {
    mount(
      <HvProvider>
        <SliderWithStyles
          markProperties={[{ position: 2, label: "asd" }]}
          knobProperties={knobProperties}
          defaultValues={knobPropertiesDefaults}
          formatTooltip={myMock}
        />
      </HvProvider>
    );

    expect(myMock.mock.calls.length).toBe(5);
  });

  it("should define the start of the range with the passed value", () => {
    mount(
      <HvProvider>
        <SliderWithStyles
          minPointValue={15}
          knobProperties={knobProperties}
          defaultValues={knobPropertiesDefaults}
          formatMark={myMock}
        />
      </HvProvider>
    );

    expect(myMock.mock.calls[0]).toEqual(["15"]);
  });

  it("should define the end of the range with the passed value", () => {
    mount(
      <HvProvider>
        <SliderWithStyles
          maxPointValue={87}
          knobProperties={knobProperties}
          defaultValues={knobPropertiesDefaults}
          formatMark={myMock}
        />
      </HvProvider>
    );

    expect(myMock.mock.calls[myMock.mock.calls.length - 1]).toEqual(["87"]);
  });

  it("should define the end of the range with the passed value", () => {
    mount(
      <HvProvider>
        <SliderWithStyles
          divisionQuantity={87}
          knobProperties={knobProperties}
          defaultValues={knobPropertiesDefaults}
          formatMark={myMock}
        />
      </HvProvider>
    );

    // 93 = 87 points + 5 knobs
    expect(myMock.mock.calls.length).toEqual(88);
  });

  it("should call onBefore method just once", () => {
    const myMount = mount(
      <HvProvider>
        <SliderWithStyles
          divisionQuantity={87}
          knobProperties={knobProperties}
          defaultValues={knobPropertiesDefaults}
          onBeforeChange={myMock}
        />
      </HvProvider>
    );

    const instance = myMount.find(Slider).instance();

    instance.onBeforeChangeHandler(["10", "20", "30", "40", "50"]);

    expect(myMock.mock.calls.length).toBe(1);
  });

  it("should call onAfter method just once", () => {
    const myMount = mount(
      <HvProvider>
        <SliderWithStyles
          divisionQuantity={87}
          knobProperties={knobProperties}
          defaultValues={knobPropertiesDefaults}
          onAfterChange={myMock}
        />
      </HvProvider>
    );

    const instance = myMount.find(Slider).instance();

    instance.onAfterChangeHandler(["10", "20", "30", "40", "50"]);

    expect(myMock.mock.calls.length).toBe(1);
  });

  it("should call onChange method just once, adjusting the values to the scale", () => {
    const onChangeMock = rest => {
      expect(rest).toEqual({
        knobsPosition: [11, 25, 37, 48, 100],
        knobsValues: [0.11, 0.25, 0.37, 0.48, 0.7000000000000001]
      });
    };

    const myMount = mount(
      <HvProvider>
        <SliderWithStyles
          maxPointValue={1}
          knobProperties={knobPropertiesScaled}
          defaultValues={knobPropertiesScaledDefaults}
          markDigits={2}
          onChange={onChangeMock}
        />
      </HvProvider>
    );

    const instance = myMount.find(Slider).instance();

    instance.onChangeHandler([11, 25, 37, 48, 70]);
  });

  it("shouldn't allow overlap. The value 100 must pass to 99", () => {
    const onChangeMock = jest.fn(() => "mock");

    const myMount = mount(
      <HvProvider>
        <SliderWithStyles
          knobProperties={knobProperties}
          defaultValues={knobPropertiesDefaults}
          onChange={onChangeMock}
        />
      </HvProvider>
    );

    const instance = myMount.find(Slider).instance();

    instance.onChangeHandler([10, 20, 40, 100, 100]);

    expect(onChangeMock.mock.calls).toEqual([
      [
        {
          knobsPosition: [10, 20, 40, 99, 100],
          knobsValues: [10, 20, 40, 99, 100]
        }
      ]
    ]);
  });
});
