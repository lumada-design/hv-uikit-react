/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

/* eslint-env jest */

// import { mount } from "enzyme";
import React from "react";
import { mount } from "enzyme";
import Slider from "../Slider";
import SliderWithStyles from "../index";
import HvProvider from "../../Provider";

describe("Slider ", () => {

  const knobProperties = [
    {
      color: "#72cccb",
      dragColor: "#96d9d8",
      defaultValue: 10,
    },
    {
      color: "#f9dc37",
      dragColor: "#fbe56a",
      defaultValue: 20
    },
    {
      color: "#ff9100",
      dragColor: "#ffa733",
      defaultValue: 30
    },
    {
      color: "#cc0000",
      dragColor: "#ff0000",
      defaultValue: 40
    },
    {
      color: "#cc0000",
      defaultValue: 100,
      fixed: true,
      hidden: true
    }
  ];


  const knobPropertiesScaled = [
    {
      color: "#72cccb",
      dragColor: "#96d9d8",
      defaultValue: 0.10,
    },
    {
      color: "#f9dc37",
      dragColor: "#fbe56a",
      defaultValue: 0.20
    },
    {
      color: "#ff9100",
      dragColor: "#ffa733",
      defaultValue: 0.30
    },
    {
      color: "#cc0000",
      dragColor: "#ff0000",
      defaultValue: 0.40
    },
    {
      color: "#cc0000",
      defaultValue: 1,
      fixed: true,
      hidden: true
    }
  ];

  const wrapper = mount(<HvProvider><SliderWithStyles knobProperties={knobProperties} /></HvProvider>);

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

    mount(<HvProvider><SliderWithStyles knobProperties={knobProperties} formatMark={myMock} /></HvProvider>);

    expect(myMock.mock.calls.length).not.toBe(0);

  });


  it("shouldn't call the format mark function more than one time for each knob when the markProps exist", () => {

    mount(<HvProvider><SliderWithStyles markProperties={[{ position: 2, label: "asd" }]} knobProperties={knobProperties} formatMark={myMock} /></HvProvider>);

    expect(myMock.mock.calls.length).toBe(5);

  });

  it("should define the start of the range with the passed value", () => {

    mount(<HvProvider><SliderWithStyles minPointValue={15} knobProperties={knobProperties} formatMark={myMock} /></HvProvider>);

    expect(myMock.mock.calls[0]).toEqual(["15"]);

  });

  it("should define the end of the range with the passed value", () => {

    mount(<HvProvider><SliderWithStyles maxPointValue={87} knobProperties={knobProperties} formatMark={myMock} /></HvProvider>);

    expect(myMock.mock.calls[myMock.mock.calls.length - 1]).toEqual(["87"]);

  });


  it("should define the end of the range with the passed value", () => {

    mount(<HvProvider><SliderWithStyles divisionQuantity={87} knobProperties={knobProperties} formatMark={myMock} /></HvProvider>);

    // 93 = 87 points + 5 knobs
    expect(myMock.mock.calls.length).toEqual(93);

  });

  it("should call onBefore method just once", () => {

    const myMount = mount(<HvProvider><SliderWithStyles divisionQuantity={87} knobProperties={knobProperties} onBeforeChange={myMock} /></HvProvider>);

    const instance = myMount.find(Slider).instance();

    instance.onBeforeChangeHandler(["10", "20", "30", "40", "50"]);

    expect((myMock.mock.calls.length)).toBe(1);


  });

  it("should call onAfter method just once", () => {

    const myMount = mount(<HvProvider><SliderWithStyles divisionQuantity={87} knobProperties={knobProperties} onAfterChange={myMock} /></HvProvider>);

    const instance = myMount.find(Slider).instance();

    instance.onAfterChangeHandler(["10", "20", "30", "40", "50"]);

    expect((myMock.mock.calls.length)).toBe(1);

  });


  it("should call onChange method just once, adjusting the values to the scale", () => {

    const onChangeMock = (rest) => {
      expect(rest).toEqual({
        "knobsPosition": [
          11,
          25,
          37,
          48,
          100
        ],
        "knobsValues": [
          0.11,
          0.25,
          0.37,
          0.48,
          0.7000000000000001
        ]
      })
    };

    const myMount = mount(<HvProvider><SliderWithStyles maxPointValue={1} knobProperties={knobPropertiesScaled} markDigits={2} onChange={onChangeMock} /></HvProvider>);

    const instance = myMount.find(Slider).instance();

    instance.onChangeHandler([11, 25, 37, 48, 70]);

  });

  it("shouldn't allow overlap. The value 100 must pass to 99", () => {

    const onChangeMock = jest.fn(() => "mock");

    const myMount = mount(<HvProvider><SliderWithStyles knobProperties={knobProperties} onChange={onChangeMock} /></HvProvider>);

    const instance = myMount.find(Slider).instance();

    instance.onChangeHandler([10, 20, 40, 100, 100]);

    expect(onChangeMock.mock.calls).toEqual(
      [
        [
          {
            "knobsPosition": [
              10,
              20,
              40,
              99,
              100
            ],
            "knobsValues": [
              10,
              20,
              40,
              99,
              100
            ]
          }
        ]
      ]);

  });

});
