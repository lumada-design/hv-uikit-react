/* eslint-disable no-alert */
import React, { useState } from "react";
import { Alert, Level5, User, Fail } from "@hv/uikit-react-icons";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import {
  HvHeader,
  HvButton,
  HvHeaderActions,
  HvBadge,
  HvHeaderNavigation,
} from "@hv/uikit-react-core";
import HvNotificationPanel from "../NotificationPanel";

export default {
  title: "Lab/Notification Panel",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvNotificationsPanel } from "@hv/uikit-react-lab"',
  },
  component: HvNotificationPanel,
  decorators: [(storyFn) => <div style={{ height: "600px" }}>{storyFn()}</div>],
};

export const Main = () => {
  const useStyles = makeStyles((theme) => ({
    panelOpen: {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
  }));
  const classes = useStyles();

  const navigationData = [
    {
      id: "1",
      label: "Overview",
    },
    {
      id: "2",
      label: "Events",
    },

    {
      id: "3",
      label: "Asset",
    },
  ];

  const notificationSet = [
    {
      id: "1",
      title: "Cabin door knob malfunction. Super long test title, to test line break behavior.",
      isRead: false,
      date: new Date(),

      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "2",
      title: "Cabin door knob malfunction",
      isRead: false,
      date: new Date(),

      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "3",
      title: "Cabin door knob malfunction",
      isRead: true,
      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "4",
      title: "Cabin door knob malfunction",
      isRead: true,
      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
  ];

  const [notifications, setNotifications] = useState(notificationSet);
  const [allRead, setAllRead] = useState(false);

  const [open, setOpen] = useState(true);

  const markRead = (notificationIndex) => {
    const stateClone = notifications.map((el) => {
      if (el.id === notificationIndex) {
        // eslint-disable-next-line no-param-reassign
        el.isRead = true;
      }
      return el;
    });

    setNotifications(stateClone);
  };

  const removeNotification = (notificationIndex) => {
    const stateClone = [...notifications];
    const filteredNotifications = stateClone.filter((el) => el.id !== notificationIndex);
    setNotifications(filteredNotifications);
  };

  const markAllRead = (notificationsSet) => {
    const stateClone = [...notificationsSet];
    stateClone.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.isRead = true;
    });
    setAllRead(true);
    setNotifications(stateClone);
  };

  const actions = {
    dropdownProps: {},
    values: [
      {
        label: "Mark as read",
        action: "read",
        callback: (notificationIndex) => {
          markRead(notificationIndex);
        },
      },
      {
        label: "Remove",
        action: "remove",
        callback: (notificationIndex) => {
          removeNotification(notificationIndex);
        },
      },
    ],
  };

  const augmentedNotifications = (notificationsToAugment, actionSet) => {
    notificationsToAugment.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.actions = actionSet;
      return el;
    });

    return notificationsToAugment;
  };

  const footerButtons = (
    <>
      <HvButton
        category="ghost"
        disabled={allRead || notifications.length === 0}
        onClick={() => markAllRead(notifications)}
      >
        Mark All Read
      </HvButton>
      <HvButton category="ghost" onClick={() => alert("Open settings")}>
        Settings
      </HvButton>
    </>
  );

  const Header = () => (
    <HvHeader position="relative">
      <HvHeaderNavigation data={navigationData} />
      <HvHeaderActions>
        <HvButton
          icon
          onClick={() => setOpen(!open)}
          aria-label="Open Notifications panel"
          className={clsx({
            [classes.panelOpen]: open,
          })}
        >
          <HvBadge count={notifications.length} icon={<Alert />} />
        </HvButton>
        <HvButton icon onClick={() => console.log("user")} aria-label="Open User panel">
          <User />
        </HvButton>
      </HvHeaderActions>
    </HvHeader>
  );

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <HvNotificationPanel
        notifications={augmentedNotifications(notifications, actions)}
        open={open}
        footer={footerButtons}
        style={{ right: 30, height: "calc(100% - 130px)" }}
      />
    </div>
  );
};

