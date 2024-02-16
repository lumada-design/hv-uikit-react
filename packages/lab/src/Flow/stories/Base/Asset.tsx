import { useState } from "react";
import { css } from "@emotion/css";
import {
  HvButton,
  HvDialog,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
} from "@hitachivantara/uikit-react-core";
import {
  Edit,
  Favorite,
  Flag,
  Search,
} from "@hitachivantara/uikit-react-icons";
import {
  HvFlowInstance,
  HvFlowNode,
  HvFlowNodeFC,
  HvFlowNodeOutput,
  HvFlowNodeTypeMeta,
  useFlowNode,
} from "@hitachivantara/uikit-react-lab";

import type { NodeGroup } from ".";

type Node = ReturnType<HvFlowInstance["getNode"]>;

interface AssetData {
  asset?: string;
}

const classes = {
  container: css({
    width: "40%",
    minHeight: 200,
  }),
};

export const Asset: HvFlowNodeFC<NodeGroup, AssetData> = (props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [details, setDetails] = useState<Node>();
  const node = useFlowNode();

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

  const handleActionCallback: HvFlowNodeOutput["actionsCallback"] = (
    event,
    id,
    action,
    item
  ) => {
    console.log("Action called:", action.id, item);
  };

  return (
    <>
      <HvDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        classes={{ paper: classes.container }}
      >
        <HvDialogTitle>Asset</HvDialogTitle>
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
        description="Asset description"
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
            label: "Asset Option",
            type: "select",
            options: [
              { id: "option1", label: "Option 1" },
              { id: "option2", label: "Option 2" },
              { id: "option3", label: "Option 3" },
            ],
          },
        ]}
        outputs={[
          {
            id: "sensors",
            label: "Sensors",
            actions: [
              {
                id: "config",
                label: "Configure",
              },
            ],
            actionsCallback: handleActionCallback,
            actionsButtonVariant: "primarySubtle",
            actionsPlacement: "right",
            // Actions shared by all outputs in the group
            defaultOutputsActions: {
              actions: [
                {
                  id: "edit",
                  label: "Edit",
                  icon: <Edit />,
                },
              ],
              actionsCallback: handleActionCallback,
              actionsButtonVariant: "primaryGhost",
              actionsIconOnly: true,
            },
            outputs: [
              {
                id: "sensor1",
                label: "Sensor Group 1",
                isMandatory: true,
                provides: "sensorData",
              },
              {
                id: "sensor2",
                label: "Sensor Group 2",
                isMandatory: true,
                provides: "sensorData",
              },
            ],
          },
        ]}
        {...props}
      />
    </>
  );
};

Asset.meta = {
  label: "My Asset",
  groupId: "assets",
  data: {
    asset: "option1",
  },
} satisfies HvFlowNodeTypeMeta<NodeGroup, AssetData>;
