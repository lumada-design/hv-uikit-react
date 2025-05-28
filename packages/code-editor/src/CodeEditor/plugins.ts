import { sqlLanguagePlugin } from "./languages/sql";
import { xmlLanguagePlugin } from "./languages/xml";
import { LanguagePlugin } from "./types";

/**
 * Language plugins supported by the `CodeEditor`
 * @internal
 */
export const hvLanguagePlugins: Record<string, LanguagePlugin> = {
  xml: xmlLanguagePlugin,
  sql: sqlLanguagePlugin,
};
