import { Suspense } from "react";
import {
  HvContainer,
  HvContainerProps,
} from "@hitachivantara/uikit-react-core";

import { Loading } from "components/common/Loading";
import classes from "./styles";

interface ContainerProps {
  maxWidth?: HvContainerProps["maxWidth"];
  children: NonNullable<React.ReactNode>;
}

export const Container = ({ maxWidth = "lg", children }: ContainerProps) => {
  return (
    <div className={classes.root}>
      <HvContainer maxWidth={maxWidth} component="main">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </HvContainer>
    </div>
  );
};
