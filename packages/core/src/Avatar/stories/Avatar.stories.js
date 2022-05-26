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
  title: "Components/Display/Avatar",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvAvatar } from "@hitachivantara/uikit-react-core"',
    dsVersion: "3.6.0",
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
    <HvAvatar backgroundColor="sema2">
      <LogIn color="atmo1" iconSize="XS" />
    </HvAvatar>
    <HvAvatar backgroundColor="acce1" size="SM" variant="square">
      CS
    </HvAvatar>
    <HvAvatar alt="Wayne" src={man2} size="MD" variant="square" />
    <HvAvatar backgroundColor="acce1" size="MD" status="sema4">
      CS
    </HvAvatar>
    <HvAvatar alt="Wayne" src={man2} size="MD" status="sema1" />
    <HvAvatar alt="Wayne" src={man2} size="LG" badge="sema17" />
    <HvAvatar alt="Wayne" src={man2} size="XL" status="sema10" />
  </>
);

// eslint-disable-next-line react/prop-types
export const ImageAvatars = () => (
  <>
    <HvAvatar alt="Ben" src={man1} />
    <HvAvatar alt="Beatrice" src={woman1} />
    <HvAvatar alt="Wayne" src={man2} />
    <HvAvatar alt="Clara Soul" src={woman2} />
  </>
);

ImageAvatars.parameters = {
  docs: {
    description: {
      story:
        "Image avatars can be created by passing standard img props src or srcSet to the component.",
    },
  },
};

// eslint-disable-next-line react/prop-types
export const LetterAvatars = () => (
  <>
    <HvAvatar>BM</HvAvatar>
    <HvAvatar backgroundColor="sema19">W</HvAvatar>
    <HvAvatar backgroundColor="sema6">CS</HvAvatar>
  </>
);

LetterAvatars.parameters = {
  docs: {
    description: {
      story: "Avatars containing simple characters can be created by passing a string as children.",
    },
  },
};

// eslint-disable-next-line react/prop-types
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

IconAvatars.parameters = {
  docs: {
    description: {
      story:
        "Icon avatars are created by passing an icon as children. Its size and color aren't Avatar's responsibility.",
    },
  },
};

// eslint-disable-next-line react/prop-types
export const Fallbacks = () => (
  <>
    <HvAvatar id="fallback_to_children" alt="Clara Soul" src="/broken-image.jpg">
      CS
    </HvAvatar>
    <HvAvatar id="falback_to_alt" alt="Clara Soul" src="/broken-image.jpg" />
    <HvAvatar id="fallback_to_default_icon" src="/broken-image.jpg" />
  </>
);

Fallbacks.parameters = {
  docs: {
    description: {
      story:
        "If there is an error loading the avatar image, the component falls back to an alternative in the following order: the provided children, the first letter of the alt text and finally the generic User icon.",
    },
  },
};

// eslint-disable-next-line react/prop-types
export const Sizes = () => (
  <>
    <HvAvatar size="XS" />
    <HvAvatar backgroundColor="sema6" size="SM">
      NA
    </HvAvatar>
    <HvAvatar size="MD" backgroundColor="sema3">
      <Bookmark iconSize="S" color="atmo1" />
    </HvAvatar>
    <HvAvatar size="LG" alt="Beatrice" src={woman1} />
    <HvAvatar size="XL" alt="Beatrice" src={woman1} />
  </>
);

Sizes.parameters = {
  docs: {
    description: {
      story:
        "You can change the size of the avatar with the size property (XS SM MD LG and XL). When using an icon avatar, preferably use as iconSize the size immediately below the avatar size.",
    },
  },
};

// eslint-disable-next-line react/prop-types
export const Buttons = () => {
  const doAlert = () => alert("Avatar clicked");

  return (
    <>
      <HvButton
        aria-label="Open the user profile"
        icon
        overrideIconColors={false}
        onClick={doAlert}
      >
        <HvAvatar id="icon" backgroundColor="sema1">
          <LogIn semantic="sema8" iconSize="XS" />
        </HvAvatar>
      </HvButton>
      <HvButton
        aria-label="Open the user profile"
        icon
        overrideIconColors={false}
        onClick={doAlert}
      >
        <HvAvatar id="default_icon" />
      </HvButton>
      <HvButton
        aria-label="Open the user profile"
        icon
        overrideIconColors={false}
        onClick={doAlert}
      >
        <HvAvatar id="letters" backgroundColor="sema19" size="MD" badge="sema4">
          BM
        </HvAvatar>
      </HvButton>
      <HvButton
        aria-label="Open the user profile"
        icon
        overrideIconColors={false}
        onClick={doAlert}
      >
        <HvAvatar id="image" alt="Clara Soul" src={woman2} size="XL" status="sema1" />
      </HvButton>
    </>
  );
};

Buttons.parameters = {
  docs: {
    description: {
      story:
        "You can change the component used for the root node, for instance for rendering a HvButton. All other properties are spread in the root node, such as event callbacks.",
    },
  },
};

export const Status = () => {
  return (
    <>
      <HvAvatar id="status1" size="XS" status="sema1">
        AB
      </HvAvatar>
      <HvAvatar id="status2" size="SM" status="sema2">
        AB
      </HvAvatar>
      <HvAvatar id="status3" size="MD" status="sema4">
        AB
      </HvAvatar>
      <HvAvatar id="status4" size="LG" status="atmo4">
        AB
      </HvAvatar>
      <HvAvatar id="status5" size="XL" status="#8CEB34">
        AB
      </HvAvatar>
    </>
  );
};

Status.parameters = {
  docs: {
    description: {
      story:
        "An avatar can have a status that is represented by a colored border. The status color can be from the HV theme palette or custom.",
    },
  },
};

export const Badge = () => {
  return (
    <>
      <HvAvatar id="badge1" size="XS" badge="sema1">
        AB
      </HvAvatar>
      <HvAvatar id="badge2" size="SM" badge="sema2">
        AB
      </HvAvatar>
      <HvAvatar id="badge3" size="MD" badge="sema4">
        AB
      </HvAvatar>
      <HvAvatar id="badge4" size="LG" badge="atmo4">
        AB
      </HvAvatar>
      <HvAvatar id="badge5" size="XL" badge="#8CEB34">
        AB
      </HvAvatar>
    </>
  );
};

Badge.parameters = {
  docs: {
    description: {
      story:
        "An avatar can have a badge that is represented by a colored dot on the upper right corner. The badge color can be from the HV theme palette or custom.",
    },
  },
};

export const ContainerProps = () => {
  return (
    <>
      <HvAvatar
        id="props2"
        size="SM"
        containerProps={{
          role: "button",
          "aria-label": "Login",
          tabIndex: 0,
        }}
      >
        <LogIn color="atmo1" iconSize="XS" />
      </HvAvatar>
      <HvAvatar
        id="props1"
        size="MD"
        status="sema1"
        alt="Ben"
        src={man1}
        containerProps={{
          role: "button",
          "aria-label": "Ben - online",
          tabIndex: 0,
        }}
      />
      <HvAvatar
        id="props3"
        size="LG"
        badge="sema4"
        alt="Beatrice"
        src={woman1}
        containerProps={{
          role: "button",
          "aria-label": "Beatrice - offline",
          tabIndex: 0,
        }}
      />
    </>
  );
};

ContainerProps.parameters = {
  docs: {
    description: {
      story:
        "The avatar container can receive a props object to allow for focusing and dynamically setting other props like the aria-label or the tabIndex.",
    },
  },
};
