import { ElementType, useState } from "react";
import { HvButton } from "@hitachivantara/uikit-react-core";
import { icons } from "@hitachivantara/uikit-react-icons";

const customColors = ["warning"];

const Icon = ({ id, as: Component }: { id: string; as: ElementType }) => {
  const [isCustom, setIsCustom] = useState(false);
  const colors = isCustom ? customColors : undefined;

  return (
    <HvButton
      icon
      title={id}
      variant="secondaryGhost"
      overrideIconColors={false}
      style={isCustom ? { outline: "1px dashed blue" } : undefined}
      onClick={() => setIsCustom((curr) => !curr)}
    >
      <Component iconSize="M" color={colors} />
    </HvButton>
  );
};

const Icons = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Object.entries(icons).map(([name, Comp]) => (
        <Icon key={name} id={name} as={Comp} />
      ))}
    </div>
  );
};

export default Icons;
