import { getClasses } from "@core/utils";

export interface HvMessageContainerClasses {
  iconContainer?: string;
  message?: string;
  actionMessageContainer?: string;
}

const classKeys: (keyof HvMessageContainerClasses)[] = [
  "iconContainer",
  "message",
  "actionMessageContainer",
];

const messageContainerClasses = getClasses(
  classKeys,
  "HvBanner-MessageContainer"
);

export default messageContainerClasses;
