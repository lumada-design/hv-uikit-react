import { basename } from "path";

export default {
  process(sourceText, sourcePath) {
    return {
      code: `module.exports = ${JSON.stringify(basename(sourcePath))};`,
    };
  },
};
