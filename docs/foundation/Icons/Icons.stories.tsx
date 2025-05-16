import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Meta, StoryObj } from "@storybook/react";
import { HvIconButton } from "@hitachivantara/uikit-react-core";
import {
  Bookmark,
  CheckboxCheck,
  Close,
  HvIconContainer,
  HvIconContainerProps,
  HvIconSprite,
  HvIconSpriteProps,
  IconBase,
  icons,
  Level4,
  Machine,
} from "@hitachivantara/uikit-react-icons";

import { ExternalIcons } from "./ExternalIcons";
import ExternalIconsRaw from "./ExternalIcons?raw";
import { setupChromatic } from ".storybook/setupChromatic";

const meta: Meta<typeof IconBase> = {
  title: "Foundation/Icons",
  parameters: {
    componentSubtitle: null,
  },
  component: IconBase,
};
export default meta;

/** internal or deprecated props that shouldn't be used */
const disabledArgs = {
  svgProps: { table: { disable: true } },
  palette: { table: { disable: true } },
  semantic: { table: { disable: true } },
  inverted: { table: { disable: true } },
  viewbox: { table: { disable: true } },
};

export const Main: StoryObj<typeof IconBase> = {
  args: {
    size: "sm",
    color: "secondary",
  },
  argTypes: {
    ...disabledArgs,
    iconName: { table: { disable: true } },
  },
  render: (args) => {
    return <CheckboxCheck {...args} />;
  },
};

export const CustomColors = {
  parameters: {
    docs: {
      description: { story: "Overriding Icon colors with palette colors" },
    },
  },
  render: () => (
    <Bookmark
      color={["brand", "secondary"]}
      size="M"
      title="Click to bookmark"
    />
  ),
};

export const Accessibility = {
  parameters: {
    docs: {
      description: {
        story:
          'Icons have `role="none"` by default, hiding them from the accessibility tree. <br /> \
          Semantic icons should be given a `title` label associated with their meaning. <br /> \
          If icons trigger actions, they should be wrapped in a tooltip and a button. For this, use `HvIconButton` with the `title` attribute.',
      },
    },
    controls: {
      disable: true,
    },
  },
  render: () => (
    <>
      <Machine size="M" />
      <Level4 title="Warning!" size="M" color="negative" />
      <HvIconButton title="Close" onClick={() => {}}>
        <Close />
      </HvIconButton>
    </>
  ),
};

export const CustomSize = {
  parameters: {
    docs: {
      description: { story: "Overrides Icon size using non standard sizes" },
    },
  },
  render: () => (
    <CheckboxCheck size={200} style={{ width: 240, height: 240 }} />
  ),
};

export const IconSprites: StoryObj<HvIconSpriteProps> = {
  args: {
    iconName: "CheckboxCheck",
    spriteUrl: "./assets/icons.svg",
    color: "secondary",
    size: "sm",
  },
  argTypes: {
    ...disabledArgs,
    spriteUrl: {
      description:
        "The URL to the SVG icon sprite, served statically served by the application.",
      control: { type: "radio" },
      options: ["./assets/icons.svg", "./assets/pictograms.svg"],
    },
  },
  render: (args) => {
    return <HvIconSprite {...args} />;
  },
};

export const ExternalIconsStory: StoryObj<HvIconContainerProps> = {
  name: "External Icons",
  parameters: {
    docs: {
      description: {
        story:
          'Most of our components that use icons are expecting them to have certain size containers. The `HvIconContainer` component allows you to use external components without breaking the component behavior. Here we exemplify this usage with <a href="https://docs.fontawesome.com/v5/web/use-with/react/">`Font Awesome`</a> icons.',
      },
      source: { code: ExternalIconsRaw },
    },
  },
  render: () => <ExternalIcons />,
};

const SpriteCheckbox = (props: Partial<HvIconSpriteProps>) => (
  <HvIconSprite
    spriteUrl="./assets/icons.svg"
    iconName="CheckboxCheck"
    {...props}
  />
);

/** Visual tests for icons, icons sprites, colors, and sizes */
export const Test: StoryObj = {
  parameters: {
    ...setupChromatic(),
  },
  render: () => {
    return (
      <>
        <div className="flex flex-wrap">
          {Object.entries(icons).map(([name, Icon]) => (
            <Icon
              key={name}
              color={["secondary", "negative", "positive"]}
              iconSize="S"
            />
          ))}
        </div>

        <div className="flex flex-wrap">
          {Object.keys(icons).map((name) => (
            <HvIconSprite
              key={name}
              iconName={name}
              color={["secondary", "negative", "positive"]}
              iconSize="S"
              spriteUrl="./assets/icons.svg"
            />
          ))}
        </div>

        <div className="flex">
          <CheckboxCheck iconSize="XS" />
          <CheckboxCheck iconSize="S" />
          <CheckboxCheck iconSize="M" />
          <CheckboxCheck iconSize="L" />
          <CheckboxCheck size="xs" />
          <CheckboxCheck size="sm" />
          <CheckboxCheck size="md" />
          <CheckboxCheck size="lg" />
          <CheckboxCheck size="xl" />
          <CheckboxCheck size={120} />

          <SpriteCheckbox iconSize="XS" />
          <SpriteCheckbox iconSize="S" />
          <SpriteCheckbox iconSize="M" />
          <SpriteCheckbox iconSize="L" />
          <SpriteCheckbox size="xs" />
          <SpriteCheckbox size="sm" />
          <SpriteCheckbox size="md" />
          <SpriteCheckbox size="lg" />
          <SpriteCheckbox size="xl" />
          <SpriteCheckbox size={120} />

          <CheckboxCheck
            width={100}
            height={100}
            style={{ width: 140, height: 140 }}
          />
          <CheckboxCheck size={100} style={{ width: 140, height: 140 }} />
          <CheckboxCheck size={100} />
        </div>

        <div className="flex">
          <HvIconContainer size="xs">
            <FontAwesomeIcon icon={faAdd} />
          </HvIconContainer>
          <HvIconContainer size="sm">
            <FontAwesomeIcon icon={faAdd} />
          </HvIconContainer>
          <HvIconContainer size="md">
            <FontAwesomeIcon icon={faAdd} />
          </HvIconContainer>
          <HvIconContainer size="lg">
            <FontAwesomeIcon icon={faAdd} />
          </HvIconContainer>
          <HvIconContainer size="xl">
            <FontAwesomeIcon icon={faAdd} />
          </HvIconContainer>
        </div>
      </>
    );
  },
};
