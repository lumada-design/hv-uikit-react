import { ReactNode } from "react";

export type CreateNewContentAction = {
  id: string;
  ordinal?: number;
  label: string;
  icon?: ReactNode;
  onAction: () => void;
};

export type UseCreateNewContentAction = () =>
  | CreateNewContentAction
  | undefined;
