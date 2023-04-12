import { getClasses } from "~/utils";

export interface HvMessageContainerClasses {
  iconContainer?: string;
  message?: string;
  actionMessageContainer?: string;
}

const classKeys: string[] = [
  "iconContainer",
  "message",
  "actionMessageContainer",
];

const messageContainerClasses = getClasses<HvMessageContainerClasses>(
  classKeys,
  "HvBanner-MessageContainer"
);

export default messageContainerClasses;
