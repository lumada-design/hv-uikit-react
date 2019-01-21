import React from "react";
import { storiesOf } from "@storybook/react";
import { HvRadio, HvShowCase, HvShowCaseHeader } from "../../src";

const style = {
  fontSize: "inherit",
  float: "left"
}

const styleListItem = {
  position: "relative"
};

const valueA = "a";
const valueB = "b";

class WrapperWithState extends React.Component {
  state = {
    checkedRadio: valueA
  };

  render() {
    const { checkedRadio } = this.state;

    return (
      <>
        <div style={style}>
          <div style={styleListItem}>
            <HvRadio
              label="checked"
              checked={checkedRadio === valueA}
              onChange={() => {
                this.setState({ checkedRadio: valueA })
              }}
            />
          </div>

          <div style={styleListItem}>
            <HvRadio
              label="unchecked"
              checked={checkedRadio === valueB}
              onChange={() => {
                this.setState({ checkedRadio: valueB })
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

storiesOf("Radio", module).add(`Radio`, () =>
  (
    <>
      <HvShowCaseHeader reviewed date="2019/Jan/4" />
      <HvShowCase title="Simple radio" description="simple radio with no state management">
        <HvRadio />
      </HvShowCase>

      <HvShowCase title="Disabled simple radio" description="disabled simple radio with no state management">
        <HvRadio disabled />
      </HvShowCase>

      <HvShowCase title="radio with label" description="radio with label and no state management">
        <HvRadio label="label" />
      </HvShowCase>

      <HvShowCase title="Disabled radio with label" description="disabled radio with label and no state management">
        <HvRadio label="disabled" disabled />
      </HvShowCase>

      <HvShowCase title="Radio with click action" description="radio with click action and no state management">
        <HvRadio label="click me!" value="A" onChange={event => alert(`my value is ${event.target.value}`)} />
      </HvShowCase>

      <HvShowCase title="Disabled radio with click action" description="radio with click action and no state management">
        <HvRadio disabled label="click me!" value="A" onChange={event => alert(`my value is ${event.target.value}`)} />
      </HvShowCase>

      <HvShowCase title="Radio wrapped with state management" description="radio wrapped in a component enabling state management">
        <WrapperWithState />
      </HvShowCase>

    </>
  )
)
