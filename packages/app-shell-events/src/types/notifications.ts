import { ReactNode, SyntheticEvent } from "react";
import {
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
  actions?: ReactNode | HvActionGeneric[];
  actionsCallback?: (
    event: SyntheticEvent<Element, Event>,
    id: string,
    action: HvActionGeneric,
  ) => void;
};
