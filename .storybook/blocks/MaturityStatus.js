import React, { useContext } from "react";
import { DocsContext } from "@storybook/addon-docs";

import DSVersion from "./resources/DSVersion";
import Stable from "./resources/Stable";

export const MaturityStatus = ({}) => {
  const context = useContext(DocsContext);

  const { maturityStatus, dsVersion } = context.parameters;

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginRight: 5 }}>{dsVersion && <DSVersion dsVersion={dsVersion} />}</div>
      {maturityStatus && <Stable />}
    </div>
  );
};
