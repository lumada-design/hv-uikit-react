// eslint-disable-next-line no-unused-vars
import React from "react";
import uniqueId from "lodash/uniqueId";

import { HvContainer, HvGlobalActions, HvButton, HvDropDownMenu, HvTypography } from "../..";

export default {
  title: "Tests/GlobalActions",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 10, maxWidth: "1000px" }}>
        <Story />
      </div>
    ),
  ],
};

export const Main = () => {
  return (
    <HvContainer maxWidth="sm">
      <HvGlobalActions
        title="Detail Page Title"
        position="fixed"
        backButtonAction={() => {
          alert("Back");
        }}
      >
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
