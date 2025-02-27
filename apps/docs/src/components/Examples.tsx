import { clsx } from "clsx";
import Link from "next/link";
import { HvTypography } from "@hitachivantara/uikit-react-core";
import { BarChart, Table } from "@hitachivantara/uikit-react-icons";

import charts from "../pages/examples/charts.mdx?raw";
import tables from "../pages/examples/tables.mdx?raw";

/**
 * Extracts the number of CodeBlock components in the given file content.
 */
const countCodeBlocks = (fileContent: string): number => {
  const codeBlockRegex =
    /<CodeBlock[\s\S]*?>[\s\S]*?<\/CodeBlock>|<CodeBlock[\s\S]*?\/>/g;
  const matches = fileContent.match(codeBlockRegex);
  return matches ? matches.length : 0;
};

const getSectionIcon = (title: string) => {
  switch (title) {
    case "Tables":
      return <Table size="md" />;
    case "Charts":
      return <BarChart size="md" />;
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
  ];

  return (
    <div className="max-w-7xl">
      {/* Page Header */}
      <div className="px-1 py-3">
        <HvTypography variant="title2">Examples</HvTypography>
        <HvTypography variant="body">
          Explore practical examples demonstrating how to use our components in
          different scenarios and real-world scenarios. You can find an extended
          list of UI Kit examples on our{" "}
          <HvTypography
            className="color-primary hover:underline"
            component="a"
            href="https://stackblitz.com/orgs/github/lumada-design/collections"
          >
            StackBlitz collection
          </HvTypography>
        </HvTypography>
      </div>

      {/* Section Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6">
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.path}
            className={clsx(
              "hover:bg-[var(--uikit-colors-atmo1)] rounded-round p-1",
            )}
          >
            {/* Placeholder for section preview */}
            <div
              className={clsx(
                "h-20 bg-[var(--uikit-colors-atmo2)] border border-[var(--uikit-colors-atmo3)]",
                "rounded-round mb-2 flex items-center justify-center",
              )}
            >
              <HvTypography
                variant="body"
                className="text-[var(--uikit-colors-secondary_80)]"
              >
                {getSectionIcon(section.title)}
              </HvTypography>
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
