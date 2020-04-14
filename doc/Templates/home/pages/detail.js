import withLayout from "../hoc/withLayout";
import Detail from "../views/detail";
import SnackbarController from "../notifications/Snackbar";

export default withLayout(Detail, SnackbarController, false);
