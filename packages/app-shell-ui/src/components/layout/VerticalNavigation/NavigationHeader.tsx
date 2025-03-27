import { useHvAppShellConfig } from "@hitachivantara/app-shell-shared";
import { AppSwitcher } from "@hitachivantara/uikit-react-icons";

import BrandLogo from "../BrandLogo";
import { classes } from "./styles";

type NavigationHeaderProps = {
  isOpen: boolean;
};

export const NavigationHeader = ({ isOpen }: NavigationHeaderProps) => {
  const appShellConfig = useHvAppShellConfig();

  return (
    <div className={classes.navigationHeader}>
      <AppSwitcher />
      {isOpen && <BrandLogo logo={appShellConfig.logo} />}
    </div>
  );
};
