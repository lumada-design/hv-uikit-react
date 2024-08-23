import { type Monaco } from "@monaco-editor/react";
import { validateXML } from "xmllint-wasm";

// Helpful notes
// model - editor content
// position - position of the pointer

type Elements = Record<string, string[] | undefined>; // element name (key) / attributes (value)

/**
 * Gets elements and their attributes from XSD schema.
 */
const getXsdElementsAndAttributes = (value: string): Elements => {
  const elements: Elements = {};
  try {
    // Parse XSD schema string into a DOM object
    const parser = new DOMParser();
    const schemaDoc = parser.parseFromString(value, "application/xml");

    // Get all elements and their attributes
    for (const element of schemaDoc.getElementsByTagName("xs:element")) {
      const elementName = element.getAttribute("name");
      if (elementName) {
        const attributes = element.getElementsByTagName("xs:attribute");
        if (attributes && attributes.length > 0) {
          const elementAttributes = [];
          for (const attribute of attributes) {
            const attributeName = attribute.getAttribute("name");
            if (attributeName) elementAttributes.push(attributeName);
          }
          elements[elementName] = elementAttributes;
        } else elements[elementName] = undefined;
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    if (import.meta.env.DEV) console.error(error);
  }
  return elements;
};

/**
 * Gets the last opened (but not closed) tag to suggest attributes
 * Source code from: https://mono.software/2017/04/11/custom-intellisense-with-monaco-editor/
 */
const getLastOpenedTag = (content: string) => {
  // Get all tags inside of the content
  const tags = content.match(/<\/*(?=\S*)([a-zA-Z-]+)/g);
  if (!tags) return undefined;

  // Find closed tags
  const closingTags = [];

  for (let i = tags.length - 1; i >= 0; i--) {
    if (tags[i].indexOf("</") === 0) {
      // It's a closing tag since it's beginning with "</"
      closingTags.push(tags[i].substring("</".length));
    } else {
      // Get the last position of the tag
      const tagPosition = content.lastIndexOf(tags[i]);
      const tag = tags[i].substring("<".length);

      // Looking if it's self closing
      const closingBracketIdx = content.indexOf("/>", tagPosition);

      if (closingBracketIdx === -1) {
        // If there are no closing tags or the current tag wasn't closed
        if (
          !closingTags.length ||
          closingTags[closingTags.length - 1] !== tag
        ) {
          // Last open tag found
          content = content.substring(tagPosition);
          return content.indexOf(">") === -1 ? tag : undefined;
        }

        // Remove the last closed tag since it
        closingTags.splice(closingTags.length - 1, 1);
      }

      // Remove the last closed tag and continue processing the rest of the content
      content = content.substring(0, tagPosition);
    }
  }
};

/**
 * Triggers suggestions for specific cases.
 */
export const getXmlCompletionProvider = (monaco: Monaco, schema?: string) => {
  const elements = schema ? getXsdElementsAndAttributes(schema) : undefined;
  const root = elements ? Object.keys(elements)[0] : undefined;
  const emptySuggestions = root
    ? [
        /** Add root element to the editor */
        {
          label: "Insert root element",
          kind: monaco.languages.CompletionItemKind.Snippet,
          // eslint-disable-next-line no-template-curly-in-string
          insertText: `<${root}>\n\t${"${0:}"}\n</${root}>`, // ${0:} used to position the cursor
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        },
      ]
    : [];

  return {
    triggerCharacters: ["<"],
    provideCompletionItems: (model: any, position: any) => {
      // Suggestions to show when there's nothing written (by using keys or typing a trigger characters)
      const fullContent = model.getValue();
      if (!String(fullContent).trim()) {
        return {
          suggestions: emptySuggestions.map((sug) => ({
            ...sug,
            range: {
              startLineNumber: 1,
              startColumn: 1,
              endLineNumber: 1,
              endColumn: 1,
            },
          })),
        };
      }

      const suggestions: object[] = [];
      const lastWordWritten = model.getWordUntilPosition(position);

      // Suggestions to show when opening a tag (by typing "<")
      const lastTypedChar = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: position.column - 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column,
      });
      if (lastTypedChar === "<" && elements) {
        suggestions.push(
          ...Object.keys(elements).map((element) => ({
            label: element,
            kind: monaco.languages.CompletionItemKind.Field,
            insertText: element,
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column,
            },
          })),
        );
      }

      // Suggestions to show when looking for attributes in a tag (by using keys)
      const textUntilCursor = String(
        model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column,
        }),
      );
      const lastOpenedTag = getLastOpenedTag(textUntilCursor);
      if (
        lastOpenedTag &&
        elements?.[lastOpenedTag] &&
        elements[lastOpenedTag]!.length > 0
      ) {
        const attrs = lastWordWritten.word
          ? elements[lastOpenedTag]!.filter((attr) =>
              attr.startsWith(lastWordWritten.word),
            )
          : elements[lastOpenedTag];

        suggestions.push(
          ...attrs!.map((atr) => ({
            label: atr,
            kind: monaco.languages.CompletionItemKind.Field,
            // eslint-disable-next-line no-template-curly-in-string
            insertText: `${atr}="${"${0:}"}"`, // ${0:} used to position the cursor
            insertTextRules:
              monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            range: {
              startLineNumber: position.lineNumber,
              startColumn: lastWordWritten.startColumn,
              endLineNumber: position.lineNumber,
              endColumn: lastWordWritten.endColumn,
            },
          })),
        );
      }

      return {
        suggestions,
      };
    },
  };
};

