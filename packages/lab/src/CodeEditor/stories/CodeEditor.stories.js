/* eslint-disable no-alert */
import * as React from "react";

import HvCodeEditor from "../CodeEditor";

export default {
  title: "Lab/CodeEditor",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvCodeEditor } from "@hitachivantara/uikit-react-lab";',
  },
  component: HvCodeEditor,
  decorators: [(storyFn) => <div style={{ height: "270px" }}>{storyFn()}</div>],
};

const defaultValueJson =
  '{\r\n    "glossary": {\r\n        "title": "example glossary",\r\n\t\t"GlossDiv": {\r\n            "title": "S",\r\n\t\t\t"GlossList": {\r\n                "GlossEntry": {\r\n                    "ID": "SGML",\r\n\t\t\t\t\t"SortAs": "SGML",\r\n\t\t\t\t\t"GlossTerm": "Standard Generalized Markup Language",\r\n\t\t\t\t\t"Acronym": "SGML",\r\n\t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n\t\t\t\t\t"GlossDef": {\r\n                        "para": "A meta-markup language, used to create markup languages such as DocBook.",\r\n\t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n                    },\r\n\t\t\t\t\t"GlossSee": "markup"\r\n                }\r\n            }\r\n        }\r\n    }\r\n}';
const defaultValueYaml =
  'affinity: {}\nconfiguration:\n  helm: defaultTimeoutSeconds=120\nenv:\n  debug: "true"\n  hostname: foo.bar.com\nfullnameOverride: mySolution\nimage:\n  pullPolicy: IfNotPresent\n repository: foo.bar.com:5000/app\n';

export const Main = () => (
  <HvCodeEditor
    options={{
      dimension: {
        height: 270,
      },
    }}
    editorProps={{
      language: "json",
    }}
    onChange={(input) => console.log(input)}
    value={defaultValueJson}
  />
);

export const YamlEditor = () => {
  return (
    <HvCodeEditor
      options={{
        dimension: {
          height: 270,
        },
      }}
      editorProps={{}}
      language="yaml"
      onChange={(input) => console.log(input)}
      value={defaultValueYaml}
    />
  );
};

YamlEditor.story = {
  parameters: {
    docs: {
      storyDescription: "Yaml editor",
    },
  },
};
