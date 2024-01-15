import React from "react";
import { mount } from "enzyme/build";
import moment from "moment-timezone";
import { HvProvider } from "@hitachivantara/uikit-react-core";
import HvNotificationPanel from "..";
import Notification from "../Notification";

Date.now = jest.fn(() => 1561396490043);

const baseProps = {
  classes: {},
  open: false,
  icon: <img alt="test" src="test" />,
  header: {
    headerTitle: "Test title",
    headerCloseImg: <img alt="test" src="testCloseImg" />,
  },
  notifications: [
    {
      id: "1",
      title: "Test",
      isRead: false,
      date: moment.tz("Europe/Lisbon"),
      icon: <img alt="test" src="test warning" />,
    },
    {
      id: "2",
      title: "Test 2",
      isRead: true,
      date: moment.tz("Europe/Lisbon").subtract(1, "day"),
    },
    {
      id: "3",
      title: "Test 2",
      isRead: true,
      date: moment.tz("Europe/Lisbon").subtract(1, "month"),
    },
  ],
  footer: <div className="footer" />,
};

describe("Hv NotificationPanel", () => {
  let wrapper;

  describe("index", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <HvNotificationPanel {...baseProps} />
        </HvProvider>
      );
    });

    it("should be defined", () => {
      expect(wrapper).toBeDefined();
    });

    it("mandatory and default properties are defined and received by child components", () => {
      const { open, icon, header, notifications, footer } = wrapper
        .find("HvNotificationPanel")
        .instance().props;

      expect(open).toBe(false);
      expect(icon).toBeTruthy();
      expect(header).toBeTruthy();
      expect(header.headerTitle).toEqual("Test title");
      expect(header.headerCloseImg).toBeTruthy();
      expect(notifications).toBeTruthy();
      expect(notifications.length).toEqual(3);
      expect(footer).toBeTruthy();
    });
  });

  describe("is rendered correctly and behaves as expected", () => {
    beforeEach(async () => {
      wrapper = mount(
        <HvProvider>
          <HvNotificationPanel {...baseProps} />
        </HvProvider>
      );
    });

    it("should open and close panel correctly", () => {
      const notificationPanel = wrapper.find("HvNotificationPanel");
      const instance = notificationPanel.instance();

      expect(instance.state.open).toBe(false);

      instance.handleIconClick();

      expect(instance.state.open).toBe(true);

      instance.handleIconClick();

      expect(instance.state.open).toBe(false);
    });

    it("should close panel correctly", () => {
      const notificationPanel = wrapper.find("HvNotificationPanel");
      const instance = notificationPanel.instance();

      expect(instance.state.open).toBe(false);

      instance.handleIconClick();

      expect(instance.state.open).toBe(true);

      instance.onClose();

      expect(instance.state.open).toBe(false);
    });

    it("should have correct time notification was created", () => {
      const notifications = wrapper.find(Notification);

      expect(notifications.length).toEqual(3);

      expect(notifications.children().at(0).instance().getTime()).toEqual("a few seconds ago");

      expect(notifications.children().at(1).instance().getTime()).toEqual("Sun, 6:14 PM");

      expect(notifications.children().at(2).instance().getTime()).toEqual("24 May 2019, 6:14 PM");
    });
  });
});
