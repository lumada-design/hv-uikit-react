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

import React from "react";
import HvCheckBox from "@hv/uikit-react-core/dist/Selectors/CheckBox";

class CheckboxStateManager extends React.Component {
  state = {
    isAChecked: false,
    isBChecked: false,
    isCChecked: false
  };

  render() {
    const { isAChecked, isBChecked, isCChecked } = this.state;

    return (
      <>
        <div>
          <HvCheckBox
            label="some label"
            checked={isAChecked}
            onChange={() =>
              this.setState({ isAChecked: !this.state.isAChecked })
            }
          />
        </div>

        <div>
          <HvCheckBox
            label="other label"
            checked={isBChecked}
            onChange={() =>
              this.setState({ isBChecked: !this.state.isBChecked })
            }
          />
        </div>

        <div>
          <HvCheckBox
            label="indeterminate"
            indeterminate={isCChecked}
            onChange={() =>
              this.setState({ isCChecked: !this.state.isCChecked })
            }
          />
        </div>
      </>
    );
  }
}

export default <CheckboxStateManager />;
