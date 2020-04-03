/*
 * Copyright 2019 Hitachi Vantara Corporation
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
import withDeprecate from "@hv/uikit-react-core/dist/withDeprecate";
import styles from "./styles";
import ListItem from "./ListItem";

export { default as HvListItemLeftContent } from "./LeftContent";
export { default as HvListItemRightContent } from "./RightContent";
export { default as HvListItemContent } from "./Content";
export { default as HvListItemMedia } from "./Media";

export default withDeprecate(
  withStyles(styles, {   name: "HvLabListView",
    withTheme: true })(ListItem),
  "This component is deprecated. Please use the List View Component in the Core Package"
);
