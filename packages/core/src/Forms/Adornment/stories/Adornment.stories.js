import React, { useState } from "react";

import { Preview, PreviewOff, Success, Fail } from "@hitachivantara/uikit-react-icons";

import { HvBaseInput, HvFormElement, HvLabel, HvAdornment, HvButton } from "../../..";

export default {
  title: "How to Guides/Forms/Form Element Blocks/Adornment",
  parameters: {
    componentSubtitle: null,
    usage: 'import { HvAdornment } from "@hitachivantara/uikit-react-core"',
  },
  component: HvAdornment,
  decorators: [(storyFn) => <div style={{ width: "600px" }}>{storyFn()}</div>],
};

export const Main = () => {
  const [isPassword, setPasswordType] = useState(true);
  const toggleType = () => {
    setPasswordType(!isPassword);
  };
  const getIcon = (isPass) => (isPass ? <Preview /> : <PreviewOff />);

  return (
    <HvFormElement status="standBy">
      <HvLabel id="controlled-input-label" label="Password">
        <HvBaseInput
          id="controlled-input"
          defaultValue="p455w0rd"
          type={isPassword ? "password" : "text"}
          placeholder="Insert your password"
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
  const [status, setStatus] = useState("valid");
  const btnStyle = {
    width: "250px",
    height: "50px",
    margin: "10px",
  };
  return (
    <>
      <HvFormElement status={status}>
        <HvLabel label="First name">
          <HvBaseInput
            id="valid-controlled-input"
            defaultValue="content"
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

DynamicAdornments.parameters = {
  docs: {
    description: { story: "Adornment showcasing the ability to react to the form element status." },
  },
};
