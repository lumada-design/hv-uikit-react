import { useState } from "react";

import { css } from "@emotion/css";
import {
  HvButton,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
} from "@hitachivantara/uikit-react-core";
import { Favorite, Flag, Search } from "@hitachivantara/uikit-react-icons";
import { HvFlowNode, useFlowNode } from "@hitachivantara/uikit-react-lab";
import { Node } from "reactflow";

export const Tron = (props) => {
  const { id } = props;
  const [showDialog, setShowDialog] = useState(false);
  const [details, setDetails] = useState<Node | undefined>();
  const { node } = useFlowNode(id);

  const classes = {
    container: css({
      width: "40%",
      minHeight: 200,
    }),
  };

  const handleAction = (event: any, nodeId: string, action: any) => {
    if (!node) return;

    switch (action.id) {
      case "details": {
        setDetails(node);
        setShowDialog(true);
        break;
      }
      default:
        break;
    }
  };

  return (
    <>
      <HvDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        classes={{ paper: classes.container }}
      >
        <HvDialogTitle>Tron</HvDialogTitle>
        <HvDialogContent>{JSON.stringify(details?.data)}</HvDialogContent>
        <HvDialogActions>
          <HvButton
            autoFocus
            variant="secondaryGhost"
            onClick={() => setShowDialog(false)}
          >
            Close
          </HvButton>
        </HvDialogActions>
      </HvDialog>

      <HvFlowNode
        description="Tron asset description"
        expanded
        maxVisibleActions={1}
        actions={[
          {
            id: "details",
            label: "View Details",
            icon: <Search />,
          },

          {
            id: "favorite",
            label: "Add Favorite",
            icon: <Favorite />,
          },
          {
            id: "flag",
            label: "Flag",
            icon: <Flag />,
          },
        ]}
        actionCallback={handleAction}
        params={[
          {
            id: "asset",
            label: "Asset",
            type: "select",
            options: ["Way Side", "Cars"],
          },
        ]}
        {...props}
      />
    </>
  );
};

Tron.meta = {
  label: "Tron",
  groupId: "assets",
  outputs: [
    {
      label: "Sensor Group 1",
      isMandatory: true,
      provides: "sensorData",
    },
    {
      label: "Sensor Group 2",
      isMandatory: true,
      provides: "sensorData",
    },
  ],
};
