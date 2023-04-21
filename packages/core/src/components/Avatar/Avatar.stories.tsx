import styled from "@emotion/styled";
import {
  Archives,
  Bookmark,
  LogIn,
  Search,
} from "@hitachivantara/uikit-react-icons";
import { Meta, StoryObj } from "@storybook/react";
import { HvAvatar, HvAvatarProps, HvButton } from "@core/components";
import man1 from "./resources/man-1.png";
import man2 from "./resources/man-2.png";
import woman1 from "./resources/woman-1.png";
import woman2 from "./resources/woman-2.png";

const FlexDecorator = ({ children }) => {
  const StyledDiv = styled("div")({
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: "0 10px 5px 0!important",
    },
  });

  return <StyledDiv>{children}</StyledDiv>;
};

const meta: Meta<typeof HvAvatar> = {
  title: "Components/Avatar",
  component: HvAvatar,
  decorators: [(Story) => <FlexDecorator>{Story()}</FlexDecorator>],
  parameters: {
    eyes: {
      waitBeforeCapture: 5000,
    },
  },
};
export default meta;

export const Main: StoryObj<HvAvatarProps> = {
  args: {
    size: "md",
    backgroundColor: "secondary",
    color: "atmo1",
    variant: "circular",
    badge: "",
    status: "",
  },
  argTypes: {
    classes: { control: { disable: true } },
    imgProps: { control: { disable: true } },
    avatarProps: { control: { disable: true } },
    sizes: { control: { disable: true } },
    alt: { control: { disable: true } },
    style: { control: { disable: true } },
    component: { control: { disable: true } },
    srcSet: { control: { disable: true } },
  },
  render: (args) => {
    return <HvAvatar {...args}>AB</HvAvatar>;
  },
};

export const ImageAvatars: StoryObj<HvAvatarProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Image avatars can be created by passing standard img props src or srcSet to the component.",
      },
    },
  },
  render: () => {
    return (
      <>
        <HvAvatar alt="Ben" src={man1} />
        <HvAvatar alt="Beatrice" src={woman1} />
        <HvAvatar alt="Wayne" src={man2} />
        <HvAvatar alt="Clara Soul" src={woman2} />
      </>
    );
  },
};

export const LetterAvatars: StoryObj<HvAvatarProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Avatars containing simple characters can be created by passing a string as children.",
      },
    },
  },
  render: () => {
    return (
      <>
        <HvAvatar>BM</HvAvatar>
        <HvAvatar backgroundColor="sema19">W</HvAvatar>
        <HvAvatar backgroundColor="sema6">CS</HvAvatar>
      </>
    );
  },
};

export const IconAvatars: StoryObj<HvAvatarProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "Icon avatars are created by passing an icon as children. Its size and color aren't Avatar's responsibility.",
      },
    },
  },
  render: () => {
    return (
      <>
        <HvAvatar>
          <LogIn color="atmo1" iconSize="XS" />
        </HvAvatar>
        <HvAvatar backgroundColor="positive">
          <Archives color="atmo1" iconSize="XS" />
        </HvAvatar>
        <HvAvatar backgroundColor="neutral">
          <Search color="atmo1" iconSize="XS" />
        </HvAvatar>
        <HvAvatar backgroundColor="warning">
          <Bookmark color="atmo1" iconSize="XS" />
        </HvAvatar>
      </>
    );
  },
};

export const Fallbacks: StoryObj<HvAvatarProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "If there is an error loading the avatar image, the component falls back to an alternative in the following order: the provided children, the first letter of the alt text and finally the generic User icon.",
      },
    },
  },
  render: () => {
    return (
      <>
        <HvAvatar
          id="fallback_to_children"
          alt="Clara Soul"
          src="/broken-image.jpg"
        >
          CS
        </HvAvatar>
        <HvAvatar
          id="falback_to_alt"
          alt="Clara Soul"
          src="/broken-image.jpg"
        />
        <HvAvatar id="fallback_to_default_icon" src="/broken-image.jpg" />
      </>
    );
  },
};

