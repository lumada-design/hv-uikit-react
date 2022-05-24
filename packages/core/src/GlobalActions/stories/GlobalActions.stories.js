import React from "react";
import uniqueId from "lodash/uniqueId";

import { Backwards } from "@hitachivantara/uikit-react-icons";
import { HvContainer, HvGlobalActions, HvButton, HvDropDownMenu, HvTypography } from "../..";

export default {
  title: "Components/Global Actions",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvGlobalActions } from '@hitachivantara/uikit-react-core'",
    dsVersion: "3.6.0",
  },
  component: HvGlobalActions,
};

export const Main = () => {
  const BackButton = () => (
    <HvButton aria-label="Back" icon onClick={() => alert("Back!")}>
      <Backwards />
    </HvButton>
  );

  return (
    <HvContainer>
      <HvGlobalActions title="Detail Page Title" backButton={<BackButton />}>
        <HvButton category="primary">Approve & Share</HvButton>
        <HvButton category="secondary">Reset</HvButton>
        <HvDropDownMenu
          id={`dropdownItem-${uniqueId()}`}
          aria-label="dropdownMenu-Items"
          placement="left"
          dataList={[{ label: "Action 2" }, { label: "Action 3" }, { label: "Action 4" }]}
        />
      </HvGlobalActions>

      <div style={{ paddingBottom: 60 }}>
        <HvGlobalActions title="Section Title" variant="section">
          <HvButton category="secondary">Remove</HvButton>
          <HvButton category="secondary">Share</HvButton>
          <HvDropDownMenu
            id={`dropdownItem-${uniqueId()}`}
            aria-label="dropdownMenu-Items"
            placement="left"
            dataList={[{ label: "Action 2" }, { label: "Action 3" }, { label: "Action 4" }]}
          />
        </HvGlobalActions>

        <HvTypography variant="normalText" style={{ marginTop: 20, marginBottom: 30 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi lacus sed.
          Tortor at risus viverra adipiscing at in tellus. Et netus et malesuada fames ac turpis.
          Sed blandit libero volutpat sed cras ornare arcu. Arcu odio ut sem nulla pharetra diam sit
          amet. Sagittis purus sit amet volutpat consequat mauris nunc congue. Sed vulputate mi sit
          amet mauris commodo quis imperdiet massa. Dictum varius duis at consectetur. Lorem sed
          risus ultricies tristique nulla aliquet enim tortor at. Turpis egestas maecenas pharetra
          convallis posuere morbi. Eget sit amet tellus cras adipiscing. Egestas erat imperdiet sed
          euismod nisi. Morbi tincidunt augue interdum velit euismod in pellentesque massa. At augue
          eget arcu dictum varius duis at. Tellus elementum sagittis vitae et. In est ante in nibh
          mauris cursus mattis. Faucibus nisl tincidunt eget nullam non. Cursus metus aliquam
          eleifend mi in nulla posuere.
        </HvTypography>

        <HvTypography variant="normalText" style={{ marginBottom: 60 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi lacus sed.
          Tortor at risus viverra adipiscing at in tellus. Et netus et malesuada fames ac turpis.
          Sed blandit libero volutpat sed cras ornare arcu. Arcu odio ut sem nulla pharetra diam sit
          amet. Sagittis purus sit amet volutpat consequat mauris nunc congue. Sed vulputate mi sit
          amet mauris commodo quis imperdiet massa. Dictum varius duis at consectetur. Lorem sed
          risus ultricies tristique nulla aliquet enim tortor at. Turpis egestas maecenas pharetra
          convallis posuere morbi. Eget sit amet tellus cras adipiscing. Egestas erat imperdiet sed
          euismod nisi. Morbi tincidunt augue interdum velit euismod in pellentesque massa. At augue
          eget arcu dictum varius duis at. Tellus elementum sagittis vitae et. In est ante in nibh
          mauris cursus mattis. Faucibus nisl tincidunt eget nullam non. Cursus metus aliquam
          eleifend mi in nulla posuere.
        </HvTypography>

        <HvGlobalActions title="Section Title" variant="section">
          <HvButton category="secondary">Remove</HvButton>
          <HvButton category="secondary">Share</HvButton>
          <HvDropDownMenu
            id={`dropdownItem-${uniqueId()}`}
            aria-label="dropdownMenu-Items"
            placement="left"
            dataList={[{ label: "Action 2" }, { label: "Action 3" }, { label: "Action 4" }]}
          />
        </HvGlobalActions>

        <HvTypography variant="normalText" style={{ marginTop: 20, marginBottom: 30 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi lacus sed.
          Tortor at risus viverra adipiscing at in tellus. Et netus et malesuada fames ac turpis.
          Sed blandit libero volutpat sed cras ornare arcu. Arcu odio ut sem nulla pharetra diam sit
          amet. Sagittis purus sit amet volutpat consequat mauris nunc congue. Sed vulputate mi sit
          amet mauris commodo quis imperdiet massa. Dictum varius duis at consectetur. Lorem sed
          risus ultricies tristique nulla aliquet enim tortor at. Turpis egestas maecenas pharetra
          convallis posuere morbi. Eget sit amet tellus cras adipiscing. Egestas erat imperdiet sed
          euismod nisi. Morbi tincidunt augue interdum velit euismod in pellentesque massa. At augue
          eget arcu dictum varius duis at. Tellus elementum sagittis vitae et. In est ante in nibh
          mauris cursus mattis. Faucibus nisl tincidunt eget nullam non. Cursus metus aliquam
          eleifend mi in nulla posuere.
        </HvTypography>

        <HvTypography variant="normalText" style={{ marginBottom: 60 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi lacus sed.
          Tortor at risus viverra adipiscing at in tellus. Et netus et malesuada fames ac turpis.
          Sed blandit libero volutpat sed cras ornare arcu. Arcu odio ut sem nulla pharetra diam sit
          amet. Sagittis purus sit amet volutpat consequat mauris nunc congue. Sed vulputate mi sit
          amet mauris commodo quis imperdiet massa. Dictum varius duis at consectetur. Lorem sed
          risus ultricies tristique nulla aliquet enim tortor at. Turpis egestas maecenas pharetra
          convallis posuere morbi. Eget sit amet tellus cras adipiscing. Egestas erat imperdiet sed
          euismod nisi. Morbi tincidunt augue interdum velit euismod in pellentesque massa. At augue
          eget arcu dictum varius duis at. Tellus elementum sagittis vitae et. In est ante in nibh
          mauris cursus mattis. Faucibus nisl tincidunt eget nullam non. Cursus metus aliquam
          eleifend mi in nulla posuere.
        </HvTypography>

        <HvGlobalActions title="Section Title" variant="section">
          <HvButton category="secondary">Remove</HvButton>
          <HvButton category="secondary">Share</HvButton>
          <HvDropDownMenu
            id={`dropdownItem-${uniqueId()}`}
            aria-label="dropdownMenu-Items"
            placement="left"
            dataList={[{ label: "Action 2" }, { label: "Action 3" }, { label: "Action 4" }]}
          />
        </HvGlobalActions>

        <HvTypography variant="normalText" style={{ marginTop: 20, marginBottom: 30 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi lacus sed.
          Tortor at risus viverra adipiscing at in tellus. Et netus et malesuada fames ac turpis.
          Sed blandit libero volutpat sed cras ornare arcu. Arcu odio ut sem nulla pharetra diam sit
          amet. Sagittis purus sit amet volutpat consequat mauris nunc congue. Sed vulputate mi sit
          amet mauris commodo quis imperdiet massa. Dictum varius duis at consectetur. Lorem sed
          risus ultricies tristique nulla aliquet enim tortor at. Turpis egestas maecenas pharetra
          convallis posuere morbi. Eget sit amet tellus cras adipiscing. Egestas erat imperdiet sed
          euismod nisi. Morbi tincidunt augue interdum velit euismod in pellentesque massa. At augue
          eget arcu dictum varius duis at. Tellus elementum sagittis vitae et. In est ante in nibh
          mauris cursus mattis. Faucibus nisl tincidunt eget nullam non. Cursus metus aliquam
          eleifend mi in nulla posuere.
        </HvTypography>

        <HvTypography variant="normalText" style={{ marginBottom: 30 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Purus faucibus ornare suspendisse sed nisi lacus sed.
          Tortor at risus viverra adipiscing at in tellus. Et netus et malesuada fames ac turpis.
          Sed blandit libero volutpat sed cras ornare arcu. Arcu odio ut sem nulla pharetra diam sit
          amet. Sagittis purus sit amet volutpat consequat mauris nunc congue. Sed vulputate mi sit
          amet mauris commodo quis imperdiet massa. Dictum varius duis at consectetur. Lorem sed
          risus ultricies tristique nulla aliquet enim tortor at. Turpis egestas maecenas pharetra
          convallis posuere morbi. Eget sit amet tellus cras adipiscing. Egestas erat imperdiet sed
          euismod nisi. Morbi tincidunt augue interdum velit euismod in pellentesque massa. At augue
          eget arcu dictum varius duis at. Tellus elementum sagittis vitae et. In est ante in nibh
          mauris cursus mattis. Faucibus nisl tincidunt eget nullam non. Cursus metus aliquam
          eleifend mi in nulla posuere.
        </HvTypography>
      </div>
    </HvContainer>
  );
};
Main.decorators = [(storyFn) => <div style={{ height: 300 }}>{storyFn()}</div>];

export const SampleWithAdditionalActions = () => {
  const BackButton = () => (
    <HvButton aria-label="Back" icon onClick={() => alert("Back!")}>
      <Backwards />
    </HvButton>
  );

  return (
    <HvGlobalActions title="Detail Page Title" backButton={<BackButton />}>
      <HvButton category="primary">Primary</HvButton>
      <HvDropDownMenu
        id={`dropdownItem-${uniqueId()}`}
        aria-label="dropdownMenu-Items"
        placement="left"
        dataList={[{ label: "Action 2" }, { label: "Action 3" }, { label: "Action 4" }]}
      />
    </HvGlobalActions>
  );
};

SampleWithAdditionalActions.parameters = {
  docs: {
    description: {
      story:
        "When more than two secondary actions are in place, they should be grouped in a dropdown menu, ordered from the most to least used.",
    },
  },
};

export const SampleWithAdditionalActionsAndNoBackButton = () => {
  return (
    <HvGlobalActions title="Detail Page Title" backButton={false}>
      <HvButton category="primary">Primary</HvButton>
      <HvDropDownMenu
        id={`dropdownItem-${uniqueId()}`}
        aria-label="dropdownMenu-Items"
        placement="left"
        dataList={[{ label: "Action 2" }, { label: "Action 3" }, { label: "Action 4" }]}
      />
    </HvGlobalActions>
  );
};

export const SampleWithCustomTitleAndAdditionalActions = () => {
  const CustomTitle = (
    <HvTypography variant="sectionTitle" component="h1">
      A Custom Title
    </HvTypography>
  );

  const BackButton = () => (
    <HvButton aria-label="Back" icon onClick={() => alert("Back!")}>
      <Backwards />
    </HvButton>
  );

  return (
    <HvGlobalActions title={CustomTitle} backButton={<BackButton />}>
      <HvButton category="primary">Primary</HvButton>
      <HvButton category="secondary">Secondary</HvButton>
      <HvButton category="secondary">Secondary</HvButton>
    </HvGlobalActions>
  );
};

SampleWithCustomTitleAndAdditionalActions.parameters = {
  docs: {
    description: {
      story: "Global Actions section uses a Typography component to build the title.",
    },
  },
};

export const SectionGlobalActions = () => (
  <HvGlobalActions title="Section Title" variant="section">
    <HvButton category="primary">Primary</HvButton>
    <HvDropDownMenu
      id={`dropdownItem-${uniqueId()}`}
      aria-label="dropdownMenu-Items"
      placement="left"
      dataList={[{ label: "Action 2" }, { label: "Action 3" }, { label: "Action 4" }]}
    />
  </HvGlobalActions>
);

SectionGlobalActions.parameters = {
  SectionGlobalActions: {
    description: { story: "Section Global Actions." },
  },
};

export const SampleWithNoChildren = () => <HvGlobalActions title="Detail Page Title" />;
