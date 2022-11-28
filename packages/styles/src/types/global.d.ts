import { theme } from "../theme";

declare global {
  type Theme = typeof theme;
}
