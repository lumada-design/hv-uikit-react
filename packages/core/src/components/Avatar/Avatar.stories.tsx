import {
  Archives,
  Bookmark,
  Link as LinkIcon,
  LogIn,
  Search,
} from "@hitachivantara/uikit-react-icons";
import { Meta, StoryObj } from "@storybook/react";
import {
  HvAvatar,
  HvAvatarProps,
  HvButton,
} from "@hitachivantara/uikit-react-core";
import man1 from "./resources/man-1.png";
import man2 from "./resources/man-2.png";
import woman1 from "./resources/woman-1.png";
import woman2 from "./resources/woman-2.png";

const flexDecorator = (Story) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    {Story()}
  </div>
);

const meta: Meta<typeof HvAvatar> = {
  title: "Components/Avatar",
  component: HvAvatar,
  decorators: [flexDecorator],
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
        <HvAvatar size="xl" alt="Beatrice" src={woman1} />
        <HvAvatar size="xl" variant="square" alt="Beatrice" src={woman1} />
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
        <HvAvatar size="xs" status="positive">
          AB
        </HvAvatar>
        <HvAvatar size="sm" status="neutral">
          AB
        </HvAvatar>
        <HvAvatar size="md" status="negative">
          AB
        </HvAvatar>
        <HvAvatar size="lg" status="atmo4">
          AB
        </HvAvatar>
        <HvAvatar size="xl" status="#8CEB34">
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
        <HvAvatar size="xs" badge="positive">
          AB
        </HvAvatar>
        <HvAvatar size="sm" badge="neutral">
          AB
        </HvAvatar>
        <HvAvatar size="md" badge="negative">
          AB
        </HvAvatar>
        <HvAvatar size="lg" badge="atmo4">
          AB
        </HvAvatar>
        <HvAvatar size="xl" badge="#8CEB34">
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
  },
  render: () => {
    return (
      <>
        <HvButton
          icon
          overrideIconColors={false}
          component="a"
          href="#profile-url"
        >
          <HvAvatar size="md">
            <LinkIcon color="base_dark" aria-label="External link" />
          </HvAvatar>
        </HvButton>
        <HvButton icon overrideIconColors={false}>
          <HvAvatar size="md" aria-label="Open the user profile" />
        </HvButton>
        <HvButton icon overrideIconColors={false}>
          <HvAvatar
            backgroundColor="sema19"
            size="md"
            badge="negative"
            aria-label="Business Manager"
          >
            BM
          </HvAvatar>
        </HvButton>
        <HvButton icon overrideIconColors={false}>
          <HvAvatar
            backgroundColor="sema19"
            size="md"
            variant="square"
            badge="negative"
            aria-label="Business Manager"
          >
            BM
          </HvAvatar>
        </HvButton>
        <HvButton icon overrideIconColors={false}>
          <HvAvatar
            aria-label="Clara Soul profile"
            alt="Clara Soul"
            src={woman2}
            size="lg"
            status="positive"
          />
        </HvButton>
        <HvButton icon overrideIconColors={false}>
          <HvAvatar
            aria-label="Clara Soul profile"
            alt="Clara Soul"
            src={woman2}
            size="lg"
            variant="square"
            status="positive"
          />
        </HvButton>
      </>
    );
  },
};
