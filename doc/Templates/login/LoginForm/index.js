import { withStyles } from "@material-ui/core";
import styles from "./styles";
import LoginForm from "./LoginForm";

export default withStyles(styles, { name: "LoginForm" })(LoginForm);
