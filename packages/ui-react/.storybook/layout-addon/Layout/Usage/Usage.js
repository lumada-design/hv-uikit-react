/**
 * Copyright (c) 2018 Hitachi Vantara Corporation.
 *
 *  The copyright to the computer software herein is the property of
 *  Hitachi Vantara Corporation. The software may be used and/or copied only
 *  with the written permission of Hitachi Vantara Corporation or in accordance
 *  with the terms and conditions stipulated in the agreement/contract
 *  under which the software has been supplied.
 */

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

const HvUsage = ({ parameters }) => {
  const { usage } = parameters;

  return (
    <React.Fragment>
      <br />
      <SyntaxHighlighter
        language="javascript"
        style={prism}
        customStyle={{ margin: 0, borderRadius: 0, fontSize: 14 }}
      >
        {usage}
      </SyntaxHighlighter>
    </React.Fragment>
  );
};

export default HvUsage;
