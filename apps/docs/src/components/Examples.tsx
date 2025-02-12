import { clsx } from "clsx";
import Link from "next/link";
import { HvTypography } from "@hitachivantara/uikit-react-core";

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
    { title: "Feature Sections", total: 0, path: "/examples" },
    { title: "CTA Sections", total: 0, path: "/examples" },
    { title: "Bento Grids", total: 0, path: "/examples" },
    { title: "Pricing Sections", total: 0, path: "/examples" },
    { title: "Header Sections", total: 0, path: "/examples" },
  ];

  return (
    <div className="max-w-7xl">
      {/* Page Header */}
      <div className="px-1 py-3">
        <HvTypography variant="title2">Examples</HvTypography>
        <HvTypography variant="body">
          Heroes, feature sections, newsletter sign-up forms — everything you
          need to build beautiful pages.
        </HvTypography>
      </div>

      {/* Section Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
                Image Placeholder
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