export const WithNewNotificationsNotice = () => {
  const useStyles = makeStyles((theme) => ({
    panelOpen: {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
  }));
  const classes = useStyles();

  const navigationData = [
    {
      id: "1",
      label: "Overview",
    },
    {
      id: "2",
      label: "Events",
    },

    {
      id: "3",
      label: "Asset",
    },
  ];

  const notificationSet = [
    {
      id: "1",
      title: "Cabin door knob malfunction. Super long test title, to test line break behavior.",
      isRead: false,
      date: new Date(),

      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "2",
      title: "Cabin door knob malfunction",
      isRead: false,
      date: new Date(),
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "3",
      title: "Cabin door knob malfunction",
      isRead: true,
      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "4",
      title: "Cabin door knob malfunction",
      isRead: true,
      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
  ];

  const [notifications, setNotifications] = useState(notificationSet);
  const [allRead, setAllRead] = useState(false);

  const [open, setOpen] = useState(true);

  const markRead = (notificationIndex) => {
    const stateClone = notifications.map((el) => {
      if (el.id === notificationIndex) {
        // eslint-disable-next-line no-param-reassign
        el.isRead = true;
      }
      return el;
    });

    setNotifications(stateClone);
  };

  const removeNotification = (notificationIndex) => {
    const stateClone = [...notifications];
    const filteredNotifications = stateClone.filter((el) => el.id !== notificationIndex);
    setNotifications(filteredNotifications);
  };

  const markAllRead = (notificationsSet) => {
    const stateClone = [...notificationsSet];
    stateClone.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.isRead = true;
    });
    setAllRead(true);
    setNotifications(stateClone);
  };

  const actions = {
    dropDownMenuProps: {},
    values: [
      {
        label: "Mark as read",
        action: "read",
        callback: (notificationIndex) => {
          markRead(notificationIndex);
        },
      },
      {
        label: "Remove",
        action: "remove",
        callback: (notificationIndex) => {
          removeNotification(notificationIndex);
        },
      },
    ],
  };

  const augmentedNotifications = (notificationsToAugment, actionSet) => {
    notificationsToAugment.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.actions = actionSet;
      return el;
    });

    return notificationsToAugment;
  };

  const footerButtons = (
    <>
      <HvButton
        category="ghost"
        disabled={allRead || notifications.length === 0}
        onClick={() => markAllRead(notifications)}
      >
        Mark All Read
      </HvButton>
      <HvButton category="ghost" onClick={() => alert("Open settings")}>
        Settings
      </HvButton>
    </>
  );

  const Header = () => (
    <HvHeader position="relative">
      <HvHeaderNavigation data={navigationData} />
      <HvHeaderActions>
        <HvButton
          icon
          onClick={() => setOpen(!open)}
          aria-label="Open Notifications panel"
          className={clsx({
            [classes.panelOpen]: open,
          })}
        >
          <HvBadge count={notifications.length} icon={<Alert />} />
        </HvButton>
        <HvButton icon onClick={() => console.log("user")} aria-label="Open User panel">
          <User />
        </HvButton>
      </HvHeaderActions>
    </HvHeader>
  );

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <HvNotificationPanel
        hasNewNotifications
        notifications={augmentedNotifications(notifications, actions)}
        open={open}
        footer={footerButtons}
        style={{ right: 30, height: "calc(100% - 130px)" }}
        newNotificationsButtonAction={() => alert("Update notifications")}
      />
    </div>
  );
};

