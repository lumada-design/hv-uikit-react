import { defineConfig, type Preset } from "unocss";
import { presetHv } from "@hitachivantara/uikit-uno-preset";

export default defineConfig({
  presets: [presetHv() as Preset],
});
