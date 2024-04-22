import React from "react";
import {
  IconButton,
  TooltipLinkList,
  WithTooltip,
} from "@storybook/components";

import { ADDON_ID } from "./constants";

const VersionSelector = () => {
  const baseUrl = "https://lumada-design.github.io/uikit/";
  const versionsList = [
    { id: "5.x", label: "5.x", path: "master" },
    { id: "4.x", label: "4.x", path: "v4.x" },
    { id: "3.x", label: "3.x", path: "v3.x" },
  ];
  const selectedVersion = versionsList[0].label;

  const links = versionsList.map((version) => ({
    id: version.id,
    title: version.label,
    active: version.label === selectedVersion,
    href: `${baseUrl}${version.path}`,
    target: "_blank",
  }));

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={<TooltipLinkList links={links} />}
    >
      <IconButton key={ADDON_ID} active={false} title="Select theme">
        {`Version: ${selectedVersion}`}
      </IconButton>
    </WithTooltip>
  );
};

export default VersionSelector;
