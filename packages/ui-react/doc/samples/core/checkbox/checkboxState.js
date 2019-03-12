import React from "react";
import HvCheckBox from "@hv-ui/react/core/Selectors/CheckBox";

const valueA = "a";
const valueB = "b";
const valueC = "c";
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
            <HvCheckBox
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
            <HvCheckBox
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

          <div>
            <HvCheckBox
              label="indeterminate"
              checked={checkedRadio === valueC}
              indeterminate={checkedRadio === valueC}
              onChange={() => {
                if (checkedRadio !== valueC) {
                  this.setState({ checkedRadio: valueC });
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
