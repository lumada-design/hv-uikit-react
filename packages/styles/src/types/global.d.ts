import { theme } from "..";

declare global {
  type Theme = typeof theme;
}
