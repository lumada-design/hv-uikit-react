/* eslint-disable react/prop-types, no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { wait, screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
import React, { useState } from "react";

import { HvActionContainer, HvCard, HvCardHeader, HvCardMedia, HvCheckBox, HvSwitch } from "../..";

import { AllComponents } from "./Card.stories";
import compressor from "./resources/compressor.png";

export default {
  title: "Tests/Card",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended robot test scenarios

export const Controlled = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <HvSwitch
        id="controller"
        checked={checked}
        displayIconChecked
        onChange={() => setChecked(!checked)}
      />
      <div style={{ width: 360, paddingTop: 10 }}>
        <HvCard id="controlled" selectable selected={checked}>
          <HvCardHeader title="Asset Avatar L90" subheader="Compressor" />
          <HvCardMedia component="img" image={compressor} height={186} title="Compressor" />
          <HvActionContainer>
            <HvCheckBox
              value="l90"
              checked={checked}
              inputProps={{ "aria-label": "Check asset" }}
            />
          </HvActionContainer>
        </HvCard>
      </div>
    </>
  );
};

// test scenario, card selected and dropdownmenu open
export const SelectedOpened = () => AllComponents();

SelectedOpened.story = {
  parameters: {
    eyes: {
      runBefore() {
        fireEvent.click(screen.getByRole("checkbox"));
        fireEvent.click(screen.getByLabelText("Dropdown menu"));
        return wait(() => screen.getByText("Delete"));
      },
    },
  },
};
