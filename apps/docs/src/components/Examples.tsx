import { clsx } from "clsx";
import Link from "next/link";
import { HvTypography } from "@hitachivantara/uikit-react-core";
import {
  BarChart,
  Speedometer,
  SwipeRight,
  Table,
  TextColor,
} from "@hitachivantara/uikit-react-icons";

import charts from "../pages/examples/charts.mdx?raw";
import inputs from "../pages/examples/inputs.mdx?raw";
import kpis from "../pages/examples/kpis.mdx?raw";
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
    case "Inputs":
      return <TextColor size="md" />;
    case "KPIs":
      return <Speedometer size="md" />;
    case "Drag and Drop":
      return <SwipeRight size="md" />;
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
      total: countCodeBlocks(kpis),
      path: "/examples/dnd",
    },
  ];

  return (
    <div className="max-w-7xl">
      {/* Page Header */}
      <div className="px-xs py-md">
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
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-lg">
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
              <HvTypography variant="body" className="text-textSubtle">
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
