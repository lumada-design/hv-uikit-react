import React, { useState } from "react";

import { Preview, PreviewOff, Success, Fail } from "@hitachivantara/uikit-react-icons";

import { HvBaseInput, HvFormElement, HvLabel, HvAdornment, HvButton } from "../../..";

export default {
  title: "Components/Forms/Adornment",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvAdornment } from "@hitachivantara/uikit-react-core";',
  },
  component: HvAdornment,
  decorators: [(storyFn) => <div style={{ width: "600px" }}>{storyFn()}</div>],
};

export const Main = () => {
  const inputId = "controlled-input";
  const inputLabelId = "controlled-input-label";
  const [isPassword, setPasswordType] = useState(true);
  const toggleType = () => {
    setPasswordType(!isPassword);
  };
  const getIcon = (isPass) => (isPass ? <Preview /> : <PreviewOff />);

  return (
    <HvFormElement value="p455w0rd" status="standBy">
      <HvLabel id={inputLabelId} label="First name">
        <HvBaseInput
          id={inputId}
          type={isPassword ? "password" : "text"}
          placeholder="Insert your passwords"
          endAdornment={
            <HvAdornment
              aria-label="show password"
              icon={getIcon(isPassword)}
              onClick={toggleType}
            />
          }
        />
      </HvLabel>
    </HvFormElement>
  );
};

export const DynamicAdornments = () => {
  const inputId = "valid-controlled-input";
  const inputLabelId = "valid-controlled-input-label";
  const [status, setStatus] = useState("valid");
  const btnStyle = {
    width: "250px",
    height: "50px",
    margin: "10px",
  };
  return (
    <>
      <HvFormElement value="content" status={status}>
        <HvLabel id={inputLabelId} label="First name">
          <HvBaseInput
            id={inputId}
            placeholder="Insert your name"
            endAdornment={
              <>
                <HvAdornment showWhen="invalid" icon={<Fail semantic="sema4" />} />
                <HvAdornment showWhen="valid" icon={<Success semantic="sema1" />} />
              </>
            }
          />
        </HvLabel>
      </HvFormElement>
      <HvButton
        style={btnStyle}
        onClick={() => {
          setStatus("valid");
        }}
      >
        Set valid
      </HvButton>
      <HvButton
        style={btnStyle}
        onClick={() => {
          setStatus("invalid");
        }}
      >
        Set invalid
      </HvButton>
    </>
  );
};

DynamicAdornments.story = {
  parameters: {
    docs: {
      storyDescription: "Adornment showcasing the ability to react to the form element status.",
    },
  },
};
