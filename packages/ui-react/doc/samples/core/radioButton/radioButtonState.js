import React from "react";
import HvRadio from "@hv-ui/react/core/Selectors/RadioButton";

const valueA = "a";
const valueB = "b";
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
            <HvRadio
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
            <HvRadio
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
        </div>
      </>
    );
  }
}

export default <CheckboxStateManager />;
