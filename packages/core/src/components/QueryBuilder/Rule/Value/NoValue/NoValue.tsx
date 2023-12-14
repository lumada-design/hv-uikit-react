import { useEffect } from "react";

import { useQueryBuilderContext } from "../../../Context";

export interface NoValueProps {
  id: React.Key;
}

export const NoValue = ({ id }: NoValueProps) => {
  const { dispatchAction } = useQueryBuilderContext();

  // Clear value on first render
  useEffect(() => {
    dispatchAction({
      type: "set-value",
      id,
      value: null,
    });
  }, [dispatchAction, id]);

  return null;
};
