/*
 * Copyright 2019 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react"
import {mount} from "enzyme/build"
import moment from 'moment/moment'
import HvProvider from "@hv/uikit-react-core/dist/Provider"
import HvNotificationPanelWithStyles from "../index"
import HvNotificationPanel from "../NotificationPanel"
import Notification from '../Notification'

Date.now = jest.fn(() => 1561396490043)

const baseProps = {
  classes: {},
  open: false,
  icon: <img alt="test" src="test" />,
  header: {
    headerTitle: "Test title",
    headerCloseImg: <img alt="test" src="testCloseImg" />
  },
  notifications: [
    {
      id: "1",
      title: "Test",
      isRead: false,
      date: moment(),
      icon: <img alt="test" src="test warning" />
    },
    {
      id: "2",
      title: "Test 2",
      isRead: true,
      date: moment().subtract(1, 'day')
    },
    {
      id: "3",
      title: "Test 2",
      isRead: true,
      date: moment().subtract(1, "month")
    }
  ],
  footer: <div className="footer" />
}

describe("Hv NotificationPanel", () => {
  let wrapper

  describe("index", () => {
    beforeEach(async() => {
      wrapper = mount(
        <HvProvider>
          <HvNotificationPanelWithStyles {...baseProps} />
        </HvProvider>
      )
    })

    it("should be defined", () => {
      expect(wrapper).toBeDefined()
    })

    it("mandatory and default properties are defined and received by child components", () => {
      const {open, icon, header, notifications, footer} = wrapper.find(HvNotificationPanel).instance().props

      expect(open).toBe(false)
      expect(icon).toBeTruthy()
      expect(header).toBeTruthy()
      expect(header.headerTitle).toEqual("Test title")
      expect(header.headerCloseImg).toBeTruthy()
      expect(notifications).toBeTruthy()
      expect(notifications.length).toEqual(3)
      expect(footer).toBeTruthy()
    })
  })

  describe("is rendered correctly and behaves as expected", () => {
    beforeEach(async() => {
      wrapper = mount(
        <HvProvider>
          <HvNotificationPanel {...baseProps} />
        </HvProvider>
      )
    })

    it("should open and close panel correctly", () => {
      const notificationPanel = wrapper.find(HvNotificationPanel)
      const instance = notificationPanel.instance()

      expect(instance.state.open).toBe(false)

      instance.handleIconClick()

      expect(instance.state.open).toBe(true)

      instance.handleIconClick()

      expect(instance.state.open).toBe(false)
    })

    it("should close panel correctly", () => {
      const notificationPanel = wrapper.find(HvNotificationPanel)
      const instance = notificationPanel.instance()

      expect(instance.state.open).toBe(false)

      instance.handleIconClick()

      expect(instance.state.open).toBe(true)

      instance.onClose()

      expect(instance.state.open).toBe(false)
    })

    it("should have correct time notification was created", () => {
      const notifications = wrapper.find(Notification)

      expect(notifications.length).toEqual(3)

      expect(notifications.children().at(0).instance().getTime()).toEqual("a few seconds ago")

      expect(notifications.children().at(1).instance().getTime()).toEqual("Sun, 10:14 AM")

      expect(notifications.children().at(2).instance().getTime()).toEqual("24 May 2019, 10:14 AM")
    })
  })
})
