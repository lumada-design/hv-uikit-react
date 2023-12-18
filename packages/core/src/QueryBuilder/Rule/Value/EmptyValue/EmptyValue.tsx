import { useEffect } from "react";

import { useQueryBuilderContext } from "../../../Context";

export interface EmptyValueProps {
  id: React.Key;
}

export const EmptyValue = ({ id }: EmptyValueProps) => {
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
