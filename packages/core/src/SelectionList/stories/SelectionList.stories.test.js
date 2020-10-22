import React from "react";

import { HvSelectionList, HvListItem } from "../..";

export default {
  title: "Tests/Selection List",
  parameters: {
    docs: {
      disable: true,
      page: null,
    },
  },
};

// __________________________________
// Extended robot test scenarios

export const Required = () => (
  <HvSelectionList
    id="HvSelectionList"
    description="radioGroup description"
    required
    label="Choose your favorite checkboxes"
    name="favorite"
  >
    <HvListItem label="ListItem 1" value="1" />
    <HvListItem label="ListItem 2" value="2" />
    <HvListItem label="ListItem 3" value="3" />
  </HvSelectionList>
);
