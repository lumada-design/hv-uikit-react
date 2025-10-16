import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { css } from "@emotion/css";
import { useHvNavigation } from "@hitachivantara/app-shell-navigation";
import {
  CONFIG_TRANSLATIONS_NAMESPACE,
  useHvAppShellConfig,
} from "@hitachivantara/app-shell-shared";
import {
  HvButton,
  HvHeader,
  HvHeaderBrand,
  HvHeaderNavigation,
  HvHeaderNavigationProps,
  useTheme,
} from "@hitachivantara/uikit-react-core";

import { useLayoutContext } from "../../../providers/LayoutProvider";
import { useNavigationContext } from "../../../providers/NavigationProvider";
import IconUiKit from "../../IconUiKit";
import BrandLogo from "../BrandLogo";
import HeaderActions from "./HeaderActions";
import StyledIconWrapper from "./styles";

const Header = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "header.navigation" });
  const { t: tConfig } = useTranslation(CONFIG_TRANSLATIONS_NAMESPACE);
  const appShellConfig = useHvAppShellConfig();
  const { verticalNavigationWidth } = useLayoutContext();
  const { activeTheme } = useTheme();
  const { navigate } = useHvNavigation();

  const {
    items,
    selectedMenuItemId,
    rootMenuItemId,
    isCompactMode,
    switchVerticalNavigationMode,
    verticalNavigationMode,
    verticalNavigationItems,
  } = useNavigationContext();

  const isOnlyTopMode = appShellConfig.navigationMode === "ONLY_TOP";
  const showNavigation =
    !isCompactMode &&
    appShellConfig.navigationMode !== "ONLY_LEFT" &&
    items.length > 0;
  const isVerticalNavigationClosed = verticalNavigationMode === "CLOSED";
  const showVerticalNavigationButton =
    isCompactMode && verticalNavigationItems.length > 0;

  const handleNavigationChange: HvHeaderNavigationProps["onClick"] = (
    event,
    selectedItem,
  ) => {
    if (selectedItem.href) {
      navigate(selectedItem.href, {
        state: { selectedItemId: selectedItem.id },
      });
    }
  };

  const isPentahoTheme = activeTheme?.name === "pentaho";
  const shouldShrinkHeader = isPentahoTheme && verticalNavigationWidth > 0;
  const name = appShellConfig.name ? tConfig(appShellConfig.name) : "";

  return (
    <HvHeader
      position="fixed"
      className={css({
        width: shouldShrinkHeader
          ? `calc(100% - ${verticalNavigationWidth}px)`
          : undefined,
      })}
    >
      <Helmet>
        <title>{name}</title>
      </Helmet>

      {showVerticalNavigationButton && (
        <HvButton
          icon
          aria-label={
            isVerticalNavigationClosed
              ? t("openNavigationPanel")
              : t("closeNavigationPanel")
          }
          aria-expanded={!isVerticalNavigationClosed}
          onClick={switchVerticalNavigationMode}
        >
          <IconUiKit name={isVerticalNavigationClosed ? "Menu" : "Close"} />
        </HvButton>
      )}

      <HvHeaderBrand
        {...(!isPentahoTheme && {
          logo: (
            <StyledIconWrapper>
              <BrandLogo logo={appShellConfig.logo} />
            </StyledIconWrapper>
          ),
        })}
        name={name}
      />
      {showNavigation && (
        <HvHeaderNavigation
          data={items}
          selected={isOnlyTopMode ? selectedMenuItemId : rootMenuItemId}
          onClick={handleNavigationChange}
          levels={isOnlyTopMode ? 2 : 1}
        />
      )}

      <HeaderActions />
    </HvHeader>
  );
};

export default Header;
