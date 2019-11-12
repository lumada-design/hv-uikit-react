import React, { useState } from "react";
import HvBadge from "@hv/uikit-react-core/dist/Badge";
import HvButton from "@hv/uikit-react-core/dist/Button";

const ControlledBadges = () => {
  const [count, setCount] = useState(1);
  const addCount = () => setCount(count * 2);

  return (
    <>
      <HvButton onClick={addCount}>Double Value</HvButton>
      <p />
      <HvBadge showCount count={count} text="Events" textVariant="sTitle" />
    </>
  );
};

export default <ControlledBadges />;
