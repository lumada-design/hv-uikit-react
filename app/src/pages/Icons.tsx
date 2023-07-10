import { HvButton } from "@hitachivantara/uikit-react-core";
import { icons } from "@hitachivantara/uikit-react-icons";

const Icons = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Object.entries(icons).map(([name, Icon]) => (
        <HvButton icon key={name} aria-label={name} variant="secondaryGhost">
          <Icon iconSize="M" />
        </HvButton>
      ))}
    </div>
  );
};

export default Icons;