export const EmptyPanel = () => {
  const useStyles = makeStyles((theme) => ({
    panelOpen: {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
  }));
  const classes = useStyles();
  const navigationData = [
    {
      id: "1",
      label: "Overview",
    },
    {
      id: "2",
      label: "Events",
    },
    {
      id: "3",
      label: "Asset",
    },
  ];
  const [open, setOpen] = useState(true);

  const notifications = [];

  const footerButtons = (
    <>
      <HvButton
        category="ghost"
        disabled={notifications.length === 0}
        onClick={() => alert("Mark all read")}
      >
        Mark All Read
      </HvButton>
      <HvButton category="ghost" onClick={() => alert("Open settings")}>
        Settings
      </HvButton>
    </>
  );

  const Header = () => (
    <HvHeader position="relative">
      <HvHeaderNavigation data={navigationData} />
      <HvHeaderActions>
        <HvButton
          icon
          onClick={() => setOpen(!open)}
          aria-label="Open Notifications panel"
          className={clsx({
            [classes.panelOpen]: open,
          })}
        >
          <HvBadge count={notifications.length} icon={<Alert />} />
        </HvButton>
        <HvButton icon onClick={() => console.log("user")} aria-label="Open User panel">
          <User />
        </HvButton>
      </HvHeaderActions>
    </HvHeader>
  );

  return (
    <div>
      <Header />
      <HvNotificationPanel
        id="emptyStateSample"
        notifications={notifications}
        footer={footerButtons}
        open={open}
        style={{ right: 30, height: "calc(100% - 130px)" }}
      />
    </div>
  );
};

export const EmptyPanelWithCustomMessages = () => {
  const useStyles = makeStyles((theme) => ({
    panelOpen: {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
  }));
  const classes = useStyles();
  const navigationData = [
    {
      id: "1",
      label: "Overview",
    },
    {
      id: "2",
      label: "Events",
    },
    {
      id: "3",
      label: "Asset",
    },
  ];
  const [open, setOpen] = useState(true);

  const notifications = [];

  const footerButtons = (
    <>
      <HvButton
        category="ghost"
        disabled={notifications.length === 0}
        onClick={() => alert("Mark all read")}
      >
        Mark All Read
      </HvButton>
      <HvButton category="ghost" onClick={() => alert("Open settings")}>
        Settings
      </HvButton>
    </>
  );

  const Header = () => (
    <HvHeader position="relative">
      <HvHeaderNavigation data={navigationData} />
      <HvHeaderActions>
        <HvButton
          icon
          onClick={() => setOpen(!open)}
          aria-label="Open Notifications panel"
          className={clsx({
            [classes.panelOpen]: open,
          })}
        >
          <HvBadge count={notifications.length} icon={<Alert />} />
        </HvButton>
        <HvButton icon onClick={() => console.log("user")} aria-label="Open User panel">
          <User />
        </HvButton>
      </HvHeaderActions>
    </HvHeader>
  );

  return (
    <div>
      <Header />
      <HvNotificationPanel
        id="customEmptyState"
        notifications={notifications}
        footer={footerButtons}
        open={open}
        style={{ right: "30px" }}
        emptyStatePanelTitle="No results"
        emptyStatePanelMessage="Could not retrieve notifications."
        emptyStatePanelIcon={<Fail />}
      />
    </div>
  );
};

export const OverflownPanel = () => {
  const useStyles = makeStyles((theme) => ({
    panelOpen: {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
  }));
  const classes = useStyles();
  const navigationData = [
    {
      id: "1",
      label: "Overview",
    },
    {
      id: "2",
      label: "Events",
    },

    {
      id: "3",
      label: "Asset",
    },
  ];

  const notificationSet = [
    {
      id: "1",
      title: "Cabin door knob malfunction. Super long test title, to test line break behavior.",
      isRead: false,
      date: new Date(),

      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "2",
      title: "Cabin door knob malfunction",
      isRead: false,
      date: new Date(),

      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "3",
      title: "Cabin door knob malfunction",
      isRead: false,

      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "4",
      title: "Cabin door knob malfunction",
      isRead: true,
      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },

    {
      id: "5",
      title: "Cabin door knob malfunction",
      isRead: false,
      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "6",
      title: "Cabin door knob malfunction",
      isRead: false,
      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "7",
      title: "Cabin door knob malfunction",
      isRead: false,
      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "8",
      title: "Cabin door knob malfunction",
      isRead: true,
      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "9",
      title: "Cabin door knob malfunction",
      isRead: true,
      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "10",
      title: "Cabin door knob malfunction",
      isRead: true,
      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
  ];

  const [notifications, setNotifications] = useState(notificationSet);

  const [open, setOpen] = useState(true);
  const [allRead, setAllRead] = useState(false);

  const markRead = (notificationIndex) => {
    const stateClone = notifications.map((el) => {
      if (el.id === notificationIndex) {
        // eslint-disable-next-line no-param-reassign
        el.isRead = true;
      }
      return el;
    });

    setNotifications(stateClone);
  };

  const removeNotification = (notificationIndex) => {
    const stateClone = [...notifications];
    const filteredNotifications = stateClone.filter((el) => el.id !== notificationIndex);
    setNotifications(filteredNotifications);
  };

  const markAllRead = (notificationsSet) => {
    const stateClone = [...notificationsSet];
    stateClone.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.isRead = true;
    });
    setAllRead(true);
    setNotifications(stateClone);
  };

  const actions = {
    dropdownProps: {},
    values: [
      {
        label: "Mark as read",
        action: "read",
        callback: (notificationIndex) => {
          markRead(notificationIndex);
        },
      },
      {
        label: "Remove",
        action: "remove",
        callback: (notificationIndex) => {
          removeNotification(notificationIndex);
        },
      },
    ],
  };

  const augmentedNotifications = (notificationsToAugment, actionSet) => {
    notificationsToAugment.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.actions = actionSet;
      return el;
    });

    return notificationsToAugment;
  };

  const footerButtons = (
    <>
      <HvButton
        category="ghost"
        disabled={allRead || notifications.length === 0}
        onClick={() => markAllRead(notifications)}
      >
        Mark All Read
      </HvButton>
      <HvButton category="ghost" onClick={() => alert("Open settings")}>
        Settings
      </HvButton>
    </>
  );

  const Header = () => (
    <HvHeader position="relative">
      <HvHeaderNavigation data={navigationData} />
      <HvHeaderActions>
        <HvButton
          icon
          onClick={() => setOpen(!open)}
          aria-label="Open Notifications panel"
          className={clsx({
            [classes.panelOpen]: open,
          })}
        >
          <HvBadge count={notifications.length} icon={<Alert />} />
        </HvButton>
        <HvButton icon onClick={() => console.log("user")} aria-label="Open User panel">
          <User />
        </HvButton>
      </HvHeaderActions>
    </HvHeader>
  );

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <HvNotificationPanel
        notifications={augmentedNotifications(notifications, actions)}
        open={open}
        footer={footerButtons}
        style={{ right: 30, height: "calc(100% - 130px)" }}
      />
    </div>
  );
};