export const Sizes: StoryObj<HvAvatarProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "You can change the size of the avatar with the size property (xs sm md lg and xl). When using an icon avatar, preferably use as iconSize the size immediately below the avatar size.",
      },
    },
  },
  render: () => {
    return (
      <>
        <HvAvatar size="xs" />
        <HvAvatar backgroundColor="sema6" size="sm">
          NA
        </HvAvatar>
        <HvAvatar size="md" backgroundColor="warning">
          <Bookmark iconSize="S" color="atmo1" />
        </HvAvatar>
        <HvAvatar size="lg" alt="Beatrice" src={woman1} />
        <HvAvatar size="xl" alt="Beatrice" src={woman1} />
      </>
    );
  },
};

export const Status: StoryObj<HvAvatarProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "An avatar can have a status that is represented by a colored border. The status color can be from the HV theme palette or custom.",
      },
    },
  },
  render: () => {
    return (
      <>
        <HvAvatar id="status1" size="xs" status="positive">
          AB
        </HvAvatar>
        <HvAvatar id="status2" size="sm" status="neutral">
          AB
        </HvAvatar>
        <HvAvatar id="status3" size="md" status="negative">
          AB
        </HvAvatar>
        <HvAvatar id="status4" size="lg" status="atmo4">
          AB
        </HvAvatar>
        <HvAvatar id="status5" size="xl" status="#8CEB34">
          AB
        </HvAvatar>
      </>
    );
  },
};

export const Badge: StoryObj<HvAvatarProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "An avatar can have a badge that is represented by a colored dot on the upper right corner. The badge color can be from the HV theme palette or custom.",
      },
    },
  },
  render: () => {
    return (
      <>
        <HvAvatar id="badge1" size="xs" badge="positive">
          AB
        </HvAvatar>
        <HvAvatar id="badge2" size="sm" badge="neutral">
          AB
        </HvAvatar>
        <HvAvatar id="badge3" size="md" badge="negative">
          AB
        </HvAvatar>
        <HvAvatar id="badge4" size="lg" badge="atmo4">
          AB
        </HvAvatar>
        <HvAvatar id="badge5" size="xl" badge="#8CEB34">
          AB
        </HvAvatar>
      </>
    );
  },
};

export const ContainerProps: StoryObj<HvAvatarProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "The avatar container can receive a props object to allow for focusing and dynamically setting other props like the aria-label or the tabIndex.",
      },
    },
  },
  render: () => {
    return (
      <>
        <HvAvatar
          id="props2"
          size="sm"
          role="button"
          aria-label="Login"
          tabIndex={0}
        >
          <LogIn color="atmo1" iconSize="XS" />
        </HvAvatar>
        <HvAvatar
          id="props1"
          size="md"
          status="positive"
          alt="Ben"
          src={man1}
          role="button"
          aria-label="Ben - online"
          tabIndex={0}
        />
        <HvAvatar
          id="props3"
          size="lg"
          badge="negative"
          alt="Beatrice"
          src={woman1}
          role="button"
          aria-label="Beatrice - offline"
          tabIndex={0}
        />
      </>
    );
  },
};

export const Buttons: StoryObj<HvAvatarProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "You can change the component used for the root node, for instance for rendering a HvButton. All other properties are spread in the root node, such as event callbacks.",
      },
    },
  },
  render: () => {
    const doAlert = () => alert("Avatar clicked");

    return (
      <>
        <HvButton
          aria-label="Open the user profile"
          icon
          overrideIconColors={false}
          onClick={doAlert}
          variant="secondaryGhost"
        >
          <HvAvatar id="icon" backgroundColor="positive">
            <LogIn semantic="positive_20" iconSize="XS" />
          </HvAvatar>
        </HvButton>
        <HvButton
          aria-label="Open the user profile"
          icon
          overrideIconColors={false}
          onClick={doAlert}
          variant="secondaryGhost"
        >
          <HvAvatar id="default_icon" />
        </HvButton>
        <HvButton
          aria-label="Open the user profile"
          icon
          overrideIconColors={false}
          onClick={doAlert}
          variant="secondaryGhost"
        >
          <HvAvatar
            id="letters"
            backgroundColor="sema19"
            size="md"
            badge="negative"
          >
            BM
          </HvAvatar>
        </HvButton>
        <HvButton
          aria-label="Open the user profile"
          icon
          overrideIconColors={false}
          onClick={doAlert}
          variant="secondaryGhost"
        >
          <HvAvatar
            id="image"
            alt="Clara Soul"
            src={woman2}
            size="xl"
            status="positive"
          />
        </HvButton>
      </>
    );
  },
};
