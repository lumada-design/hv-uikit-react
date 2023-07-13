import { getClasses } from "@core/utils/classes";

export interface HvEmptyStateClasses {
  root?: string;
  container?: string;
  containerMessageOnly?: string;
  iconContainer?: string;
  titleContainer?: string;
  textContainer?: string;
  messageContainer?: string;
  actionContainer?: string;
}

const classKeys: (keyof HvEmptyStateClasses)[] = [
  "root",
  "container",
  "containerMessageOnly",
  "iconContainer",
  "titleContainer",
  "textContainer",
  "messageContainer",
  "actionContainer",
];

const emptyStateClasses = getClasses(classKeys, "HvEmptyState");

export default emptyStateClasses;
