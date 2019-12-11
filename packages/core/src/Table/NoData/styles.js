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
  root: {
    display: "flex",
    position: "absolute",
    left: "50%",
    top: "54px",
    transform: "translate(-50%,0)",
    transition: "all .3s ease",
    zIndex: 1,
    pointerEvents: "none",
    padding: "32px"
  },
  noTextMessage: {
    lineHeight: "32px"
  }
});

export default styles;
