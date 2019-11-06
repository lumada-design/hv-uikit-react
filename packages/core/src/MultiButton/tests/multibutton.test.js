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

import Map from "@hv/uikit-react-icons/dist/Generic/Map";
import LocationPin from "@hv/uikit-react-icons/dist/Generic/LocationPin";
import MultibuttonWithStyles from "../index";
import MultiButton from "../MultiButton";
import HvProvider from "../../Provider";

const buttonsDefinitions = [
  { id: "map", value: "map", icon: <Map />, selected: true },
  { id: "satellite", value: "satellite", icon: <LocationPin /> },
  { id: "map1", value: "map1", icon: <Map /> },
  { id: "satellite1", value: "satellite1", icon: <LocationPin /> }
];

describe("Multibutton withStyles - Icons Only", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <HvProvider>
        <MultibuttonWithStyles buttons={buttonsDefinitions} type="icon" multi />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Multibutton component", () => {
    const multiButtonComponent = wrapper.find(MultiButton);
    expect(multiButtonComponent.length).toBe(1);
  });

  it("should render the inner buttons and match to definitions", () => {
    const multiButtonComponent = wrapper.find(MultiButton);
    expect(multiButtonComponent.length).toBe(1);
  });
  it("should correctly handle state changes", () => {
    const multiButtonComponent = wrapper.find(MultiButton);
    const instance = multiButtonComponent.instance();

    instance.handleClick(
      {
        target: {
          nodename: "SPAN",
          dataset: {
            selectionindicator: ""
          },
          id: "map"
        }
      },
      0
    );

    expect(instance.state.checkedItems.length).toBe(0);

    instance.handleClick(
      {
        target: {
          nodename: "SPAN",
          dataset: {
            selectionindicator: ""
          },
          id: "map"
        }
      },
      0
    );
    expect(instance.state.checkedItems.length).toBe(1);

    instance.handleClick(
      {
        target: {
          nodename: "SPAN",
          dataset: {
            selectionindicator: ""
          },
          id: "satellite"
        }
      },
      1
    );
    expect(instance.state.checkedItems.length).toBe(2);
  });
});

describe("Multibutton withStyles - Text Only", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <HvProvider>
        <MultibuttonWithStyles buttons={buttonsDefinitions} type="text" multi />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Multibutton component", () => {
    const multiButtonComponent = wrapper.find(MultiButton);
    expect(multiButtonComponent.length).toBe(1);
  });
});

describe("Multibutton withStyles - Text and Icons", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <HvProvider>
        <MultibuttonWithStyles
          buttons={buttonsDefinitions}
          type="mixed"
          multi
        />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Multibutton component", () => {
    const multiButtonComponent = wrapper.find(MultiButton);
    expect(multiButtonComponent.length).toBe(1);
  });
});

const conditionalButtonsDefinitions = [
  {
    id: "map",
    value: "map",
    icon: <Map />,
    selected: true,
    enforced: true
  },
  { id: "satellite", value: "satellite", icon: <LocationPin /> },
  { id: "map1", value: "map1", icon: <Map /> },
  { id: "satellite1", value: "satellite1", icon: <LocationPin /> }
];

describe("Multibutton withStyles - Enforce No Selection", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <HvProvider>
        <MultibuttonWithStyles
          buttons={conditionalButtonsDefinitions}
          type="mixed"
          multi
        />
      </HvProvider>
    );
  });

  it("should not allow for deselection", () => {
    const multiButtonComponent = wrapper.find(MultiButton);
    const instance = multiButtonComponent.instance();
    instance.handleClick(
      {
        target: {
          nodename: "SPAN",
          dataset: {
            selectionindicator: ""
          },
          id: "map"
        }
      },
      0
    );

    expect(instance.state.checkedItems.length).toBe(1);
  });
});

const minimalSelectionButtonsDefinitions = [
  { id: "map", value: "map", icon: <Map />, selected: true },
  {
    id: "satellite",
    value: "satellite",
    icon: <LocationPin />,
    selected: true
  },
  { id: "map1", value: "map1", icon: <Map />, selected: true },
  { id: "satellite1", value: "satellite1", icon: <LocationPin /> }
];

describe("Multibutton withStyles - Enforce Minimum Selection", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <HvProvider>
        <MultibuttonWithStyles
          buttons={minimalSelectionButtonsDefinitions}
          type="mixed"
          multi
          minSelection={1}
        />
      </HvProvider>
    );
  });

  it("should not allow for deselection", () => {
    const multiButtonComponent = wrapper.find(MultiButton);
    const instance = multiButtonComponent.instance();
    instance.handleClick(
      {
        target: {
          nodename: "SPAN",
          dataset: {
            selectionindicator: ""
          },
          id: "map"
        }
      },
      0
    );
    instance.handleClick(
      {
        target: {
          nodename: "SPAN",
          dataset: {
            selectionindicator: ""
          },
          id: "satellite"
        }
      },
      1
    );
    instance.handleClick(
      {
        target: {
          nodename: "SPAN",
          dataset: {
            selectionindicator: ""
          },
          id: "map1"
        }
      },
      2
    );
    expect(instance.state.checkedItems.length).toBe(1);
  });
});

describe("Multibutton withStyles - Enforce Maximum Selection", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <HvProvider>
        <MultibuttonWithStyles
          buttons={minimalSelectionButtonsDefinitions}
          type="mixed"
          multi
          minSelection={1}
          maxSelection={3}
        />
      </HvProvider>
    );
  });

  it("should not allow for Selection after max number has been selected", () => {
    const multiButtonComponent = wrapper.find(MultiButton);
    const instance = multiButtonComponent.instance();
    instance.handleClick(
      {
        target: {
          nodename: "SPAN",
          dataset: {
            selectionindicator: ""
          },
          id: "map"
        }
      },
      0
    );
    instance.handleClick(
      {
        target: {
          nodename: "SPAN",
          dataset: {
            selectionindicator: ""
          },
          id: "satellite"
        }
      },
      1
    );
    instance.handleClick(
      {
        target: {
          nodename: "SPAN",
          dataset: {
            selectionindicator: ""
          },
          id: "map1"
        }
      },
      2
    );
    expect(instance.state.checkedItems.length).toBe(1);

    instance.handleClick(
      {
        target: {
          nodename: "SPAN",
          dataset: {
            selectionindicator: ""
          },
          id: "satellite"
        }
      },
      1
    );

    expect(instance.state.checkedItems.length).toBe(2);

    instance.handleClick(
      {
        target: {
          nodename: "SPAN",
          dataset: {
            selectionindicator: ""
          },
          id: "map"
        }
      },
      0
    );

    expect(instance.state.checkedItems.length).toBe(3);

    instance.handleClick(
      {
        target: {
          nodename: "SPAN",
          dataset: {
            selectionindicator: ""
          },
          id: "satellite1"
        }
      },
      3
    );

    expect(instance.state.checkedItems.length).toBe(3);
  });
});
