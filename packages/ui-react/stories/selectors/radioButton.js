import React from "react";
import { storiesOf } from "@storybook/react";
import { HvRadio } from "../../src";

const style = {
  fontSize: "inherit",
  margin: "10px 10px",
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
      <div style={style}>
        <HvRadio />
      </div>

      <div style={style}>
        <HvRadio disabled />
      </div>

      <div style={style}>
        <HvRadio label="disabled" disabled />
      </div>

      <div style={style}>
        <HvRadio label="label" />
      </div>

      <div style={style}>
        <HvRadio label="click me!" value={valueA} onChange={event => alert(`my value is ${event.target.value}`)} />
      </div>

      <div style={style}>
        <HvRadio label="label" disabled />
      </div>

      <div style={style}>
        <HvRadio label="click me!" value={valueA} onChange={event => alert(`my value is ${event.target.value}`)} disabled />
      </div>


      <WrapperWithState />

    </>
  )
)
