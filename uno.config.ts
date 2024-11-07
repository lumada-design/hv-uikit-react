import { defineConfig, presetIcons } from "unocss";
import { presetHv } from "@hitachivantara/uikit-uno-preset";

export default defineConfig({
  presets: [presetHv(), presetIcons()],
});
