import { useContext, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import { Alert, Menu } from "@hitachivantara/uikit-react-icons";
import {
  HvHeader,
  HvHeaderBrand,
  HvHeaderActions,
  HvHeaderNavigation,
  HvButton,
  HvBadge,
  HvTooltip,
  HvTypography,
} from "@hitachivantara/uikit-react-core";
import HitachiLogo from "assets/HitachiLogo";
import { NavigationContext } from "lib/context/NavigationContext";
import navigation from "lib/navigation";
import { GeneratorContext } from "generator/GeneratorContext";

export const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { activePath } = useContext(NavigationContext);
  const { setOpen, open } = useContext(GeneratorContext);

  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  const handleChange = (event: MouseEvent, selection: any): void => {
    if (selection.path) navigate(selection.path);
  };

  return (
    <HvHeader position="fixed">
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
          <HvBadge
            id="badge7"
            showCount
            count={8}
            icon={<Alert />}
            style={{ marginRight: 10 }}
          />
          <HvTooltip
            title={
              <HvTypography>
                {open ? "Close Theme Generator" : "Open Theme Generator"}
              </HvTypography>
            }
          >
            <HvButton
              variant="secondaryGhost"
              icon
              onClick={() => setOpen?.((prev) => !prev)}
            >
              <Menu />
            </HvButton>
          </HvTooltip>
        </HvHeaderActions>
      )}
    </HvHeader>
  );
};
