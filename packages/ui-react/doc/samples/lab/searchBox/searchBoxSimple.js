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
import { forceReRender } from "@storybook/react";
import HvSearchBox from "@hv-ui/react/core/SearchBox";

class WrapperWithList extends React.Component {
  list = ["Adam", "Andy", "Carol"];

  state = {
    value: ""
  };

  handleChange = val => {
    this.state.value = val;
    forceReRender();
  };

  filter = () => this.state.value !== ""
      ? this.list.filter(word => word.includes(this.state.value))
      : this.list;

  render() {
    return (
      <>
        <HvSearchBox onChange={this.handleChange} {...this.props} />
        {this.filter().map(item => (
          <div key={item}>{item}</div>
        ))}
      </>
    );
  }
}

export default <WrapperWithList />;
