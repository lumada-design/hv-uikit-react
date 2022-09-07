/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { Play } from "@hitachivantara/uikit-react-icons";

import HvProvider from "../../../Provider";
import Navigation from "..";

describe("<Navigation />", () => {
  const onChangeMock = jest.fn();
  const consoleSpy = jest.fn();
  // eslint-disable-next-line no-console
  const originalError = console.error;

  beforeEach(async () => {
    // eslint-disable-next-line no-console
    console.error = consoleSpy;
  });

  afterEach(async () => {
    // eslint-disable-next-line no-console
    console.error = originalError;
  });

  let wrapper;

  const navigationData = [
    {
      id: "01",
      label: "System",
      icon: <Play />,
      children: [
        {
          id: "01-01",
          label: "SCPodF",
          children: [
            {
              id: "01-01-01",
              label: "Compute",
            },
            {
              id: "01-01-02",
              label: "Storage",
            },
            {
              id: "01-01-03",
              label: "Ethernet",
            },
            {
              id: "01-01-04",
              label: "Fiber Channel",
              payload: { path: "/hello/world", params: { a: 2, b: "3" } },
            },
          ],
        },
      ],
    },
  ];

  describe("navigation", () => {
    const value = "01-01";

    beforeEach(async () => {
      wrapper = mount(
        <HvProvider cssBaseline={false}>
          <Navigation
            aria-label="Example 1 navigation"
            selected={value}
            onChange={onChangeMock}
            data={navigationData}
          />
        </HvProvider>
      );
    });

    it("should render correctly", () => {
      expect(wrapper.find(Navigation)).toMatchSnapshot();
    });
  });
});
