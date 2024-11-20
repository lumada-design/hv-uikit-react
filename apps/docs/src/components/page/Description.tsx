import { ArrowUpRight } from "@phosphor-icons/react";
import { useData } from "nextra/hooks";
import { HvTypography } from "@hitachivantara/uikit-react-core";

import { GitHubLogo } from "../logo/gh";
import { NpmLogo } from "../logo/npm";

export const Description = () => {
  const { meta } = useData();

  return (
    <>
      <HvTypography variant="title1">{meta.component}</HvTypography>
      <p>{meta.docgen?.description}</p>
      <div className="flex flex-row gap-4 mt-3">
        <div className="flex flex-row gap-1 items-center">
          <GitHubLogo />
          <HvTypography link component="a" href={meta.source} target="_blank">
            Source Code
          </HvTypography>
          <ArrowUpRight />
        </div>
        <div className="flex flex-row gap-1 items-center">
          <NpmLogo />
          <HvTypography
            link
            component="a"
            target="_blank"
            href={`https://www.npmjs.com/package/@hitachivantara/uikit-react-${meta.package}`}
          >
            {`uikit-react-${meta.package}`}
          </HvTypography>
          <ArrowUpRight />
        </div>
      </div>
    </>
  );
};
