import { useEffect } from "react";

import { useQueryBuilderContext } from "../../../Context";

export interface ClearValueProps {
  id: React.Key;
}

export const ClearValue = ({ id }: ClearValueProps) => {
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