/**
 * Validates XML with XSD schema and create error markers to show on code editor.
 */
export const getXmlValidationMarkers = async (
  content: string,
  editor: any,
  monaco: Monaco,
  schema = "",
) => {
  const model = editor.getModel();

  try {
    const validation = await validateXML({ xml: content, schema });
    if (!validation.valid) {
      return validation.errors.map((error) => {
        return {
          severity: monaco.MarkerSeverity.Error,
          message: error.message,
          startLineNumber: error.loc?.lineNumber ?? 1,
          startColumn:
            model.getLineFirstNonWhitespaceColumn(error.loc?.lineNumber) ?? 1,
          endLineNumber: error.loc?.lineNumber ?? 1,
          endColumn:
            model.getLineLastNonWhitespaceColumn(error.loc?.lineNumber) ?? 1,
        };
      });
    }
  } catch (error: any) {
    const value = model.getValue();
    if (!String(value).trim()) return [];

    const errors = String(error?.message).split("parser error :");
    const lastError = errors[errors.length - 1].trim();
    const lineNumberParts = lastError.match(/(line) ([0-9]+)/);
    const errorLine = Number(lineNumberParts?.[2]) ?? 1;
    const cleanedError = lastError.replace(lineNumberParts?.[0] ?? "", "");

    return [
      {
        severity: monaco.MarkerSeverity.Error,
        message: cleanedError,
        startLineNumber: errorLine,
        startColumn: model.getLineFirstNonWhitespaceColumn(errorLine) ?? 1,
        endLineNumber: errorLine,
        endColumn: model.getLineLastNonWhitespaceColumn(errorLine) ?? 1,
      },
    ];
  }
  return [];
};

/**
 * Auto-completes a tag when closing it: writing ">" after "<root" will automatically add "</root>"
 * Source code from: https://github.com/microsoft/monaco-editor/issues/221
 */
export const handleXmlKeyDown = (event: any, editor: any, monaco: Monaco) => {
  if (event.browserEvent.key === ">") {
    const model = editor.getModel();
    const edits: any[] = [];
    const selections: any[] = [];

    for (const selection of editor.getSelections()) {
      // Shift the selection over by one to account for the new character
      selections.push(
        new monaco.Selection(
          selection.selectionStartLineNumber,
          selection.selectionStartColumn + 1,
          selection.endLineNumber,
          selection.endColumn + 1,
        ),
      );

      // Line before the cursor
      const lineBeforeChange = model.getValueInRange({
        startLineNumber: selection.endLineNumber,
        startColumn: 1,
        endLineNumber: selection.endLineNumber,
        endColumn: selection.endColumn,
      });

      // Look for the tag we are currently closing
      const tag = String(lineBeforeChange).match(
        /<([\w-]+)(?![^>]*\/>)[^>]*$/,
      )?.[1];
      if (tag) {
        // Add the closing tag
        edits.push({
          range: {
            startLineNumber: selection.endLineNumber,
            startColumn: selection.endColumn + 1,
            endLineNumber: selection.endLineNumber,
            endColumn: selection.endColumn + 1,
          },
          text: `</${tag}>`,
        });
      }
    }

    // Wait for next tick to being an invalid operation
    setTimeout(() => {
      editor.executeEdits(model.getValue(), edits, selections);
    }, 0);
  }
};

/** XML custom options. */
export const xmlOptions = {
  formatOnType: true,
  formatOnPaste: true,
  autoClosingBrackets: false,
  tabSize: 2,
  autoIndent: "full",
};
