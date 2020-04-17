/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import { toHaveNoViolations } from "jest-axe";
import axe from "../../../config/axe-config";
import { HvProvider } from "../..";
import Modal from "..";
import { Accessibility } from "../stories/Modal.stories";

expect.extend(toHaveNoViolations);

describe("ModalA11Y", () => {
  let wrapper;
  const onCloseMock = jest.fn();
  const open = true;

  it("default state", async () => {
    wrapper = mount(
      <HvProvider>
        <Modal open={open} onClose={onCloseMock}>
          Modal Content
        </Modal>
      </HvProvider>
    );

    const results = await axe(wrapper.html(), {
      // const disable for role="none presentation"
      rules: { "aria-roles": { enabled: false } }
    });
    expect(results).toHaveNoViolations();
  });

  it("with composition", async () => {
    wrapper = mount(
      <HvProvider>
        <Accessibility />
      </HvProvider>
    );

    const results = await axe(wrapper.html(), {
      // const disable for role="none presentation"
      rules: { "aria-roles": { enabled: false } }
    });
    expect(results).toHaveNoViolations();
  });
});
