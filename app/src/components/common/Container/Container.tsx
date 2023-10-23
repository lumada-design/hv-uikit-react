import { Suspense } from "react";
import { HvContainer } from "@hitachivantara/uikit-react-core";

import { Loading, LoadingProps } from "~/components/common/Loading";

import classes from "./styles";

interface ContainerProps {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  children: NonNullable<React.ReactNode>;
  loadingProps?: LoadingProps;
}

export const Container = ({
  maxWidth = "lg",
  children,
  loadingProps,
}: ContainerProps) => {
  return (
    <div className={classes.root}>
      <HvContainer maxWidth={maxWidth} {...{ component: "main" }}>
        <Suspense fallback={<Loading {...loadingProps} />}>{children}</Suspense>
      </HvContainer>
    </div>
  );
};
