import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  HvButton,
  HvHeader,
  HvHeaderActions,
  HvHeaderBrand,
  HvHeaderNavigation,
  HvIconButton,
} from "@hitachivantara/uikit-react-core";
import { Menu } from "@hitachivantara/uikit-react-icons";

import logo from "~/assets/logo.png";
import { useGeneratorContext } from "~/generator/GeneratorContext";
import { useNavigationContext } from "~/lib/context/navigation";
import navigation from "~/lib/navigation";

export const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { activePath } = useNavigationContext();
  const { setOpen, open, setTutorialOpen } = useGeneratorContext();

  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  const handleChange = (event: React.MouseEvent, selection: any): void => {
    if (selection.path) navigate(selection.path);
  };

  const handleOpenTutorial = () => {
    navigate("/");
    setTutorialOpen?.(true);
  };

  return (
    <HvHeader
      position="fixed"
      style={{
        width: open ? "calc(100% - 390px)" : "100%",
        left: 0,
      }}
    >
      <HvHeaderBrand
        logo={<img src={logo} style={{ height: 20 }} alt="logo" />}
        name={!isXs ? "Showroom" : undefined}
      />

      <HvHeaderNavigation
        data={navigation}
        selected={activePath?.id}
        onClick={handleChange}
      />

      <HvHeaderActions>
        <HvButton
          variant="secondaryGhost"
          onClick={handleOpenTutorial}
          style={{ padding: 10 }}
        >
          TUTORIAL
        </HvButton>
        <HvIconButton
          title={open ? "Close Theme Creator" : "Open Theme Creator"}
          onClick={() => setOpen?.((prev) => !prev)}
        >
          <Menu />
        </HvIconButton>
      </HvHeaderActions>
    </HvHeader>
  );
};
