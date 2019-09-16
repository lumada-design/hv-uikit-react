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

const styles = () => ({
  shadowPadding:{
    padding:"0 10px",
  },
  navButton: {
    zIndex: "3",
    cursor: "pointer",
    marginRight: 20,
    width: 30
  },
  verticalNavigationSeparation: {
    marginTop: "5px"
  },
  verticalNavigationshield: {
    width: "100%",
    height: "100%",
    top: "0",
    left: "320px",
    position: "absolute"
  },
  verticalNavigationContainer: {
    zIndex: "7"
  },
  verticalNavigationContainerFixed: {
    height: "calc(100% - 50px)",
    position: "fixed",
    top: 55,
    left: 0
  },
  verticalNavigationContainerAbsolute: {
    height: "100%",
    position: "absolute"
  }
});

export default styles;
