import definePkgConfig from "../../config/vite.config";
import pkg from "./package.json";

export default definePkgConfig("bin", [
  ...Object.keys(pkg.dependencies),
  ...Object.keys(pkg.peerDependencies),
]);
