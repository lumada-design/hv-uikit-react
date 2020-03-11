import React, { useContext } from "react";
import { useMediaQuery, useTheme, withStyles } from "@material-ui/core";
import { Settings, User } from "@hv/uikit-react-icons/dist";
import VerticalNavigation, {
  Action,
  Actions,
  Navigation
} from "@hv/uikit-react-core/dist/VerticalNavigation";
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
    shouldBeOpen
  } = useContext(NavContext);

  const handleChange = (evt, selectedItem) => {
    onVerticalSelection(selectedItem.id);
  };

  return (
    <>
      {(verticalNavData.length || null) && (isMdUp || isOpen) && (
        <VerticalNavigation
          position="fixed"
          isCollapsable={hasAnchor && isMdUp}
          isOpen={!isMdUp ? null : isOpen || (!hasAnchor && isMdUp)}
          toggleOpenCallback={value => shouldBeOpen(value)}
        >
          <Navigation data={verticalNavData} selected={verticalSelection} onClick={handleChange} />
          {!isMdUp && (
            <Actions>
              <Action label="Settings" icon={<Settings />} />
              <Action label="Profile" icon={<User />} />
            </Actions>
          )}
        </VerticalNavigation>
      )}
    </>
  );
};

export default withStyles(styles)(NavigationTemplate);
