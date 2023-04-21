import { getClasses } from "@core/utils";

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

const classKeys: string[] = [
  "root",
  "container",
  "containerMessageOnly",
  "iconContainer",
  "titleContainer",
  "textContainer",
  "messageContainer",
  "actionContainer",
];

const emptyStateClasses = getClasses<HvEmptyStateClasses>(
  classKeys,
  "HvEmptyState"
);

export default emptyStateClasses;
