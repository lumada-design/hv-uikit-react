import { css } from "@emotion/css";
import {
  HvCard,
  HvCardHeader,
  HvDrawer,
  theme,
} from "@hitachivantara/uikit-react-core";
import { HvNodeTypes } from "../../types";

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  nodesTypes: HvNodeTypes;
};
export const Sidebar = ({ open, setOpen, nodesTypes }: SidebarProps) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <HvDrawer
      open={open}
      anchor="right"
      classes={{
        root: css({ left: "unset" }),
        background: css({ display: "none" }),
      }}
      onClose={() => setOpen(false)}
      BackdropComponent={undefined}
      variant="persistent"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: 20,
          marginTop: theme.space.lg,
        }}
      >
        {Object.keys(nodesTypes).map((nodeType) => (
          <HvCard
            key={nodeType}
            onDragStart={(event) => onDragStart(event, nodeType)}
            draggable
          >
            <HvCardHeader title={nodeType} />
          </HvCard>
        ))}
        {/* <HvCard
          onDragStart={(event) => onDragStart(event, "textNode")}
          draggable
        >
          <HvCardHeader title="Text Node" />
        </HvCard> */}
        {/* <HvCard
          onDragStart={(event) => onDragStart(event, "colorNode")}
          draggable
        >
          <HvCardHeader title="Color Node" />
        </HvCard>
        <HvCard
          onDragStart={(event) => onDragStart(event, "variantNode")}
          draggable
        >
          <HvCardHeader title="Variant Node" />
        </HvCard>
        <HvCard
          onDragStart={(event) => onDragStart(event, "asyncNode")}
          draggable
        >
          <HvCardHeader title="Async Node" />
        </HvCard>
        <HvCard
          onDragStart={(event) => onDragStart(event, "outputNode")}
          draggable
        >
          <HvCardHeader title="Output Node" />
        </HvCard> */}
      </div>
    </HvDrawer>
  );
};
