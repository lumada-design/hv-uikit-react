import { HTMLAttributes } from "react";

import { StyledLoading } from "./styles";

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  loadingLabel?: string;
}

const Loading = ({ loadingLabel }: LoadingProps) => {
  return <StyledLoading label={loadingLabel} />;
};

export default Loading;
