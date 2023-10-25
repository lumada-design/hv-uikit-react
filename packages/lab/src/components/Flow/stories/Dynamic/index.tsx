import { useMemo, useState } from "react";
import { css } from "@emotion/css";
import {
  HvButton,
  HvGlobalActions,
  theme,
} from "@hitachivantara/uikit-react-core";
import { Add, Backwards, DataSource } from "@hitachivantara/uikit-react-icons";
import {
  HvFlowSidebar,
  HvFlow,
  HvFlowProps,
  HvFlowControls,
} from "@hitachivantara/uikit-react-lab";

// The code for these utils are available here: https://github.com/lumada-design/hv-uikit-react/tree/master/packages/lab/src/components/Flow/stories/Dynamic
import { createAsset } from "./utils";

// Node groups
type NodeGroups = "assets";

const nodeGroups = {
  assets: {
    label: "Assets",
    color: "cat3_80",
    description:
      "Find here all the available assets. Scroll to see all the options.",
    icon: <DataSource />,
  },
} satisfies HvFlowProps<NodeGroups>["nodeGroups"];

// Classes
export const classes = {
  root: css({
    height: "100vh",
    [`& .HvFlowSidebarGroup-itemsContainer`]: {
      maxHeight: 300,
      overflow: "scroll",
    },
  }),
  globalActions: css({ paddingBottom: theme.space.md }),
  flow: css({
    height: "calc(100% - 90px)",
  }),
};

const numberOfAssets = 40;
const options = ["Way Side", "Track", "Segment", "Light Cycle", "Zone"];

const getRandomOption = () => {
  return options[Math.floor(Math.random() * options.length)];
};

export const Dynamic = () => {
  const [open, setOpen] = useState(false);

  const nodeTypes = useMemo(() => {
    const nt = {};
    for (let i = 1; i <= numberOfAssets; i++) {
      const NewAsset = createAsset({
        label: `Asset ${i}`,
        description: `Asset ${i} description`,
        params: [
          {
            id: "asset",
            label: "Asset",
            type: "select",
            options: ["Way Side", "Track", "Segment", "Light Cycle", "Zone"],
          },
        ],
        data: { asset: getRandomOption() },
      });
      nt[`asset${i}`] = NewAsset;
    }
    return nt;
  }, []);

  return (
    <div className={classes.root}>
      <HvGlobalActions
        className={classes.globalActions}
        position="relative"
        backButton={
          <HvButton aria-label="Back" icon>
            <Backwards role="none" />
          </HvButton>
        }
        title="New Flow"
      >
        <HvButton
          variant="primary"
          startIcon={<Add role="none" />}
          onClick={() => setOpen(true)}
        >
          Add Node
        </HvButton>
      </HvGlobalActions>
      <div className={classes.flow}>
        <HvFlow
          nodes={[]}
          edges={[]}
          nodeTypes={nodeTypes}
          nodeGroups={nodeGroups}
          defaultViewport={{
            zoom: 0.7,
            x: 0,
            y: 0,
          }}
          sidebar={
            <HvFlowSidebar
              title="Add Node"
              description="Please choose within the options below"
              open={open}
              onClose={() => setOpen(false)}
            />
          }
        >
          <HvFlowControls />
        </HvFlow>
      </div>
    </div>
  );
};
