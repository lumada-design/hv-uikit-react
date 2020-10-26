import { useEffect, useState } from "react";

const useLabels = (defaultLabels, labels) => {
  const [state, setState] = useState({ ...defaultLabels, ...labels });

  useEffect(() => {
    setState({ ...defaultLabels, ...labels });
  }, [defaultLabels, labels]);

  return state;
};

export default useLabels;
