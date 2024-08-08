import { HvColor } from "@hitachivantara/uikit-react-core";
import { IconType } from "@hitachivantara/uikit-react-icons";

export type Column = {
  id: string;
  title: string;
  color: HvColor;
  Icon: IconType;
};

export type User = {
  name: string;
  avatar: string;
};

export type Task = {
  id: string;
  columnId: Column["id"];
  title: string;
  users?: User[];
  statusLevel?: number;
};
