import { getClasses } from "utils";

export type HvDropZoneClasses = {
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
};

const classKeys: string[] = [
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

const dropZoneClasses = getClasses<HvDropZoneClasses>(classKeys, "HvDropZone");

export default dropZoneClasses;
