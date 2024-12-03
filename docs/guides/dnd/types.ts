export type Column = {
  id: string;
  title?: string;
};

export type Item = {
  id: string;
  columnId?: Column["id"];
  title?: string;
  icon?: React.ReactNode;
};
