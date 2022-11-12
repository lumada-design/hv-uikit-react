import {
  HvButton,
  HvHeader,
  HvHeaderActions,
  HvHeaderBrand,
  HvHeaderNavigation,
} from "@hitachivantara/uikit-react-core";
import { Alert, Menu, User } from "@hitachivantara/uikit-react-icons";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import HitachiLogo from "../../assets/HitachiLogo";

const navigationData = [
  {
    id: "1",
    label: "Overview",
    data: [
      {
        id: "1-1",
        label: "Overview 1",
      },
      {
        id: "1-2",
        label: "Overview 2",
      },
    ],
  },
  {
    id: "2",
    label: "Events",
    href: "",
  },
  {
    id: "3",
    label: "Orders",
    data: [
      {
        id: "3-1",
        label: "Orders 1",
      },
      {
        id: "3-2",
        label: "Orders 2",
      },
    ],
  },
];

export const Header = () => {
  const [selected, setSelected] = useState<string>("2");
  const isMdUp = useMediaQuery("@media screen and (min-width: 960px)");

  const handleChange = (e, selectedItem) => {
    console.log(selectedItem);
    setSelected(selectedItem.id);
  };

  return (
    <HvHeader>
      {!isMdUp && (
        <HvButton
          variant="ghost"
          style={{ width: 32, height: 32, border: "1px solid black" }}
          onClick={() => console.log("menu")}
        >
          <Menu />
        </HvButton>
      )}
      <HvHeaderBrand logo={<HitachiLogo />} name="Lumada App" />
      {isMdUp && (
        <HvHeaderNavigation
          data={navigationData}
          selected={selected}
          onClick={handleChange}
        />
      )}
      <HvHeaderActions aria-label="My-aria-label">
        <HvButton
          onClick={() => console.log("badge")}
          aria-label="Open Notifications panel"
          variant="ghost"
        >
          <Alert />
        </HvButton>
        {isMdUp && (
          <HvButton
            onClick={() => console.log("user")}
            aria-label="Open User panel"
            variant="ghost"
          >
            <User />
          </HvButton>
        )}
      </HvHeaderActions>
    </HvHeader>
  );
};

if (process.env.NODE_ENV !== "production") {
  Header.displayName = "Header";
}
