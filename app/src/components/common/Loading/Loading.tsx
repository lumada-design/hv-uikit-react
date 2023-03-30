import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HvLoading, HvEmptyState } from "@hitachivantara/uikit-react-core";
import { Info } from "@hitachivantara/uikit-react-icons";

import classes from "./styles";

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  hasError?: boolean;
  loadingLabel?: string;
  errorTitle?: string | React.ReactNode;
  errorMessage?: string | React.ReactNode;
  errorAction?: string | React.ReactNode;
}

export const Loading = (props: LoadingProps) => {
  const { t } = useTranslation("common");
  const [isLoading, setIsLoading] = useState(false);

  const {
    delay = 0,
    hasError = false,
    loadingLabel = t("loading.label") as string,
    errorTitle = t("loading.errorTitle"),
    errorMessage = t("loading.errorMessage"),
    errorAction = t("loading.errorAction"),
    ...rest
  } = props;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(true), delay);

    return () => {
      clearTimeout(timer);
    };
  });

  const ErrorState = () => (
    <HvEmptyState
      classes={{ root: classes.error }}
      title={errorTitle}
      message={errorMessage}
      action={errorAction}
      icon={<Info semantic="negative" />}
      {...rest}
    />
  );

  const LoadingState = () => (
    <HvLoading
      classes={{ root: classes.loading }}
      hidden={!isLoading}
      label={loadingLabel}
      {...rest}
    />
  );

  return (
    <>
      {hasError && <ErrorState />}
      {!hasError && isLoading && <LoadingState />}
    </>
  );
};
