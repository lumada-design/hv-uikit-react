import React from "react";
import { storiesOf } from "@storybook/react";
import { HvCheckBox } from "../../src";

const style = {
  fontSize: "inherit",
  margin: "10px 10px",
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
      <div style={style}>
        <HvCheckBox />
      </div>

      <div style={style}>
        <HvCheckBox disabled />
      </div>

      <div style={style}>
        <HvCheckBox label="disabled" disabled />
      </div>

      <div style={style}>
        <HvCheckBox label="label" />
      </div>

      <div style={style}>
        <HvCheckBox label="click me!" value="A" onChange={event => alert(`my value is ${event.target.value}`)} />
      </div>

      <div style={style}>
        <HvCheckBox label="label" disabled />
      </div>

      <div style={style}>
        <HvCheckBox label="click me!" value="A" disabled onChange={event => alert(`my value is ${event.target.value}`)} />
      </div>

      <WrapperWithState />

    </>
  )
)

