import { getClasses } from "@core/utils";

export interface HvDropZoneClasses {
  dropZoneContainer?: string;
  dropZoneLabelsGroup?: string;
  dragAction?: string;
  dropZoneContainerDisabled?: string;
  inputArea?: string;
  dropArea?: string;
  dropZoneAreaLabels?: string;
  dropZoneAreaIcon?: string;
  dropZoneLabel?: string;
  dragText?: string;
  selectFilesText?: string;
}

const classKeys: (keyof HvDropZoneClasses)[] = [
  "dropZoneContainer",
  "dropZoneLabelsGroup",
  "dragAction",
  "dropZoneContainerDisabled",
  "inputArea",
  "dropArea",
  "dropZoneAreaLabels",
  "dropZoneAreaIcon",
  "dropZoneLabel",
  "dragText",
  "selectFilesText",
];

const dropZoneClasses = getClasses(classKeys, "HvDropZone");

export default dropZoneClasses;
