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
  shadowPadding: {
    margin: "0 10px",
    boxShadow: "0 0 0 #fff, 0px 6px 12px rgba(65,65,65,.12);"
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
