import { getClasses } from "@core/utils/classes";

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
