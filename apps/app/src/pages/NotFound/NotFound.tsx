import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HvButton, HvEmptyState } from "@hitachivantara/uikit-react-core";
import { Info } from "@hitachivantara/uikit-react-icons";

export const Component = () => {
  const { t } = useTranslation("common");

  return (
    <HvEmptyState
      classes={{
        root: "items-center",
        textContainer: "overflow-visible",
      }}
      title={t("notFound.title")}
      message={t("notFound.message")}
      icon={<Info />}
      action={
        <HvButton variant="primaryGhost" component={Link} to="/">
          {t("notFound.action")}
        </HvButton>
      }
    />
  );
};