export const WithCustomLabels = () => {
  const useStyles = makeStyles((theme) => ({
    panelOpen: {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
  }));
  const classes = useStyles();

  const navigationData = [
    {
      id: "1",
      label: "Overview",
    },
    {
      id: "2",
      label: "Events",
    },

    {
      id: "3",
      label: "Asset",
    },
  ];

  const notificationSet = [
    {
      id: "1",
      title: "Cabin door knob malfunction. Super long test title, to test line break behavior.",
      isRead: false,
      date: new Date(),

      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "2",
      title: "Cabin door knob malfunction",
      isRead: false,
      date: new Date(),
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "3",
      title: "Cabin door knob malfunction",
      isRead: true,
      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "4",
      title: "Cabin door knob malfunction",
      isRead: true,
      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
  ];

  const customLabels = {
    notificationGroupHeader: {
      newNotifications: "Just now",
      olderNotifications: "An hour ago",
    },
    notificationIndicator: {
      label: "New notifications",
      buttonLabel: "Retrieve",
    },
  };

  const [notifications, setNotifications] = useState(notificationSet);
  const [allRead, setAllRead] = useState(false);

  const [open, setOpen] = useState(true);

  const markRead = (notificationIndex) => {
    const stateClone = notifications.map((el) => {
      if (el.id === notificationIndex) {
        // eslint-disable-next-line no-param-reassign
        el.isRead = true;
      }
      return el;
    });

    setNotifications(stateClone);
  };

  const removeNotification = (notificationIndex) => {
    const stateClone = [...notifications];
    const filteredNotifications = stateClone.filter((el) => el.id !== notificationIndex);
    setNotifications(filteredNotifications);
  };

  const markAllRead = (notificationsSet) => {
    const stateClone = [...notificationsSet];
    stateClone.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.isRead = true;
    });
    setAllRead(true);
    setNotifications(stateClone);
  };

  const actions = {
    dropdownProps: {},
    values: [
      {
        label: "Mark as read",
        action: "read",
        callback: (notificationIndex) => {
          markRead(notificationIndex);
        },
      },
      {
        label: "Remove",
        action: "remove",
        callback: (notificationIndex) => {
          removeNotification(notificationIndex);
        },
      },
    ],
  };

  const augmentedNotifications = (notificationsToAugment, actionSet) => {
    notificationsToAugment.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.actions = actionSet;
      return el;
    });

    return notificationsToAugment;
  };

  const footerButtons = (
    <>
      <HvButton
        category="ghost"
        disabled={allRead || notifications.length === 0}
        onClick={() => markAllRead(notifications)}
      >
        Mark All Read
      </HvButton>
      <HvButton category="ghost" onClick={() => alert("Open settings")}>
        Settings
      </HvButton>
    </>
  );

  const Header = () => (
    <HvHeader position="relative">
      <HvHeaderNavigation data={navigationData} />
      <HvHeaderActions>
        <HvButton
          icon
          onClick={() => setOpen(!open)}
          aria-label="Open Notifications panel"
          className={clsx({
            [classes.panelOpen]: open,
          })}
        >
          <HvBadge count={notifications.length} icon={<Alert />} />
        </HvButton>
        <HvButton icon onClick={() => console.log("user")} aria-label="Open User panel">
          <User />
        </HvButton>
      </HvHeaderActions>
    </HvHeader>
  );

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <HvNotificationPanel
        hasNewNotifications
        notifications={augmentedNotifications(notifications, actions)}
        open={open}
        footer={footerButtons}
        style={{ right: 30, height: "calc(100% - 130px)" }}
        labels={customLabels}
        newNotificationsButtonAction={() => alert("Update notifications")}
      />
    </div>
  );
};

