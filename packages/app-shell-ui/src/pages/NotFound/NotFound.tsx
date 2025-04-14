import { useTranslation } from "react-i18next";

import ErrorPage from "../ErrorPage";
import DogeSpace from "./404.svg";

const NotFound = () => {
  const { t } = useTranslation(undefined, { keyPrefix: "errors.notFound" });

  return (
    <ErrorPage
      code={t("code")}
      title={t("title")}
      backgroundLabel={t("image_description")}
      background={`url(${DogeSpace})`}
    />
  );
};

export default NotFound;
