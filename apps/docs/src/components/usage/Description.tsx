import ReactMarkdown from "react-markdown";
import { ArrowUpRight } from "@phosphor-icons/react/ArrowUpRight";
import { useData } from "nextra/hooks";
import { HvTypography } from "@hitachivantara/uikit-react-core";

import { GitHubLogo } from "../logo/gh";
import { NpmLogo } from "../logo/npm";

/**
 * The `Description` component displays metadata information
 * about the current component, including its name, description,
 * GitHub source link, and NPM package link.
 */
export const Description = () => {
  const { meta } = useData();

  return (
    <>
      <HvTypography variant="title1">{meta.component}</HvTypography>
      <ReactMarkdown className="markdown">
        {meta.docgen?.description}
      </ReactMarkdown>
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
