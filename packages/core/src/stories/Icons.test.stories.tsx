import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CheckboxCheck,
  HvIconSprite,
  HvIconSpriteProps,
  icons,
} from "@hitachivantara/uikit-react-icons";

import { setupChromatic } from ".storybook/setupChromatic";

export default {
  title: "Tests/Icons",
} as Meta;

const SpriteCheckbox = (props: Partial<HvIconSpriteProps>) => (
  <HvIconSprite
    spriteUrl="./assets/icons.svg"
    iconName="CheckboxCheck"
    {...props}
  />
);

export const Test: StoryObj = {
  parameters: {
    ...setupChromatic(),
  },
  render: () => {
    return (
      <div className="grid gap-xs">
        <div className="flex flex-wrap">
          {Object.entries(icons).map(([name, Icon]) => (
            <Icon
              key={name}
              color={["secondary", "negative", "positive"]}
              size="md"
            />
          ))}
        </div>

        <div className="flex">
          <CheckboxCheck iconSize="XS" />
          <SpriteCheckbox iconSize="XS" />
          <CheckboxCheck iconSize="S" />
          <SpriteCheckbox iconSize="S" />
          <CheckboxCheck iconSize="M" />
          <SpriteCheckbox iconSize="M" />
          <CheckboxCheck iconSize="L" />
          <SpriteCheckbox iconSize="L" />
          <CheckboxCheck />
          <SpriteCheckbox />
          <CheckboxCheck size="md" />
          <SpriteCheckbox size="md" />
          <CheckboxCheck size={120} />
          <SpriteCheckbox size={120} />
        </div>

        <div className="flex">
          <CheckboxCheck
            width={100}
            height={100}
            style={{ width: 140, height: 140 }}
          />
          <CheckboxCheck size={100} style={{ width: 140, height: 140 }} />
          <CheckboxCheck size={100} />
        </div>
      </div>
    );
  },
};
