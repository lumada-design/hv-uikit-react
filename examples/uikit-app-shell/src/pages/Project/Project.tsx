import { useTranslation } from "react-i18next";
import {
  HvGrid,
  HvTypography,
  HvGlobalActions,
} from "@hitachivantara/uikit-react-core";

const Project: React.FC = () => {
  const { t } = useTranslation("project");

  return (
    <HvGrid container>
      <HvGrid item xs={12}>
        <HvTypography variant="title2">{t("page.title")}</HvTypography>
      </HvGrid>
      <HvGrid item xs={12}>
        <HvGlobalActions title={t("section.title")} variant="section" />
      </HvGrid>
    </HvGrid>
  );
};

export default Project;
