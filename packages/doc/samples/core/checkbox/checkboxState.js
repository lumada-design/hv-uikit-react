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

const valueA = "a";
const valueB = "b";
const valueC = "c";
const nothing = "";

class CheckboxStateManager extends React.Component {
  state = {
    checkedRadio: "a"
  };

  render() {
    const { checkedRadio } = this.state;

    return (
      <>
        <div>
          <div>
            <HvCheckBox
              label="checked"
              checked={checkedRadio === valueA}
              onChange={() => {
                if (checkedRadio !== valueA) {
                  this.setState({ checkedRadio: valueA });
                } else {
                  this.setState({ checkedRadio: nothing });
                }
              }}
            />
          </div>

          <div>
            <HvCheckBox
              label="unchecked"
              checked={checkedRadio === valueB}
              onChange={() => {
                if (checkedRadio !== valueB) {
                  this.setState({ checkedRadio: valueB });
                } else {
                  this.setState({ checkedRadio: nothing });
                }
              }}
            />
          </div>

          <div>
            <HvCheckBox
              label="indeterminate"
              checked={checkedRadio === valueC}
              indeterminate={checkedRadio === valueC}
              onChange={() => {
                if (checkedRadio !== valueC) {
                  this.setState({ checkedRadio: valueC });
                } else {
                  this.setState({ checkedRadio: nothing });
                }
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

export default <CheckboxStateManager />;
