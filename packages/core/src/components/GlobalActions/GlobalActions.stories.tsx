import { Backwards } from "@hitachivantara/uikit-react-icons";
import { Meta, StoryObj } from "@storybook/react";
import uniqueId from "lodash/uniqueId";
import {
  HvButton,
  HvTypography,
  HvContainer,
  HvDropDownMenu,
  HvGlobalActions,
  HvGlobalActionsProps,
} from "components";

const meta: Meta<typeof HvGlobalActions> = {
  title: "Structure/GlobalActions",
  component: HvGlobalActions,
};
export default meta;

export const Main: StoryObj<HvGlobalActionsProps> = {
  args: {
    title: "Details Page Title",
    headingLevel: 1,
    variant: "global",
  },
  argTypes: {
    classes: { control: { disable: true } },
  },
  decorators: [(Story) => <div style={{ height: 300 }}>{Story()}</div>],
  render: ({ title, headingLevel, variant }) => {
    const BackButton = () => (
      <HvButton
        aria-label="Back"
        variant="secondaryGhost"
        icon
        onClick={() => alert("Back!")}
      >
        <Backwards />
      </HvButton>
    );

    return (
      <HvContainer>
        <HvGlobalActions
          title={title}
          headingLevel={headingLevel}
          variant={variant}
          backButton={<BackButton />}
        >
          <HvButton variant="primary">Approve & Share</HvButton>
          <HvButton variant="secondarySubtle">Reset</HvButton>
          <HvDropDownMenu
            id={`dropdownItem-${uniqueId()}`}
            aria-label="dropdownMenu-Items"
            placement="left"
            dataList={[
              { label: "Action 2" },
              { label: "Action 3" },
              { label: "Action 4" },
            ]}
          />
        </HvGlobalActions>

        <div style={{ paddingBottom: 60 }}>
          <HvGlobalActions title="Section Title" variant="section">
            <HvButton variant="secondarySubtle">Remove</HvButton>
            <HvButton variant="secondarySubtle">Share</HvButton>
            <HvDropDownMenu
              id={`dropdownItem-${uniqueId()}`}
              aria-label="dropdownMenu-Items"
              placement="left"
              dataList={[
                { label: "Action 2" },
                { label: "Action 3" },
                { label: "Action 4" },
              ]}
            />
          </HvGlobalActions>

          <HvTypography
            variant="body"
            style={{ marginTop: 20, marginBottom: 30 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus
            faucibus ornare suspendisse sed nisi lacus sed. Tortor at risus
            viverra adipiscing at in tellus. Et netus et malesuada fames ac
            turpis. Sed blandit libero volutpat sed cras ornare arcu. Arcu odio
            ut sem nulla pharetra diam sit amet. Sagittis purus sit amet
            volutpat consequat mauris nunc congue. Sed vulputate mi sit amet
            mauris commodo quis imperdiet massa. Dictum varius duis at
            consectetur. Lorem sed risus ultricies tristique nulla aliquet enim
            tortor at. Turpis egestas maecenas pharetra convallis posuere morbi.
            Eget sit amet tellus cras adipiscing. Egestas erat imperdiet sed
            euismod nisi. Morbi tincidunt augue interdum velit euismod in
            pellentesque massa. At augue eget arcu dictum varius duis at. Tellus
            elementum sagittis vitae et. In est ante in nibh mauris cursus
            mattis. Faucibus nisl tincidunt eget nullam non. Cursus metus
            aliquam eleifend mi in nulla posuere.
          </HvTypography>

          <HvTypography variant="body" style={{ marginBottom: 60 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus
            faucibus ornare suspendisse sed nisi lacus sed. Tortor at risus
            viverra adipiscing at in tellus. Et netus et malesuada fames ac
            turpis. Sed blandit libero volutpat sed cras ornare arcu. Arcu odio
            ut sem nulla pharetra diam sit amet. Sagittis purus sit amet
            volutpat consequat mauris nunc congue. Sed vulputate mi sit amet
            mauris commodo quis imperdiet massa. Dictum varius duis at
            consectetur. Lorem sed risus ultricies tristique nulla aliquet enim
            tortor at. Turpis egestas maecenas pharetra convallis posuere morbi.
            Eget sit amet tellus cras adipiscing. Egestas erat imperdiet sed
            euismod nisi. Morbi tincidunt augue interdum velit euismod in
            pellentesque massa. At augue eget arcu dictum varius duis at. Tellus
            elementum sagittis vitae et. In est ante in nibh mauris cursus
            mattis. Faucibus nisl tincidunt eget nullam non. Cursus metus
            aliquam eleifend mi in nulla posuere.
          </HvTypography>

          <HvGlobalActions title="Section Title" variant="section">
            <HvButton variant="secondarySubtle">Remove</HvButton>
            <HvButton variant="secondarySubtle">Share</HvButton>
            <HvDropDownMenu
              id={`dropdownItem-${uniqueId()}`}
              aria-label="dropdownMenu-Items"
              placement="left"
              dataList={[
                { label: "Action 2" },
                { label: "Action 3" },
                { label: "Action 4" },
              ]}
            />
          </HvGlobalActions>

          <HvTypography
            variant="body"
            style={{ marginTop: 20, marginBottom: 30 }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus
            faucibus ornare suspendisse sed nisi lacus sed. Tortor at risus
            viverra adipiscing at in tellus. Et netus et malesuada fames ac
            turpis. Sed blandit libero volutpat sed cras ornare arcu. Arcu odio
            ut sem nulla pharetra diam sit amet. Sagittis purus sit amet
            volutpat consequat mauris nunc congue. Sed vulputate mi sit amet
            mauris commodo quis imperdiet massa. Dictum varius duis at
            consectetur. Lorem sed risus ultricies tristique nulla aliquet enim
            tortor at. Turpis egestas maecenas pharetra convallis posuere morbi.
            Eget sit amet tellus cras adipiscing. Egestas erat imperdiet sed
            euismod nisi.
          </HvTypography>

          <HvTypography variant="body" style={{ marginBottom: 60 }}>
            Sed blandit libero volutpat sed cras ornare arcu. Arcu odio ut sem
            nulla pharetra diam sit amet. Sagittis purus sit amet volutpat
            consequat mauris nunc congue. Sed vulputate mi sit amet mauris
            commodo quis imperdiet massa. Dictum varius duis at consectetur.
            Lorem sed risus ultricies tristique nulla aliquet enim tortor at.
            Turpis egestas maecenas pharetra convallis posuere morbi. Eget sit
            amet tellus cras adipiscing. Egestas erat imperdiet sed euismod
            nisi. Morbi tincidunt augue interdum velit euismod in pellentesque
            massa. At augue eget arcu dictum varius duis at. Tellus elementum
            sagittis vitae et. In est ante in nibh mauris cursus mattis.
            Faucibus nisl tincidunt eget nullam non. Cursus metus aliquam
            eleifend mi in nulla posuere.
          </HvTypography>

          <HvGlobalActions title="Section Title" variant="section">
            <HvButton variant="secondarySubtle">Remove</HvButton>
            <HvButton variant="secondarySubtle">Share</HvButton>
            <HvDropDownMenu
              id={`dropdownItem-${uniqueId()}`}
              aria-label="dropdownMenu-Items"
              placement="left"
              dataList={[
                { label: "Action 2" },
                { label: "Action 3" },
                { label: "Action 4" },
              ]}
            />
          </HvGlobalActions>

          <HvTypography
            variant="body"
            style={{ marginTop: 20, marginBottom: 30 }}
          >
            Purus faucibus ornare suspendisse sed nisi lacus sed. Tortor at
            risus viverra adipiscing at in tellus. Et netus et malesuada fames
            ac turpis. Sed blandit libero volutpat sed cras ornare arcu. Arcu
            odio ut sem nulla pharetra diam sit amet. Sagittis purus sit amet
            volutpat consequat mauris nunc congue. Sed vulputate mi sit amet
            mauris commodo quis imperdiet massa. Dictum varius duis at
            consectetur. Lorem sed risus ultricies tristique nulla aliquet enim
            tortor at. Turpis egestas maecenas pharetra convallis posuere morbi.
            Eget sit amet tellus cras adipiscing. Egestas erat imperdiet sed
            euismod nisi. Morbi tincidunt augue interdum velit euismod in
            pellentesque massa. At augue eget arcu dictum varius duis at. Tellus
            elementum sagittis vitae et. In est ante in nibh mauris cursus
            mattis. Faucibus nisl tincidunt eget nullam non. Cursus metus
            aliquam eleifend mi in nulla posuere.
          </HvTypography>

          <HvTypography variant="body" style={{ marginBottom: 30 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus
            faucibus ornare suspendisse sed nisi lacus sed. Tortor at risus
            viverra adipiscing at in tellus.
          </HvTypography>
        </div>
      </HvContainer>
    );
  },
};

export const SampleWithAdditionalActions: StoryObj<HvGlobalActionsProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story:
          "When more than two secondary actions are in place, they should be grouped in a dropdown menu, ordered from the most to least used.",
      },
    },
  },
  render: () => {
    const BackButton = () => (
      <HvButton
        aria-label="Back"
        icon
        variant="secondaryGhost"
        onClick={() => alert("Back!")}
      >
        <Backwards />
      </HvButton>
    );

    return (
      <HvGlobalActions title="Detail Page Title" backButton={<BackButton />}>
        <HvButton variant="secondaryGhost">Primary</HvButton>
        <HvDropDownMenu
          id={`dropdownItem-${uniqueId()}`}
          aria-label="dropdownMenu-Items"
          placement="left"
          dataList={[
            { label: "Action 2" },
            { label: "Action 3" },
            { label: "Action 4" },
          ]}
        />
      </HvGlobalActions>
    );
  },
};

export const SampleWithAdditionalActionsAndNoBackButton: StoryObj<HvGlobalActionsProps> =
  {
    argTypes: {
      classes: { control: { disable: true } },
    },
    render: () => {
      return (
        <HvGlobalActions title="Detail Page Title" backButton={false}>
          <HvButton variant="secondaryGhost">Primary</HvButton>
          <HvDropDownMenu
            id={`dropdownItem-${uniqueId()}`}
            aria-label="dropdownMenu-Items"
            placement="left"
            dataList={[
              { label: "Action 2" },
              { label: "Action 3" },
              { label: "Action 4" },
            ]}
          />
        </HvGlobalActions>
      );
    },
  };

export const SampleWithCustomTitleAndAdditionalActions: StoryObj<HvGlobalActionsProps> =
  {
    argTypes: {
      classes: { control: { disable: true } },
    },
    parameters: {
      docs: {
        description: {
          story:
            "Global Actions section uses a Typography component to build the title.",
        },
      },
    },
    render: () => {
      const CustomTitle = (
        <HvTypography variant="sectionTitle" component="h1">
          A Custom Title
        </HvTypography>
      );

      const BackButton = () => (
        <HvButton
          aria-label="Back"
          variant="secondaryGhost"
          icon
          onClick={() => alert("Back!")}
        >
          <Backwards />
        </HvButton>
      );

      return (
        <HvGlobalActions title={CustomTitle} backButton={<BackButton />}>
          <HvButton variant="primary">Primary</HvButton>
          <HvButton variant="secondarySubtle">Secondary</HvButton>
          <HvButton variant="secondarySubtle">Secondary</HvButton>
        </HvGlobalActions>
      );
    },
  };

export const SectionGlobalActions: StoryObj<HvGlobalActionsProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: "Section Global Actions.",
      },
    },
  },
  render: () => {
    return (
      <HvGlobalActions title="Section Title" variant="section">
        <HvButton variant="secondaryGhost">Primary</HvButton>
        <HvDropDownMenu
          id={`dropdownItem-${uniqueId()}`}
          aria-label="dropdownMenu-Items"
          placement="left"
          dataList={[
            { label: "Action 2" },
            { label: "Action 3" },
            { label: "Action 4" },
          ]}
        />
      </HvGlobalActions>
    );
  },
};

export const SampleWithNoChildren: StoryObj<HvGlobalActionsProps> = {
  argTypes: {
    classes: { control: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Global Actions section uses a Typography component to build the title.",
      },
    },
  },
  render: () => <HvGlobalActions title="Detail Page Title" backButton />,
};
