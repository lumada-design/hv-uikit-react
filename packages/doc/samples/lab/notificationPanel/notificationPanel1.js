import React, { Component } from "react";
import HvNotificationPanel from "@hv/uikit-react-lab/dist/NotificationPanel";

import AlertS from "@hv/uikit-react-icons/dist/DawnTheme/Alert.S";
import CloseXS from "@hv/uikit-react-icons/dist/DawnTheme/Close.XS";
import Level5 from "@hv/uikit-react-icons/dist/DawnTheme/Level5.sema6.S";
import withStyles from "@material-ui/core/styles/withStyles";

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

class SimpleNotificationPanel extends Component {
  render() {
    const { classes } = this.props;

    const npProps = {
      icon: <AlertS />,
      open: true,
      classes: {
        panel: classes.panel,
        badgeBorder: classes.badgeBorder
      },
      header: {
        headerTitle: "Notifications",
        headerCloseImg: <CloseXS />
      },
      notifications: [
        {
          id: "1",
          title: "Test",
          isRead: false,
          date: new Date(),
          icon: <Level5 />
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
  }
}

const SimpleNotificationPanelWithStyles = withStyles(styles, {
  withTheme: true
})(SimpleNotificationPanel);

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
