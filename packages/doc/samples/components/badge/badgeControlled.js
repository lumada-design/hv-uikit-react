import React, { useState } from "react";
import HvBadge from "@hv/uikit-react-core/dist/Badge";
import HvButton from "@hv/uikit-react-core/dist/Button";

const ControlledBadges = () => {
  const [count, setCount] = useState(1);
  const addCount = () => setCount(count * 2);

  const exampleStyles = {
    display: "flex"
  }

  const buttonStyles = {
    marginRight: 30
  };

  return (
    <div style={exampleStyles}>
      <HvButton onClick={addCount} style={buttonStyles}>Double value</HvButton>
      <HvBadge showCount count={count} text="Events" textVariant="sTitle" />
    </div>
  );
};

export default <ControlledBadges />;
