import { Suspense } from "react";
import { HvContainer } from "@hitachivantara/uikit-react-core";

import { Loading, LoadingProps } from "../Loading";
import classes from "./styles";

interface ContainerProps {
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  children: NonNullable<React.ReactNode>;
  loadingProps?: LoadingProps;
}

export const Container = ({
  maxWidth,
  children,
  loadingProps,
}: ContainerProps) => (
  <HvContainer
    maxWidth={maxWidth}
    {...{ component: "main" }}
    classes={{ root: classes.container }}
  >
    <Suspense fallback={<Loading {...loadingProps} />}>{children}</Suspense>
  </HvContainer>
);
