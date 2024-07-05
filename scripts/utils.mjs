// Map category names to shorthand
const categoryMap = {
  features: "feat",
  bug: "fix",
};

/**
 * Parses the content and formats it according to specific rules.
 */
const parseContent = (content) => {
  let currentCategory;

  return content
    .split("\n") // Split content into lines
    .filter((line) => line.trim()) // Filter out empty lines
    .reduce((outputLines, line) => {
      // Check if the line starts with "### " indicating a new category
      if (line.startsWith("### ")) {
        const category = line.split(" ")[1].toLowerCase();
        currentCategory = categoryMap[category] || "";
      } else {
        const parts = line.split(/(^-|\*\*[^*]+?\*\*)/);
        const scope = parts[3]?.replace(/\*\*|:/g, ""); // Extract the scope from the line 
        const description = scope ? `(${scope}):${parts[4]}` : `:${parts[2]}`;

        outputLines.push(`- ${currentCategory}${description}`);
      }
      return outputLines;
    }, [])
    .join("\n");
};

/**
 * Parse the CHANGELOG file content
 */
export const parseChangelogFile = (changelogFile, pkg) => {
  const regex =
    /^##?\s?\[?(\d+\.\d+\.\d+)\]?(?:\((https?:\/\/[^\s)]+)\))?\s?\((\d{4}-\d{2}-\d{2})\)/gm;

  // Split by section headers and remove the initial empty element
  const parts = changelogFile.split(regex).slice(1);

  return parts.reduce((acc, match, index) => {
    if (
      index % 4 === 0 && // Process parts in groups of 4 (version, link, date, content)
      !parts[index + 3].includes("Version bump only") // Skip entries that only contain "Version bump only"
    ) {
      acc.push({
        package: pkg,
        version: parts[index],
        link: parts[index + 1],
        date: parts[index + 2],
        content: parseContent(parts[index + 3]),
      });
    }
    return acc;
  }, []);
};
