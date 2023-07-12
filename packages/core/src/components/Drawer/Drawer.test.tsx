import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";
import {
  HvButton,
  HvDialogActions,
  HvDialogContent,
  HvDialogTitle,
} from "@hitachivantara/uikit-react-core";
import { useState } from "react";
import { css } from "@emotion/css";
import { HvDrawer } from "./Drawer";

const Sample = ({ startingOpen }: { startingOpen: boolean }) => {
  const [open, setOpen] = useState(startingOpen);

  const drawerWidth = "60%";

  const classes = {
    drawerPaper: css({
      width: `calc(100% - ${drawerWidth})`,
      overflow: "unset", // we want scroll content, not scroll paper
    }),
    drawerContent: css({
      // maximize space for content
      flex: 1,
      overflow: "auto",
    }),
    drawerTitle: css({
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: "auto",
    }),
  };

  return (
    <div>
      <HvButton
        id="openDialog"
        aria-label="openDialog"
        onClick={() => setOpen(true)}
      >
        Open dialog
      </HvButton>
      <HvDrawer
        id="drawer-test"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={() => setOpen(false)}
      >
        <HvDialogTitle classes={{ root: classes.drawerTitle }}>
          Lorem Ipsum
        </HvDialogTitle>
        <HvDialogContent className={classes.drawerContent}>
          {`Cras mattis consectetur purus sit amet fermentum. 
                  Cras justo odio, dapibus ac facilisis in, egestas eget quam. 
                  Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`}
        </HvDialogContent>
        <HvDialogActions>
          <HvButton variant="primaryGhost">Submit</HvButton>
          <HvButton variant="primaryGhost" onClick={() => setOpen(false)}>
            Cancel
          </HvButton>
        </HvDialogActions>
      </HvDrawer>
    </div>
  );
};

describe("HvDrawer", () => {
  it("should open when closed", async () => {
    const { getByRole, queryByText, getByText, queryByRole } = render(
      <Sample startingOpen={false} />
    );

    const openButton = getByRole("button", { name: "openDialog" });
    expect(openButton).toBeInTheDocument();

    expect(queryByText("Lorem Ipsum")).toBeNull();

    expect(queryByRole("button", { name: "Close" })).toBeNull();

    await userEvent.click(openButton);

    expect(getByText("Lorem Ipsum")).toBeInTheDocument();
    const closeButton = getByRole("button", { name: "Close" });
    expect(closeButton).toBeInTheDocument();
  });

  it("should close when opened", async () => {
    const { getByRole, getByText, queryByRole } = render(
      <Sample startingOpen />
    );

    const closeButton = getByRole("button", { name: "Close" });
    const title = getByText("Lorem Ipsum");

    expect(closeButton).toBeInTheDocument();
    expect(title).toBeInTheDocument();

    expect(queryByRole("button", { name: "openDialog" })).toBeNull();

    await userEvent.click(closeButton);

    expect(getByRole("button", { name: "openDialog" })).toBeInTheDocument();

    expect(queryByRole("button", { name: "Close" })).toBeNull();
  });
});
