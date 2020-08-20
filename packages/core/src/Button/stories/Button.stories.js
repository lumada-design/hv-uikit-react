/* eslint-disable no-alert */
import * as React from "react";

import { HvButton } from "../..";

export default {
  title: "Patterns/Button",
  parameters: {
    componentSubtitle: null,
    v3: true,
    usage: "import { HvButton } from '@hv/uikit-react-core/dist'"
  },
  component: HvButton
};

export const MainStory = () => {
  const semanticButtonStyling = {
    backgroundColor: "#D3E3F6",
    width: "100px",
    height: "50px",
    display: "flex",
    alignItems: "center",
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
    },
    v3: true
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
    },
    v3: true
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
    },
    v3: true
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
    },
    v3: true
  }
};

export const SemanticButton = () => {
  const semanticButtonStyling = {
    backgroundColor: "#D3E3F6",
    width: "100px",
    height: "50px",
    display: "flex",
    alignItems: "center",
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
    },
    v3: true
  }
};
