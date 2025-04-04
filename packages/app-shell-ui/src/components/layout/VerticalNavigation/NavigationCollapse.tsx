import { useTranslation } from "react-i18next";
import { cx } from "@emotion/css";
import { HvButton, HvTypography } from "@hitachivantara/uikit-react-core";
import { End, Start } from "@hitachivantara/uikit-react-icons";

import { classes } from "./styles";

type CollapseProps = {
  onClick: () => void;
  isOpen: boolean;
};

export const NavigationCollapse = ({ onClick, isOpen }: CollapseProps) => {
  const { t } = useTranslation(undefined, { keyPrefix: "verticalNavigation" });
  return (
    <div className={classes.navigationCollapse}>
      {isOpen && (
        <HvTypography
          variant="label"
          className={classes.navigationCollapseText}
        >
          {t("collapseAction")}
        </HvTypography>
      )}
      <HvButton
        className={cx(classes.navigationCollapseButton, {
          [classes.navigationCollapseAlignRight]: isOpen,
        })}
        aria-label={isOpen ? t("ariaLabelCollapse") : t("ariaLabelExpand")}
        icon
        onClick={onClick}
      >
        {isOpen ? <Start /> : <End />}
      </HvButton>
    </div>
  );
};
