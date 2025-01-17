import { useState } from "react";
import {
  HvBaseDropdown,
  HvTreeItem,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import { Settings } from "@hitachivantara/uikit-react-icons";

const data = [
  { id: "1", label: "Item 1", description: "Item 1 description" },
  { id: "2", label: "Item 2", description: "Item 2 description" },
];

export const Custom = () => {
  return (
    <HvBaseDropdown>
      {data.map((item, idx) => (
        <HvTreeItem nodeId={`${item.id}-${idx}`} label={item.label}>
          <span>asdasda sdlkasjd laksjd </span>
        </HvTreeItem>
      ))}
    </HvBaseDropdown>
  );
};
