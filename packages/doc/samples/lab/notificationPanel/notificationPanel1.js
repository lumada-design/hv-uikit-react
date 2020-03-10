import React from "react";
import HvNotificationPanel from "@hv/uikit-react-lab/dist/NotificationPanel";
import { Alert, Close, Level5 } from "@hv/uikit-react-icons/dist";
import withStyles from "@hv/uikit-react-core/dist/styles/withStyles";

const styles = {
  panel: { top: "65px", height: "500px" },
  badgeBorder: {
    top: "-5px",
    right: "-20px"
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
    cursor: "pointer"
  }
};

const SimpleNotificationPanel = ({ classes }) => {
  const npProps = {
    icon: <Alert />,
    open: true,
    classes: {
      panel: classes.panel,
      badgeBorder: classes.badgeBorder
    },
    header: {
      headerTitle: "Notifications",
      headerCloseImg: <Close iconSize="XS" />
    },
    notifications: [
      {
        id: "1",
        title: "Test",
        isRead: false,
        date: new Date(),
        icon: <Level5 semantic="sema6" />
      },
      {
        id: "2",
        title: "Test 2",
        isRead: true,
        date: new Date("6/19/2019")
      }
    ],
    footer: <div className={classes.footer}>Mark All Read</div>
  };

  return (
    <div>
      <HvNotificationPanel {...npProps} />
    </div>
  );
};

const SimpleNotificationPanelWithStyles = withStyles(styles)(
  SimpleNotificationPanel
);

export default (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "flex-end",
      position: "relative"
    }}
  >
    <SimpleNotificationPanelWithStyles />
  </div>
);
