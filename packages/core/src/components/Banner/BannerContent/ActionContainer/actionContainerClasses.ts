import { getClasses } from "@core/utils";

export interface HvActionContainerClasses {
  actionContainer?: string;
  closeAction?: string;
  iconContainer?: string;
  actionsInnerContainer?: string;
}

const classKeys: (keyof HvActionContainerClasses)[] = [
  "actionContainer",
  "closeAction",
  "iconContainer",
  "actionsInnerContainer",
];

const actionContainerClasses = getClasses(
  classKeys,
  "HvBanner-ActionContainer"
);

export default actionContainerClasses;
