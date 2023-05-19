import { HvDropDownMenu } from "@hitachivantara/uikit-react-core";
import { Calendar, Plane, User } from "@hitachivantara/uikit-react-icons";

export const DropDownMenu = () => {
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
        expanded
        dataList={[
          { label: "Label 1", icon: iconSelectedColor(User) },
          { label: "Label 2", icon: iconSelectedColor(Calendar) },
          { label: "Label 3", icon: iconSelectedColor(Plane) },
        ]}
      />
    </div>
  );
};
