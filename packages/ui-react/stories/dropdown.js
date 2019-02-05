import React from "react";
import { storiesOf } from "@storybook/react";
import { HvButton, HvDropdown } from "../src";

const data = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" }
];

class MyCustomDropdown extends React.Component {
  state = {
    value: null
  };

  render() {
    const { value } = this.state;

    const handleClick = () => {
      this.setState({
        value: { value: value.value + 1, label: `${value.value + 1}` }
      });
    };

    return (
      <div>
        <HvButton onClick={() => handleClick()}>Click me!</HvButton>
        <HvDropdown
          value={value}
          onChange={v => this.setState({ value: v })}
          options={data}
        />
      </div>
    );
  }
}

storiesOf("Dropdown", module)
  .add("with Label", () => <HvDropdown label="Sort" options={data} />)
  .add("without Label", () => <HvDropdown options={data} />)
  .add("with default value", () => (
    <HvDropdown value={data[1]} options={data} />
  ))
  .add("with onChange", () => (
    <HvDropdown onChange={value => console.log(value)} options={data} />
  ))
  .add("with value changed on the outside", () => <MyCustomDropdown />);
