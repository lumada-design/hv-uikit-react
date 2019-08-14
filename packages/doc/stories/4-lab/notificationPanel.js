import React from "react";
import { storiesOf } from "@storybook/react";
import NotificationPanel from "@hv/uikit-react-lab/dist/NotificationPanel"

storiesOf("Lab", module).add("NotificationPanel", () => <NotificationPanel />, {
	title: "NotificationPanel",
	description: "Notification Panel displays all of read and unread notifications",
	examples: [
		{
			title: "Simple NotificationPanel",
			src: "lab/notificationPanel/notificationPanel1.js"
		},
	]
});