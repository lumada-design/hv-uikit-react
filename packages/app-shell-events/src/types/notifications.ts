import type {
  HvActionGeneric,
  HvBannerVariant,
  HvSnackbarVariant,
} from "@hitachivantara/uikit-react-core";

export const HvAppShellEventNotificationTrigger =
  "@hv/app-shell:notifications:trigger";

export type HvAppShellEventNotificationType = "snackbar" | "banner";

export type HvAppShellEventNotification = {
  type: HvAppShellEventNotificationType;
  message?: string;
  variant?: HvBannerVariant | HvSnackbarVariant;
  actions?: React.ReactNode | HvActionGeneric[];
  actionsCallback?: (
    event: React.SyntheticEvent<Element, Event>,
    id: string,
    action: HvActionGeneric,
  ) => void;
};
