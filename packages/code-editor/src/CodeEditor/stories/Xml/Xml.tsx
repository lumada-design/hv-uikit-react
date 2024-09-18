import { useRef, useState } from "react";
import {
  HvCodeEditor,
  HvCodeEditorProps,
} from "@hitachivantara/uikit-react-code-editor";
import {
  HvButtonProps,
  HvDialog,
  HvDialogContent,
  HvDialogTitle,
  HvTreeView,
} from "@hitachivantara/uikit-react-core";

// The code for these utils can be found at: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/code-editor/src/CodeEditor/stories/Xml/utils.tsx
import { Attributes, buildTree, Header, renderItem, Tree } from "./utils";

const xsdSchema = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"
           elementFormDefault="qualified"
           attributeFormDefault="unqualified">
  <xs:element name="library">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="book" maxOccurs="unbounded">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="title" type="xs:string" minOccurs="1" />
              <xs:element name="author" type="xs:string" minOccurs="1" />
              <xs:element name="year" type="xs:integer" minOccurs="0" />
              <xs:element name="genre" type="xs:string" minOccurs="0" />
            </xs:sequence>
            <xs:attribute name="isbn" type="xs:string" use="required" />
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>
</xs:schema>`;

const defaultValue = `<library>
    <book isbn="123-0-456-0-789">
        <title>Demon Copperhead</title>
        <author>Barbara Kingsolver</author>
        <year>2022</year>
        <genre>Historical Fiction</genre>
    </book>
    <book isbn="987-0-654-0-321">
        <title>Assassin's Apprentice</title>
        <author>Robin Hobb</author>
        <year>1995</year>
        <genre>Fantasy</genre>
    </book>
</library>`;

export const XmlStory = () => {
  const [opened, setOpened] = useState(false);
  const [editorValue, setEditorValue] = useState(defaultValue);
  const [xmlTree, setXmlTree] = useState<{
    tree: Tree;
    attributes: Attributes;
  }>();
  const [defaultExpandedKeys, setDefaultExpandedKeys] = useState<string[]>([]);

  const editorRef = useRef<any>(null);

  const handleMount: HvCodeEditorProps["onMount"] = (editor) => {
    editorRef.current = editor;
  };

  const handleOpenSearch: HvButtonProps["onClick"] = () => {
    editorRef.current?.getAction("actions.find").run();
  };

  const handleClickTree: HvButtonProps["onClick"] = () => {
    const { tree, attributes, keys } = buildTree(editorValue);
    setXmlTree({
      tree,
      attributes,
    });
    setDefaultExpandedKeys(keys);
    setOpened(true);
  };

  return (
    <div>
      <Header onClickTree={handleClickTree} onClickSearch={handleOpenSearch} />
      <HvCodeEditor
        height={270}
        language="xml"
        value={editorValue}
        onChange={(content) => setEditorValue(content ?? "")}
        xsdSchema={xsdSchema}
        onMount={handleMount}
      />
      <HvDialog
        fullWidth
        maxWidth="sm"
        open={opened}
        onClose={() => setOpened(false)}
      >
        <HvDialogTitle>XML Tree Structure</HvDialogTitle>
        <HvDialogContent>
          {xmlTree?.tree && (
            <HvTreeView
              defaultExpanded={defaultExpandedKeys}
              disableSelection
              aria-label="XML tree structure"
            >
              {Object.entries(xmlTree.tree).map(([key, value]) =>
                renderItem(key, value, xmlTree.attributes),
              )}
            </HvTreeView>
          )}
        </HvDialogContent>
      </HvDialog>
    </div>
  );
};
