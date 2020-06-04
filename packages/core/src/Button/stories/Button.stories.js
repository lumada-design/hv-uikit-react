/* eslint-disable no-alert */
import * as React from "react";
import { withStyles } from "@material-ui/core";
import { Caution } from "@hv/uikit-react-icons/dist";
import { HvButton, HvGrid } from "../..";

export default {
  title: "Components/Button",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvButton } from '@hv/uikit-react-core/dist'"
  },
  component: HvButton
};

// any other clever way of doing this?
// the sample source code will have HvButtonWithMargin instead of HvButton...
const HvButtonWithMargin = withStyles({
  root: {
    margin: "0 5px"
  }
})(HvButton);

export const MainStory = () => {
  const semanticButtonStyling = {
    backgroundColor: "#D3E3F6",
    width: "100px",
    display: "flex",
    justifyContent: "center"
  };

  return (
    <div style={{ display: "flex" }}>
      <HvButtonWithMargin category="primary">Primary</HvButtonWithMargin>
      <HvButtonWithMargin category="secondary">Secondary</HvButtonWithMargin>
      <HvButtonWithMargin category="ghost">Ghost</HvButtonWithMargin>
      <HvButtonWithMargin category="ghostSecondary">Ghost Secondary</HvButtonWithMargin>
      <div style={semanticButtonStyling}>
        <HvButtonWithMargin category="semantic">Semantic</HvButtonWithMargin>
      </div>
    </div>
  );
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

export const PrimaryDisabledButton = () => (
  <HvButton onClick={() => alert("This can't be triggered")} disabled>
    Disabled
  </HvButton>
);

PrimaryDisabledButton.story = {
  parameters: {
    docs: {
      storyDescription: "Disabled button that doesn't allow any interaction."
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

export const GhostSecondaryButton = () => (
  <HvButton
    onClick={() => {
      // eslint-disable-next-line no-alert
      alert("You clicked me");
    }}
    category="ghostSecondary"
  >
    Ghost Secondary
  </HvButton>
);

GhostSecondaryButton.story = {
  name: "Ghost Secondary Button",
  parameters: {
    docs: {
      storyDescription: "Ghost Secondary button with click action."
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
          id="ghostSecondary"
          category="ghostSecondary"
          startIcon={<Caution />}
          onClick={() => alert("ghostSecondary")}
        >
          ghostSecondary
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
          id="disabledGhostSecondary"
          disabled
          category="ghostSecondary"
          startIcon={<Caution />}
          onClick={() => alert("disabled ghostSecondary")}
        >
          disabled ghostSecondary
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
