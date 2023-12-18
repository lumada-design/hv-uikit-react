import { useState } from "react";
import { css } from "@emotion/css";
import {
  HvButton,
  HvGlobalActions,
  theme,
  useTheme,
} from "@hitachivantara/uikit-react-core";
import { Add, Backwards, DataSource } from "@hitachivantara/uikit-react-icons";
import {
  HvFlowSidebar,
  HvFlow,
  HvFlowNode,
  HvFlowNodeProps,
  HvFlowNodeFC,
  HvFlowProps,
  HvFlowControls,
} from "@hitachivantara/uikit-react-lab";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";

import { restrictToSample } from "../Base";

const nodeGroups = {
  assets: {
    label: "Assets",
    color: "cat3_80",
    description:
      "Find here all the available assets. Scroll to see all the options.",
    icon: <DataSource />,
  },
} satisfies HvFlowProps["nodeGroups"];

type NodeGroups = keyof typeof nodeGroups;

/** Create a generic node programmatically */
const createNode = (
  nodeProps: Partial<HvFlowNodeProps>,
  nodeMeta: HvFlowNodeFC<NodeGroups>["meta"]
) => {
  const Asset: HvFlowNodeFC<NodeGroups> = (props) => (
    <HvFlowNode {...nodeProps} {...props} />
  );

  Asset.meta = nodeMeta;
  return Asset;
};

/** Create an Asset node programmatically */
const createAssetNode = ({ label, description, params, data }) => {
  return createNode(
    { expanded: true, description, params },
    { label, groupId: "assets", data }
  );
};

// Classes
const classes = {
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

const nodeTypes = Object.fromEntries(
  [...Array(numberOfAssets)].map((el, j) => {
    const i = j + 1;
    const NewAsset = createAssetNode({
      label: `Asset ${i}`,
      description: `Asset ${i} description`,
      params: [{ id: "asset", label: "Asset", type: "select", options }],
      data: { asset: options[i % options.length] },
    });

    return [`asset${i}`, NewAsset] as const;
  })
);

export const Dynamic = () => {
  const { rootId } = useTheme();
  const [open, setOpen] = useState(false);

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
              // Needed to fix storybook
              dragOverlayProps={{
                modifiers: [
                  restrictToWindowEdges,
                  (args) => restrictToSample(rootId || "", args),
                ],
              }}
            />
          }
        >
          <HvFlowControls />
        </HvFlow>
      </div>
    </div>
  );
};
