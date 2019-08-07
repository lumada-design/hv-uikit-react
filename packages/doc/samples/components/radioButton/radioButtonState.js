import React from "react";
import HvRadio from "@hv/uikit-react-core/dist/Selectors/RadioButton";

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
              label="some label"
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
              label="some other label"
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
