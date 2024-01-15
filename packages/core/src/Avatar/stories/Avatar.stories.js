/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { LogIn, Archives, Search, Bookmark } from "@hitachivantara/uikit-react-icons";

import man1 from "./resources/man-1.png";
import man2 from "./resources/man-2.png";
import woman1 from "./resources/woman-1.png";
import woman2 from "./resources/woman-2.png";

import { HvAvatar, HvButton } from "../..";

// eslint-disable-next-line react/prop-types
const FlexDecorator = ({ children }) => {
  const useStyles = makeStyles({
    root: {
      display: "flex",
      alignItems: "center",
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
  title: "Components/Avatar",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvAvatar } from "@hitachivantara/uikit-react-core";',
  },
  component: HvAvatar,
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
    <HvAvatar />
    <HvAvatar backgroundColor="sema19">CS</HvAvatar>
    <HvAvatar alt="Wayne" src={man2} />
    <HvAvatar backgroundColor="sema2">
      <LogIn color="atmo1" iconSize="XS" />
    </HvAvatar>
  </>
);

export const ImageAvatars = () => (
  <>
    <HvAvatar alt="Ben" src={man1} />
    <HvAvatar alt="Beatrice" src={woman1} />
    <HvAvatar alt="Wayne" src={man2} />
    <HvAvatar alt="Clara Soul" src={woman2} />
  </>
);

ImageAvatars.story = {
  parameters: {
    docs: {
      storyDescription:
        "Image avatars can be created by passing standard img props src or srcSet to the component.",
    },
  },
};

export const LetterAvatars = () => (
  <>
    <HvAvatar>BM</HvAvatar>
    <HvAvatar backgroundColor="sema19">W</HvAvatar>
    <HvAvatar backgroundColor="sema6">CS</HvAvatar>
  </>
);

LetterAvatars.story = {
  parameters: {
    docs: {
      storyDescription:
        "Avatars containing simple characters can be created by passing a string as children.",
    },
  },
};

export const IconAvatars = () => (
  <>
    <HvAvatar>
      <LogIn color="atmo1" iconSize="XS" />
    </HvAvatar>
    <HvAvatar backgroundColor="sema1">
      <Archives color="atmo1" iconSize="XS" />
    </HvAvatar>
    <HvAvatar backgroundColor="sema2">
      <Search color="atmo1" iconSize="XS" />
    </HvAvatar>
    <HvAvatar backgroundColor="sema3">
      <Bookmark color="atmo1" iconSize="XS" />
    </HvAvatar>
  </>
);

IconAvatars.story = {
  parameters: {
    docs: {
      storyDescription:
        "Icon avatars are created by passing an icon as children. Its size and color aren't Avatar's responsibility.",
    },
  },
};

export const Fallbacks = () => (
  <>
    <HvAvatar id="fallback_to_children" alt="Clara Soul" src="/broken-image.jpg">
      CS
    </HvAvatar>
    <HvAvatar id="falback_to_alt" alt="Clara Soul" src="/broken-image.jpg" />
    <HvAvatar id="fallback_to_default_icon" src="/broken-image.jpg" />
  </>
);

Fallbacks.story = {
  parameters: {
    docs: {
      storyDescription:
        "If there is an error loading the avatar image, the component falls back to an alternative in the following order: the provided children, the first letter of the alt text and finally the generic User icon.",
    },
  },
};

export const Sizes = () => (
  <>
    <HvAvatar backgroundColor="sema6" size="S">
      NA
    </HvAvatar>
    <HvAvatar size="M" backgroundColor="sema3">
      <Bookmark iconSize="S" color="atmo1" />
    </HvAvatar>
    <HvAvatar size="L" alt="Beatrice" src={woman1} />
  </>
);

Sizes.story = {
  parameters: {
    docs: {
      storyDescription:
        "You can change the size of the avatar with the size property (S, M, L). When using an icon avatar, preferably use as iconSize the size immediately below the avatar size.",
    },
  },
};

export const Buttons = () => {
  const AvatarButton = ({ children, ...other }) => (
    <HvButton
      aria-label="Open the user profile"
      category="icon"
      overrideIconColors={false}
      {...other}
    >
      {children}
    </HvButton>
  );

  const doAlert = () => alert("Avatar clicked");
  return (
    <>
      <HvAvatar id="default_icon" component={AvatarButton} onClick={doAlert} />
      <HvAvatar id="letters" backgroundColor="sema19" component={AvatarButton} onClick={doAlert}>
        BM
      </HvAvatar>
      <HvAvatar
        id="image"
        alt="Clara Soul"
        src={woman2}
        component={AvatarButton}
        onClick={doAlert}
      />
      <HvAvatar id="icon" backgroundColor="sema1" component={AvatarButton} onClick={doAlert}>
        <LogIn semantic="sema8" iconSize="XS" />
      </HvAvatar>
    </>
  );
};

Buttons.story = {
  parameters: {
    docs: {
      storyDescription:
        "You can change the component used for the root node, for instance for rendering a HvButton. All other properties are spread in the root node, such as event callbacks.",
    },
  },
};
