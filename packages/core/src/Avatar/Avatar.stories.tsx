import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HvAvatar,
  HvAvatarProps,
  HvButton,
} from "@hitachivantara/uikit-react-core";
import { Bookmark, Link as LinkIcon } from "@hitachivantara/uikit-react-icons";

const meta: Meta<typeof HvAvatar> = {
  title: "Components/Avatar",
  component: HvAvatar,
  decorators: [
    (Story) => <div className="flex items-center gap-md">{Story()}</div>,
  ],
};
export default meta;

export const Main: StoryObj<HvAvatarProps> = {
  args: {
    size: "md",
    backgroundColor: "text",
    color: "textDimmed",
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
          component="a"
          href="#profile-url"
          aria-label="External link"
        >
          <HvAvatar size="md">
            <LinkIcon color="textDimmed" />
          </HvAvatar>
        </HvButton>
        <HvButton icon aria-label="Open the user profile">
          <HvAvatar size="md" />
        </HvButton>
        <HvButton icon aria-label="Business Manager">
          <HvAvatar backgroundColor="info" size="md" badge="negative">
            BM
          </HvAvatar>
        </HvButton>
        <HvButton icon aria-label="Business Manager" radius="none">
          <HvAvatar
            backgroundColor="info"
            size="md"
            variant="square"
            badge="negative"
          >
            BM
          </HvAvatar>
        </HvButton>
        <HvButton icon aria-label="Clara Soul profile">
          <HvAvatar
            alt="Clara Soul"
            src="https://i.imgur.com/6sYhSb6.png"
            size="lg"
            status="positive"
          />
        </HvButton>
        <HvButton icon aria-label="Clara Soul profile" radius="none">
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

export const Test: StoryObj = {
  render: () => (
    <div className="flex items-center gap-xs flex-wrap">
      <HvAvatar size="xs" />
      <HvAvatar size="xs" variant="square" />
      <HvAvatar backgroundColor="cat4" size="sm">
        NA
      </HvAvatar>
      <HvAvatar size="lg" backgroundColor="warning">
        <Bookmark size="M" color={["textLight", "textDark"]} />
      </HvAvatar>
      <HvAvatar size="xs" variant="square" status="positive">
        AB
      </HvAvatar>
      <HvAvatar size="lg" status="warning" badge="negative">
        AB
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
    </div>
  ),
};
