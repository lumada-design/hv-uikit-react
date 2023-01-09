import { Backwards } from "@hitachivantara/uikit-icons";
import { Meta, StoryObj } from "@storybook/react";
import { HvButton, HvTypography, HvContainer } from "components";
import { GlobalActions, GlobalActionsProps } from "./GlobalActions";

const meta: Meta<typeof GlobalActions> = {
  title: "Structure/GlobalActions",
  component: GlobalActions,
};
export default meta;

export const Main: StoryObj<GlobalActionsProps> = {
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
        <GlobalActions
          title={title}
          headingLevel={headingLevel}
          variant={variant}
          backButton={<BackButton />}
        >
          <HvButton variant="primary">Approve & Share</HvButton>
          <HvButton variant="secondary">Reset</HvButton>
          {/* <DropDownMenu
            id={`dropdownItem-${uniqueId()}`}
            aria-label="dropdownMenu-Items"
            placement="left"
            dataList={[
              { label: "Action 2" },
              { label: "Action 3" },
              { label: "Action 4" },
            ]}
          /> */}
        </GlobalActions>

        <div style={{ paddingBottom: 60 }}>
          <GlobalActions title="Section Title" variant="section">
            <HvButton variant="secondary">Remove</HvButton>
            <HvButton variant="secondary">Share</HvButton>
            {/* <DropDownMenu
              id={`dropdownItem-${uniqueId()}`}
              aria-label="dropdownMenu-Items"
              placement="left"
              dataList={[
                { label: "Action 2" },
                { label: "Action 3" },
                { label: "Action 4" },
              ]}
            /> */}
          </GlobalActions>

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

          <GlobalActions title="Section Title" variant="section">
            <HvButton variant="secondary">Remove</HvButton>
            <HvButton variant="secondary">Share</HvButton>
            {/* <DropDownMenu
              id={`dropdownItem-${uniqueId()}`}
              aria-label="dropdownMenu-Items"
              placement="left"
              dataList={[
                { label: "Action 2" },
                { label: "Action 3" },
                { label: "Action 4" },
              ]}
            /> */}
          </GlobalActions>

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

          <GlobalActions title="Section Title" variant="section">
            <HvButton variant="secondary">Remove</HvButton>
            <HvButton variant="secondary">Share</HvButton>
            {/* <DropDownMenu
              id={`dropdownItem-${uniqueId()}`}
              aria-label="dropdownMenu-Items"
              placement="left"
              dataList={[
                { label: "Action 2" },
                { label: "Action 3" },
                { label: "Action 4" },
              ]}
            /> */}
          </GlobalActions>

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

export const SampleWithCustomTitleAndAdditionalActions: StoryObj<GlobalActionsProps> =
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
      const CustomTitle: React.ReactNode = (
        <HvTypography variant="title3" as="h1">
          A Custom Title
        </HvTypography>
      );

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
        <GlobalActions title={CustomTitle} backButton={<BackButton />}>
          <HvButton variant="primary">Primary</HvButton>
          <HvButton variant="secondary">Secondary</HvButton>
          <HvButton variant="secondary">Secondary</HvButton>
        </GlobalActions>
      );
    },
  };

export const SampleWithNoChildren: StoryObj<GlobalActionsProps> = {
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
  render: () => <GlobalActions title="Detail Page Title" backButton />,
};
