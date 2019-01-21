import React from "react";
import { storiesOf } from "@storybook/react";
import { HvCheckBox, HvShowCase, HvShowCaseHeader } from "../../src";

const style = {
  fontSize: "inherit",
  float: "left"
}

const styleGroup = {
  position: "relative"
}

const valueA = "a";
const valueB = "b";
const valueC = "c";
const nothing = "";

class WrapperWithState extends React.Component {
  state = {
    checkedRadio: "a"
  };

  render() {
    const { checkedRadio } = this.state;

    return (
      <>
        <div style={style}>
          <div style={styleGroup}>
            <HvCheckBox
              label="checked"
              checked={checkedRadio === valueA}
              onChange={() => {
                if (checkedRadio !== valueA) {
                  this.setState({ checkedRadio: valueA })
                } else {
                  this.setState({ checkedRadio: nothing })
                }
              }}
            />
          </div>

          <div style={styleGroup}>
            <HvCheckBox
              label="unchecked"
              checked={checkedRadio === valueB}
              onChange={() => {
                if (checkedRadio !== valueB) {
                  this.setState({ checkedRadio: valueB })
                } else {
                  this.setState({ checkedRadio: nothing })
                }
              }}
            />
          </div>

          <div style={styleGroup}>
            <HvCheckBox
              label="indeterminate"
              checked={checkedRadio === valueC}
              indeterminate={checkedRadio === valueC}
              onChange={() => {
                if (checkedRadio !== valueC) {
                  this.setState({ checkedRadio: valueC })
                } else {
                  this.setState({ checkedRadio: nothing })
                }
              }}
            />
          </div>
        </div>
      </>
    );
  }
}

storiesOf("Checkbox", module).add(`Checkbox`, () =>
  (
    <>
      <HvShowCaseHeader reviewed date="2019/Jan/4" />
      <HvShowCase title="Simple checkbox" description="simple checkbox with no state management">
        <HvCheckBox />
      </HvShowCase>

      <HvShowCase title="Disabled simple checkbox" description="disabled simple checkbox with no state management">
        <HvCheckBox disabled />
      </HvShowCase>

      <HvShowCase title="Checkbox with label" description="checkbox with label and no state management">
        <HvCheckBox label="label" />
      </HvShowCase>

      <HvShowCase title="Disabled Checkbox with label" description="disabled checkbox with label and no state management">
        <HvCheckBox label="disabled" disabled />
      </HvShowCase>

      <HvShowCase title="Checkbox with click action" description="checkbox with click action and no state management">
        <HvCheckBox label="click me!" value="A" onChange={event => alert(`my value is ${event.target.value}`)} />
      </HvShowCase>

      <HvShowCase title="Disabled checkbox with click action" description="checkbox with click action and no state management">
        <HvCheckBox disabled label="click me!" value="A" onChange={event => alert(`my value is ${event.target.value}`)} />
      </HvShowCase>

      <HvShowCase title="Checkbox wrapped with state management" description="Checkbox wrapped in a component enabling state management">
        <WrapperWithState />
      </HvShowCase>

    </>
  )
)

