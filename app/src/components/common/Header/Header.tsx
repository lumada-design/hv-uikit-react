import { useContext, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";
import { Menu } from "@hitachivantara/uikit-react-icons";
import {
  HvHeader,
  HvHeaderBrand,
  HvHeaderActions,
  HvHeaderNavigation,
  HvButton,
} from "@hitachivantara/uikit-react-core";

import HitachiLogo from "assets/HitachiLogo";
import { NavigationContext } from "lib/context/NavigationContext";
import navigation from "lib/navigation";
import { ThemeSwitcher } from "../../common/ThemeSwitcher";

export const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { activePath } = useContext(NavigationContext);

  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  const handleChange = (event: MouseEvent, selection: any): void => {
    if (selection.path) navigate(selection.path);
  };

  return (
    <HvHeader>
      {!isMdUp && (
        <div>
          <HvButton variant="primaryGhost" icon>
            <Menu />
          </HvButton>
        </div>
      )}

      <HvHeaderBrand
        logo={<HitachiLogo style={{ width: 72, height: 20 }} />}
        name={!isXs ? "Lumada App" : undefined}
      />

      {isMdUp && (
        <HvHeaderNavigation
          data={navigation}
          selected={activePath?.id}
          onClick={handleChange}
        />
      )}

      {isMdUp && (
        <HvHeaderActions>
          <ThemeSwitcher />
        </HvHeaderActions>
      )}
    </HvHeader>
  );
};
