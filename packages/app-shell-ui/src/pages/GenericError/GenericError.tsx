import { useTranslation } from "react-i18next";

import ErrorPage from "../ErrorPage";
import BlackCat from "./500.svg";

const GenericError = ({ fullPage = false, includeFooter = true }) => {
  const { t } = useTranslation(undefined, { keyPrefix: "errors.genericError" });
  return (
    <ErrorPage
      code={t("code")}
      title={t("title")}
      backgroundLabel={t("image_description")}
      fullPage={fullPage}
      includeFooter={includeFooter}
      background={`url(${BlackCat})`}
    />
  );
};

export default GenericError;
