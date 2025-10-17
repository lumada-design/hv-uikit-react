export interface HvPopperMenuItem {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>, id: string) => void;
}

export interface HvPopperMenuGroup {
  title?: string;
  items: HvPopperMenuItem[];
  type?: "default" | "checkbox" | "radio" | "switch";
}

export type HvPopperMenuItems = HvPopperMenuGroup[] | HvPopperMenuItem[];
