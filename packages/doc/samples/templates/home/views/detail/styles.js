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

import IconArrowUp from "../../../../components/kpi/assets/arrow-green-up.svg";

const styles = () => ({
  kpi: {
    position: "relative",
    top: "1px"
  },
  kpiInner: {
    position: "absolute",
    width: "32px",
    height: "32px",
    top: "4px",
    left: "-3px",
    background: `url(${IconArrowUp}) no-repeat`
  },
  kpiTypography: {
    position: "relative",
    paddingLeft: "16px"
  },
  title: {
    marginBottom: "20px"
  }
});

export default styles;
