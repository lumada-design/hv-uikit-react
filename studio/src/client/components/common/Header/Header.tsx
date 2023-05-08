import {
  HvHeader,
  HvHeaderBrand,
  HvHeaderActions,
  HvBadge,
} from "@hitachivantara/uikit-react-core";
import { Alert, Desktop, Mobile } from "@hitachivantara/uikit-react-icons";

import UIKitLogo from "assets/UIKitLogo";
import { IconButton } from "components/common";
import useEditorStore from "lib/store/useEditorStore";
import classes from "./styles";

export const Header = () => {
  const { canvas, setCanvasMode } = useEditorStore();

  return (
    <HvHeader classes={{ root: classes.root }}>
      <HvHeaderBrand
        logo={<UIKitLogo style={{ height: 15 }} />}
        name="Studio"
      />

      <div className={classes.controls}>
        <IconButton
          selected={canvas.mode === "desktop"}
          title="Desktop"
          onClick={() => setCanvasMode("desktop")}
        >
          <Desktop />
        </IconButton>
        <IconButton
          selected={canvas.mode === "mobile"}
          title="Mobile"
          onClick={() => setCanvasMode("mobile")}
        >
          <Mobile />
        </IconButton>
      </div>

      <HvHeaderActions>
        <HvBadge
          showCount
          count={8}
          icon={<Alert />}
          style={{ marginRight: 10 }}
        />
      </HvHeaderActions>
    </HvHeader>
  );
};
