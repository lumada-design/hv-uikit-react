# Notifications

The **App Shell** supports [NEXT Design System's](https://designsystem.hitachivantara.com/6c705d900/p/98e9c3-next-design-system/b/5220ff) notification features to capture user attention effectively. It offers two distinct modes to deliver timely information and facilitate immediate action:

- [Banners](https://lumada-design.github.io/uikit/master/?path=/docs/components-banner--docs): For persistent messages that require user engagement.
- [SnackBars](https://lumada-design.github.io/uikit/master/?path=/docs/components-snackbar--docs): For transient messages that convey brief, auto-dismissing alerts.

## Triggering Notifications

To trigger notifications, the **App Shell** listens to the CustomEvent `@hv/app-shell:notifications:trigger`.

When dispatching this event, the detail object should include:

- `type`: The notification type (`"snackbar"` or `"banner"`).
- `variant`: The variant of the notification, corresponding with the [UI-KIT notification variants](https://lumada-design.github.io/uikit/master/?path=/docs/components-snackbar--variants).
- `message`: The notification text to be displayed.
- `actions`: Actions to display.
- `actionsCallback`: The callback function ran when an action is triggered, receiving action as parameter.

For event dispatching, utilize the `globalThis` variable and below is an example on how to trigger a "success" snackbar notification with the message "This is a snackbar":

```ts
const actions = {
  actions: [
    { id: "action1", label: "Action 1" },
    { id: "action2", label: "Action 2" },
  ],
  actionsCallback: (evt, id, action) => {
    // do something
  },
};
const customEvent = new CustomEvent<HvAppShellEventNotification>()(
  HvAppShellEventNotificationTrigger,
  {
    detail: {
      type: "snackbar",
      variant: "success",
      message: "This is a snackbar",
      ...actions,
    },
  },
);
globalThis.dispatchEvent(customEvent);
```

For more examples, explore the [notification playground sample](../client/samples/default-app/src/pages/Notifications/Notifications.tsx).
