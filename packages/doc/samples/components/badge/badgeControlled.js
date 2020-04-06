import React, { useState } from "react";
import HvBadge from "@hv/uikit-react-core/dist/Badge";
import HvButton from "@hv/uikit-react-core/dist/Button";

const ControlledBadges = () => {
  const [count, setCount] = useState(1);
  const addCount = () => setCount(count * 2);

  return (
    <div style={{ display: "flex" }}>
      <HvButton onClick={addCount} style={{ marginRight: 30 }}>
        Double value
      </HvButton>
      <HvBadge showCount count={count} text="Events" textVariant="sTitle" />
    </div>
  );
};

export default <ControlledBadges />;
