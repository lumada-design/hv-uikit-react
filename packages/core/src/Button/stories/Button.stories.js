/* eslint-disable no-alert */
import * as React from "react";
import { Caution } from "@hv/uikit-react-icons/dist";
import { HvButton, HvGrid } from "../..";

export default {
  title: "Patterns/Button",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvButton } from '@hv/uikit-react-core/dist'"
  },
  component: HvButton
};

export const MainStory = () => {
  const semanticButtonStyling = {
    backgroundColor: "#D3E3F6",
    width: "100px",
    display: "flex",
    justifyContent: "center"
  };

  const separator = {
    margin: "0 5px"
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={separator}>
        <HvButton category="primary">Primary</HvButton>
      </div>
      <div style={separator}>
        <HvButton category="secondary">Secondary</HvButton>
      </div>
      <div style={separator}>
        <HvButton category="ghost">Ghost</HvButton>
      </div>
      <div style={semanticButtonStyling}>
        <div style={separator}>
          <HvButton category="semantic">Semantic</HvButton>
        </div>
      </div>
    </div>
  );
};

export const DisabledButtons = () => {
  const semanticButtonStyling = {
    backgroundColor: "#D3E3F6",
    width: "100px",
    display: "flex",
    justifyContent: "center"
  };

  const separator = {
    margin: "0 5px"
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={separator}>
        <HvButton onClick={() => alert("This can't be triggered")} disabled category="primary">
          Primary
        </HvButton>
      </div>
      <div style={separator}>
        <HvButton onClick={() => alert("This can't be triggered")} disabled category="secondary">
          Secondary
        </HvButton>
      </div>
      <div style={separator}>
        <HvButton onClick={() => alert("This can't be triggered")} disabled category="ghost">
          Ghost
        </HvButton>
      </div>
      <div style={semanticButtonStyling}>
        <div style={separator}>
          <HvButton onClick={() => alert("This can't be triggered")} disabled category="semantic">
            Semantic
          </HvButton>
        </div>
      </div>
    </div>
  );
};

DisabledButtons.story = {
  parameters: {
    docs: {
      storyDescription: "Disabled buttons that don't allow any interaction."
    }
  }
};

export const PrimaryButton = () => (
  <HvButton onClick={() => alert("You clicked me")} category="primary">
    Primary
  </HvButton>
);

PrimaryButton.story = {
  parameters: {
    docs: {
      storyDescription: "Primary Button with click action."
    }
  }
};

export const SecondaryButton = () => (
  <HvButton onClick={() => alert("You clicked me")} category="secondary">
    Secondary
  </HvButton>
);

SecondaryButton.story = {
  parameters: {
    docs: {
      storyDescription: "Secondary button."
    }
  }
};

export const GhostButton = () => (
  <HvButton
    onClick={() => {
      // eslint-disable-next-line no-alert
      alert("You clicked me");
    }}
    category="ghost"
  >
    Ghost
  </HvButton>
);

GhostButton.story = {
  name: "Ghost Button",
  parameters: {
    docs: {
      storyDescription: "Ghost button with click action."
    }
  }
};

export const SemanticButton = () => {
  const semanticButtonStyling = {
    backgroundColor: "#D3E3F6",
    width: "100px",
    display: "flex",
    justifyContent: "center"
  };
  return (
    <div style={semanticButtonStyling}>
      <HvButton
        onClick={() => {
          // eslint-disable-next-line no-alert
          alert("You clicked me");
        }}
        category="semantic"
      >
        Semantic
      </HvButton>
    </div>
  );
};

SemanticButton.story = {
  name: "Semantic Button",
  parameters: {
    docs: {
      storyDescription: "Semantic button with click action."
    }
  }
};

export const SmokeTests = () => (
  <>
    <HvGrid container>
      <HvGrid item xl={2}>
        Enable
      </HvGrid>
      <HvGrid item xl={2}>
        <HvButton id="default" startIcon={<Caution />} onClick={() => alert("default")}>
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

SmokeTests.story = {
  parameters: {
    docs: {
      disable: true
    }
  }
};
