import React from "react";
import HvCheckBox from "@hv/uikit-react-core/dist/Selectors/CheckBox";

class CheckboxStateManager extends React.Component {
  state = {
    isAChecked: false,
    isBChecked: false,
    isCChecked: false
  };

  render() {
    const { isAChecked, isBChecked, isCChecked } = this.state;

    return (
      <>
        <div>
          <HvCheckBox
            label="some label"
            checked={isAChecked}
            onChange={() =>
              this.setState({ isAChecked: !this.state.isAChecked })
            }
          />
        </div>

        <div>
          <HvCheckBox
            label="other label"
            checked={isBChecked}
            onChange={() =>
              this.setState({ isBChecked: !this.state.isBChecked })
            }
          />
        </div>

        <div>
          <HvCheckBox
            label="indeterminate"
            indeterminate={isCChecked}
            onChange={() =>
              this.setState({ isCChecked: !this.state.isCChecked })
            }
          />
        </div>
      </>
    );
  }
}

export default <CheckboxStateManager />;
