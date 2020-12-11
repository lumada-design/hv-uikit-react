/* eslint-disable no-alert */
import * as React from "react";

import CodeEditor from "../CodeEditor";

import {
  Main as MainSample,
  YamlEditor as YamlSample,
} from "../../../../codeEditor/src/CodeEditor/stories/CodeEditor.stories";

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

export const Main = () => <MainSample />;

export const YamlEditor = () => <YamlSample />;
