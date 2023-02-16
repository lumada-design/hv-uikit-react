import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  HvLoading,
  HvEmptyState,
  HvLink,
} from "@hitachivantara/uikit-core";
import { Info } from "@hitachivantara/uikit-icons";

import useStyles from "./styles";

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  hasError?: boolean;
  loadingLabel?: string;
  errorTitle?: string | React.ReactNode;
  errorMessage?: string | React.ReactNode;
  errorAction?: string | React.ReactNode;
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { t } = useTranslation("common");
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const {
    delay = 0,
    hasError = false,
    loadingLabel = t("loading.label") as string,
    errorTitle = t("loading.errorTitle"),
    errorMessage = t("loading.errorMessage"),
    errorAction = <HvLink route="/">{t("loading.errorAction")}</HvLink>,
    ...rest
  } = props;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(true), delay);

    return () => {
      clearTimeout(timer);
    };
  });

  if (hasError) {
    return (
      <HvEmptyState
        classes={{ root: classes.error }}
        title={errorTitle}
        message={errorMessage}
        action={errorAction}
        icon={<Info semantic="sema4" />}
        {...rest}
      />
    );
  }

  return isLoading ? (
    <HvLoading
      classes={{ root: classes.loading }}
      hidden={!isLoading}
      label={loadingLabel}
      {...rest}
    />
  ) : null;
};

export default Loading;
