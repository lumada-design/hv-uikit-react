import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HvButton, HvEmptyState } from "@hitachivantara/uikit-react-core";
import { Info } from "@hitachivantara/uikit-react-icons";

import classes from "./styles";

const NotFound = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { t } = useTranslation("common");
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <HvEmptyState
        className={classes.empty}
        title={t("notFound.title")}
        message={t("notFound.message")}
        icon={<Info />}
        action={
          <HvButton variant="primaryGhost" onClick={() => navigate(-1)}>
            {t("notFound.action")}
          </HvButton>
        }
      />
    </div>
  );
};

export default NotFound;