export const WithSpecifiedLocale = () => {
  const useStyles = makeStyles((theme) => ({
    panelOpen: {
      backgroundColor: theme.hv.palette.atmosphere.atmo3,
    },
  }));
  const classes = useStyles();

  const navigationData = [
    {
      id: "1",
      label: "Overview",
    },
    {
      id: "2",
      label: "Events",
    },

    {
      id: "3",
      label: "Asset",
    },
  ];

  const notificationSet = [
    {
      id: "1",
      title: "Cabin door knob malfunction. Super long test title, to test line break behavior.",
      isRead: false,
      date: new Date(),

      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "2",
      title: "Cabin door knob malfunction",
      isRead: false,
      date: new Date(),

      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "3",
      title: "Cabin door knob malfunction",
      isRead: true,
      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
    {
      id: "4",
      title: "Cabin door knob malfunction",
      isRead: true,
      date: new Date("6/19/2019"),
      icon: <Level5 semantic="sema4" />,
      onClick: () => {
        alert("Clicked");
      },
      onKeyPress: () => {
        alert("Keypress Clicked");
      },
    },
  ];

  const [notifications, setNotifications] = useState(notificationSet);
  const [allRead, setAllRead] = useState(false);

  const [open, setOpen] = useState(true);

  const markRead = (notificationIndex) => {
    const stateClone = notifications.map((el) => {
      if (el.id === notificationIndex) {
        // eslint-disable-next-line no-param-reassign
        el.isRead = true;
      }
      return el;
    });

    setNotifications(stateClone);
  };

  const removeNotification = (notificationIndex) => {
    const stateClone = [...notifications];
    const filteredNotifications = stateClone.filter((el) => el.id !== notificationIndex);
    setNotifications(filteredNotifications);
  };

  const markAllRead = (notificationsSet) => {
    const stateClone = [...notificationsSet];
    stateClone.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.isRead = true;
    });
    setAllRead(true);
    setNotifications(stateClone);
  };

  const actions = {
    dropdownProps: {},
    values: [
      {
        label: "Mark as read",
        action: "read",
        callback: (notificationIndex) => {
          markRead(notificationIndex);
        },
      },
      {
        label: "Remove",
        action: "remove",
        callback: (notificationIndex) => {
          removeNotification(notificationIndex);
        },
      },
    ],
  };

  const augmentedNotifications = (notificationsToAugment, actionSet) => {
    notificationsToAugment.forEach((el) => {
      // eslint-disable-next-line no-param-reassign
      el.actions = actionSet;
      return el;
    });

    return notificationsToAugment;
  };

  const footerButtons = (
    <>
      <HvButton
        category="ghost"
        disabled={allRead || notifications.length === 0}
        onClick={() => markAllRead(notifications)}
      >
        Mark All Read
      </HvButton>
      <HvButton category="ghost" onClick={() => alert("Open settings")}>
        Settings
      </HvButton>
    </>
  );

  const Header = () => (
    <HvHeader position="relative">
      <HvHeaderNavigation data={navigationData} />
      <HvHeaderActions>
        <HvButton
          icon
          onClick={() => setOpen(!open)}
          aria-label="Open Notifications panel"
          className={clsx({
            [classes.panelOpen]: open,
          })}
        >
          <HvBadge count={notifications.length} icon={<Alert />} />
        </HvButton>
        <HvButton icon onClick={() => console.log("user")} aria-label="Open User panel">
          <User />
        </HvButton>
      </HvHeaderActions>
    </HvHeader>
  );

  return (
    <div style={{ width: "100%" }}>
      <Header />
      <HvNotificationPanel
        notifications={augmentedNotifications(notifications, actions)}
        open={open}
        footer={footerButtons}
        style={{ right: 30, height: "calc(100% - 130px)" }}
        locale="pt-PT"
      />
    </div>
  );
};
