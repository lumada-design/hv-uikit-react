import { useTranslation } from "react-i18next";

import { UseCreateNewContentAction } from "../types/UseCreateNewContentAction";

const useCreateNewReportAction: UseCreateNewContentAction = () => {
  const { t } = useTranslation();

  return {
    id: "default-app/actions/createNewReport",
    label: t("action.createNewReport.label"),
    onAction: () => {
      console.log("Creating a new report...");
    },
  };
};

export default useCreateNewReportAction;
