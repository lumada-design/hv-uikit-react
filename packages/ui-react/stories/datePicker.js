import React from "react";
import { storiesOf } from "@storybook/react";
import HvDatePicker from "../src/DatePicker";

class WrapperWithState extends React.Component {
  state = {
    value: {
      from: new Date(),
      to: new Date()
    }
  };

  render() {
    const { value } = this.state;

    return (
      <HvDatePicker
        label="Date range"
        value={value}
        onChange={range => this.setState({ value: range })}
      />
    );
  }
}

storiesOf("Date picker", module)
  .add("Date picker", () => <HvDatePicker label="Date range" />)
  .add("Date picker with callback", () => (
    <HvDatePicker label="Date range" onChange={range => console.log(range)} />
  ))
  .add("Date picker with callback and value", () => <WrapperWithState />);
