import withStyles from "@hv/uikit-react-core/dist/styles/withStyles";
import styles from "./styles";
import Notification from "./Notification";

export default withStyles(styles, { name: "HvNotificationPanelNotification" })(
  Notification
);
