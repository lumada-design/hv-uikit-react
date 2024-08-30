export default {
  format: "text",
  report: "detailed",
  allow: [
    "Apache-2.0",
    "BlueOak-1.0.0",
    "0BSD",
    "BSD-2-Clause",
    "BSD-3-Clause",
    "CC-BY-3.0",
    "CC-BY-4.0",
    "CC0-1.0",
    "EPL-2.0",
    "Hippocratic-2.1",
    "ISC",
    "MIT",
    "MPL-2.0",
    "Python-2.0",
    "Unlicense",
    "W3C",
    "Zlib",
  ],
  exclude: [
    "browser-assert", // MIT: https://github.com/socialally/browser-assert/pull/1
    "flatbuffers", // Apache-2.0: https://github.com/google/flatbuffers
    "gitconfiglocal", // BSD-3: https://github.com/soldair/node-gitconfiglocal/pull/13
  ],
};
