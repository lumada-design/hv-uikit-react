import componentDefinitions from "../ComponentVersioningTable/versions";

const notAvailable = componentDefinitions.notApplicable;
const dsVersion1 = componentDefinitions.dsVersion1;
const dsVersion3 = componentDefinitions.dsVersion3;

const CodeEditorComponentData = [
  {
    id: 1,
    component: "Code Editor",
    path:
      "https://github.com/lumada-design/hv-uikit-react/tree/master/packages/code-editor/src/CodeEditor",
    uikitVersion3: dsVersion3,
    status: "stable",
    uikitVersion2: notAvailable,
  },
];

export default CodeEditorComponentData;
