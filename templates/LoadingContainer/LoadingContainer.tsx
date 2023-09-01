import React from "react";

import { css } from "@emotion/css";

import { theme } from "@hitachivantara/uikit-styles";
import {
  HvLoading,
  HvLoadingProps,
  hexToRgbA,
  useTheme,
} from "@hitachivantara/uikit-react-core";

interface LoadingContainerProps extends HvLoadingProps {
  children: React.ReactNode;
  loading?: boolean;
}

export const LoadingContainer = ({
  children,
  loading,
  ...others
}: LoadingContainerProps) => {
  const { colors } = useTheme();

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
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: hexToRgbA(colors.atmo2, 0.8),
            width: "100%",
            height: "100%",
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
