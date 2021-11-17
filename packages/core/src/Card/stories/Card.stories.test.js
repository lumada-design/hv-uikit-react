/* eslint-disable react/prop-types, no-unused-vars */
import { waitFor, screen, fireEvent } from "@testing-library/dom/dist/@testing-library/dom.umd";
import React, { useState } from "react";

import { HvActionBar, HvCard, HvCardHeader, HvCardMedia, HvCheckBox, HvSwitch } from "../..";

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
          <HvActionBar>
            <HvCheckBox
              value="l90"
              checked={checked}
              inputProps={{ "aria-label": "Check asset" }}
            />
          </HvActionBar>
        </HvCard>
      </div>
    </>
  );
};

// test scenario, card selected and dropdownmenu open
export const SelectedOpened = () => AllComponents();

SelectedOpened.parameters = {
  eyes: {
    runBefore: async () => {
      fireEvent.click(screen.getByRole("checkbox"));

      fireEvent.click(screen.getAllByRole("button", { name: /dropdown menu/i })[0]);

      const menu = await screen.findByRole("menu");

      // extra buffer to allow popper layout
      return new Promise((resolve) => {
        setTimeout(() => resolve(menu), 1000);
      });
    },
  },
};
