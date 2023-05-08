import { Suspense } from "react";
import { HvContainer } from "@hitachivantara/uikit-react-core";

import { Loading, LoadingProps } from "components/common";
import classes from "./styles";

interface ContainerProps {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  fullWidth?: boolean;
  children: NonNullable<React.ReactNode>;
  loadingProps?: LoadingProps;
}

export const Container = ({
  maxWidth = "lg",
  fullWidth = false,
  children,
  loadingProps,
}: ContainerProps) => (
  <div className={classes.root}>
    <HvContainer
      maxWidth={maxWidth}
      {...{ component: "main" }}
      classes={{ ...(fullWidth && { root: classes.fullWidth }) }}
    >
      <Suspense
        fallback={<Loading {...loadingProps} loadingLabel="Loading Editor" />}
      >
        {children}
      </Suspense>
    </HvContainer>
  </div>
);
