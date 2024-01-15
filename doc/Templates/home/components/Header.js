import React, { useContext } from "react";
import { useMediaQuery, useTheme, withStyles } from "@material-ui/core";
import { Alert, Menu, Settings, User } from "@hitachivantara/uikit-react-icons";
import {
  HvBadge,
  HvButton,
  HvHeader,
  HvHeaderActions,
  HvHeaderBrand,
  HvHeaderNavigation,
} from "@hitachivantara/uikit-react-core";
import HitachiLogo from "../../resources/HitachiLogo";
import styles from "../views/detail/styles";
import NavContext from "../hoc/NavContext";

const boxStyles = { width: 32, height: 32 };

// eslint-disable-next-line react/prop-types
const NavigationTemplate = () => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  const { headerNav, headerSelection, onHeaderSelection, shouldBeOpen } = useContext(NavContext);

  const handleChange = (evt, selectedItem) => {
    console.log("selectedItem: ", selectedItem);
    onHeaderSelection(selectedItem.id);
  };

  const toggleExpanded = () => {
    shouldBeOpen();
  };

  const handleClick = (evt) => console.log(evt);

  return (
    <HvHeader position="fixed">
      {!isMdUp && (
        <HvButton category="icon" onClick={toggleExpanded}>
          <Menu />
        </HvButton>
      )}
      <HvHeaderBrand logo={<HitachiLogo />} name={!isXs ? "Maintenance Insights" : undefined} />
      {isMdUp && (
        <HvHeaderNavigation data={headerNav} selected={headerSelection} onClick={handleChange} />
      )}
      <HvHeaderActions>
        {isMdUp && (
          <>
            <HvButton category="icon" onClick={handleClick} aria-label="settings">
              <Settings boxStyles={boxStyles} />
            </HvButton>
            <HvButton category="icon" onClick={handleClick} aria-label="profile">
              <User boxStyles={boxStyles} />
            </HvButton>
          </>
        )}
        <HvButton category="icon" onClick={handleClick} aria-label="alert">
          <HvBadge count={1} icon={<Alert boxStyles={boxStyles} />} />
        </HvButton>
      </HvHeaderActions>
    </HvHeader>
  );
};

export default withStyles(styles)(NavigationTemplate);
