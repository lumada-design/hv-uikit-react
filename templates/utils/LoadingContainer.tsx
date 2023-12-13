import React from "react";
import { css } from "@emotion/css";
import { theme } from "@hitachivantara/uikit-styles";
import { HvLoading, HvLoadingProps } from "@hitachivantara/uikit-react-core";

interface LoadingContainerProps extends HvLoadingProps {
  children: React.ReactNode;
  loading?: boolean;
}

export const LoadingContainer = ({
  children,
  loading,
  ...others
}: LoadingContainerProps) => {
  return (
    <div
      className={css({
        position: "relative",
        height: "inherit",
      })}
    >
      <HvLoading
        classes={{
          root: css({
            position: "absolute",
            inset: -2, // cover borders/outlines
            backgroundColor: theme.alpha("atmo2", 0.8),
            zIndex: theme.zIndices.popover,
          }),
        }}
        hidden={!loading}
        {...others}
      />
      {children}
    </div>
  );
};
