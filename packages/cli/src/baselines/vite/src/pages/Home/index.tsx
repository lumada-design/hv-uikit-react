import { HvTypography } from "@hitachivantara/uikit-react-core";
import { useTranslation } from "react-i18next";

export function Component() {
  const { t } = useTranslation("home");

  return (
    <div className="grid gap-sm">
      <HvTypography variant="title1">{t("title")}</HvTypography>
      <HvTypography>{t("description")}</HvTypography>
    </div>
  );
}
