import React from "react";
import { HvInfoMessage } from "../../..";

export default {
  title: "How to Guides/Forms/Form Element Blocks/Info Message",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvInfoMessage } from "@hitachivantara/uikit-react-core"',
  },
  component: HvInfoMessage,
};

export const Main = () => <HvInfoMessage id="infoMessage">Info message</HvInfoMessage>;

export const DisabledInfoMessage = () => {
  return (
    <HvInfoMessage id="infoMessage-disabled" disabled>
      Info message
    </HvInfoMessage>
  );
};

DisabledInfoMessage.parameters = {
  docs: {
    description: { story: "Info message showcasing the disabled state." },
  },
};
