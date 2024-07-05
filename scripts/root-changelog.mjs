import fs from "node:fs";
import path from "node:path";

import { parseChangelogFile } from "./utils.mjs";

/**
 * Find all the CHANGELOG.md files in the packages directory
 */
const findChangelogFiles = (rootDir) => {
  const packagesDir = path.join(rootDir, "packages");

  return fs
    .readdirSync(packagesDir)
    .filter((file) => fs.statSync(path.join(packagesDir, file)).isDirectory())
    .reduce((changelogFiles, pkg) => {
      const changelogPath = path.join(packagesDir, pkg, "CHANGELOG.md");

      if (fs.existsSync(changelogPath)) changelogFiles[pkg] = changelogPath;
      return changelogFiles;
    }, {});
};

/**
 * Parse the content of the CHANGELOG files
 */
const parseChangelogFiles = (changelogFiles) => {
  // Convert the changelogFiles object into an array of changelog entries
  const changelogEntries = Object.entries(changelogFiles).flatMap(
    ([pkg, filePath]) => {
      const changelogFile = fs.readFileSync(filePath, "utf8");

      return parseChangelogFile(changelogFile, pkg);
    },
  );

  // Sort the changelog entries by date in descending order
  changelogEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Group the sorted changelog entries by date
  const groupedEntries = changelogEntries.reduce((acc, entry) => {
    if (!acc[entry.date]) acc[entry.date] = [];
    acc[entry.date].push(entry);

    return acc;
  }, {});

  return groupedEntries;
};

/**
 * Merge the changelog content organized by date
 */
const mergeChangelogContent = (changelogContent) => {
  return Object.entries(changelogContent).reduce((output, [date, entries]) => {
    const dateHeader = `#### _${date}_\n\n`;

    const dateEntries = entries.reduce(
      (entryOutput, { package: pkg, version, link, content }) => {
        const versionLink = link
          ? `[\`${pkg}@${version}\`](${link})`
          : `\`${pkg}@${version}\``;
        const entryContent = `### ${versionLink}\n\n${content}\n\n`;

        return entryOutput + entryContent;
      },
      "",
    );

    return output + dateHeader + dateEntries;
  }, "# Changelog\n\n");
};

/**
 * Merge all the changelog files and write the output to a file
 */
const mergeChangelogFiles = (rootDir, outputPath) => {
  const changelogFiles = findChangelogFiles(rootDir);
  const changelogContent = parseChangelogFiles(changelogFiles);
  const mergedChangelog = mergeChangelogContent(changelogContent);

  fs.writeFileSync(outputPath, mergedChangelog);
  console.log(`Changelog has been generated in '${outputPath}'`);
};

// Usage
const rootDir = process.cwd(); // Use the current working directory as the root
const outputPath = path.join(rootDir, "CHANGELOG.md");

mergeChangelogFiles(rootDir, outputPath);
