import { HvDropDownMenu } from "@hitachivantara/uikit-core";
import { Calendar, Plane, User } from "@hitachivantara/uikit-icons";
import { useState } from "react";

export const DropDownMenu = () => {
  const [open, setOpen] = useState<boolean>(false);
  const iconSelectedColor =
    (Icon) =>
    ({ isSelected }) =>
      <Icon color={isSelected ? "atmo1" : undefined} />;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 300,
      }}
    >
      <HvDropDownMenu
        expanded={open}
        dataList={[
          { label: "Label 1", icon: iconSelectedColor(User) },
          { label: "Label 2", icon: iconSelectedColor(Calendar) },
          { label: "Label 3", icon: iconSelectedColor(Plane) },
        ]}
        onToggle={() => setOpen((o) => !o)}
      />
    </div>
  );
};
