import React from "react";
import {
  Bookmark,
  CheckboxCheck,
  Level4,
  Level5,
  Machine,
} from "@hitachivantara/uikit-react-icons";

export default {
  title: "Foundation/Icons/Usage",
  parameters: {
    componentSubtitle: null,
    usage: 'import { Bookmark, CheckboxCheck } from "@hitachivantara/uikit-react-icons";',
  },
  component: Bookmark,
};

export const Main = () => <CheckboxCheck />;

export const IconSize = () => <CheckboxCheck iconSize="M" />;

IconSize.story = {
  parameters: {
    docs: {
      storyDescription: "Overrides Generic Icon size using standard sizes",
    },
  },
};

export const CustomColors = () => (
  <Bookmark color={["acce3", "acce1"]} iconSize="M" aria-label="Click to bookmark" />
);

CustomColors.story = {
  parameters: {
    docs: {
      storyDescription: "Overriding Icon colors with palette colors",
    },
  },
};

export const DecorativeIcon = () => <Machine role="presentation" iconSize="M" />;

DecorativeIcon.story = {
  parameters: {
    docs: {
      storyDescription: "Icon with decorative meaning using the hidden attribute for accessibility",
    },
  },
};

export const SemanticIcon = () => (
  <Level4 role="img" title="Warning!" iconSize="M" semantic="sema4" />
);

SemanticIcon.story = {
  parameters: {
    docs: {
      storyDescription:
        "Icon with semantic meaning using the title and role attributes for accessibility",
    },
  },
};

export const CustomSize = () => (
  <CheckboxCheck height={200} width={200} boxStyles={{ width: 240, height: 240 }} />
);

CustomSize.story = {
  parameters: {
    docs: {
      storyDescription: "Overrides Icon size using non standard sizes",
    },
  },
};

export const InvertedColors = () => <Level5 iconSize="L" inverted role="img" title="Critical!" />;

InvertedColors.story = {
  parameters: {
    docs: {
      storyDescription: "Inverts Generic Icon colors",
    },
  },
};
