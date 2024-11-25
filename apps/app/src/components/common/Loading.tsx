import { useEffect, useState } from "react";
import { HvEmptyState, HvLoading } from "@hitachivantara/uikit-react-core";
import { Info } from "@hitachivantara/uikit-react-icons";

interface ErrorStateProps {
  errorTitle?: string | React.ReactNode;
  errorMessage?: string | React.ReactNode;
  errorAction?: string | React.ReactNode;
}

const ErrorState = (props: ErrorStateProps) => {
  const { errorTitle, errorMessage, errorAction } = props;

  return (
    <HvEmptyState
      classes={{ root: "items-center" }}
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

  return (
    <HvLoading classes={{ root: "h-full z-overlay" }} label={loadingLabel} />
  );
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
  const [isLoading, setIsLoading] = useState(false);

  const {
    delay = 0,
    hasError = false,
    loadingLabel = "Loading Page",
    errorTitle = "Unable to load page",
    errorMessage = "If this problem persists, please contact administrator.",
    errorAction = "Here has link to reload page.",
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
