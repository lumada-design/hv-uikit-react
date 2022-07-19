import React from "react";
import { linkTo } from "@storybook/addon-links";
import {
  HvCard,
  HvCardHeader,
  HvCardMedia,
  HvActionBar,
  HvButton,
} from "@hitachivantara/uikit-react-core";

const openLink = (link) => () => window.open(link, "_blank");

const TemplateItem = ({ kind, story, image, title, code, disabled }) => {
  return (
    <HvCard
      bgcolor="atmo1"
      style={{
        maxWidth: "400px",
        width: "100%",
      }}
    >
      <HvCardHeader title={title} aria-label={title} />
      <HvCardMedia component="img" alt={title} image={image} />
      <HvActionBar>
        <HvButton
          category="secondary"
          disabled={disabled}
          onClick={linkTo(kind, story)}
          aria-label="View Sample"
        >
          View Sample
        </HvButton>
        <div style={{ flex: 1 }} />
        <HvButton
          category="secondary"
          disabled={disabled}
          onClick={openLink(code)}
          aria-label="View Code"
        >
          View Code
        </HvButton>
      </HvActionBar>
    </HvCard>
  );
};

export default TemplateItem;
