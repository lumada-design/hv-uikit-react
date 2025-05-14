import { clsx } from "clsx";
import Link from "next/link";
import {
  HvIconContainer,
  HvTypography,
} from "@hitachivantara/uikit-react-core";

import charts from "../pages/examples/charts.mdx?raw";
import dnd from "../pages/examples/dnd.mdx?raw";
import inputs from "../pages/examples/inputs.mdx?raw";
import kpis from "../pages/examples/kpis.mdx?raw";
import tables from "../pages/examples/tables.mdx?raw";

/**
 * Extracts the number of CodeBlock components in the given file content.
 */
const countCodeBlocks = (fileContent: string): number => {
  const codeBlockRegex = /<CodeBlock/g;
  const matches = fileContent.match(codeBlockRegex);
  return matches ? matches.length : 0;
};

const getSectionIcon = (title: string) => {
  switch (title) {
    case "Tables":
      return <div className="i-ph-table" />;
    case "Charts":
      return <div className="i-ph-chart-bar" />;
    case "Inputs":
      return <div className="i-ph-text-a-underline" />;
    case "KPIs":
      return <div className="i-ph-speedometer" />;
    case "Drag and Drop":
      return <div className="i-ph-hand-swipe-right" />;
    default:
      return null;
  }
};

/**
 * The `Examples` component displays a collection of categorized sections
 * with details about the number of components in each category.
 */
export const Examples = () => {
  // Define section categories with their respective titles and component counts
  const sections = [
    {
      title: "Tables",
      total: countCodeBlocks(tables),
      path: "/examples/tables",
    },
    {
      title: "Charts",
      total: countCodeBlocks(charts),
      path: "/examples/charts",
    },
    {
      title: "Inputs",
      total: countCodeBlocks(inputs),
      path: "/examples/inputs",
    },
    {
      title: "KPIs",
      total: countCodeBlocks(kpis),
      path: "/examples/kpis",
    },
    {
      title: "Drag and Drop",
      total: countCodeBlocks(dnd),
      path: "/examples/dnd",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-sm md:px-md py-lg md:py-xl">
      {/* Page Header */}
      <div className="mb-lg md:mb-xl md:text-center">
        <HvTypography
          variant="title1"
          className={clsx(
            "text-[2.1em] leading-[1.3em] mb-md",
            "max-sm:text-[1.5rem] max-sm:leading-[2.2rem] max-sm:mb-sm",
          )}
        >
          Building blocks to streamline <br />
          your development workflow.
        </HvTypography>
        <HvTypography className="text-md max-w-3xl mx-auto">
          Find more on our{" "}
          <HvTypography
            variant="captionLabel"
            className="color-primary hover:underline"
            component="a"
            href="https://stackblitz.com/orgs/github/lumada-design/collections"
            target="_blank"
            rel="noopener noreferrer"
          >
            StackBlitz collection
          </HvTypography>
        </HvTypography>
      </div>

      {/* Section Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-lg">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.path}
            className={clsx("hover:bg-bgContainer rounded-round p-xs")}
          >
            {/* Placeholder for section preview */}
            <div
              className={clsx(
                "h-160px bg-bgPage border border-atmo3",
                "rounded-round mb-sm flex items-center justify-center",
              )}
            >
              <HvIconContainer color="textSubtle" size="xl">
                {getSectionIcon(section.title)}
              </HvIconContainer>
            </div>
            {/* Section Title */}
            <HvTypography variant="label" className="font-semibold">
              {section.title}
            </HvTypography>
            {/* Component Count */}
            <HvTypography variant="caption1">
              {section.total} examples
            </HvTypography>
          </Link>
        ))}
      </div>
    </div>
  );
};
