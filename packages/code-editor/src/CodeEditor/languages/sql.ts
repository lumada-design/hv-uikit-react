import { type Monaco } from "@monaco-editor/react";
import { format, FormatOptionsWithLanguage } from "sql-formatter";

import { LanguagePlugin } from "../types";
import { sqlKeywords } from "./sqlKeywords";

// Helpful notes
// model - editor content
// position - position of the pointer

const getTablesNames = (schema: string) => {
  // Regular expression to match CREATE TABLE statements and extract table names
  const regex = /CREATE TABLE\s+(\w+)/gi;
  const tableNames = [];
  let match;

  // Use a for loop to execute the regex and push the table names to the array
  for (match = regex.exec(schema); match !== null; match = regex.exec(schema)) {
    tableNames.push(match[1]);
  }

  return tableNames;
};

const getColumnNames = (schema: string) => {
  const tableBlockRegex = /CREATE TABLE\s+\w+\s*\(([\s\S]+?)\);/gi;

  // Exclude lines that start with SQL keywords like PRIMARY, FOREIGN, CHECK
  const columnRegex = /^\s*(\w+)\s+(\w+)/gm;
  const columnNames = new Set();

  let tableMatch = tableBlockRegex.exec(schema);

  for (; tableMatch !== null; tableMatch = tableBlockRegex.exec(schema)) {
    const tableDefinition = tableMatch[1];

    const tableName = getTablesNames(tableMatch[0])[0];
    let columnMatch = columnRegex.exec(tableDefinition);

    for (
      ;
      columnMatch !== null;
      columnMatch = columnRegex.exec(tableDefinition)
    ) {
      const columnName = columnMatch[1];

      // Ignore lines starting with SQL keywords like PRIMARY, FOREIGN, etc.
      if (
        !sqlKeywords.some((keyword) =>
          keyword.startsWith(columnName.toUpperCase()),
        )
      ) {
        columnNames.add(`${tableName}.${columnName}`);
      }
    }
  }

  return Array.from(columnNames);
};

const parseErrorMessage = (errorString: string) => {
  // Define a regular expression to match the message, line, and column
  const regex = /(.*?) at line (\d+) column (\d+)/;

  // Use the regex to extract the parts of the error string
  const match = errorString.match(regex);

  if (match) {
    const res = {
      message: match[1].trim(),
      line: parseInt(match[2], 10),
      column: parseInt(match[3], 10),
    };
    return res;
  }

  // Return null if the input doesn't match the expected format
  return null;
};

/**
 * Get the last keyword entered in the query.
 */
function getLastKeyword(model: any, position: any) {
  const textUntilCursor = String(
    model.getValueInRange({
      startLineNumber: 1,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    }),
  );

  // This regex ignores punctuation and special characters
  const words = textUntilCursor.split(/[\s,.!?;:()]+/);

  for (let i = words.length - 1; i >= 0; i--) {
    let word = words[i];

    if (word === "BY" || word === "KEY" || word === "JOIN") {
      const j = i - 1;
      if (j !== -1) {
        word = `${words[j]} ${word}`;
      }
    }

    if (sqlKeywords.includes(word.toUpperCase())) {
      return word;
    }
  }

  return "";
}

/**
 * Triggers suggestions for specific cases.
 */
export const hvSqlCompletionProvider = (monaco: Monaco, schema?: string) => {
  const tablesNames = schema ? getTablesNames(schema) : [];
  const columnNames = schema ? getColumnNames(schema) : [];
  const showColumnsKeywords = [
    "SELECT",
    "WHERE",
    "ORDER BY",
    "GROUP BY",
    "HAVING",
    "DISTINCT",
    "AND",
    "OR",
  ];

  return {
    provideCompletionItems: (model: any, position: any) => {
      // If no text is typed, show a suggestion to select all columns from a table
      if (model.getValue() === "") {
        const emptySuggestions = {
          label: "SELECT * FROM",
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: "SELECT * FROM ",
          insertTextRules:
            monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        };
        return { suggestions: [emptySuggestions] };
      }

      const keywordSuggestions = sqlKeywords.map((keyword) => ({
        label: keyword,
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: keyword,
        documentation: `SQL keyword: ${keyword}`,
        sortText: "1",
      }));

      const lastKeyword = getLastKeyword(model, position);

      if (lastKeyword === "FROM" || lastKeyword.includes("JOIN")) {
        const tableSuggestions = tablesNames.map((tableName) => ({
          label: tableName,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: tableName,
          documentation: `Table name: ${tableName}`,
          sortText: "0", // Prioritize table names on the suggestions list
        }));

        // Return both table suggestions and keyword suggestions
        return { suggestions: [...tableSuggestions, ...keywordSuggestions] };
      }

      if (showColumnsKeywords.includes(lastKeyword)) {
        const columnsSuggestions = columnNames.map((columnName) => ({
          label: columnName,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: columnName,
          documentation: `Column name: ${columnName}`,
          sortText: "0", // Prioritize column names on the suggestions list
        }));

        // Return both table suggestions and keyword suggestions
        return { suggestions: [...columnsSuggestions, ...keywordSuggestions] };
      }

      return { suggestions: keywordSuggestions };
    },
  };
};

/**
 * Validates SQL and creates error markers to show on code editor.
 */
export const hvSqlValidator = async (
  content: string,
  editor: any,
  monaco: Monaco,
) => {
  const model = editor.getModel();
  try {
    format(content);
    return [];
  } catch (error) {
    const errorObj = parseErrorMessage((error as Error).message);

    return [
      {
        severity: monaco.MarkerSeverity.Error,
        message: errorObj?.message ?? "",
        startLineNumber: errorObj?.line ?? 1,
        startColumn: errorObj?.column ?? 1,
        endLineNumber: errorObj?.line ?? 1,
        endColumn: model.getLineLastNonWhitespaceColumn(errorObj?.line),
      },
    ];
  }
};

/** SQL custom options. */
export const hvSqlOptions = {};

/**
 * SQL code formatter.
 * When the code has errors, it is not formatted and the orginal code is returned.
 * @param content Current code editor content
 * @returns `string with the formatted code or `undefined`
 *
 * SQL Formatter options and demo:
 * https://www.npmjs.com/package/sql-formatter
 * https://sql-formatter-org.github.io/sql-formatter/
 */
export const hvSqlFormatter = async (
  content: string,
  options?: FormatOptionsWithLanguage,
) => {
  try {
    const formattedContent = format(content, {
      tabWidth: 2,
      indentStyle: "tabularLeft",
      ...options,
    });
    // Format only if there are no errors
    return formattedContent;
  } catch (error) {
    return content;
  }
};

export interface SqlLanguagePlugin extends LanguagePlugin {}

export const sqlLanguagePlugin: SqlLanguagePlugin = {
  completionProvider: hvSqlCompletionProvider,
  validator: hvSqlValidator,
  formatter: hvSqlFormatter,
  editorOptions: hvSqlOptions,
};
