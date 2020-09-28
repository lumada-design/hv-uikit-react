import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import {
  Favorite,
  FavoriteSelected,
  Bookmark,
  BookmarkSelected,
  BackwardsEmpty,
  BackwardsSelected,
  UpEmpty,
  UpSelected,
  DownEmpty,
  DownSelected,
  ForwardsEmpty,
  ForwardsSelected,
  Like,
  LikeSelected,
  Dislike,
  DislikeSelected,
  LightOff,
  LightOn,
  Unlock,
  Lock,
} from "@hv/uikit-react-icons/dist";
import Eye from "./Eye";

import { HvToggleButton, HvButton } from "../..";

// eslint-disable-next-line react/prop-types
const FlexDecorator = ({ children }) => {
  const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "end",
      flexWrap: "wrap",
      "& > *": {
        margin: "0 10px 5px 0",
      },
    },
  });

  const classes = useStyles();

  return <div className={classes.root}>{children}</div>;
};

export default {
  title: "Patterns/Selectors/Toggle Button",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvToggleButton } from '@hv/uikit-react-core/dist'",
  },
  component: HvToggleButton,
  decorators: [
    (Story) => (
      <FlexDecorator>
        <Story />
      </FlexDecorator>
    ),
  ],
};

export const Main = () => (
  <>
    <HvToggleButton
      defaultSelected
      aria-label="Favorite"
      notSelectedIcon={<Favorite />}
      selectedIcon={<FavoriteSelected />}
      labels={{
        notSelectedTitle: "Mark as favorite",
        selectedTitle: "Unmark as favorite",
      }}
    />
    <HvToggleButton
      aria-label="Bookmark"
      notSelectedIcon={<Bookmark />}
      selectedIcon={<BookmarkSelected />}
      labels={{
        notSelectedTitle: "Bookmark",
        selectedTitle: "Remove bookmark",
      }}
    />
    <HvToggleButton
      aria-label="Backwards"
      notSelectedIcon={<BackwardsEmpty />}
      selectedIcon={<BackwardsSelected />}
      labels={{
        notSelectedTitle: "Go backwards",
        selectedTitle: "Stop",
      }}
    />
    <HvToggleButton
      aria-label="Up"
      notSelectedIcon={<UpEmpty />}
      selectedIcon={<UpSelected />}
      labels={{
        notSelectedTitle: "Go up",
        selectedTitle: "Stop",
      }}
    />
    <HvToggleButton
      aria-label="Down"
      notSelectedIcon={<DownEmpty />}
      selectedIcon={<DownSelected />}
      labels={{
        notSelectedTitle: "Go down",
        selectedTitle: "Stop",
      }}
    />
    <HvToggleButton
      aria-label="Forward"
      notSelectedIcon={<ForwardsEmpty />}
      selectedIcon={<ForwardsSelected />}
      labels={{
        notSelectedTitle: "Go forward",
        selectedTitle: "Stop",
      }}
    />
    <HvToggleButton
      aria-label="Like"
      notSelectedIcon={<Like />}
      selectedIcon={<LikeSelected />}
      labels={{
        notSelectedTitle: "Like",
        selectedTitle: "Remove like",
      }}
    />
    <HvToggleButton
      aria-label="Dislike"
      notSelectedIcon={<Dislike />}
      selectedIcon={<DislikeSelected />}
      labels={{
        notSelectedTitle: "Dislike",
        selectedTitle: "Remove dislike",
      }}
    />
    <HvToggleButton
      aria-label="Light"
      notSelectedIcon={<LightOff />}
      selectedIcon={<LightOn />}
      labels={{
        notSelectedTitle: "Turn on",
        selectedTitle: "Turn off",
      }}
    />
    <HvToggleButton
      aria-label="Lock"
      notSelectedIcon={<Unlock />}
      selectedIcon={<Lock />}
      labels={{
        notSelectedTitle: "Lock",
        selectedTitle: "Unlock",
      }}
    />
  </>
);

Main.story = {
  parameters: {
    v3: true,
  },
};

export const Controlled = () => {
  const [select, setSelect] = useState(false);

  const toggleState = () => setSelect(!select);

  const label = select ? "Open lock" : "Close lock";

  return (
    <>
      <HvButton style={{ marginBottom: "12px" }} onClick={toggleState}>
        {label}
      </HvButton>
      <HvToggleButton
        aria-label="Lock"
        selected={select}
        notSelectedIcon={<Unlock />}
        selectedIcon={<Lock />}
        onClick={toggleState}
        labels={{
          notSelectedTitle: "Close lock",
          selectedTitle: "Open lock",
        }}
      />
    </>
  );
};

Controlled.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a toggle button with state.",
    },
    v3: true,
  },
};

export const Disabled = () => (
  <HvToggleButton
    aria-label="Light"
    notSelectedIcon={<LightOff />}
    selectedIcon={<LightOn />}
    disabled
    labels={{
      notSelectedTitle: "Turn on light",
      selectedTitle: "Turn off light",
    }}
  />
);

Disabled.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a disabled toggle button.",
    },
    v3: true,
  },
};

export const UsingChildren = () => {
  const [select, setSelect] = useState(true);

  const toggleState = () => setSelect(!select);

  return (
    <HvToggleButton
      aria-label="Lock"
      selected={select}
      onClick={toggleState}
      labels={{
        notSelectedTitle: "Close lock",
        selectedTitle: "Open lock",
      }}
    >
      {select ? <Lock /> : <Unlock />}
    </HvToggleButton>
  );
};

UsingChildren.story = {
  parameters: {
    docs: {
      storyDescription: "A sample using children to provide the toggle button content.",
    },
    v3: true,
  },
};

export const Animated = () => {
  const [select, setSelect] = useState(true);

  const toggleState = () => setSelect(!select);

  return (
    <HvToggleButton
      selected={select}
      labels={{
        notSelectedTitle: "Don't Show",
        selectedTitle: "Show",
      }}
      onClick={toggleState}
      aria-label="Eye"
    >
      <Eye className={select ? "selected" : "notSelected"} />
    </HvToggleButton>
  );
};

Animated.story = {
  parameters: {
    docs: {
      storyDescription: "A sample showcasing a toggle button with a custom animated icon.",
    },
    v3: true,
  },
};
