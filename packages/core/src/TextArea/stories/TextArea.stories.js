import React, { useState } from "react";
import { HvTextArea, HvButton, HvInput } from "../..";

export default {
  title: "Components/Text Area",
  parameters: {
    componentSubtitle: null,
    usage: "import { HvTextArea } from '@hv/uikit-react-core/dist'"
  },
  component: HvTextArea
};

export const Main = () => {
  const labels = {
    inputLabel: "Label",
    placeholder: "Enter value"
  };

  return <HvTextArea label="Text Area" labels={labels} id="test" width={610} />;
};

export const Resizable = () => {
  const labels = {
    inputLabel: "Label",
    placeholder: "Enter value"
  };

  return <HvTextArea label="Text Area" labels={labels} id="test" rows={5} resizable />;
};

Resizable.story = {
  parameters: {
    docs: {
      storyDescription: "Text area that allow resizing."
    }
  }
};

export const Limited = () => {
  const labels = {
    inputLabel: "Label",
    placeholder: "Enter value"
  };

  return <HvTextArea rows={5} labels={labels} maxCharQuantity={10} />;
};

Limited.story = {
  parameters: {
    docs: {
      storyDescription:
        "Text area that limits the quantity of character that can be introduced in the text area."
    }
  }
};

export const Disabled = () => {
  const labels = {
    inputLabel: "Label",
    placeholder: "Enter value"
  };

  return <HvTextArea label="Text Area" rows={5} labels={labels} maxCharQuantity={1500} disabled />;
};

Disabled.story = {
  parameters: {
    docs: {
      storyDescription: "Text area that does not allows any interaction."
    }
  }
};

export const Controlled = () => {
  const labels = {
    inputLabel: "Label",
    placeholder: "Enter value"
  };

  const btnStyle = {
    width: "130px",
    height: "32px",
    margin: "0 10px 30px 0"
  };

  const [value, setValue] = useState();

  // to be possible to change the input value by user action
  const setterValue = newValue => {
    setValue(newValue);
    return newValue;
  };

  return (
    <>
      <HvButton style={btnStyle} onClick={() => setValue("First value")}>
        First value
      </HvButton>
      <HvButton style={btnStyle} onClick={() => setValue("Second value")}>
        Second value
      </HvButton>
      <HvButton style={btnStyle} onClick={() => setValue("Third value")}>
        Third value
      </HvButton>

      <HvTextArea
        initialValue="Initial State"
        value={value}
        rows={5}
        labels={labels}
        onChange={setterValue}
      />
    </>
  );
};

Controlled.story = {
  parameters: {
    docs: {
      storyDescription: "Text area value altered from an outside component."
    }
  }
};

export const ControlledLimited = () => {
  const labels = {
    inputLabel: "Label",
    placeholder: "Enter value"
  };

  const btnStyle = {
    width: "130px",
    height: "32px",
    margin: "0 10px 30px 0"
  };

  const inpStyle = {
    marginBottom: "30px"
  };

  const inputLabels = {
    inputLabel: "Limit"
  };

  const [value, setValue] = useState();
  const [maxChar, setMaxChar] = useState(10);

  // to be possible to change the input value by user action
  const setterValue = newValue => {
    setValue(newValue);
    return newValue;
  };

  return (
    <>
      <HvButton style={btnStyle} onClick={() => setValue("First value")}>
        First value
      </HvButton>
      <HvButton style={btnStyle} onClick={() => setValue("Second value")}>
        Second value
      </HvButton>
      <HvButton style={btnStyle} onClick={() => setValue("Third value")}>
        Third value
      </HvButton>

      <HvInput
        style={inpStyle}
        initialValue={maxChar.toString()}
        onChange={newValue => setMaxChar(Number(newValue))}
        labels={inputLabels}
      />

      <HvTextArea
        initialValue="Initial State"
        value={value}
        rows={5}
        labels={labels}
        onChange={setterValue}
        maxCharQuantity={maxChar}
      />
    </>
  );
};

ControlledLimited.story = {
  parameters: {
    docs: {
      storyDescription: "Text area value altered from an outside component."
    }
  }
};
