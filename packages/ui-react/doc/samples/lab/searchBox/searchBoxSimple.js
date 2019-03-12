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

  filter = () => {
    return this.state.value !== ""
      ? this.list.filter(word => word.includes(this.state.value))
      : this.list;
  };

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
