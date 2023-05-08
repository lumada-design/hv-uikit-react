import fs from "fs";
import glob from "glob";

const exclude = [
  "Overview/",
  "Foundation/",
  "Guides/",
  "Templates/",
  "Visualizations/",
];

const codeRegex =
  /export\s*const\s*(Studio[A-Za-z0-9]*|studio[A-Za-z0-9]*)\s*=\s*\(\s*\)\s*=>\s*{[^}]*return\s*(?:\(\s*)?([^);]*)}?\s*/g;
const metadataRegex = /title:\s*"([^"]+)",\s*component:\s*([^}\s;]+)/;
const parametersREgex = /(?<=studio:\s{)[\s\S]*?(?=\})/g;

const extractMetadata = (file, regex) => {
  const metadataMatch = regex.exec(file);

  const title = metadataMatch?.[1] || "";
  const component = metadataMatch?.[2].replace(/,/g, "");

  return { title, component };
};

const extractParameters = (file, regex) => {
  const rawParameters = [...file.matchAll(regex)].map((match) =>
    // Trims any leading or trailing whitespace and removes consecutive whitespace characters,
    match[0].trim().replace(/\s\s+/g, "").split(",")
  );

  const parameters = rawParameters.map((params) =>
    params.reduce((acc, param) => {
      // Split the parameter into key and value after trimming any whitespace
      const [key, value] = param.split(":").map((str) => str.trim());
      if (value) acc[key] = value.replace(/['"]+/g, "");
      return acc;
    }, {})
  );

  return parameters;
};

const extractCodeSamples = (file, regex) => {
  let samples = [...file.matchAll(regex)].map((match) => {
    const name = match[1].replace(/studio/gi, "").replace(/([A-Z0-9])/g, " $1");
    const src = match[2].replace(/>\s+</g, "><").trim();
    return { name, src };
  });

  return samples;
};

/**
 * Loads the stories from the given paths
 */
export const loadStories = (paths) => {
  const files = paths.map((path) => glob.sync(path))[0];

  return files.reduce((acc, path) => {
    const file = fs.readFileSync(path, "utf8");

    const { title, component } = extractMetadata(file, metadataRegex);
    const parameters = extractParameters(file, parametersREgex);
    const samples = extractCodeSamples(file, codeRegex);

    const isExcluded =
      !samples.length ||
      exclude.some((str) => !title.length || title.includes(str));

    if (!isExcluded) {
      const type = title.split("/").pop()?.toLowerCase() || "";

      samples.forEach(({ name, src }, idx) => {
        const group =
          parameters[idx].group.split("/").shift()?.toLowerCase() || "";
        const category =
          parameters[idx].group.split("/").pop()?.toLowerCase() || "";

        if (!acc[group]) acc[group] = [];
        acc[group].push({ type, category, component, name, src });
        // Sort alphabetically
        acc[group].sort((a, b) => a.name.localeCompare(b.name));
      });
    }

    return acc;
  }, {});
};
