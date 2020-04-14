import withLayout from "../hoc/withLayout";
import Home from "../views/home";
import BannerController from "../notifications/Banner";

export default withLayout(Home, BannerController);
