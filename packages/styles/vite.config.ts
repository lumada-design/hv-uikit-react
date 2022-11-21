import definePkgConfig from "../../config/vite.config";
import pkg from "./package.json";

export default definePkgConfig("src", [...Object.keys(pkg.dependencies)]);
