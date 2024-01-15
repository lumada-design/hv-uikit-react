import React, { useContext } from "react";
import { useMediaQuery, useTheme, withStyles } from "@material-ui/core";
import { Settings, User } from "@hitachivantara/uikit-react-icons";
import {
  HvVerticalNavigation,
  HvVerticalNavigationTree,
  HvVerticalNavigationActions,
  HvVerticalNavigationAction,
} from "@hitachivantara/uikit-react-core";
import styles from "../views/detail/styles";
import NavContext from "../hoc/NavContext";

// eslint-disable-next-line react/prop-types
const NavigationTemplate = ({ hasAnchor }) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const {
    isOpen,
    verticalNavData,
    verticalSelection,
    onVerticalSelection,
    shouldBeOpen,
  } = useContext(NavContext);

  const handleChange = (evt, selectedItem) => {
    onVerticalSelection(selectedItem.id);
  };

  return (
    <>
      {(verticalNavData.length || null) && (isMdUp || isOpen) && (
        <HvVerticalNavigation
          position="fixed"
          isCollapsable={hasAnchor && isMdUp}
          isOpen={!isMdUp ? null : isOpen || (!hasAnchor && isMdUp)}
          toggleOpenCallback={(value) => shouldBeOpen(value)}
        >
          <HvVerticalNavigationTree
            data={verticalNavData}
            selected={verticalSelection}
            onClick={handleChange}
          />
          {!isMdUp && (
            <HvVerticalNavigationActions>
              <HvVerticalNavigationAction label="Settings" icon={<Settings />} />
              <HvVerticalNavigationAction label="Profile" icon={<User />} />
            </HvVerticalNavigationActions>
          )}
        </HvVerticalNavigation>
      )}
    </>
  );
};

export default withStyles(styles)(NavigationTemplate);
