import { extractProps } from "./extractProps";

export const extractArgTypes = (component) => {
  if (component) {
    const { sections } = extractProps(component);

    if (!sections) {
      return null;
    }

    const acc = {};

    Object.keys(sections).forEach((section) => {
      const rows = sections[section];

      if (rows) {
        return rows.forEach((row) => {
          const { type, sbType, defaultValue: defaultSummary, jsDocTags, required } = row;
          let defaultValue = defaultSummary && (defaultSummary.detail || defaultSummary.summary);
          try {
            // eslint-disable-next-line no-eval
            defaultValue = eval(defaultValue);
            // eslint-disable-next-line no-empty
          } catch {}

          acc[`${section}_${row.name}`] = {
            ...row,
            defaultValue,
            type: { required, ...sbType },
            table: {
              type,
              jsDocTags,
              defaultValue: defaultSummary,
              category: section,
            },
          };
        });
      }
    });

    return acc;
  }

  return null;
};
