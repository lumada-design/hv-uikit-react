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
  HvFlowNodeProps,
  useFlowNode,
} from "@hitachivantara/uikit-react-lab";

type Node = ReturnType<HvFlowInstance["getNode"]>;

interface AssetData {
  asset?: string;
}

const classes = {
  container: css({
    width: "40%",
    minHeight: 200,
  }),
  outputLabel: css({
    display: "flex",
    alignItems: "center",
    gap: 2,
  }),
};

export const Asset: HvFlowNodeFC<AssetData> = (props) => {
  const [showDialog, setShowDialog] = useState(false);
  const [details, setDetails] = useState<Node>();
  const node = useFlowNode();

  const handleAction: HvFlowNodeProps["onAction"] = (event, action) => {
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
        groupId="assets"
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
        onAction={handleAction}
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
            label: (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                Sensors
                <HvButton size="sm" variant="primarySubtle">
                  Configure
                </HvButton>
              </div>
            ),
            outputs: [
              {
                label: (
                  <div className={classes.outputLabel}>
                    <HvButton icon variant="primaryGhost" aria-label="Edit">
                      <Edit />
                    </HvButton>
                    Sensor Group 1
                  </div>
                ),
                isMandatory: true,
                provides: "sensorData",
              },
              {
                label: (
                  <div className={classes.outputLabel}>
                    <HvButton icon variant="primaryGhost" aria-label="Edit">
                      <Edit />
                    </HvButton>
                    Sensor Group 2
                  </div>
                ),
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
