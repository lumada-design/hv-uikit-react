/*
 * Copyright 2020 Hitachi Vantara Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import UserPreferences from "./UserPreferences";

export default withStyles(styles, {
  name: "HvUserPreferences",
  withTheme: true
})(UserPreferences);

export { default as Actions } from "./Actions";
export * from "./Actions";

export { default as Group } from "./Options/Group";

export { default as Label } from "./Options/Label";

export { default as Options } from "./Options";
export * from "./Options";
