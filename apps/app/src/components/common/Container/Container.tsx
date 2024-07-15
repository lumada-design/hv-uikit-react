import { Suspense } from "react";
import {
  HvContainer,
  HvContainerProps,
  theme,
} from "@hitachivantara/uikit-react-core";

import { Loading, LoadingProps } from "~/components/common/Loading";
import { useNavigationContext } from "~/lib/context/navigation";

const useHeaderSpacing = () => {
  const { activePath, navigation } = useNavigationContext();

  const isFirstLevel = navigation?.some((item) => item.id === activePath?.id);

  const headerSpacing = isFirstLevel
    ? `${theme.header.height}`
    : `${theme.header.height} + ${theme.header.secondLevelHeight}`;

  return `calc(${theme.space.sm} + ${headerSpacing})`;
};

interface ContainerProps extends HvContainerProps {
  loadingProps?: LoadingProps;
}

export const Container = ({
  maxWidth = "lg",
  children,
  loadingProps,
  ...others
}: ContainerProps) => {
  const spacing = useHeaderSpacing();

  return (
    <div className="flex pb-2 min-h-screen" style={{ paddingTop: spacing }}>
      <HvContainer component="main" maxWidth={maxWidth} {...others}>
        <Suspense fallback={<Loading {...loadingProps} />}>{children}</Suspense>
      </HvContainer>
    </div>
  );
};
