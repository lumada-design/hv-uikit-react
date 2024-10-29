import { useState } from "react";
import { css } from "@emotion/css";
import { useData } from "nextra/hooks";
import {
  HvGrid,
  HvIconButton,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Copy } from "@hitachivantara/uikit-react-icons";

import { GitHubLogo } from "./assets/gh";
import { NpmLogo } from "./assets/npm";

const classes = {
  row: css({
    display: "flex",
    alignItems: "center",
    gap: theme.space.xs,
  }),
  import: css({
    display: "flex",
    alignItems: "center",
    fontSize: theme.fontSizes.sm,
  }),
  importCode: css({
    wordWrap: "break-word",
    whiteSpace: "pre-wrap",
  }),
};

export const Description = () => {
  const { meta } = useData();

  const [copyText, setCopyText] = useState("Copy code");

  const importCode = `import { ${meta.docgen.displayName} } from "@hitachivantara/uikit-react-${meta.package}";`;

  return (
    <>
      <HvTypography variant="title1">{meta.component}</HvTypography>
      <p>{meta.docgen?.description}</p>
      <HvGrid
        container
        maxWidth="md"
        rowSpacing="xs"
        paddingTop={4}
        alignItems="center"
        flexDirection="row"
      >
        <HvGrid item sm={2} xs={12}>
          <HvTypography variant="label">Usage</HvTypography>
        </HvGrid>
        <HvGrid item sm={10} xs={12}>
          <div className={classes.import}>
            <pre className={classes.importCode}>{importCode}</pre>
            <HvIconButton
              title={copyText}
              onClick={() => {
                navigator.clipboard.writeText(importCode);
                setCopyText("Copied");
              }}
            >
              <Copy size="XS" />
            </HvIconButton>
          </div>
        </HvGrid>
        {meta.subComponents && (
          <>
            <HvGrid item sm={2} xs={12}>
              <HvTypography variant="label">Sub-components</HvTypography>
            </HvGrid>
            <HvGrid item sm={10} xs={12} className={classes.row}>
              <div className={classes.import}>
                <pre className={classes.importCode}>
                  {meta?.subComponents
                    .map(
                      (sc: string) =>
                        meta.subComponentsDocgen[sc].displayName || sc,
                    )
                    .join(", ")}
                </pre>
              </div>
            </HvGrid>
          </>
        )}
        <HvGrid item sm={2} xs={12}>
          <HvTypography variant="label">Source</HvTypography>
        </HvGrid>
        <HvGrid item sm={10} xs={12} className={classes.row}>
          <GitHubLogo />
          <HvTypography link component="a" href={meta.source} target="_blank">
            View Source Code
          </HvTypography>
        </HvGrid>
        <HvGrid item sm={2} xs={12}>
          <HvTypography variant="label">Package</HvTypography>
        </HvGrid>
        <HvGrid item sm={10} xs={12} className={classes.row}>
          <NpmLogo />
          <HvTypography
            link
            component="a"
            target="_blank"
            href={`https://www.npmjs.com/package/@hitachivantara/uikit-react-${meta.package}`}
          >
            {`@hitachivantara/uikit-react-${meta.package}`}
          </HvTypography>
        </HvGrid>
      </HvGrid>
    </>
  );
};
