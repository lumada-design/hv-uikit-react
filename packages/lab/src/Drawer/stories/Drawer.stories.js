import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { HvButton, HvDialogTitle, HvDialogContent, HvDialogActions } from "@hv/uikit-react-core";
import { HvDrawer } from "../..";

export default {
  title: "Lab/Drawer",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvDrawer } from '@hv/uikit-react-lab'",
  },
  component: HvDrawer,
};

export const Main = () => {
  const [open, setOpen] = useState(false);

  const drawerWidth = "60%";

  const useStyles = makeStyles(() => ({
    drawerPaper: {
      width: `calc(100% - ${drawerWidth})`,
      overflow: "unset", // we want scroll content, not scroll paper
    },
    drawerContent: {
      // maximize space for content
      flex: 1,
      overflow: "auto",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <HvButton id="openDialog" style={{ width: "120px" }} onClick={() => setOpen(true)}>
        Open dialog
      </HvButton>
      <HvDrawer
        disableBackdropClick
        id="drawer-test"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={() => setOpen(false)}
      >
        <HvDialogTitle>Lorem Ipsum</HvDialogTitle>
        <HvDialogContent className={classes.drawerContent}>
          {[...new Array(30)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum. 
                Cras justo odio, dapibus ac facilisis in, egestas eget quam. 
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join("\n")}
        </HvDialogContent>
        <HvDialogActions>
          <HvButton category="ghost" onClick={() => console.log("Submit action")}>
            Submit
          </HvButton>
          <HvButton category="ghost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDrawer>
    </div>
  );
};
