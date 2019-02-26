import React from "react";
import { storiesOf, forceReRender } from "@storybook/react";
import { HvSearchBox, HvShowCase, HvShowCaseHeader } from "../src";

const HvShowCaseStyle = {
  min: {
    width: "150px"
  },
  max: {
    width: "800px"
  }
};

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

storiesOf("Search Box", module).add(`SearchBox`, () => {
  return (
    <>
      <HvShowCaseHeader reviewed date="2019/Feb/25" />

      <HvShowCase title="Search as you type" style={HvShowCaseStyle.min}>
        <WrapperWithList />
      </HvShowCase>
    </>
  );
});
