/* eslint-env jest */

import React from "react";
import { mount } from "enzyme";
import withStyles from "../../styles/withStyles";
import InputAdornment from "../InputAdornment";
import validationStates from "../validationStates";
import HvProvider from "../../Provider";

describe("InputAdornment", () => {
  let wrapper;
  const handleClearMock = jest.fn();

  const theme = {
    hv: {
      spacing: {
        md: 10
      },
      palette: {
        semantic: {
          sema1: "#FFFFF",
          sema6: "#FFFFF"
        }
      }
    }
  };

  const StyledInputAdornment = withStyles({
    adornmentsBox: {
      display: "flex",
      flexDirection: "row",
      height: 30,
      justifyContent: "center"
    },
    adornmentButton: {
      backgroundColor: "transparent",
      border: "none",
      padding: 0,
      margin: 0,
      cursor: "pointer"
    },
    icon: {
      width: `${theme.hv.spacing.md}px`,
      height: `${theme.hv.spacing.md}px`,
      position: "relative",
      "& svg": {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        margin: "auto"
      }
    }
  })(InputAdornment);

  beforeEach(async () => {
    handleClearMock.mockClear();

    wrapper = mount(
      <HvProvider>
        <StyledInputAdornment
          classes={{}}
          validationState={validationStates.filled}
          handleClear={handleClearMock}
          theme={theme}
        />
      </HvProvider>
    );
  });

  it("should be defined", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should call handleClear when mouseDown on the clear button", () => {
    wrapper.find("button").simulate("mousedown");
    expect(handleClearMock).toHaveBeenCalled();
  });

  it("should call handleClear when keydown", () => {
    wrapper.find("button").simulate("keydown", { keyCode: 13 });
    expect(handleClearMock).toHaveBeenCalled();
  });

  it("should not call handleClear when mousedown and keydown when not clickable", () => {
    wrapper = mount(
      <HvProvider>
        <StyledInputAdornment
          classes={{}}
          validationState={validationStates.empty}
          handleClear={handleClearMock}
          theme={theme}
        />
      </HvProvider>
    );

    wrapper.find(StyledInputAdornment).simulate("keydown", { keyCode: 13 });
    wrapper.find(StyledInputAdornment).simulate("mousedown");

    expect(handleClearMock).not.toHaveBeenCalled();
  });
});
