import { useState } from "react";
import {
  HvButton,
  HvGrid,
  HvTooltip,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import { Meta } from "../utils";

export const Header = ({ meta }: { meta: Meta }) => {
  const [copyText, setCopyText] = useState("Copy code");

  const importCode = `import { ${meta.docgen.displayName} } from "@hitachivantara/uikit-react-core";`;

  return (
    <div>
      <HvTypography component="h1" variant="display">
        {meta.docgen.displayName}
      </HvTypography>
      <HvTypography variant="title4">{meta.docgen.description}</HvTypography>
      <HvGrid container maxWidth="sm" rowSpacing="xs" paddingTop={2}>
        <HvGrid item sm={2}>
          <HvTypography>import</HvTypography>
        </HvGrid>
        <HvGrid item sm={10}>
          <HvTooltip title={copyText} placement="right-end">
            <HvButton
              variant="secondaryGhost"
              onClick={() => {
                navigator.clipboard.writeText(importCode);
                setCopyText("Copied");
              }}
            >
              {importCode}
            </HvButton>
          </HvTooltip>
        </HvGrid>
        <HvGrid item sm={2}>
          <HvTypography>Source</HvTypography>
        </HvGrid>
        <HvGrid item sm={10}>
          <HvTypography link component="a" href={meta.source}>
            View Source Code
          </HvTypography>
        </HvGrid>
      </HvGrid>
    </div>
  );
};
