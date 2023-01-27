import { getClasses } from "utils";

export type HvEmptyStateClasses = {
  root?: string;
  container?: string;
  containerMessageOnly?: string;
  iconContainer?: string;
  titleContainer?: string;
  textContainer?: string;
  messageContainer?: string;
  actionContainer?: string;
};

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

export const emptyStateClasses = getClasses<HvEmptyStateClasses>(
  classKeys,
  "HvEmptyState"
);

export * from "./EmptyState";
