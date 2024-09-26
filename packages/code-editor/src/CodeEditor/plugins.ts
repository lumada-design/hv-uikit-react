import { sqlLanguagePlugin } from "./languages/sql";
import { xmlLanguagePlugin } from "./languages/xml";
import { LanguagePlugin } from "./types";

/**
 * @internal
 * Language plugins supported by the `CodeEditor`
 */
export const hvLanguagePlugins: Record<string, LanguagePlugin> = {
  xml: xmlLanguagePlugin,
  sql: sqlLanguagePlugin,
};
