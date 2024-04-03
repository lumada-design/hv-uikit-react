import {
  HvAtmosphereColorKeys,
  HvSemanticColorKeys,
} from "@hitachivantara/uikit-react-core";

export type Column = {
  id: string;
  title: string;
  color?: "sema0" | HvSemanticColorKeys | HvAtmosphereColorKeys;
  icon?: React.ReactNode;
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
