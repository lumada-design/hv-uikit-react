import React from "react";
import DropDownMenu from "@hv/uikit-react-core/dist/DropDownMenu";
import MoreVert from "@hv/uikit-react-icons/dist/Generic/MoreOptionsVertical";
import withStyles from "@material-ui/core/styles/withStyles";
import UserIcon from "@hv/uikit-react-icons/dist/Generic/User";
import CalendarIcon from "@hv/uikit-react-icons/dist/Generic/Calendar";
import PlaneIcon from "@hv/uikit-react-icons/dist/Generic/Plane";

const styles = () => ({
  box: {
    padding: "6px",
    width: "30px",
    height: "30px"
  }
});

const StyledUserIcon = withStyles(styles, { withTheme: true })(
  ({ classes, theme, selected }) => {
    const color = selected ? [theme.hv.palette.atmosphere.atmo1] : undefined;

    return <UserIcon className={classes.box} color={color} />;
  }
);

const StyledCalendarIcon = withStyles(styles, { withTheme: true })(
  ({ classes, theme, selected }) => {
    const color = selected ? [theme.hv.palette.atmosphere.atmo1] : undefined;

    return <CalendarIcon className={classes.box} color={color} />;
  }
);

const StyledPlaneIcon = withStyles(styles, { withTheme: true })(
  ({ classes, theme, disabled }) => {
    const color = disabled ? [theme.hv.palette.atmosphere.atmo7] : undefined;
    return <PlaneIcon className={classes.box} color={color} />;
  }
);

const menuOptions = [
  {
    label: "Label 1",
    iconCallback: ({ isSelected }) => <StyledUserIcon selected={isSelected} />
  },
  {
    label: "Label 2",
    iconCallback: ({ isSelected }) => (
      <StyledCalendarIcon selected={isSelected} />
    )
  },
  {
    label: "Label 3",
    iconCallback: ({ isSelected }) => <StyledPlaneIcon selected={isSelected} />
  }
];

export default (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <DropDownMenu
      icon={
        <MoreVert
          boxStyles={{ width: "30px", padding: "7px" }}
          style={{ display: "block" }}
        />
      }
      dataList={menuOptions}
      placement="right"
      onClick={e => alert(e.label)}
    />
  </div>
);
