import { StoryObj } from "@storybook/react";
import { Tag, TagProps } from "./Tag";

export default { title: "Layout/Tag", component: Tag };

export const Main: StoryObj<TagProps> = {
  args: {
    children: "Tag",
  },
};
