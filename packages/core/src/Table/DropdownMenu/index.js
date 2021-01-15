import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MoreOptionsVertical } from "@hv/uikit-react-icons";
import HvDropDownMenu from "../../DropDownMenu";

// eslint-disable-next-line react/prop-types
const DropDownMenu = ({ id, secondaryActions, dropdownMenuProps, original }) => {
  const useStyles = makeStyles({
    inputExtensionOpen: {
      width: "30px",
    },
  });

  const dropdownClasses = useStyles();

  return (
    <HvDropDownMenu
      classes={{ inputExtensionOpen: dropdownClasses.inputExtensionOpen }}
      id={id}
      disablePortal={false}
      icon={<MoreOptionsVertical style={{ width: 30, height: 30 }} />}
      dataList={secondaryActions}
      onClick={(event, item) => {
        event.stopPropagation();
        item?.action?.(event, original);
      }}
      keepOpened={false}
      placement="left"
      {...dropdownMenuProps}
    />
  );
};

export default DropDownMenu;
