import { getClasses } from "@core/utils";

export interface HvFileUploaderPreviewClasses {
  previewButton?: string;
  overlay?: string;
}

const classKeys: (keyof HvFileUploaderPreviewClasses)[] = [
  "previewButton",
  "overlay",
];

const fileUploaderPreviewClasses = getClasses(
  classKeys,
  "HvFileUploaderPreview"
);

export default fileUploaderPreviewClasses;
