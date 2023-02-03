import { getClasses } from "utils";

export type HvFileUploaderPreviewClasses = {
  previewButton?: string;
  overlay?: string;
};

const classKeys: string[] = ["previewButton", "overlay"];

const fileUploaderPreviewClasses = getClasses<HvFileUploaderPreviewClasses>(
  classKeys,
  "HvFileUploaderPreview"
);

export default fileUploaderPreviewClasses;
