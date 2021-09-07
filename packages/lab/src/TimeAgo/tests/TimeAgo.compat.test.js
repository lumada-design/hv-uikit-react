/* eslint-env jest */
/* eslint-disable max-classes-per-file, no-global-assign */

import React from "react";
import { mount } from "enzyme";
import { HvProvider, HvTypography } from "@hv/uikit-react-core";
import { formatTimeAgo } from "../formatUtils";
import { HvTimeAgo } from "../..";

// Tests suite to test compatibility with current DFM TimeAgo implementation

const EM_DASH = "—";

const mockDateToTimeAgo = {
  timeAgo: "mockTimeAgo",
  delay: 120,
};

jest.mock("../formatUtils", () => ({
  formatTimeAgo: jest.fn(() => mockDateToTimeAgo),
}));

describe("TimeAgo", () => {
  it("should be defined", () => {
    expect(HvTimeAgo).toBeDefined();
  });

  it("should render a Typography if no component is used in props", () => {
    const dateNow = 1;
    Date = class extends Date {
      constructor() {
        super(dateNow);
      }
    };

    jest.useFakeTimers();
    const wrapper = mount(
      <HvProvider>
        <HvTimeAgo timestamp={dateNow} />
      </HvProvider>
    );
    expect(wrapper.find(HvTypography).length).toEqual(1);
    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenNthCalledWith(1, expect.anything(), 0);
    expect(setTimeout).toHaveBeenNthCalledWith(
      2,
      expect.anything(),
      mockDateToTimeAgo.delay * 1000
    );
  });

  it("should render a Typography if component is used in props", () => {
    const dateNow = 1;
    Date = class extends Date {
      constructor() {
        super(dateNow);
      }
    };

    jest.useFakeTimers();
    // eslint-disable-next-line react/prop-types
    const mockRenderComponent = ({ children }) => <div>{children}</div>;
    const wrapper = mount(
      <HvProvider>
        <HvTimeAgo timestamp={dateNow} component={mockRenderComponent} />
      </HvProvider>
    );
    expect(wrapper.find(HvTypography).length).toEqual(0);
    expect(wrapper.find(mockRenderComponent).length).toEqual(1);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenNthCalledWith(
      1,
      expect.anything(),
      mockDateToTimeAgo.delay * 1000
    );
  });

  it("should render a Typography with a formatted time", () => {
    const dateNow = 1;
    Date = class extends Date {
      constructor() {
        super(dateNow);
      }
    };

    jest.useFakeTimers();
    const wrapper = mount(
      <HvProvider>
        <HvTimeAgo timestamp={dateNow} />
      </HvProvider>
    );
    expect(wrapper.find(HvTypography).length).toEqual(1);
    expect(wrapper.find(HvTypography).props().children).toEqual(mockDateToTimeAgo.timeAgo);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenNthCalledWith(
      1,
      expect.anything(),
      mockDateToTimeAgo.delay * 1000
    );
  });

  it("should render a Typography with a formatted time with seconds", () => {
    const dateNow = 1;
    Date = class extends Date {
      constructor() {
        super(dateNow);
      }
    };

    jest.useFakeTimers();
    const formatTimeAgoMockSeconds = jest.fn();
    formatTimeAgoMockSeconds.mockImplementation(() => mockDateToTimeAgo);
    formatTimeAgo.mockImplementation(formatTimeAgoMockSeconds);

    const wrapper = mount(
      <HvProvider>
        <HvTimeAgo timestamp={dateNow} showSeconds />
      </HvProvider>
    );
    expect(wrapper.find(HvTypography).length).toEqual(1);
    expect(wrapper.find(HvTypography).props().children).toEqual(mockDateToTimeAgo.timeAgo);
    expect(formatTimeAgoMockSeconds).toHaveBeenNthCalledWith(
      1,
      expect.anything(),
      expect.anything(),
      true
    );
  });

  it("should render a Typography with a dash when timestamp is not defined", () => {
    const wrapper = mount(
      <HvProvider>
        <HvTimeAgo />
      </HvProvider>
    );
    expect(wrapper.find(HvTypography).length).toEqual(1);
    expect(wrapper.find(HvTypography).props().children).toEqual(EM_DASH);
  });
});
