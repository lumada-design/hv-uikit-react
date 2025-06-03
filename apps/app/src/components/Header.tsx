import { NavLink, useNavigate } from "react-router";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  HvButton,
  HvHeader,
  HvHeaderActions,
  HvHeaderBrand,
  HvHeaderNavigation,
  HvIconButton,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { Debug, Menu, ThemeSwitcher } from "@hitachivantara/uikit-react-icons";

import logo from "../assets/logo.png";
import { useNavigationContext } from "../context/navigation";
import { useGeneratorContext } from "../generator/GeneratorContext";

export const Header = () => {
  const navigate = useNavigate();
  const theme = useMuiTheme();
  const { selectedMode, colorModes, changeTheme } = useTheme();
  const { activePath, navigation } = useNavigationContext();
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
        {import.meta.env.DEV && (
          <HvIconButton title="Test page" component={NavLink} to="/debug">
            <Debug />
          </HvIconButton>
        )}
        <HvIconButton
          title="Change color mode"
          onClick={() => {
            const nextIdx = colorModes.findIndex((m) => m === selectedMode) + 1;
            changeTheme(undefined, colorModes[nextIdx % colorModes.length]);
          }}
        >
          <ThemeSwitcher />
        </HvIconButton>
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
