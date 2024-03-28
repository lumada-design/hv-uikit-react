import { DecoratorFn, Meta, StoryObj } from "@storybook/react";
import {
  HvAvatar,
  HvAvatarProps,
  HvButton,
} from "@hitachivantara/uikit-react-core";
import {
  Archives,
  Bookmark,
  Link as LinkIcon,
  LogIn,
  Search,
} from "@hitachivantara/uikit-react-icons";

const flexDecorator: DecoratorFn = (Story) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    {Story()}
  </div>
);

const meta: Meta<typeof HvAvatar> = {
  title: "Components/Avatar/Avatar",
  component: HvAvatar,
  decorators: [flexDecorator],
  parameters: {
    eyes: { disable: true },
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
          "Image avatars can be created by passing the `src` or `srcSet` props to the component.",
      },
    },
  },
  render: () => {
    return (
      <>
        <HvAvatar alt="Ben" src="https://i.imgur.com/56Eeg1g.png" />
        <HvAvatar alt="Beatrice" src="https://i.imgur.com/bE7vg3N.png" />
        <HvAvatar alt="Wayne" src="https://i.imgur.com/ea22egF.png" />
        <HvAvatar alt="Clara Soul" src="https://i.imgur.com/6sYhSb6.png" />
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
        <HvAvatar alt="Clara Soul" src="/broken-image.jpg">
          CS
        </HvAvatar>
        <HvAvatar alt="Clara Soul" src="/broken-image.jpg" />
        <HvAvatar src="/broken-image.jpg" />
      </>
    );
  },
};

export const Variants: StoryObj<HvAvatarProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "You can configure the `size` and `variant` of an avatar. When using an icon, set its `iconSize` to the size immediately below the avatar size.",
      },
    },
    eyes: { disable: false, waitBeforeCapture: 5000 },
  },
  render: () => {
    return (
      <>
        <HvAvatar size="xs" />
        <HvAvatar size="xs" variant="square" />
        <HvAvatar backgroundColor="sema6" size="sm">
          NA
        </HvAvatar>
        <HvAvatar size="lg" backgroundColor="warning">
          <Bookmark iconSize="M" color={["base_light", "base_dark"]} />
        </HvAvatar>
        <HvAvatar
          size="xl"
          alt="Beatrice"
          src="https://i.imgur.com/bE7vg3N.png"
        />
        <HvAvatar
          size="xl"
          variant="square"
          alt="Beatrice"
          src="https://i.imgur.com/bE7vg3N.png"
        />
      </>
    );
  },
};

export const Status: StoryObj<HvAvatarProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "An avatar can have a status, represented by either the `status` colored border or by the `badge` dot. The color can be from the theme palette or custom.",
      },
    },
    eyes: { disable: false },
  },
  render: () => {
    return (
      <>
        <HvAvatar size="xs" status="positive">
          AB
        </HvAvatar>
        <HvAvatar size="sm" badge="neutral">
          AB
        </HvAvatar>
        <HvAvatar size="md" status="negative">
          AB
        </HvAvatar>
        <HvAvatar size="lg" status="atmo4" badge="atmo4">
          AB
        </HvAvatar>
        <HvAvatar size="xl" status="#8CEB34" badge="#8CEB34">
          AB
        </HvAvatar>
      </>
    );
  },
};

export const Actions: StoryObj<HvAvatarProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "An avatar should be interacted with by wrapping it in an _interactable_ element, such as an `HvButton` or a link. Make sure the elements are labelled accordingly.",
      },
    },
    eyes: { disable: false },
  },
  render: () => {
    return (
      <>
        <HvButton
          icon
          overrideIconColors={false}
          component="a"
          href="#profile-url"
          aria-label="External link"
        >
          <HvAvatar size="md">
            <LinkIcon color="atmo1" />
          </HvAvatar>
        </HvButton>
        <HvButton
          icon
          overrideIconColors={false}
          aria-label="Open the user profile"
        >
          <HvAvatar size="md" />
        </HvButton>
        <HvButton icon overrideIconColors={false} aria-label="Business Manager">
          <HvAvatar backgroundColor="sema19" size="md" badge="negative">
            BM
          </HvAvatar>
        </HvButton>
        <HvButton icon overrideIconColors={false} aria-label="Business Manager">
          <HvAvatar
            backgroundColor="sema19"
            size="md"
            variant="square"
            badge="negative"
          >
            BM
          </HvAvatar>
        </HvButton>
        <HvButton
          icon
          overrideIconColors={false}
          aria-label="Clara Soul profile"
        >
          <HvAvatar
            alt="Clara Soul"
            src="https://i.imgur.com/6sYhSb6.png"
            size="lg"
            status="positive"
          />
        </HvButton>
        <HvButton
          icon
          overrideIconColors={false}
          aria-label="Clara Soul profile"
        >
          <HvAvatar
            alt="Clara Soul"
            src="https://i.imgur.com/6sYhSb6.png"
            size="lg"
            variant="square"
            status="positive"
          />
        </HvButton>
      </>
    );
  },
};
