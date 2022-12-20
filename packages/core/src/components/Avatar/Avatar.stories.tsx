import styled from "@emotion/styled";
import { Archives, Bookmark, LogIn, Search } from "@hitachivantara/uikit-icons";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "../index";
import { Avatar, AvatarProps } from "./Avatar";

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

const meta: Meta<typeof Avatar> = {
  title: "Display/Avatar",
  component: Avatar,
  decorators: [(Story) => <FlexDecorator>{Story()}</FlexDecorator>],
};
export default meta;

export const Main: StoryObj<AvatarProps> = {
  args: {
    size: "MD",
    backgroundColor: "acce1",
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
    return <Avatar {...args}>AB</Avatar>;
  },
};

export const ImageAvatars: StoryObj<AvatarProps> = {
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
        <Avatar alt="Ben" src={man1} />
        <Avatar alt="Beatrice" src={woman1} />
        <Avatar alt="Wayne" src={man2} />
        <Avatar alt="Clara Soul" src={woman2} />
      </>
    );
  },
};

export const LetterAvatars: StoryObj<AvatarProps> = {
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
        <Avatar>BM</Avatar>
        <Avatar backgroundColor="sema19">W</Avatar>
        <Avatar backgroundColor="sema6">CS</Avatar>
      </>
    );
  },
};

export const IconAvatars: StoryObj<AvatarProps> = {
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
        <Avatar>
          <LogIn color="atmo1" iconSize="XS" />
        </Avatar>
        <Avatar backgroundColor="sema1">
          <Archives color="atmo1" iconSize="XS" />
        </Avatar>
        <Avatar backgroundColor="sema2">
          <Search color="atmo1" iconSize="XS" />
        </Avatar>
        <Avatar backgroundColor="sema3">
          <Bookmark color="atmo1" iconSize="XS" />
        </Avatar>
      </>
    );
  },
};

export const Fallbacks: StoryObj<AvatarProps> = {
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
        <Avatar
          id="fallback_to_children"
          alt="Clara Soul"
          src="/broken-image.jpg"
        >
          CS
        </Avatar>
        <Avatar id="falback_to_alt" alt="Clara Soul" src="/broken-image.jpg" />
        <Avatar id="fallback_to_default_icon" src="/broken-image.jpg" />
      </>
    );
  },
};

export const Sizes: StoryObj<AvatarProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "You can change the size of the avatar with the size property (XS SM MD LG and XL). When using an icon avatar, preferably use as iconSize the size immediately below the avatar size.",
      },
    },
  },
  render: () => {
    return (
      <>
        <Avatar size="XS" />
        <Avatar backgroundColor="sema6" size="SM">
          NA
        </Avatar>
        <Avatar size="MD" backgroundColor="sema3">
          <Bookmark iconSize="S" color="atmo1" />
        </Avatar>
        <Avatar size="LG" alt="Beatrice" src={woman1} />
        <Avatar size="XL" alt="Beatrice" src={woman1} />
      </>
    );
  },
};

export const Status: StoryObj<AvatarProps> = {
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
        <Avatar id="status1" size="XS" status="sema1">
          AB
        </Avatar>
        <Avatar id="status2" size="SM" status="sema2">
          AB
        </Avatar>
        <Avatar id="status3" size="MD" status="sema4">
          AB
        </Avatar>
        <Avatar id="status4" size="LG" status="atmo4">
          AB
        </Avatar>
        <Avatar id="status5" size="XL" status="#8CEB34">
          AB
        </Avatar>
      </>
    );
  },
};

export const Badge: StoryObj<AvatarProps> = {
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
        <Avatar id="badge1" size="XS" badge="sema1">
          AB
        </Avatar>
        <Avatar id="badge2" size="SM" badge="sema2">
          AB
        </Avatar>
        <Avatar id="badge3" size="MD" badge="sema4">
          AB
        </Avatar>
        <Avatar id="badge4" size="LG" badge="atmo4">
          AB
        </Avatar>
        <Avatar id="badge5" size="XL" badge="#8CEB34">
          AB
        </Avatar>
      </>
    );
  },
};

export const ContainerProps: StoryObj<AvatarProps> = {
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
        <Avatar
          id="props2"
          size="SM"
          role="button"
          aria-label="Login"
          tabIndex={0}
        >
          <LogIn color="atmo1" iconSize="XS" />
        </Avatar>
        <Avatar
          id="props1"
          size="MD"
          status="sema1"
          alt="Ben"
          src={man1}
          role="button"
          aria-label="Ben - online"
          tabIndex={0}
        />
        <Avatar
          id="props3"
          size="LG"
          badge="sema4"
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

export const Buttons: StoryObj<AvatarProps> = {
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
        <Button
          aria-label="Open the user profile"
          icon
          overrideIconColors={false}
          onClick={doAlert}
          variant="secondaryGhost"
        >
          <Avatar id="icon" backgroundColor="sema1">
            <LogIn semantic="sema8" iconSize="XS" />
          </Avatar>
        </Button>
        <Button
          aria-label="Open the user profile"
          icon
          overrideIconColors={false}
          onClick={doAlert}
          variant="secondaryGhost"
        >
          <Avatar id="default_icon" />
        </Button>
        <Button
          aria-label="Open the user profile"
          icon
          overrideIconColors={false}
          onClick={doAlert}
          variant="secondaryGhost"
        >
          <Avatar id="letters" backgroundColor="sema19" size="MD" badge="sema4">
            BM
          </Avatar>
        </Button>
        <Button
          aria-label="Open the user profile"
          icon
          overrideIconColors={false}
          onClick={doAlert}
          variant="secondaryGhost"
        >
          <Avatar
            id="image"
            alt="Clara Soul"
            src={woman2}
            size="XL"
            status="sema1"
          />
        </Button>
      </>
    );
  },
};
