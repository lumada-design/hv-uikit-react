import withStyles from "@hv/uikit-react-core/dist/styles/withStyles";
import styles from "./styles";
import NotificationPanel from "./NotificationPanel";

export default withStyles(styles, { name: "HvNotificationPanel" })(
  NotificationPanel
);
