import React from "react";

const useLabels = (defaultLabels, labels) => {
  const merged = React.useMemo(() => {
    return { ...defaultLabels, ...labels };
  }, [defaultLabels, labels]);

  return merged;
};

export default useLabels;
