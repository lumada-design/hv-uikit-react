"use client";

import ReactMarkdown from "react-markdown";
import { HvTypography } from "@hitachivantara/uikit-react-core";

import { GitHubLogo, NpmLogo } from "../../assets/logos";
import type { ComponentMeta } from "../../utils/component";
import { AlignmentBadge } from "./AlignmentBadge";

/**
 * The `Description` component displays metadata information
 * about the current component, including its name, description,
 * GitHub source link, and NPM package link.
 */
export function Description({ meta }: { meta: ComponentMeta }) {
  const links = [
    { logo: <GitHubLogo />, label: "Source Code", href: meta.source },
    {
      logo: <NpmLogo />,
      label: `uikit-react-${meta.package}`,
      href: `https://npm.im/@hitachivantara/uikit-react-${meta.package}`,
    },
  ];

  return (
    <>
      <div className="flex gap-1 items-center">
        <HvTypography variant="title1">{meta.component}</HvTypography>
        <AlignmentBadge component={meta.component} />
      </div>
      <ReactMarkdown className="markdown">
        {meta.docgen?.description}
      </ReactMarkdown>
      <div className="flex gap-sm mt-sm">
        {links.map(({ logo, label, href }, i) => (
          <div key={i} className="flex gap-xs items-center">
            {logo}
            <HvTypography
              link
              component="a"
              href={href}
              target="_blank"
              className="flex items-center"
            >
              {label}
              <div className="i-ph-arrow-up-right" />
            </HvTypography>
          </div>
        ))}
      </div>
    </>
  );
}
