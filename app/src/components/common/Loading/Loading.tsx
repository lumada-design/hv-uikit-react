import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HvLoading, HvEmptyState } from "@hitachivantara/uikit-react-core";
import { Info } from "@hitachivantara/uikit-react-icons";

import classes from "./styles";

interface ErrorStateProps {
  errorTitle?: string | React.ReactNode;
  errorMessage?: string | React.ReactNode;
  errorAction?: string | React.ReactNode;
}

const ErrorState = (props: ErrorStateProps) => {
  const { errorTitle, errorMessage, errorAction } = props;

  return (
    <HvEmptyState
      classes={{ root: classes.error }}
      title={errorTitle}
      message={errorMessage}
      action={errorAction}
      icon={<Info color="negative" />}
    />
  );
};

interface LoadingStateProps {
  loadingLabel?: string;
}

const LoadingState = (props: LoadingStateProps) => {
  const { loadingLabel } = props;

  return <HvLoading classes={{ root: classes.loading }} label={loadingLabel} />;
};

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
  } = props;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(true), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <>
      {hasError && (
        <ErrorState
          errorTitle={errorTitle}
          errorMessage={errorMessage}
          errorAction={errorAction}
        />
      )}
      {!hasError && isLoading && <LoadingState loadingLabel={loadingLabel} />}
    </>
  );
};
