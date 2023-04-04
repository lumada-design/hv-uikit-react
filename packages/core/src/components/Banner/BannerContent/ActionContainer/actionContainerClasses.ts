import { getClasses } from "~/utils";

export type HvActionContainerClasses = {
  actionContainer?: string;
  closeAction?: string;
  iconContainer?: string;
  actionsInnerContainer?: string;
};

const classKeys: string[] = [
  "actionContainer",
  "closeAction",
  "iconContainer",
  "actionsInnerContainer",
];

const actionContainerClasses = getClasses<HvActionContainerClasses>(
  classKeys,
  "HvBanner-ActionContainer"
);

export default actionContainerClasses;
