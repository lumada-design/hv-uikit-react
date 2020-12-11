/* eslint-disable no-alert */
import * as React from "react";

import CodeEditor from "../CodeEditor";
import { HvButton } from "@hv/uikit-react-core/dist";
import HvSlider from "../../Slider/index";

export default {
  title: "Lab/CodeEditor",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvCodeEditor } from '@hv/uikit-react-lab/dist'",
    maturityStatus: "immature",
    dsVersion: "3.2.1",
  },
  component: CodeEditor,
  decorators: [(storyFn) => <div style={{ height: "270px" }}>{storyFn()}</div>],
};

// const defaultValueJson =
//   '{\r\n    "glossary": {\r\n        "title": "example glossary",\r\n\t\t"GlossDiv": {\r\n            "title": "S",\r\n\t\t\t"GlossList": {\r\n                "GlossEntry": {\r\n                    "ID": "SGML",\r\n\t\t\t\t\t"SortAs": "SGML",\r\n\t\t\t\t\t"GlossTerm": "Standard Generalized Markup Language",\r\n\t\t\t\t\t"Acronym": "SGML",\r\n\t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n\t\t\t\t\t"GlossDef": {\r\n                        "para": "A meta-markup language, used to create markup languages such as DocBook.",\r\n\t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n                    },\r\n\t\t\t\t\t"GlossSee": "markup"\r\n                }\r\n            }\r\n        }\r\n    }\r\n}';
const defaultValueYaml =
  'affinity: {}\nconfiguration:\n  helm: defaultTimeoutSeconds=120\nenv:\n  debug: "true"\n  hostname: foo.bar.com\nfullnameOverride: mySolution\nimage:\n  pullPolicy: IfNotPresent\n repository: foo.bar.com:5000/app\n';

// export const Main = () => (
//   <HvCodeEditor
//     options={{
//       dimension: {
//         height: 270,
//       },
//     }}
//     editorProps={{
//       language: "json",
//     }}
//     onChange={(input) => console.log(input)}
//     value={defaultValueJson}
//   />
// );

// export const Main = () => <div>Stuff</div>;
export const Main = () => <CodeEditor />;
// export const Main = () => {
//   const knobPropertiesDefaults = [10, 20, 30, 40, 100];

//   const knobProperties = [
//     {
//       color: "#72cccb",
//       dragColor: "#96d9d8",
//       trackColor: "#72cccb",
//     },
//     {
//       color: "#f9dc37",
//       dragColor: "#fbe56a",
//       trackColor: "#f9dc37",
//     },
//     {
//       color: "#ff9100",
//       dragColor: "#ffa733",
//       trackColor: "#ff9100",
//     },
//     {
//       color: "#cc0000",
//       dragColor: "#ff0000",
//       trackColor: "#cc0000",
//     },
//     {
//       color: "#cc0000",
//       trackColor: "#cc0000",
//       fixed: true,
//       hidden: true,
//     },
//   ];

//   const formatMark = (mark) => `${mark}%`;

//   return (
//     <HvSlider
//       formatMark={formatMark}
//       divisionQuantity={100}
//       minPointValue={0}
//       maxPointValue={100}
//       markStep={10}
//       defaultValues={knobPropertiesDefaults}
//       knobProperties={knobProperties}
//     />
//   );
// };

export const YamlEditor = () => {
  return (
    <div>Old</div>
    // <CodeEditor
    //   options={{
    //     dimension: {
    //       height: 270,
    //     },
    //   }}
    //   editorProps={{}}
    //   language={"yaml"}
    //   onChange={(input) => console.log(input)}
    //   value={defaultValueYaml}
    // />
  );
};

// YamlEditor.story = {
//   parameters: {
//     docs: {
//       storyDescription: "Yaml editor",
//     },
//   },
// };
