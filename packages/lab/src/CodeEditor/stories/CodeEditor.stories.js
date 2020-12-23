/* eslint-disable no-alert */
import React, { useState } from "react";
import HvCodeEditor from "../CodeEditor";

export default {
  title: "Lab/CodeEditor",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvCodeEditor } from '@hv/uikit-react-lab/dist'",
    maturityStatus: "immature",
    dsVersion: "3.2.1",
  },
  component: HvCodeEditor,
  decorators: [(storyFn) => <div style={{ height: "270px" }}>{storyFn()}</div>],
};

const defaultValueYaml =
  'affinity: {}\nconfiguration:\n  helm: defaultTimeoutSeconds=120\nenv:\n  debug: "true"\n  hostname: foo.bar.com\nfullnameOverride: mySolution\nimage:\n  pullPolicy: IfNotPresent\n repository: foo.bar.com:5000/app\n';

export const Main = () => {
  const defaultValueJson = `{
    "glossary": {
      "title": "example glossary",
      "GlossDiv": {
        "title": "S",
        "GlossList": {   
          "GlossEntry": {                    
            "ID": "SGML",
            "SortAs": "SGML",
            "GlossTerm": "Standard Generalized Markup Language",
            "Acronym": "SGML",
            "Abbrev": "ISO 8879:1986",
            "GlossDef": {                        
              "para": "A meta-markup language, used to create markup languages such as DocBook.",
              "GlossSeeAlso": ["GML", "XML"]                    
            },
            "GlossSee": "markup"                
          }            
        }        
      }    
    }
  }`;

  const [editorContent, setEditorContent] = useState(defaultValueJson);

  return (
    <HvCodeEditor
      options={{
        dimension: {
          height: 500,
        },
      }}
      editorProps={{
        language: "json",
      }}
      onChange={(input) => {
        setEditorContent(input);
      }}
      value={editorContent}
    />
  );
};

Main.story = {
  parameters: {
    pa11y: {
      disable: true,
    },
  },
};

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
    pa11y: {
      disable: true,
    },
  },
};
