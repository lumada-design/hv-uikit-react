import { Meta, StoryObj } from "@storybook/react";
import {
  HvCodeEditor,
  HvCodeEditorProps,
} from "@hitachivantara/uikit-react-code-editor";

import { CustomPluginStory } from "./stories/CustomPlugin";
import CustomPluginStoryRaw from "./stories/CustomPlugin/CustomPlugin?raw";
import { MainStory } from "./stories/Main";
import MainStoryRaw from "./stories/Main?raw";
import { SqlStory } from "./stories/Sql";
import SqlStoryRaw from "./stories/Sql/Sql?raw";
import { XmlStory } from "./stories/Xml";
import XmlStoryRaw from "./stories/Xml/Xml?raw";
import { setupChromatic } from ".storybook/setupChromatic";

const meta: Meta<typeof HvCodeEditor> = {
  title: "Widgets/Code Editor",
  component: HvCodeEditor,
};
export default meta;

export const Main: StoryObj<HvCodeEditorProps> = {
  parameters: {
    docs: {
      source: { code: MainStoryRaw },
    },
    ...setupChromatic(["DS5 dawn"], 5000),
  },
  render: () => <MainStory />,
};

export const YamlEditor: StoryObj<HvCodeEditorProps> = {
  parameters: {
    docs: {
      description: {
        story: "Yaml editor.",
      },
    },
  },
  render: () => {
    const defaultValueYaml =
      'affinity: {}\nconfiguration:\n  helm: defaultTimeoutSeconds=120\nenv:\n  debug: "true"\n  hostname: foo.bar.com\nfullnameOverride: mySolution\nimage:\n  pullPolicy: IfNotPresent\n repository: foo.bar.com:5000/app\n';

    return (
      <HvCodeEditor height={270} language="yaml" value={defaultValueYaml} />
    );
  },
};

export const XMLEditor: StoryObj<HvCodeEditorProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "XML is one of the languages supported, and it can be enabled by setting the `language` property to `xml`. A XML schema can also be provided through the `schema` property. By providing a XML schema, the XML written will be validated against the schema showing errors. Providing a schema will also enable the code editor to show suggestions when opening a tag (`<`), writing an attribute, and when clicking on the CTRL and SPACE keys at the same time. By default, the XML code editor is formatted automatically. The property `disableAutoFormat` can be set to `true` to disable this behavior. You can also format manually the code using the `hvXmlFormatter` util.",
      },
      source: { code: XmlStoryRaw },
    },
  },
  render: () => <XmlStory />,
};

export const SQLEditor: StoryObj<HvCodeEditorProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "SQL is one of the languages supported, and it can be enabled by setting the `language` property to `sql`. A SQL schema can also be provided through the `schema` property. Providing a SQL schema will enable the code editor to show suggestions when writing the query, and when clicking on the CTRL and SPACE keys at the same time.",
      },
      source: { code: SqlStoryRaw },
    },
  },
  render: () => <SqlStory />,
};

export const CustomPlugin: StoryObj<HvCodeEditorProps> = {
  parameters: {
    docs: {
      description: {
        story:
          "A Code Editor with a custom language plugin that extends the Code Editor's own XML language plugin to show different suggestions and format the code differently.",
      },
      source: { code: CustomPluginStoryRaw },
    },
  },
  render: () => <CustomPluginStory />,
};
