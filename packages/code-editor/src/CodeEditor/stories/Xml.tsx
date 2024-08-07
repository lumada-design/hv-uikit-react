import { useRef, useState } from "react";
import { css } from "@emotion/css";
import {
  HvCodeEditor,
  HvCodeEditorProps,
} from "@hitachivantara/uikit-react-code-editor";
import {
  HvButton,
  HvButtonProps,
  HvDialog,
  HvDialogContent,
  HvDialogTitle,
  HvTypography,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Code, SaveAlt } from "@hitachivantara/uikit-react-icons";

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

const classes = {
  headerRoot: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: `1px solid ${theme.colors.atmo4}`,
    borderBottom: "none",
    background: theme.colors.atmo1,
    padding: theme.spacing("xs", "sm"),
  }),
  actionContainer: css({
    display: "flex",
    alignItems: "center",
    gap: theme.space.xs,
  }),
};

const Header = ({
  onClickSearch,
  onClickTree,
}: {
  onClickSearch: HvButtonProps["onClick"];
  onClickTree: HvButtonProps["onClick"];
}) => (
  <div className={classes.headerRoot}>
    <div className={classes.actionContainer}>
      <HvTypography variant="label">XML</HvTypography>
      <Code />
    </div>
    <div className={classes.actionContainer}>
      <HvButton startIcon={<SaveAlt />}>Save</HvButton>
      <HvButton variant="primaryGhost" onClick={onClickSearch}>
        Open Search
      </HvButton>
      <HvButton variant="primaryGhost" onClick={onClickTree}>
        Show XML Tree
      </HvButton>
    </div>
  </div>
);

export const XmlStory = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  const editorRef = useRef<any>(null);

  const handleMount: HvCodeEditorProps["onMount"] = (editor) => {
    editorRef.current = editor;
  };

  const handleOpenSearch: HvButtonProps["onClick"] = () => {
    if (editorRef.current) {
      editorRef.current.getAction("actions.find").run();
    }
  };

  const renderXmlTree = () => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(value, "application/xml");

    const traverse = (node: HTMLElement | ChildNode) => {
      const structure: Record<string, object | object[] | undefined> = {};
      const { nodeName } = node;
      structure[nodeName] = undefined;
      for (const child of node.childNodes) {
        if (child.nodeType === Node.ELEMENT_NODE) {
          const childStructure = traverse(child);

          if (structure[nodeName]) {
            if (!Array.isArray(structure[nodeName])) {
              structure[nodeName] = [structure[nodeName]];
            }
            (structure[nodeName] as object[]).push(childStructure);
          } else {
            structure[nodeName] = childStructure;
          }
        }
      }
      return structure;
    };

    const tree = traverse(xmlDoc.documentElement);
    console.log(tree);
    return <p>YOO</p>;
  };

  return (
    <div>
      <Header
        onClickTree={() => setOpen(true)}
        onClickSearch={handleOpenSearch}
      />
      <HvCodeEditor
        height={270}
        language="xml"
        value={value}
        onChange={(content) => setValue(content ?? "")}
        xsdSchema={xsdSchema}
        onMount={handleMount}
      />
      {open && (
        <HvDialog
          fullWidth
          maxWidth="xl"
          open={open}
          onClose={() => setOpen(false)}
        >
          <HvDialogTitle>XML Tree Structure</HvDialogTitle>
          <HvDialogContent>{renderXmlTree()}</HvDialogContent>
        </HvDialog>
      )}
    </div>
  );
};
