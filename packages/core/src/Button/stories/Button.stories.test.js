/* eslint-disable no-alert */
import * as React from "react";

import { Caution } from "@hitachivantara/uikit-react-icons";
import { HvButton, HvGrid } from "../..";

export default {
  title: "Tests/Button",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended robot test scenarios

export const SmokeTests = () => (
  <>
    <HvGrid container>
      <HvGrid item xl={2}>
        Enable
      </HvGrid>
      <HvGrid item xl={2}>
        <HvButton
          id="default"
          startIcon={<Caution color="base1" />}
          onClick={() => alert("default")}
        >
          default
        </HvButton>
      </HvGrid>
      <HvGrid item xl={2}>
        <HvButton
          id="secondary"
          category="secondary"
          startIcon={<Caution />}
          onClick={() => alert("secondary")}
        >
          secondary
        </HvButton>
      </HvGrid>
      <HvGrid item xl={2}>
        <HvButton
          id="ghost"
          category="ghost"
          startIcon={<Caution />}
          onClick={() => alert("ghost")}
        >
          ghost
        </HvButton>
      </HvGrid>
      <HvGrid item xl={2}>
        <HvButton
          id="semantic"
          category="semantic"
          startIcon={<Caution />}
          onClick={() => alert("semantic")}
        >
          semantic
        </HvButton>
      </HvGrid>
    </HvGrid>
    <HvGrid container>
      <HvGrid item xl={2}>
        Disable
      </HvGrid>
      <HvGrid item xl={2}>
        <HvButton
          id="disabledPrimary"
          disabled
          startIcon={<Caution />}
          onClick={() => alert("disabled primary")}
        >
          disabled primary
        </HvButton>
      </HvGrid>
      <HvGrid item xl={2}>
        <HvButton
          id="disabledSecondary"
          disabled
          category="secondary"
          startIcon={<Caution />}
          onClick={() => alert("disabled secondary")}
        >
          disabled secondary
        </HvButton>
      </HvGrid>
      <HvGrid item xl={2}>
        <HvButton
          id="disabledGhost"
          disabled
          category="ghost"
          startIcon={<Caution />}
          onClick={() => alert("disabled ghost")}
        >
          disabled ghost
        </HvButton>
      </HvGrid>
      <HvGrid item xl={2}>
        <HvButton
          id="disabledSemantic"
          disabled
          category="semantic"
          startIcon={<Caution />}
          onClick={() => alert("semantic")}
        >
          disabled semantic
        </HvButton>
      </HvGrid>
    </HvGrid>

    <HvGrid container>
      <HvGrid item xl={2}>
        all properties
      </HvGrid>
      <HvGrid item xl>
        <HvButton
          className="all"
          id="allProperties"
          disabled
          startIcon={<Caution />}
          onClick={() => alert("incorrect")}
        >
          all properties
        </HvButton>
      </HvGrid>
    </HvGrid>
  </>
);

SmokeTests.parameters = {
  eyes: { include: false },
};
